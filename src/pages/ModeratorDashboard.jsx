
// src/pages/ModeratorDashboard.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../components/LoadingSpinner';
import Swal from 'sweetalert2';
import { FaUsers, FaDollarSign, FaHandsHelping, FaEye } from 'react-icons/fa'; // Import necessary icons
import { Link } from 'react-router-dom';

const ModeratorDashboard = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Fetch dashboard statistics
  const { data: stats = {}, isLoading: isStatsLoading, isError: isStatsError } = useQuery({
    queryKey: ['moderatorStats'],
    enabled: !authLoading && !!user?.email && typeof user.getIdToken === 'function',
    queryFn: async () => {
      const res = await axiosSecure.get('/dashboard-stats'); // Use the same stats endpoint as admin
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes stale time
    cacheTime: 1000 * 60 * 30, // 30 minutes cache time
    onError: (error) => {
      console.error("Error fetching moderator stats:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to load dashboard statistics. Please try again.',
      });
    }
  });

  // Fetch recent 3 donation requests for volunteers (all pending/inprogress requests)
  const { data: recentRequests = [], isLoading: isRequestsLoading, isError: isRequestsError } = useQuery({
    queryKey: ['recentAllDonationRequests'],
    enabled: !authLoading && !!user?.email && typeof user.getIdToken === 'function',
    queryFn: async () => {
      // Fetch all requests and then filter to get recent 3 pending/inprogress
      const res = await axiosSecure.get(`/all-blood-donation-requests`); // Use existing endpoint
      // Filter for 'pending' or 'inprogress' status and get the latest 3
      const filteredRequests = res.data.filter(req => req.donationStatus === 'pending' || req.donationStatus === 'inprogress');
      // Sort by createdAt date (assuming it exists and is a Date object or sortable string)
      // For simplicity, we'll just take the first 3 if the backend doesn't support limit/sort
      return filteredRequests.slice(0, 3); // Take top 3
    },
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 2,
    onError: (error) => {
      console.error("Error fetching recent all donation requests for moderator:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to load recent blood donation requests. Please try again.',
      });
    }
  });


  if (authLoading || isStatsLoading || isRequestsLoading) {
    return <LoadingSpinner />;
  }

  if (isStatsError || isRequestsError) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">Error loading data.</h2>
        <p className="text-gray-600">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome, {user?.displayName}!</h1>
      <p className="text-gray-600 mb-6">This is your Volunteer Dashboard Home Page.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Users Card */}
        <div className="bg-blue-100 p-5 rounded-lg shadow-sm flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-blue-800">Total Users</h3>
            <p className="text-3xl font-bold text-blue-900 mt-2">{stats.totalUsers || 0}</p>
          </div>
          <FaUsers className="text-blue-600 text-5xl" />
        </div>

        {/* Total Funding Card */}
        <div className="bg-green-100 p-5 rounded-lg shadow-sm flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-green-800">Total Funding</h3>
            <p className="text-3xl font-bold text-green-900 mt-2">${stats.totalFunding?.toFixed(2) || '0.00'}</p>
          </div>
          <FaDollarSign className="text-green-600 text-5xl" />
        </div>

        {/* Total Blood Donation Requests Card */}
        <div className="bg-purple-100 p-5 rounded-lg shadow-sm flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-purple-800">Total Blood Requests</h3>
            <p className="text-3xl font-bold text-purple-900 mt-2">{stats.totalBloodDonationRequests || 0}</p>
          </div>
          <FaHandsHelping className="text-purple-600 text-5xl" />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Blood Donation Requests (Pending/In Progress)</h2>
        <p className="text-gray-600 mb-6">(This section displays the most recent 3 pending or in-progress requests.)</p>

        {recentRequests.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-xl">No recent pending or in-progress requests to display yet.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 border-b border-gray-200">Recipient Name</th>
                    <th className="py-3 px-6 border-b border-gray-200">Location</th>
                    <th className="py-3 px-6 border-b border-gray-200">Date</th>
                    <th className="py-3 px-6 border-b border-gray-200">Time</th>
                    <th className="py-3 px-6 border-b border-gray-200">Blood Group</th>
                    <th className="py-3 px-6 border-b border-gray-200">Status</th>
                    <th className="py-3 px-6 border-b border-gray-200 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                  {recentRequests.map((request) => (
                    <tr key={request._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-6">{request.recipientName}</td>
                      <td className="py-3 px-6">{request.recipientDistrict}, {request.recipientUpazila}</td>
                      <td className="py-3 px-6">{request.donationDate}</td>
                      <td className="py-3 px-6">{request.donationTime}</td>
                      <td className="py-3 px-6 font-bold">{request.bloodGroup}</td>
                      <td className="py-3 px-6">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold
                          ${request.donationStatus === 'pending' ? 'bg-yellow-200 text-yellow-800' : ''}
                          ${request.donationStatus === 'inprogress' ? 'bg-blue-200 text-blue-800' : ''}
                        `}>
                          {request.donationStatus}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <Link
                          to={`/donation-details/${request._id}`}
                          className="btn btn-sm bg-gray-500 hover:bg-gray-600 text-white rounded-md tooltip"
                          data-tip="View Details"
                        >
                          <FaEye /> View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center">
              <Link
                to="/dashboard/all-blood-donation-requests"
                className="btn bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-lg transition duration-200 shadow-lg"
              >
                View All Blood Requests
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModeratorDashboard;
