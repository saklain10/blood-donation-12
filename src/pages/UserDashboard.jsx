
// src/pages/UserDashboard.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../components/LoadingSpinner';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'; // Icons for actions

const UserDashboard = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Fetch recent 3 donation requests made by the current user
  const { data: recentRequests = [], isLoading: isRequestsLoading, isError: isRequestsError, refetch } = useQuery({
    queryKey: ['recentMyDonationRequests', user?.email],
    enabled: !authLoading && !!user?.email && typeof user.getIdToken === 'function',
    queryFn: async () => {
      const res = await axiosSecure.get(`/recent-my-donation-requests`); // New backend endpoint
      return res.data;
    },
    staleTime: 1000 * 30, // Data considered fresh for 30 seconds
    cacheTime: 1000 * 60 * 2, // Cache data for 2 minutes
    onError: (error) => {
      console.error("Error fetching recent donation requests:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to load recent donation requests. Please try again.',
      });
    }
  });

  const handleStatusChange = async (id, newStatus) => {
    Swal.fire({
      title: `Are you sure you want to mark this as ${newStatus}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${newStatus} it!`
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/update-donation-status/${id}`, { status: newStatus });
          if (res.data.modifiedCount > 0) {
            Swal.fire(
              `${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}!`,
              `The donation request has been marked as ${newStatus}.`,
              'success'
            );
            refetch(); // Refetch recent requests to update UI
          } else {
            Swal.fire('Failed!', 'Could not update the status.', 'error');
          }
        } catch (error) {
          console.error("Error updating donation status:", error);
          Swal.fire('Error!', error.response?.data?.message || 'Failed to update donation status.', 'error');
        }
      }
    });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/delete-donation-request/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire(
              'Deleted!',
              'The donation request has been deleted.',
              'success'
            );
            refetch(); // Refetch recent requests to update UI
          } else {
            Swal.fire('Failed!', 'Could not delete the request.', 'error');
          }
        } catch (error) {
          console.error("Error deleting donation request:", error);
          Swal.fire('Error!', error.response?.data?.message || 'Failed to delete donation request.', 'error');
        }
      }
    });
  };

  if (authLoading || isRequestsLoading) {
    return <LoadingSpinner />;
  }

  if (isRequestsError) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">Error loading recent requests.</h2>
        <p className="text-gray-600">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome, {user?.displayName}!</h1>
      <p className="text-gray-600 mb-6">This is your Donor Dashboard Home Page.</p>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Recent Donation Requests</h2>
        <p className="text-gray-600 mb-6">(This section will display your maximum 3 recent donation requests in a tabular format.)</p>

        {recentRequests.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-xl">No recent donation requests to display yet.</p>
            <Link to="/dashboard/create-donation-request" className="text-blue-600 hover:underline mt-2 inline-block">
              Create a new donation request
            </Link>
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
                          ${request.donationStatus === 'done' ? 'bg-green-200 text-green-800' : ''}
                          ${request.donationStatus === 'canceled' ? 'bg-red-200 text-red-800' : ''}
                        `}>
                          {request.donationStatus}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          {request.donationStatus === 'inprogress' && (
                            <>
                              <button
                                onClick={() => handleStatusChange(request._id, 'done')}
                                className="btn btn-sm bg-green-500 hover:bg-green-600 text-white rounded-md tooltip"
                                data-tip="Mark as Done"
                              >
                                Done
                              </button>
                              <button
                                onClick={() => handleStatusChange(request._id, 'canceled')}
                                className="btn btn-sm bg-red-500 hover:bg-red-600 text-white rounded-md tooltip"
                                data-tip="Mark as Canceled"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                          {request.donationStatus !== 'inprogress' && request.donationStatus !== 'done' && request.donationStatus !== 'canceled' && (
                            <Link
                              to={`/dashboard/edit-donation-request/${request._id}`}
                              className="btn btn-sm p-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md tooltip"
                              data-tip="Edit Request"
                            >
                              <FaEdit />
                            </Link>
                          )}
                          <button
                            onClick={() => handleDelete(request._id)}
                            className="btn btn-sm p-1 bg-red-500 hover:bg-red-600 text-white rounded-md tooltip"
                            data-tip="Delete Request"
                          >
                            <FaTrash />
                          </button>
                          <Link
                            to={`/donation-details/${request._id}`}
                            className="btn btn-sm p-1 bg-gray-500 hover:bg-gray-600 text-white rounded-md tooltip"
                            data-tip="View Details"
                          >
                            <FaEye />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center">
              <Link
                to="/dashboard/my-donation-requests"
                className="btn bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-lg transition duration-200 shadow-lg"
              >
                View My All Requests
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
