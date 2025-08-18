
// // // src/pages/UserProfilePage.jsx
// // import { useContext, useState, useEffect } from "react";
// // import { AuthContext } from "../providers/AuthProvider";
// // import useAxiosSecure from "../hooks/useAxiosSecure";
// // import { useQuery, useQueryClient } from "@tanstack/react-query";
// // import { useForm } from "react-hook-form";
// // import Swal from 'sweetalert2';
// // import LoadingSpinner from "../components/LoadingSpinner";
// // import { districtsData, upazilasData } from "../data/bangladeshGeocode"; // Import geo data
// // import { FaEdit, FaSave, FaUser, FaEnvelope, FaTint, FaMapMarkerAlt } from 'react-icons/fa';

// // const UserProfilePage = () => {
// //   const { user, loading: authLoading, updateUser: updateFirebaseProfile } = useContext(AuthContext);
// //   const axiosSecure = useAxiosSecure();
// //   const queryClient = useQueryClient();

// //   const [isEditing, setIsEditing] = useState(false);
// //   const [isUpdating, setIsUpdating] = useState(false);

// //   const { register, handleSubmit, reset, setValue, watch } = useForm();
// //   const currentDistrict = watch('district'); // Watch for changes in district dropdown

// //   const [availableUpazilas, setAvailableUpazilas] = useState([]);

// //   // Fetch user profile data from backend
// //   const { data: userProfile = {}, isLoading: isProfileLoading, isError: isProfileError, error: profileError } = useQuery({
// //     queryKey: ['userProfile', user?.email],
// //     enabled: !authLoading && !!user?.email && typeof user.getIdToken === 'function',
// //     queryFn: async () => {
// //       const res = await axiosSecure.get(`/user-profile`);
// //       return res.data;
// //     },
// //     staleTime: 1000 * 60 * 5, // Data considered fresh for 5 minutes
// //     cacheTime: 1000 * 60 * 30, // Cache data for 30 minutes
// //     onError: (err) => {
// //       console.error("Error fetching user profile:", err);
// //       Swal.fire({
// //         icon: 'error',
// //         title: 'Error!',
// //         text: 'Failed to load user profile. Please try again.',
// //       });
// //     }
// //   });

// //   // Effect to populate form fields when userProfile data is loaded
// //   useEffect(() => {
// //     if (userProfile) {
// //       reset({
// //         name: userProfile.name || '',
// //         avatar: userProfile.avatar || '',
// //         email: userProfile.email || '', // Email is read-only
// //         bloodGroup: userProfile.bloodGroup || '',
// //         district: userProfile.district || '',
// //         upazila: userProfile.upazila || '',
// //       });
// //       // Set initial upazilas based on the loaded profile's district
// //       const initialDistrictObj = districtsData.find(d => d.name === userProfile.district);
// //       if (initialDistrictObj && upazilasData[initialDistrictObj.id]) {
// //         setAvailableUpazilas(upazilasData[initialDistrictObj.id]);
// //       } else {
// //         setAvailableUpazilas([]);
// //       }
// //     }
// //   }, [userProfile, reset]);

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
// //     // Reset upazila selection when district changes, only if not initializing from userProfile
// //     if (userProfile && currentDistrict !== userProfile.district) {
// //         setValue('upazila', '');
// //     } else if (!userProfile) {
// //         setValue('upazila', '');
// //     }
// //   }, [currentDistrict, setValue, userProfile]);


// //   const handleEditToggle = () => {
// //     setIsEditing(!isEditing);
// //   };

// //   const onSubmit = async (data) => {
// //     setIsUpdating(true);
// //     try {
// //       // Update Firebase profile (displayName and photoURL)
// //       await updateFirebaseProfile({ displayName: data.name, photoURL: data.avatar });

// //       // Update backend profile data
// //       const res = await axiosSecure.patch(`/update-user-profile`, {
// //         name: data.name,
// //         avatar: data.avatar,
// //         bloodGroup: data.bloodGroup,
// //         district: data.district,
// //         upazila: data.upazila,
// //       });

// //       if (res.data.modifiedCount > 0) {
// //         Swal.fire({
// //           icon: 'success',
// //           title: 'Profile Updated!',
// //           text: 'Your profile has been successfully updated.',
// //         });
// //         queryClient.invalidateQueries(['userProfile', user?.email]); // Invalidate to refetch latest data
// //         setIsEditing(false); // Exit editing mode
// //       } else {
// //         Swal.fire('Info', 'No changes detected or update failed.', 'info');
// //         setIsEditing(false); // Exit editing mode even if no changes
// //       }
// //     } catch (error) {
// //       console.error("Error updating profile:", error);
// //       Swal.fire('Error!', error.response?.data?.message || 'Failed to update profile.', 'error');
// //     } finally {
// //       setIsUpdating(false);
// //     }
// //   };

// //   if (authLoading || isProfileLoading) {
// //     return <LoadingSpinner />;
// //   }

// //   if (isProfileError) {
// //     return (
// //       <div className="text-center py-10">
// //         <h2 className="text-2xl font-bold text-red-600">Error: {profileError?.message || 'Failed to load profile data.'}</h2>
// //         <p className="text-gray-600">Please try refreshing the page or logging in again.</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto my-8">
// //       <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">My Profile</h1>

// //       <div className="flex justify-center mb-8">
// //         <img
// //           src={userProfile.avatar || "https://placehold.co/100x100/cccccc/ffffff?text=User"}
// //           alt="User Avatar"
// //           className="w-24 h-24 rounded-full object-cover border-4 border-blue-400 shadow-md"
// //         />
// //       </div>

// //       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
// //         {/* Edit/Save Button */}
// //         <div className="text-right mb-4">
// //           {!isEditing ? (
// //             <button
// //               type="button"
// //               onClick={handleEditToggle}
// //               className="btn bg-blue-500 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 ml-auto"
// //             >
// //               <FaEdit /> Edit Profile
// //             </button>
// //           ) : (
// //             <button
// //               type="submit"
// //               className="btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 ml-auto"
// //               disabled={isUpdating}
// //             >
// //               {isUpdating ? (
// //                 <>
// //                   <span className="loading loading-spinner loading-sm mr-2"></span> Saving...
// //                 </>
// //               ) : (
// //                 <>
// //                   <FaSave /> Save Changes
// //                 </>
// //               )}
// //             </button>
// //           )}
// //         </div>

// //         {/* Name */}
// //         <div>
// //           <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><FaUser className="text-gray-500" /> Name</label>
// //           <input
// //             type="text"
// //             id="name"
// //             {...register("name", { required: true })}
// //             readOnly={!isEditing}
// //             className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${isEditing ? 'bg-white focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-100 cursor-not-allowed'}`}
// //           />
// //         </div>

// //         {/* Avatar Image URL */}
// //         <div>
// //           <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><FaUser className="text-gray-500" /> Avatar URL</label>
// //           <input
// //             type="text"
// //             id="avatar"
// //             {...register("avatar")}
// //             readOnly={!isEditing}
// //             placeholder="Enter Image URL"
// //             className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${isEditing ? 'bg-white focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-100 cursor-not-allowed'}`}
// //           />
// //         </div>

// //         {/* Email (Read-only) */}
// //         <div>
// //           <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><FaEnvelope className="text-gray-500" /> Email</label>
// //           <input
// //             type="email"
// //             id="email"
// //             {...register("email")}
// //             readOnly // Email is never editable
// //             className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
// //           />
// //         </div>

// //         {/* Blood Group */}
// //         <div>
// //           <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><FaTint className="text-red-500" /> Blood Group</label>
// //           <select
// //             id="bloodGroup"
// //             {...register("bloodGroup", { required: true })}
// //             readOnly={!isEditing}
// //             disabled={!isEditing}
// //             className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${isEditing ? 'bg-white focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-100 cursor-not-allowed'}`}
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

// //         {/* District */}
// //         <div>
// //           <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><FaMapMarkerAlt className="text-gray-500" /> District</label>
// //           <select
// //             id="district"
// //             {...register("district", { required: true })}
// //             readOnly={!isEditing}
// //             disabled={!isEditing}
// //             className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${isEditing ? 'bg-white focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-100 cursor-not-allowed'}`}
// //           >
// //             <option value="">Select District</option>
// //             {districtsData.map((d) => (
// //               <option key={d.id} value={d.name}>{d.name}</option>
// //             ))}
// //           </select>
// //         </div>

// //         {/* Upazila */}
// //         <div>
// //           <label htmlFor="upazila" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><FaMapMarkerAlt className="text-gray-500" /> Upazila</label>
// //           <select
// //             id="upazila"
// //             {...register("upazila", { required: true })}
// //             readOnly={!isEditing}
// //             disabled={!isEditing || !currentDistrict} // Disable if not editing or no district selected
// //             className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${isEditing ? 'bg-white focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-100 cursor-not-allowed'}`}
// //           >
// //             <option value="">Select Upazila</option>
// //             {availableUpazilas.map((u, index) => (
// //               <option key={index} value={u}>{u}</option>
// //             ))}
// //           </select>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default UserProfilePage;

// // src/pages/UserProfilePage.jsx
// import React, { useContext, useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { AuthContext } from '../providers/AuthProvider';
// import useAxiosSecure from '../hooks/useAxiosSecure';
// import Swal from 'sweetalert2';
// // Keep direct import of data objects
// import { districtsData, upazilasData } from "../data/bangladeshGeocode";
// import LoadingSpinner from '../components/LoadingSpinner';

// const UserProfilePage = () => {
//   const { user, loading: authLoading } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const { register, handleSubmit, watch, setValue, reset } = useForm();

//   const [isEditing, setIsEditing] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [dataLoading, setDataLoading] = useState(true);
//   const [dataError, setDataError] = useState(null);

//   const currentDistrict = watch('district');
//   const [availableUpazilas, setAvailableUpazilas] = useState([]);

//   // Create shallow copies of the imported data to avoid mutation issues during build
//   const mutableDistrictsData = [...districtsData];
//   const mutableUpazilasData = { ...upazilasData };

//   // Fetch user data on component mount
//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (user?.email) {
//         try {
//           setDataLoading(true);
//           const res = await axiosSecure.get('/user-profile');
//           setUserData(res.data);
//           reset(res.data); // Set form default values
//           // Also set the initial upazilas based on fetched district
//           const fetchedDistrictObj = mutableDistrictsData.find(d => d.name === res.data.district);
//           if (fetchedDistrictObj && mutableUpazilasData[fetchedDistrictObj.id]) {
//             setAvailableUpazilas(mutableUpazilasData[fetchedDistrictObj.id]);
//           }
//         } catch (err) {
//           console.error("Error fetching user profile:", err);
//           setDataError(err.response?.data?.message || "Failed to load profile data.");
//           Swal.fire({
//             icon: 'error',
//             title: 'Error!',
//             text: err.response?.data?.message || 'Failed to load profile data. Please try again.',
//           });
//         } finally {
//           setDataLoading(false);
//         }
//       } else {
//         setDataLoading(false);
//       }
//     };
//     fetchUserData();
//   }, [user, axiosSecure, reset, mutableDistrictsData, mutableUpazilasData]); // Added dependencies

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
//     if (isEditing) {
//       setValue('upazila', '');
//     }
//   }, [currentDistrict, setValue, isEditing, mutableDistrictsData, mutableUpazilasData]);


//   const handleEditToggle = () => {
//     setIsEditing(!isEditing);
//   };

//   const onSubmit = async (data) => {
//     try {
//       const updatedData = {
//         name: data.name,
//         avatar: data.avatar,
//         bloodGroup: data.bloodGroup,
//         district: data.district,
//         upazila: data.upazila,
//       };
//       const res = await axiosSecure.patch('/update-user-profile', updatedData);
//       if (res.data.modifiedCount > 0) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Profile Updated!',
//           text: 'Your profile information has been successfully updated.',
//         });
//         setUserData(prev => ({ ...prev, ...updatedData }));
//         setIsEditing(false);
//       } else {
//         Swal.fire('No Changes!', 'No new changes to save.', 'info');
//         setIsEditing(false);
//       }
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       Swal.fire({
//         icon: 'error',
//         title: 'Update Failed!',
//         text: err.response?.data?.message || 'Failed to update profile. Please try again.',
//       });
//     }
//   };

//   if (authLoading || dataLoading) {
//     return <LoadingSpinner />;
//   }

//   if (dataError) {
//     return (
//       <div className="text-center py-10">
//         <h2 className="text-2xl font-bold text-red-600">Error: {dataError}</h2>
//         <p className="text-gray-600">Please try again later.</p>
//       </div>
//     );
//   }

//   if (!userData) {
//     return (
//       <div className="text-center py-10">
//         <h2 className="text-2xl font-bold text-gray-700">No user data found.</h2>
//         <p className="text-gray-500">Please ensure you are logged in.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto my-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
//         <button
//           onClick={handleEditToggle}
//           className="btn bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 shadow-lg"
//         >
//           {isEditing ? 'Cancel Edit' : 'Edit Profile'}
//         </button>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <div className="flex flex-col items-center mb-6">
//           <img
//             src={userData.avatar || "https://placehold.co/100x100/cccccc/ffffff?text=User"}
//             alt="User Avatar"
//             className="w-24 h-24 rounded-full object-cover border-4 border-blue-300 shadow-md mb-4"
//           />
//           <span className="text-xl font-semibold text-gray-800">{userData.name || 'N/A'}</span>
//           <span className="text-gray-600">{userData.email}</span>
//         </div>

//         {/* Name */}
//         <div>
//           <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//           <input
//             type="text"
//             id="name"
//             {...register("name", { required: true })}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             readOnly={!isEditing}
//           />
//         </div>

//         {/* Avatar URL */}
//         <div>
//           <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
//           <input
//             type="text"
//             id="avatar"
//             {...register("avatar")}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter ImageBB URL"
//             readOnly={!isEditing}
//           />
//         </div>

//         {/* Email (Read-only) */}
//         <div>
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={userData.email || ''}
//             readOnly
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
//           />
//         </div>

//         {/* Blood Group */}
//         <div>
//           <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
//           <select
//             id="bloodGroup"
//             {...register("bloodGroup")}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             disabled={!isEditing}
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

//         {/* District */}
//         <div>
//           <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">District</label>
//           <select
//             id="district"
//             {...register("district")}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             disabled={!isEditing}
//           >
//             <option value="">Select District</option>
//             {mutableDistrictsData.map((d) => (
//               <option key={d.id} value={d.name}>{d.name}</option>
//             ))}
//           </select>
//         </div>

//         {/* Upazila */}
//         <div>
//           <label htmlFor="upazila" className="block text-sm font-medium text-gray-700 mb-1">Upazila</label>
//           <select
//             id="upazila"
//             {...register("upazila")}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             disabled={!isEditing || !currentDistrict}
//           >
//             <option value="">Select Upazila</option>
//             {availableUpazilas.map((u, index) => (
//               <option key={index} value={u}>{u}</option>
//             ))}
//           </select>
//         </div>

//         {isEditing && (
//           <button
//             type="submit"
//             className="btn bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-200 shadow-lg w-full"
//           >
//             Save Changes
//           </button>
//         )}
//       </form>
//     </div>
//   );
// };

// export default UserProfilePage;
// src/pages/UserProfilePage.jsx
import React, { useContext, useEffect, useState, useMemo } from 'react'; // Added useMemo
import { useForm } from 'react-hook-form';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { districtsData, upazilasData } from "../data/bangladeshGeocode";
import LoadingSpinner from '../components/LoadingSpinner';

const UserProfilePage = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, watch, setValue, reset } = useForm();

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState(null);

  const currentDistrict = watch('district');
  const [availableUpazilas, setAvailableUpazilas] = useState([]);

  // Memoize the mutable copies of the data
  const memoizedDistrictsData = useMemo(() => [...districtsData], [districtsData]);
  const memoizedUpazilasData = useMemo(() => ({ ...upazilasData }), [upazilasData]);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.email) {
        try {
          setDataLoading(true);
          const res = await axiosSecure.get('/user-profile');
          setUserData(res.data);
          reset(res.data);
          const fetchedDistrictObj = memoizedDistrictsData.find(d => d.name === res.data.district);
          if (fetchedDistrictObj && memoizedUpazilasData[fetchedDistrictObj.id]) {
            setAvailableUpazilas(memoizedUpazilasData[fetchedDistrictObj.id]);
          }
        } catch (err) {
          console.error("Error fetching user profile:", err);
          setDataError(err.response?.data?.message || "Failed to load profile data.");
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: err.response?.data?.message || 'Failed to load profile data. Please try again.',
          });
        } finally {
          setDataLoading(false);
        }
      } else {
        setDataLoading(false);
      }
    };
    fetchUserData();
  }, [user, axiosSecure, reset, memoizedDistrictsData, memoizedUpazilasData]); // Use memoized data in dependencies

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
    if (isEditing) {
      setValue('upazila', '');
    }
  }, [currentDistrict, setValue, isEditing, memoizedDistrictsData, memoizedUpazilasData]); // Use memoized data in dependencies


  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async (data) => {
    try {
      const updatedData = {
        name: data.name,
        avatar: data.avatar,
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upazila,
      };
      const res = await axiosSecure.patch('/update-user-profile', updatedData);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated!',
          text: 'Your profile information has been successfully updated.',
        });
        setUserData(prev => ({ ...prev, ...updatedData }));
        setIsEditing(false);
      } else {
        Swal.fire('No Changes!', 'No new changes to save.', 'info');
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed!',
        text: err.response?.data?.message || 'Failed to update profile. Please try again.',
      });
    }
  };

  if (authLoading || dataLoading) {
    return <LoadingSpinner />;
  }

  if (dataError) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">Error: {dataError}</h2>
        <p className="text-gray-600">Please try again later.</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-700">No user data found.</h2>
        <p className="text-gray-500">Please ensure you are logged in.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto my-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
        <button
          onClick={handleEditToggle}
          className="btn bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 shadow-lg"
        >
          {isEditing ? 'Cancel Edit' : 'Edit Profile'}
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col items-center mb-6">
          <img
            src={userData.avatar || "https://placehold.co/100x100/cccccc/ffffff?text=User"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-300 shadow-md mb-4"
          />
          <span className="text-xl font-semibold text-gray-800">{userData.name || 'N/A'}</span>
          <span className="text-gray-600">{userData.email}</span>
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly={!isEditing}
          />
        </div>

        {/* Avatar URL */}
        <div>
          <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
          <input
            type="text"
            id="avatar"
            {...register("avatar")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter ImageBB URL"
            readOnly={!isEditing}
          />
        </div>

        {/* Email (Read-only) */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={userData.email || ''}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Blood Group */}
        <div>
          <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
          <select
            id="bloodGroup"
            {...register("bloodGroup")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isEditing}
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

        {/* District */}
        <div>
          <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">District</label>
          <select
            id="district"
            {...register("district")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isEditing}
          >
            <option value="">Select District</option>
            {memoizedDistrictsData.map((d) => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* Upazila */}
        <div>
          <label htmlFor="upazila" className="block text-sm font-medium text-gray-700 mb-1">Upazila</label>
          <select
            id="upazila"
            {...register("upazila")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isEditing || !currentDistrict}
          >
            <option value="">Select Upazila</option>
            {availableUpazilas.map((u, index) => (
              <option key={index} value={u}>{u}</option>
            ))}
          </select>
        </div>

        {isEditing && (
          <button
            type="submit"
            className="btn bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-200 shadow-lg w-full"
          >
            Save Changes
          </button>
        )}
      </form>
    </div>
  );
};

export default UserProfilePage;
