
// src/pages/AllFundings.jsx
import React, { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../components/LoadingSpinner';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';
import useRole from "../hooks/useRole"; // Import useRole to check user role

const AllFundings = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [role, isRoleLoading] = useRole(); // Get user role

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  // Fetch all fundings
  const { data: fundings = [], isLoading: isFundingsLoading, isError: isFundingsError } = useQuery({
    queryKey: ['allFundings'],
    // Only fetch if user is authenticated and role is determined (Admin/Volunteer)
    enabled: !authLoading && !isRoleLoading && (role === 'admin' || role === 'volunteer'),
    queryFn: async () => {
      const res = await axiosSecure.get('/all-fundings');
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    onError: (error) => {
      console.error("Error fetching all fundings:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to load funding data. Please try again.',
      });
    }
  });

  const pageCount = Math.ceil(fundings.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = fundings.slice(offset, offset + itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  if (authLoading || isRoleLoading || isFundingsLoading) {
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

  if (isFundingsError) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">Error loading funding data.</h2>
        <p className="text-gray-600">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Fundings</h1>
      <p className="text-gray-600 mb-6">Overview of all donations received.</p>

      {fundings.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 border-b border-gray-200">Donor Name</th>
                  <th className="py-3 px-6 border-b border-gray-200">Donor Email</th>
                  <th className="py-3 px-6 border-b border-gray-200">Amount</th>
                  <th className="py-3 px-6 border-b border-gray-200">Date</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {currentItems.map((funding) => (
                  <tr key={funding._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6">{funding.donorName || 'N/A'}</td>
                    <td className="py-3 px-6">{funding.donorEmail || 'N/A'}</td>
                    <td className="py-3 px-6 font-bold text-green-700">${funding.amount?.toFixed(2)}</td>
                    <td className="py-3 px-6">{new Date(funding.fundingDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-center">
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< Previous"
              renderOnZeroPageCount={null}
              containerClassName="pagination flex space-x-2"
              pageLinkClassName="px-3 py-2 border border-gray-300 rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-200"
              previousLinkClassName="px-3 py-2 border border-gray-300 rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-200"
              nextLinkClassName="px-3 py-2 border border-gray-300 rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-200"
              activeLinkClassName="bg-blue-600 text-white"
              disabledClassName="opacity-50 cursor-not-allowed"
            />
          </div>
        </>
      ) : (
        <div className="mt-8 text-center text-gray-500">
          <p>No funding data available yet.</p>
        </div>
      )}
    </div>
  );
};

export default AllFundings;
