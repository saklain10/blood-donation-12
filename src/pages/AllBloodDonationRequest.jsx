
// // src/pages/AllBloodDonationRequest.jsx
// import { useContext, useState } from "react";
// import { AuthContext } from "../providers/AuthProvider";
// import useAxiosSecure from "../hooks/useAxiosSecure";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import LoadingSpinner from "../components/LoadingSpinner";
// import Swal from "sweetalert2";
// import { Link } from "react-router-dom";
// import ReactPaginate from 'react-paginate';
// import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
// import useRole from "../hooks/useRole"; // Import useRole

// const AllBloodDonationRequests = () => {
//   const { user, loading: authLoading } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();
//   const [role, isRoleLoading] = useRole(); // Get current user's role

//   const [filterStatus, setFilterStatus] = useState("all");
//   const [currentPage, setCurrentPage] = useState(0);
//   const itemsPerPage = 10;

//   // Fetch all blood donation requests
//   const { data: allRequests = [], isLoading, isError, error } = useQuery({
//     queryKey: ['allBloodDonationRequests', filterStatus],
//     // Only fetch if user is authenticated and role is loaded
//     enabled: !authLoading && !isRoleLoading && !!user?.email && typeof user.getIdToken === 'function',
//     queryFn: async () => {
//       let url = `/all-blood-donation-requests`; // This endpoint is protected by verifyVolunteerOrAdmin
//       const res = await axiosSecure.get(url);
//       // Frontend filtering if backend doesn't support query param filtering for status
//       if (filterStatus !== "all" && res.data) {
//         return res.data.filter(request => request.donationStatus === filterStatus);
//       }
//       return res.data;
//     },
//     staleTime: 1000 * 60, // 1 minute stale time
//     cacheTime: 1000 * 60 * 5, // 5 minutes cache time
//     onError: (err) => {
//       console.error("Error fetching all blood donation requests:", err);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error!',
//         text: 'Failed to load all blood donation requests. Please try again.',
//       });
//     }
//   });

//   const pageCount = Math.ceil(allRequests.length / itemsPerPage);
//   const offset = currentPage * itemsPerPage;
//   const currentItems = allRequests.slice(offset, offset + itemsPerPage);

//   const handlePageClick = (event) => {
//     setCurrentPage(event.selected);
//   };

//   const handleStatusChange = async (id, newStatus) => {
//     Swal.fire({
//       title: `Are you sure you want to mark this as ${newStatus}?`,
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: `Yes, ${newStatus} it!`
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const res = await axiosSecure.patch(`/update-donation-status/${id}`, { status: newStatus });
//           if (res.data.modifiedCount > 0) {
//             Swal.fire(
//               `${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}!`,
//               `The donation request has been marked as ${newStatus}.`,
//               'success'
//             );
//             queryClient.invalidateQueries(['allBloodDonationRequests', filterStatus]); // Invalidate to refetch
//           } else {
//             Swal.fire('Failed!', 'Could not update the status.', 'error');
//           }
//         } catch (error) {
//           console.error("Error updating donation status:", error);
//           Swal.fire('Error!', error.response?.data?.message || 'Failed to update donation status.', 'error');
//         }
//       }
//     });
//   };

//   const handleDelete = async (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const res = await axiosSecure.delete(`/delete-donation-request/${id}`);
//           if (res.data.deletedCount > 0) {
//             Swal.fire(
//               'Deleted!',
//               'The donation request has been deleted.',
//               'success'
//             );
//             queryClient.invalidateQueries(['allBloodDonationRequests', filterStatus]); // Invalidate to refetch
//           } else {
//             Swal.fire('Failed!', 'Could not delete the request.', 'error');
//           }
//         } catch (error) {
//           console.error("Error deleting donation request:", error);
//           Swal.fire('Error!', error.response?.data?.message || 'Failed to delete donation request.', 'error');
//         }
//       }
//     });
//   };

//   if (authLoading || isLoading || isRoleLoading) {
//     return <LoadingSpinner />;
//   }

//   if (isError) {
//     return (
//       <div className="text-center py-10">
//         <h2 className="text-2xl font-bold text-red-600">Error loading blood donation requests.</h2>
//         <p className="text-gray-600">Details: {error?.message || 'Unknown error'}</p>
//         <p className="text-gray-600 mt-2">Please ensure you have appropriate permissions and try again.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">All Blood Donation Requests</h1>

//       <div className="mb-6 flex items-center gap-4">
//         <label htmlFor="statusFilter" className="text-gray-700 font-semibold">Filter by Status:</label>
//         <select
//           id="statusFilter"
//           className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={filterStatus}
//           onChange={(e) => {
//             setFilterStatus(e.target.value);
//             setCurrentPage(0); // Reset pagination when filter changes
//           }}
//         >
//           <option value="all">All</option>
//           <option value="pending">Pending</option>
//           <option value="inprogress">In Progress</option>
//           <option value="done">Done</option>
//           <option value="canceled">Canceled</option>
//         </select>
//       </div>

//       {allRequests.length > 0 ? (
//         <>
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-200 rounded-lg">
//               <thead>
//                 <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
//                   <th className="py-3 px-6 border-b border-gray-200">Recipient Name</th>
//                   <th className="py-3 px-6 border-b border-gray-200">Location</th>
//                   <th className="py-3 px-6 border-b border-gray-200">Date</th>
//                   <th className="py-3 px-6 border-b border-gray-200">Time</th>
//                   <th className="py-3 px-6 border-b border-gray-200">Blood Group</th>
//                   <th className="py-3 px-6 border-b border-gray-200">Status</th>
//                   <th className="py-3 px-6 border-b border-gray-200">Donor Info</th>
//                   <th className="py-3 px-6 border-b border-gray-200 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="text-gray-700 text-sm">
//                 {currentItems.map((request) => (
//                   <tr key={request._id} className="border-b border-gray-200 hover:bg-gray-50">
//                     <td className="py-3 px-6">{request.recipientName}</td>
//                     <td className="py-3 px-6">{request.recipientDistrict}, {request.recipientUpazila}</td>
//                     <td className="py-3 px-6">{request.donationDate}</td>
//                     <td className="py-3 px-6">{request.donationTime}</td>
//                     <td className="py-3 px-6 font-bold">{request.bloodGroup}</td>
//                     <td className="py-3 px-6">
//                       <span className={`px-2 py-1 rounded-full text-xs font-semibold
//                         ${request.donationStatus === 'pending' ? 'bg-yellow-200 text-yellow-800 rounded-sm' : ''}
//                         ${request.donationStatus === 'inprogress' ? 'bg-blue-200 text-blue-800 rounded-sm' : ''}
//                         ${request.donationStatus === 'done' ? 'bg-green-200 text-green-800 rounded-sm' : ''}
//                         ${request.donationStatus === 'canceled' ? 'bg-red-500 text-red-800 rounded-sm' : ''}
//                       `}>
//                         {request.donationStatus}
//                       </span>
//                     </td>
//                     <td className="py-3 px-6">
//                       {request.donationStatus === 'inprogress' || request.donationStatus === 'done' ? (
//                         <>
//                           <div>{request.donorName}</div>
//                           <div className="text-xs text-gray-500">{request.donorEmail}</div>
//                         </>
//                       ) : (
//                         <span>N/A</span>
//                       )}
//                     </td>
//                     <td className="py-3 px-6 text-center">
//                       <div className="flex items-center justify-center space-x-2">
//                         {/* Status Change Buttons (Admin & Volunteer) */}
//                         {(role === 'admin' || role === 'volunteer') && (request.donationStatus === 'inprogress' || request.donationStatus === 'pending') && (
//                           <>
//                             <button
//                               onClick={() => handleStatusChange(request._id, 'done')}
//                               className="btn btn-sm p-1 bg-green-500 hover:bg-green-600 text-white rounded-md tooltip"
//                               data-tip="Mark as Done"
//                               disabled={request.donationStatus === 'done' || request.donationStatus === 'canceled'}
//                             >
//                               Done
//                             </button>
//                             <button
//                               onClick={() => handleStatusChange(request._id, 'canceled')}
//                               className="btn btn-sm p-1 bg-red-500 hover:bg-red-500 text-white rounded-md tooltip"
//                               data-tip="Mark as Canceled"
//                               disabled={request.donationStatus === 'done' || request.donationStatus === 'canceled'}
//                             >
//                               Cancel
//                             </button>
//                           </>
//                         )}

//                         {/* Edit Button (Admin only) */}
//                         {role === 'admin' && (request.donationStatus === 'pending' || request.donationStatus === 'inprogress') && (
//                           <Link
//                             to={`/dashboard/edit-donation-request/${request._id}`}
//                             className="btn btn-sm p-1 bg-blue-500 hover:bg-red-500 text-white rounded-md tooltip"
//                             data-tip="Edit Request"
//                           >
//                             <FaEdit />
//                           </Link>
//                         )}

//                         {/* Delete Button (Admin only) */}
//                         {role === 'admin' && (
//                           <button
//                             onClick={() => handleDelete(request._id)}
//                             className="btn btn-sm p-1 bg-red-500 hover:bg-red-500 text-white rounded-md tooltip"
//                             data-tip="Delete Request"
//                           >
//                             <FaTrash />
//                           </button>
//                         )}

//                         {/* View Details Button (All roles with access to this page) */}
//                         <Link
//                           to={`/donation-details/${request._id}`}
//                           className="btn btn-sm p-1 bg-gray-500 hover:bg-gray-600 text-white rounded-md tooltip"
//                           data-tip="View Details"
//                         >
//                           <FaEye />
//                         </Link>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="mt-6 flex justify-center">
//             <ReactPaginate
//               breakLabel="..."
//               nextLabel="Next >"
//               onPageChange={handlePageClick}
//               pageRangeDisplayed={5}
//               pageCount={pageCount}
//               previousLabel="< Previous"
//               renderOnZeroPageCount={null}
//               containerClassName="pagination flex space-x-2"
//               pageLinkClassName="px-3 py-2 border border-gray-300 rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-200"
//               previousLinkClassName="px-3 py-2 border border-gray-300 rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-200"
//               nextLinkClassName="px-3 py-2 border border-gray-300 rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-200"
//               activeLinkClassName="bg-red-500 text-white"
//               disabledClassName="opacity-50 cursor-not-allowed"
//             />
//           </div>
//         </>
//       ) : (
//         <div className="mt-8 text-center text-gray-500">
//           <p>No blood donation requests to display.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllBloodDonationRequests;


// src/pages/AllBloodDonationRequest.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import useRole from "../hooks/useRole"; // Import useRole

const AllBloodDonationRequests = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [role, isRoleLoading] = useRole(); // Get current user's role

  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  // Fetch all blood donation requests
  const { data: allRequests = [], isLoading, isError, error } = useQuery({
    queryKey: ['allBloodDonationRequests', filterStatus],
    // Only fetch if user is authenticated and role is loaded
    enabled: !authLoading && !isRoleLoading && !!user?.email && typeof user.getIdToken === 'function',
    queryFn: async () => {
      let url = `/all-blood-donation-requests`; // This endpoint is protected by verifyVolunteerOrAdmin
      const res = await axiosSecure.get(url);
      // Frontend filtering if backend doesn't support query param filtering for status
      if (filterStatus !== "all" && res.data) {
        return res.data.filter(request => request.donationStatus === filterStatus);
      }
      return res.data;
    },
    staleTime: 1000 * 60, // 1 minute stale time
    cacheTime: 1000 * 60 * 5, // 5 minutes cache time
    onError: (err) => {
      console.error("Error fetching all blood donation requests:", err);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to load all blood donation requests. Please try again.',
      });
    }
  });

  const pageCount = Math.ceil(allRequests.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = allRequests.slice(offset, offset + itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleStatusChange = async (id, newStatus) => {
    const capitalizedStatus = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
    Swal.fire({
      title: `Are you sure you want to mark this as ${capitalizedStatus}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${capitalizedStatus} it!`
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/update-donation-status/${id}`, { status: newStatus });
          if (res.data.modifiedCount > 0) {
            Swal.fire(
              `${capitalizedStatus}!`,
              `The donation request has been marked as ${newStatus}.`,
              'success'
            );
            queryClient.invalidateQueries(['allBloodDonationRequests', filterStatus]); // Invalidate to refetch
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
            queryClient.invalidateQueries(['allBloodDonationRequests', filterStatus]); // Invalidate to refetch
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

  if (authLoading || isLoading || isRoleLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-500">Error loading blood donation requests.</h2>
        <p className="text-black">Details: {error?.message || 'Unknown error'}</p>
        <p className="text-black mt-2">Please ensure you have appropriate permissions and try again.</p>
      </div>
    );
  }

  return (
    <div className="bg-base-200 p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-black">All Blood Donation Requests</h1>

      <div className="mb-6 flex items-center gap-4">
        <label htmlFor="statusFilter" className="text-black font-semibold">Filter by Status:</label>
        <select
          id="statusFilter"
          className="p-2 border border-red-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(0); // Reset pagination when filter changes
          }}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">Inprogress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {allRequests.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-red-200 rounded-lg">
              <thead>
                <tr className="bg-red-200 text-left text-black uppercase text-sm leading-normal">
                  <th className="py-3 px-6 border-b border-red-200">Recipient Name</th>
                  <th className="py-3 px-6 border-b border-red-200">Location</th>
                  <th className="py-3 px-6 border-b border-red-200">Date</th>
                  <th className="py-3 px-6 border-b border-red-200">Time</th>
                  <th className="py-3 px-6 border-b border-red-200">Blood Group</th>
                  <th className="py-3 px-6 border-b border-red-200">Status</th>
                  <th className="py-3 px-6 border-b border-red-200">Donor Info</th>
                  <th className="py-3 px-6 border-b border-red-200 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-black text-sm">
                {currentItems.map((request) => (
                  <tr key={request._id} className="border-b border-red-200 hover:bg-red-50">
                    <td className="py-3 px-6">{request.recipientName}</td>
                    <td className="py-3 px-6">{request.recipientDistrict}, {request.recipientUpazila}</td>
                    <td className="py-3 px-6">{request.donationDate}</td>
                    <td className="py-3 px-6">{request.donationTime}</td>
                    <td className="py-3 px-6 font-bold">{request.bloodGroup}</td>
                    <td className="py-3 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${request.donationStatus === 'canceled' ? 'bg-red-500 text-white' : 'bg-red-200 text-red-500'}
                      `}>
                        {request.donationStatus.charAt(0).toUpperCase() + request.donationStatus.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-6">
                      {request.donationStatus === 'inprogress' || request.donationStatus === 'done' ? (
                        <>
                          <div>{request.donorName}</div>
                          <div className="text-xs text-black">{request.donorEmail}</div>
                        </>
                      ) : (
                        <span>N/A</span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        {/* Status Change Buttons (Admin & Volunteer) */}
                        {(role === 'admin' || role === 'volunteer') && (request.donationStatus === 'inprogress' || request.donationStatus === 'pending') && (
                          <>
                            <button
                              onClick={() => handleStatusChange(request._id, 'done')}
                              className="btn btn-sm p-1 bg-blue-400 hover:bg-blue-600 text-white rounded-md tooltip"
                              data-tip="Mark as Done"
                              disabled={request.donationStatus === 'done' || request.donationStatus === 'canceled'}
                            >
                              Done
                            </button>
                            <button
                              onClick={() => handleStatusChange(request._id, 'canceled')}
                              className="btn btn-sm p-1 bg-red-500 hover:bg-red-600 text-white rounded-md tooltip"
                              data-tip="Mark as Canceled"
                              disabled={request.donationStatus === 'done' || request.donationStatus === 'canceled'}
                            >
                              Cancel
                            </button>
                          </>
                        )}

                        {/* Edit Button (Admin only) */}
                        {role === 'admin' && (request.donationStatus === 'pending' || request.donationStatus === 'inprogress') && (
                          <Link
                            to={`/dashboard/edit-donation-request/${request._id}`}
                            className="btn btn-sm p-1 bg-blue-400 hover:bg-red-600 text-white rounded-md tooltip"
                            data-tip="Edit Request"
                          >
                            <FaEdit />
                          </Link>
                        )}

                        {/* Delete Button (Admin only) */}
                        {role === 'admin' && (
                          <button
                            onClick={() => handleDelete(request._id)}
                            className="btn btn-sm p-1 bg-red-500 hover:bg-red-600 text-white rounded-md tooltip"
                            data-tip="Delete Request"
                          >
                            <FaTrash />
                          </button>
                        )}

                        {/* View Details Button (All roles with access to this page) */}
                        <Link
                          to={`/donation-details/${request._id}`}
                          className="btn btn-sm p-1 text-center items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-md tooltip"
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
              pageLinkClassName="px-3 py-2 border border-red-200 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-200"
              previousLinkClassName="px-3 py-2 border border-red-200 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-200"
              nextLinkClassName="px-3 py-2 border border-red-200 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-200"
              activeLinkClassName="bg-red-500 text-white"
              disabledClassName="opacity-50 cursor-not-allowed"
            />
          </div>
        </>
      ) : (
        <div className="mt-8 text-center text-black">
          <p>No blood donation requests to display.</p>
        </div>
      )}
    </div>
  );
};

export default AllBloodDonationRequests;
