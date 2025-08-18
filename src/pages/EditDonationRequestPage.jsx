// // // src/pages/EditDonationRequestPage.jsx
// // import { useContext, useState, useEffect } from "react";
// // import { useLoaderData, useNavigate } from "react-router-dom";
// // import { AuthContext } from "../providers/AuthProvider";
// // import useAxiosSecure from "../hooks/useAxiosSecure";
// // import { useForm } from "react-hook-form";
// // import Swal from 'sweetalert2';
// // import LoadingSpinner from "../components/LoadingSpinner";
// // import { districtsData, upazilasData } from "../data/bangladeshGeocode"; // Import geo data

// // const EditDonationRequestPage = () => {
// //   const donationRequest = useLoaderData(); // Data loaded from router loader
// //   const { user, loading: authLoading } = useContext(AuthContext);
// //   const axiosSecure = useAxiosSecure();
// //   const navigate = useNavigate();

// //   const { register, handleSubmit, reset, setValue, watch } = useForm();
// //   const currentDistrict = watch('recipientDistrict'); // Watch for changes in district dropdown

// //   const [availableUpazilas, setAvailableUpazilas] = useState([]);
// //   const [isUpdating, setIsUpdating] = useState(false);

// //   // Effect to populate form fields when donationRequest data is loaded
// //   useEffect(() => {
// //     if (donationRequest) {
// //       reset({
// //         requesterName: donationRequest.requesterName || '',
// //         requesterEmail: donationRequest.requesterEmail || '',
// //         recipientName: donationRequest.recipientName || '',
// //         recipientDistrict: donationRequest.recipientDistrict || '',
// //         recipientUpazila: donationRequest.recipientUpazila || '',
// //         hospitalName: donationRequest.hospitalName || '',
// //         fullAddressLine: donationRequest.fullAddressLine || '',
// //         bloodGroup: donationRequest.bloodGroup || '',
// //         donationDate: donationRequest.donationDate || '',
// //         donationTime: donationRequest.donationTime || '',
// //         requestMessage: donationRequest.requestMessage || '',
// //       });
// //       // Set initial upazilas based on the loaded request's district
// //       const initialDistrictObj = districtsData.find(d => d.name === donationRequest.recipientDistrict);
// //       if (initialDistrictObj && upazilasData[initialDistrictObj.id]) {
// //         setAvailableUpazilas(upazilasData[initialDistrictObj.id]);
// //       } else {
// //         setAvailableUpazilas([]);
// //       }
// //     }
// //   }, [donationRequest, reset]);

// //   // Effect to update available upazilas when currentDistrict (from form) changes
// //   useEffect(() => {
// //     if (currentDistrict) {
// //       const districtObj = districtsData.find(d => d.name === currentDistrict);
// //       if (districtObj) {
// //         const districtId = districtObj.id;
// //         if (upazilasData[districtId]) {
// //           setAvailableUpazilas(upazilasData[districtId]);
// //         } else {
// //           setAvailableUpazilas([]);
// //         }
// //       } else {
// //         setAvailableUpazilas([]);
// //       }
// //     } else {
// //       setAvailableUpazilas([]);
// //     }
// //     // Reset upazila selection when district changes, only if not initializing from donationRequest
// //     if (donationRequest && currentDistrict !== donationRequest.recipientDistrict) {
// //         setValue('recipientUpazila', '');
// //     } else if (!donationRequest) {
// //         setValue('recipientUpazila', '');
// //     }
// //   }, [currentDistrict, setValue, donationRequest]);


// //   const onSubmit = async (data) => {
// //     setIsUpdating(true);
// //     try {
// //       const res = await axiosSecure.patch(`/edit-donation-request/${donationRequest._id}`, data);
// //       if (res.data.modifiedCount > 0) {
// //         Swal.fire({
// //           icon: 'success',
// //           title: 'Request Updated!',
// //           text: 'Donation request has been successfully updated.',
// //         });
// //         navigate('/dashboard/my-donation-requests'); // Redirect after successful update
// //       } else {
// //         Swal.fire('Failed!', 'No changes detected or update failed.', 'info');
// //       }
// //     } catch (error) {
// //       console.error("Error updating donation request:", error);
// //       Swal.fire('Error!', error.response?.data?.message || 'Failed to update donation request.', 'error');
// //     } finally {
// //       setIsUpdating(false);
// //     }
// //   };

// //   if (authLoading) {
// //     return <LoadingSpinner />;
// //   }

// //   if (!donationRequest) {
// //     return (
// //       <div className="text-center py-10">
// //         <h2 className="text-2xl font-bold text-red-600">Donation Request Not Found!</h2>
// //         <p className="text-gray-600">The request you are trying to edit does not exist or you do not have permission.</p>
// //       </div>
// //     );
// //   }

// //   // Check if the logged-in user is the requester
// //   if (user?.email !== donationRequest.requesterEmail) {
// //     return (
// //       <div className="text-center py-10">
// //         <h2 className="text-2xl font-bold text-red-600">Access Denied!</h2>
// //         <p className="text-gray-600">You are not authorized to edit this donation request.</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto my-8">
// //       <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Edit Donation Request</h1>

// //       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
// //         {/* Requester Name (Read-only) */}
// //         <div>
// //           <label htmlFor="requesterName" className="block text-sm font-medium text-gray-700 mb-1">Requester Name</label>
// //           <input
// //             type="text"
// //             id="requesterName"
// //             {...register("requesterName")}
// //             readOnly
// //             className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
// //           />
// //         </div>

// //         {/* Requester Email (Read-only) */}
// //         <div>
// //           <label htmlFor="requesterEmail" className="block text-sm font-medium text-gray-700 mb-1">Requester Email</label>
// //           <input
// //             type="email"
// //             id="requesterEmail"
// //             {...register("requesterEmail")}
// //             readOnly
// //             className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
// //           />
// //         </div>

// //         {/* Recipient Name */}
// //         <div>
// //           <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-1">Recipient Name</label>
// //           <input
// //             type="text"
// //             id="recipientName"
// //             {...register("recipientName", { required: true })}
// //             placeholder="Enter Recipient Name"
// //             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           />
// //         </div>

// //         {/* Recipient District */}
// //         <div>
// //           <label htmlFor="recipientDistrict" className="block text-sm font-medium text-gray-700 mb-1">Recipient District</label>
// //           <select
// //             id="recipientDistrict"
// //             {...register("recipientDistrict", { required: true })}
// //             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           >
// //             <option value="">Select District</option>
// //             {districtsData.map((d) => (
// //               <option key={d.id} value={d.name}>{d.name}</option>
// //             ))}
// //           </select>
// //         </div>

// //         {/* Recipient Upazila */}
// //         <div>
// //           <label htmlFor="recipientUpazila" className="block text-sm font-medium text-gray-700 mb-1">Recipient Upazila</label>
// //           <select
// //             id="recipientUpazila"
// //             {...register("recipientUpazila", { required: true })}
// //             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             disabled={!currentDistrict}
// //           >
// //             <option value="">Select Upazila</option>
// //             {availableUpazilas.map((u, index) => (
// //               <option key={index} value={u}>{u}</option>
// //             ))}
// //           </select>
// //         </div>

// //         {/* Hospital Name */}
// //         <div>
// //           <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700 mb-1">Hospital Name</label>
// //           <input
// //             type="text"
// //             id="hospitalName"
// //             {...register("hospitalName", { required: true })}
// //             placeholder="Enter Hospital Name"
// //             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           />
// //         </div>

// //         {/* Full Address Line */}
// //         <div>
// //           <label htmlFor="fullAddressLine" className="block text-sm font-medium text-gray-700 mb-1">Full Address Line</label>
// //           <input
// //             type="text"
// //             id="fullAddressLine"
// //             {...register("fullAddressLine", { required: true })}
// //             placeholder="Enter Full Address Line"
// //             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           />
// //         </div>

// //         {/* Blood Group */}
// //         <div>
// //           <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
// //           <select
// //             id="bloodGroup"
// //             {...register("bloodGroup", { required: true })}
// //             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           >
// //             <option value="">Select Blood Group</option>
// //             <option value="A+">A+</option>
// //             <option value="A-">A-</option>
// //             <option value="B+">B+</option>
// //             <option value="B-">B-</option>
// //             <option value="AB+">AB+</option>
// //             <option value="AB-">AB-</option>
// //             <option value="O+">O+</option>
// //             <option value="O-">O-</option>
// //           </select>
// //         </div>

// //         {/* Donation Date */}
// //         <div>
// //           <label htmlFor="donationDate" className="block text-sm font-medium text-gray-700 mb-1">Donation Date</label>
// //           <input
// //             type="date"
// //             id="donationDate"
// //             {...register("donationDate", { required: true })}
// //             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           />
// //         </div>

// //         {/* Donation Time */}
// //         <div>
// //           <label htmlFor="donationTime" className="block text-sm font-medium text-gray-700 mb-1">Donation Time</label>
// //           <input
// //             type="time"
// //             id="donationTime"
// //             {...register("donationTime", { required: true })}
// //             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           />
// //         </div>

// //         {/* Request Message */}
// //         <div>
// //           <label htmlFor="requestMessage" className="block text-sm font-medium text-gray-700 mb-1">Request Message</label>
// //           <textarea
// //             id="requestMessage"
// //             {...register("requestMessage", { required: true })}
// //             rows="4"
// //             placeholder="Enter detailed reason for blood request"
// //             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           ></textarea>
// //         </div>

// //         {/* Update Button */}
// //         <button
// //           type="submit"
// //           className="btn bg-red-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-200 shadow-lg flex items-center justify-center"
// //           disabled={isUpdating}
// //         >
// //           {isUpdating ? (
// //             <>
// //               <span className="loading loading-spinner loading-sm mr-2"></span> Updating...
// //             </>
// //           ) : (
// //             "Update Donation Request"
// //           )}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default EditDonationRequestPage;

// // src/pages/EditDonationRequestPage.jsx
// import React, { useContext, useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useLoaderData, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../providers/AuthProvider';
// import useAxiosSecure from '../hooks/useAxiosSecure';
// import Swal from 'sweetalert2';
// // Keep direct import of data objects
// import { districtsData, upazilasData } from "../data/bangladeshGeocode";
// import LoadingSpinner from '../components/LoadingSpinner';

// const EditDonationRequestPage = () => {
//   const donationRequest = useLoaderData();
//   const { user, loading: authLoading } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();
//   const { register, handleSubmit, watch, setValue, reset } = useForm();

//   const currentDistrict = watch('recipientDistrict');
//   const [availableUpazilas, setAvailableUpazilas] = useState([]);
//   const [isUpdating, setIsUpdating] = useState(false);

//   // Create shallow copies of the imported data to avoid mutation issues during build
//   const mutableDistrictsData = [...districtsData];
//   const mutableUpazilasData = { ...upazilasData };

//   // Set form default values from loaded data
//   useEffect(() => {
//     if (donationRequest) {
//       reset({
//         requesterName: donationRequest.requesterName || '',
//         requesterEmail: donationRequest.requesterEmail || '',
//         recipientName: donationRequest.recipientName || '',
//         recipientDistrict: donationRequest.recipientDistrict || '',
//         recipientUpazila: donationRequest.recipientUpazila || '',
//         hospitalName: donationRequest.hospitalName || '',
//         fullAddressLine: donationRequest.fullAddressLine || '',
//         bloodGroup: donationRequest.bloodGroup || '',
//         donationDate: donationRequest.donationDate || '',
//         donationTime: donationRequest.donationTime || '',
//         requestMessage: donationRequest.requestMessage || '',
//       });

//       const fetchedDistrictObj = mutableDistrictsData.find(d => d.name === donationRequest.recipientDistrict);
//       if (fetchedDistrictObj && mutableUpazilasData[fetchedDistrictObj.id]) {
//         setAvailableUpazilas(mutableUpazilasData[fetchedDistrictObj.id]);
//       }
//     }
//   }, [donationRequest, reset, mutableDistrictsData, mutableUpazilasData]);


//   // Effect to update available upazilas when currentDistrict changes
//   useEffect(() => {
//     if (currentDistrict) {
//       const districtObj = mutableDistrictsData.find(d => d.name === currentDistrict);
//       if (districtObj) {
//         const districtId = districtObj.id;
//         if (mutableUpazilasData[districtId]) {
//           setAvailableUpazilas(mutableUpazilasData[districtId]);
//         } else {
//           setAvailableUpazilas([]);
//         }
//       } else {
//         setAvailableUpazilas([]);
//       }
//     } else {
//       setAvailableUpazilas([]);
//     }
//     if (currentDistrict !== donationRequest?.recipientDistrict) {
//         setValue('recipientUpazila', '');
//     }
//   }, [currentDistrict, setValue, mutableDistrictsData, mutableUpazilasData, donationRequest]);


//   const onSubmit = async (data) => {
//     setIsUpdating(true);
//     try {
//       const updatedData = {
//         recipientName: data.recipientName,
//         recipientDistrict: data.recipientDistrict,
//         recipientUpazila: data.recipientUpazila,
//         hospitalName: data.hospitalName,
//         fullAddressLine: data.fullAddressLine,
//         bloodGroup: data.bloodGroup,
//         donationDate: data.donationDate,
//         donationTime: data.donationTime,
//         requestMessage: data.requestMessage,
//       };

//       const res = await axiosSecure.patch(`/edit-donation-request/${donationRequest._id}`, updatedData);
//       if (res.data.modifiedCount > 0) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Request Updated!',
//           text: 'Donation request has been successfully updated.',
//         });
//         navigate('/dashboard/my-donation-requests');
//       } else {
//         Swal.fire('No Changes!', 'No new changes to save.', 'info');
//       }
//     } catch (error) {
//       console.error("Error updating donation request:", error);
//       Swal.fire('Error!', error.response?.data?.message || 'Failed to update donation request.', 'error');
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   if (authLoading) {
//     return <LoadingSpinner />;
//   }

//   if (!donationRequest) {
//     return (
//       <div className="text-center py-10">
//         <h2 className="text-2xl font-bold text-red-600">Donation Request Not Found!</h2>
//         <p className="text-gray-600">The request you are trying to edit does not exist or you do not have permission.</p>
//       </div>
//     );
//   }

//   if (user?.email !== donationRequest.requesterEmail && user?.role !== 'admin') {
//     return (
//       <div className="text-center py-10">
//         <h2 className="text-2xl font-bold text-red-600">Access Denied!</h2>
//         <p className="text-gray-600">You are not authorized to edit this donation request.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto my-8">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Edit Donation Request</h1>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* Requester Name (Read-only) */}
//         <div>
//           <label htmlFor="requesterName" className="block text-sm font-medium text-gray-700 mb-1">Requester Name</label>
//           <input
//             type="text"
//             id="requesterName"
//             {...register("requesterName")}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
//             readOnly
//           />
//         </div>

//         {/* Requester Email (Read-only) */}
//         <div>
//           <label htmlFor="requesterEmail" className="block text-sm font-medium text-gray-700 mb-1">Requester Email</label>
//           <input
//             type="email"
//             id="requesterEmail"
//             {...register("requesterEmail")}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
//             readOnly
//           />
//         </div>

//         {/* Recipient Name */}
//         <div>
//           <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-1">Recipient Name</label>
//           <input
//             type="text"
//             id="recipientName"
//             {...register("recipientName", { required: true })}
//             placeholder="Enter recipient's name"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Recipient District */}
//         <div>
//           <label htmlFor="recipientDistrict" className="block text-sm font-medium text-gray-700 mb-1">Recipient District</label>
//           <select
//             id="recipientDistrict"
//             {...register("recipientDistrict", { required: true })}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Select District</option>
//             {mutableDistrictsData.map((d) => (
//               <option key={d.id} value={d.name}>{d.name}</option>
//             ))}
//           </select>
//         </div>

//         {/* Recipient Upazila */}
//         <div>
//           <label htmlFor="recipientUpazila" className="block text-sm font-medium text-gray-700 mb-1">Recipient Upazila</label>
//           <select
//             id="recipientUpazila"
//             {...register("recipientUpazila", { required: true })}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             disabled={!currentDistrict}
//           >
//             <option value="">Select Upazila</option>
//             {availableUpazilas.map((u, index) => (
//               <option key={index} value={u}>{u}</option>
//             ))}
//           </select>
//         </div>

//         {/* Hospital Name */}
//         <div>
//           <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700 mb-1">Hospital Name</label>
//           <input
//             type="text"
//             id="hospitalName"
//             {...register("hospitalName", { required: true })}
//             placeholder="e.g., Dhaka Medical College Hospital"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Full Address Line */}
//         <div>
//           <label htmlFor="fullAddressLine" className="block text-sm font-medium text-gray-700 mb-1">Full Address Line</label>
//           <input
//             type="text"
//             id="fullAddressLine"
//             {...register("fullAddressLine", { required: true })}
//             placeholder="e.g., Zahir Raihan Rd, Dhaka"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Blood Group */}
//         <div>
//           <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
//           <select
//             id="bloodGroup"
//             {...register("bloodGroup", { required: true })}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Select Blood Group</option>
//             <option value="A+">A+</option>
//             <option value="A-">A-</option>
//             <option value="B+">B+</option>
//             <option value="B-">B-</option>
//             <option value="AB+">AB+</option>
//             <option value="AB-">AB-</option>
//             <option value="O+">O+</option>
//             <option value="O-">O-</option>
//           </select>
//         </div>

//         {/* Donation Date */}
//         <div>
//           <label htmlFor="donationDate" className="block text-sm font-medium text-gray-700 mb-1">Donation Date</label>
//           <input
//             type="date"
//             id="donationDate"
//             {...register("donationDate", { required: true })}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Donation Time */}
//         <div>
//           <label htmlFor="donationTime" className="block text-sm font-medium text-gray-700 mb-1">Donation Time</label>
//           <input
//             type="time"
//             id="donationTime"
//             {...register("donationTime", { required: true })}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Request Message */}
//         <div>
//           <label htmlFor="requestMessage" className="block text-sm font-medium text-gray-700 mb-1">Request Message (Optional)</label>
//           <textarea
//             id="requestMessage"
//             {...register("requestMessage")}
//             rows="4"
//             placeholder="Provide any additional details about the request..."
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           ></textarea>
//         </div>

//         {/* Update Button */}
//         <button
//           type="submit"
//           className="btn bg-red-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-200 shadow-lg flex items-center justify-center w-full"
//           disabled={isUpdating}
//         >
//           {isUpdating ? (
//             <>
//               <span className="loading loading-spinner loading-sm mr-2"></span> Updating Request...
//             </>
//           ) : (
//             "Update Request"
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditDonationRequestPage;

// src/pages/EditDonationRequestPage.jsx
import React, { useContext, useEffect, useState, useMemo } from 'react'; // Added useMemo
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { districtsData, upazilasData } from "../data/bangladeshGeocode"; // Direct import
import LoadingSpinner from '../components/LoadingSpinner';
import { useQueryClient } from '@tanstack/react-query';

const EditDonationRequestPage = () => {
  const donationRequest = useLoaderData();
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, reset } = useForm();
  const queryClient = useQueryClient();

  const currentDistrict = watch('recipientDistrict');
  const [availableUpazilas, setAvailableUpazilas] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  // Memoize the mutable copies of the data
  const memoizedDistrictsData = useMemo(() => [...districtsData], [districtsData]);
  const memoizedUpazilasData = useMemo(() => ({ ...upazilasData }), [upazilasData]);

  // Set form default values from loaded data
  useEffect(() => {
    if (donationRequest) {
      reset({
        requesterName: donationRequest.requesterName || '',
        requesterEmail: donationRequest.requesterEmail || '',
        recipientName: donationRequest.recipientName || '',
        recipientDistrict: donationRequest.recipientDistrict || '',
        recipientUpazila: donationRequest.recipientUpazila || '',
        hospitalName: donationRequest.hospitalName || '',
        fullAddressLine: donationRequest.fullAddressLine || '',
        bloodGroup: donationRequest.bloodGroup || '',
        donationDate: donationRequest.donationDate || '',
        donationTime: donationRequest.donationTime || '',
        requestMessage: donationRequest.requestMessage || '',
      });

      const fetchedDistrictObj = memoizedDistrictsData.find(d => d.name === donationRequest.recipientDistrict);
      if (fetchedDistrictObj && memoizedUpazilasData[fetchedDistrictObj.id]) {
        setAvailableUpazilas(memoizedUpazilasData[fetchedDistrictObj.id]);
      }
    }
  }, [donationRequest, reset, memoizedDistrictsData, memoizedUpazilasData]); // Use memoized data in dependencies


  // Effect to update available upazilas when currentDistrict changes
  useEffect(() => {
    if (currentDistrict) {
      const districtObj = memoizedDistrictsData.find(d => d.name === currentDistrict);
      if (districtObj) {
        const districtId = districtObj.id;
        if (memoizedUpazilasData[districtId]) {
          setAvailableUpazilas(memoizedUpazilasData[districtId]);
        } else {
          setAvailableUpazilas([]);
        }
      } else {
        setAvailableUpazilas([]);
      }
    } else {
      setAvailableUpazilas([]);
    }
    if (currentDistrict !== donationRequest?.recipientDistrict) {
        setValue('recipientUpazila', '');
    }
  }, [currentDistrict, setValue, memoizedDistrictsData, memoizedUpazilasData, donationRequest]); // Use memoized data in dependencies


  const onSubmit = async (data) => {
    setIsUpdating(true);
    try {
      const updatedData = {
        recipientName: data.recipientName,
        recipientDistrict: data.recipientDistrict,
        recipientUpazila: data.recipientUpazila,
        hospitalName: data.hospitalName,
        fullAddressLine: data.fullAddressLine,
        bloodGroup: data.bloodGroup,
        donationDate: data.donationDate,
        donationTime: data.donationTime,
        requestMessage: data.requestMessage,
      };

      const res = await axiosSecure.patch(`/edit-donation-request/${donationRequest._id}`, updatedData);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Request Updated!',
          text: 'Donation request has been successfully updated.',
        });
        queryClient.invalidateQueries({ queryKey: ['userRole', user?.email] });
        queryClient.invalidateQueries({ queryKey: ['myDonationRequests', user?.email] });
        queryClient.invalidateQueries({ queryKey: ['allBloodDonationRequests'] });
        navigate('/dashboard/my-donation-requests');
      } else {
        Swal.fire('No Changes!', 'No new changes to save.', 'info');
      }
    } catch (error) {
      console.error("Error updating donation request:", error);
      Swal.fire('Error!', error.response?.data?.message || 'Failed to update donation request.', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  if (authLoading) {
    return <LoadingSpinner />;
  }

  if (!donationRequest) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">Donation Request Not Found!</h2>
        <p className="text-gray-600">The request you are trying to edit does not exist or you do not have permission.</p>
      </div>
    );
  }

  if (user?.email !== donationRequest.requesterEmail && user?.role !== 'admin') {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">Access Denied!</h2>
        <p className="text-gray-600">You are not authorized to edit this donation request.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto my-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Edit Donation Request</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Requester Name (Read-only) */}
        <div>
          <label htmlFor="requesterName" className="block text-sm font-medium text-gray-700 mb-1">Requester Name</label>
          <input
            type="text"
            id="requesterName"
            {...register("requesterName")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            readOnly
          />
        </div>

        {/* Requester Email (Read-only) */}
        <div>
          <label htmlFor="requesterEmail" className="block text-sm font-medium text-gray-700 mb-1">Requester Email</label>
          <input
            type="email"
            id="requesterEmail"
            {...register("requesterEmail")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            readOnly
          />
        </div>

        {/* Recipient Name */}
        <div>
          <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-1">Recipient Name</label>
          <input
            type="text"
            id="recipientName"
            {...register("recipientName", { required: true })}
            placeholder="Enter recipient's name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Recipient District */}
        <div>
          <label htmlFor="recipientDistrict" className="block text-sm font-medium text-gray-700 mb-1">Recipient District</label>
          <select
            id="recipientDistrict"
            {...register("recipientDistrict", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select District</option>
            {memoizedDistrictsData.map((d) => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* Recipient Upazila */}
        <div>
          <label htmlFor="recipientUpazila" className="block text-sm font-medium text-gray-700 mb-1">Recipient Upazila</label>
          <select
            id="recipientUpazila"
            {...register("recipientUpazila", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!currentDistrict}
          >
            <option value="">Select Upazila</option>
            {availableUpazilas.map((u, index) => (
              <option key={index} value={u}>{u}</option>
            ))}
          </select>
        </div>

        {/* Hospital Name */}
        <div>
          <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700 mb-1">Hospital Name</label>
          <input
            type="text"
            id="hospitalName"
            {...register("hospitalName", { required: true })}
            placeholder="e.g., Dhaka Medical College Hospital"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Full Address Line */}
        <div>
          <label htmlFor="fullAddressLine" className="block text-sm font-medium text-gray-700 mb-1">Full Address Line</label>
          <input
            type="text"
            id="fullAddressLine"
            {...register("fullAddressLine", { required: true })}
            placeholder="e.g., Zahir Raihan Rd, Dhaka"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Blood Group */}
        <div>
          <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
          <select
            id="bloodGroup"
            {...register("bloodGroup", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        {/* Donation Date */}
        <div>
          <label htmlFor="donationDate" className="block text-sm font-medium text-gray-700 mb-1">Donation Date</label>
          <input
            type="date"
            id="donationDate"
            {...register("donationDate", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Donation Time */}
        <div>
          <label htmlFor="donationTime" className="block text-sm font-medium text-gray-700 mb-1">Donation Time</label>
          <input
            type="time"
            id="donationTime"
            {...register("donationTime", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Request Message */}
        <div>
          <label htmlFor="requestMessage" className="block text-sm font-medium text-gray-700 mb-1">Request Message (Optional)</label>
          <textarea
            id="requestMessage"
            {...register("requestMessage")}
            rows="4"
            placeholder="Provide any additional details about the request..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Update Button */}
        <button
          type="submit"
          className="btn bg-red-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-200 shadow-lg flex items-center justify-center w-full"
          disabled={isUpdating}
        >
          {isUpdating ? (
            <>
              <span className="loading loading-spinner loading-sm mr-2"></span> Updating Request...
            </>
          ) : (
            "Update Request"
          )}
        </button>
      </form>
    </div>
  );
};

export default EditDonationRequestPage;
