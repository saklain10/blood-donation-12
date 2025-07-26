// src/pages/AllPendingDonationRequests.jsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios"; // Using axios directly as this is a public route
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner"; // Import LoadingSpinner
import { FaEye } from "react-icons/fa"; // Icon for View Details

const AllPendingDonationRequests = () => {
  // Fetch all pending donation requests
  const { data: pendingRequests = [], isLoading, isError, error } = useQuery({
    queryKey: ['allPendingDonationRequests'],
    queryFn: async () => {
      // This endpoint is public, so use axios directly
      const res = await axios.get(`http://localhost:5000/all-pending-donation-requests`);
      return res.data;
    },
    staleTime: 1000 * 30, // Data considered fresh for 30 seconds
    cacheTime: 1000 * 60 * 2, // Cache data for 2 minutes
    onError: (err) => {
      console.error("Error fetching pending donation requests:", err);
      // No Swal.fire here as it's a public page, just display a message
    }
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">Error loading pending donation requests.</h2>
        <p className="text-gray-600">Details: {error?.message || 'Unknown error'}</p>
        <p className="text-gray-600 mt-2">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto my-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">All Pending Blood Donation Requests</h1>
      <p className="text-gray-600 mb-8 text-center">
        Browse through all the urgent blood donation needs. Your help can save a life!
      </p>

      {pendingRequests.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p className="text-xl">No pending blood donation requests at the moment. Check back later!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 border-b border-gray-200">Recipient Name</th>
                <th className="py-3 px-6 border-b border-gray-200">Location</th>
                <th className="py-3 px-6 border-b border-gray-200">Blood Group</th>
                <th className="py-3 px-6 border-b border-gray-200">Date</th>
                <th className="py-3 px-6 border-b border-gray-200">Time</th>
                <th className="py-3 px-6 border-b border-gray-200 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {pendingRequests.map((request) => (
                <tr key={request._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6">{request.recipientName}</td>
                  <td className="py-3 px-6">{request.recipientDistrict}, {request.recipientUpazila}</td>
                  <td className="py-3 px-6 font-bold">{request.bloodGroup}</td>
                  <td className="py-3 px-6">{request.donationDate}</td>
                  <td className="py-3 px-6">{request.donationTime}</td>
                  <td className="py-3 px-6 text-center">
                    <Link
                      to={`/donation-details/${request._id}`}
                      className="btn btn-lg hover:bg-blue-300 bg-blue-400 justify-center text-white flex items-center gap-1 rounded-md tooltip"
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
      )}
    </div>
  );
};

export default AllPendingDonationRequests;
