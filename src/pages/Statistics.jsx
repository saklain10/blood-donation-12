
// src/pages/Statistics.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../components/LoadingSpinner';
import Swal from 'sweetalert2';
import { FaUsers, FaDollarSign, FaHandsHelping, FaChartLine } from 'react-icons/fa'; // Icons for statistics
import useRole from "../hooks/useRole"; // Import useRole to check user role

const Statistics = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [role, isRoleLoading] = useRole(); // Get user role

  // Fetch dashboard statistics
  const { data: stats = {}, isLoading: isStatsLoading, isError: isStatsError } = useQuery({
    queryKey: ['dashboardStats'],
    // Ensure query runs ONLY when auth is not loading, user email exists,
    // AND the user object has the getIdToken method.
    enabled: !authLoading && !isRoleLoading && (role === 'admin' || role === 'volunteer'),
    queryFn: async () => {
      const res = await axiosSecure.get('/dashboard-stats');
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes stale time
    cacheTime: 1000 * 60 * 30, // 30 minutes cache time
    onError: (error) => {
      console.error("Error fetching dashboard stats:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to load dashboard statistics. Please try again.',
      });
    }
  });

  if (authLoading || isRoleLoading || isStatsLoading) {
    return <LoadingSpinner />;
  }

  // Restrict access based on role
  if (role !== 'admin' && role !== 'volunteer') {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">Access Denied!</h2>
        <p className="text-gray-600">You do not have permission to view this page.</p>
      </div>
    );
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
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Overall Statistics</h1>
      <p className="text-gray-600 mb-8">Detailed insights into the platform's performance.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

export default Statistics;
