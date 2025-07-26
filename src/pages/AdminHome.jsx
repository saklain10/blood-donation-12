// src/pages/AdminHome.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../components/LoadingSpinner';
import Swal from 'sweetalert2';
import { FaUsers, FaDollarSign, FaHandsHelping } from 'react-icons/fa'; // Icons for statistics

const AdminHome = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Fetch dashboard statistics
  const { data: stats = {}, isLoading: isStatsLoading, isError: isStatsError } = useQuery({
    queryKey: ['adminStats'],
    // Ensure query runs ONLY when auth is not loading, user email exists,
    // AND the user object has the getIdToken method.
    enabled: !authLoading && !!user?.email && typeof user.getIdToken === 'function',
    queryFn: async () => {
      const res = await axiosSecure.get('/dashboard-stats');
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes stale time
    cacheTime: 1000 * 60 * 30, // 30 minutes cache time
    onError: (error) => {
      console.error("Error fetching admin stats:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to load dashboard statistics. Please try again.',
      });
    }
  });

  if (authLoading || isStatsLoading) {
    return <LoadingSpinner />;
  }

  if (isStatsError) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">Error loading statistics.</h2>
        <p className="text-gray-600">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome, {user?.displayName}!</h1>
      <p className="text-gray-600 mb-6">This is your Admin Dashboard Home Page.</p>

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
    </div>
  );
};

export default AdminHome;
