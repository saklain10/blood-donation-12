
// src/pages/UserProfilePage.jsx
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import LoadingSpinner from "../components/LoadingSpinner";
import { districtsData, upazilasData } from "../data/bangladeshGeocode"; // Import geo data
import { FaEdit, FaSave, FaUser, FaEnvelope, FaTint, FaMapMarkerAlt } from 'react-icons/fa';

const UserProfilePage = () => {
  const { user, loading: authLoading, updateUser: updateFirebaseProfile } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const currentDistrict = watch('district'); // Watch for changes in district dropdown

  const [availableUpazilas, setAvailableUpazilas] = useState([]);

  // Fetch user profile data from backend
  const { data: userProfile = {}, isLoading: isProfileLoading, isError: isProfileError, error: profileError } = useQuery({
    queryKey: ['userProfile', user?.email],
    enabled: !authLoading && !!user?.email && typeof user.getIdToken === 'function',
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-profile`);
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // Data considered fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // Cache data for 30 minutes
    onError: (err) => {
      console.error("Error fetching user profile:", err);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to load user profile. Please try again.',
      });
    }
  });

  // Effect to populate form fields when userProfile data is loaded
  useEffect(() => {
    if (userProfile) {
      reset({
        name: userProfile.name || '',
        avatar: userProfile.avatar || '',
        email: userProfile.email || '', // Email is read-only
        bloodGroup: userProfile.bloodGroup || '',
        district: userProfile.district || '',
        upazila: userProfile.upazila || '',
      });
      // Set initial upazilas based on the loaded profile's district
      const initialDistrictObj = districtsData.find(d => d.name === userProfile.district);
      if (initialDistrictObj && upazilasData[initialDistrictObj.id]) {
        setAvailableUpazilas(upazilasData[initialDistrictObj.id]);
      } else {
        setAvailableUpazilas([]);
      }
    }
  }, [userProfile, reset]);

  // Effect to update available upazilas when currentDistrict (from form) changes
  useEffect(() => {
    if (currentDistrict) {
      const districtObj = districtsData.find(d => d.name === currentDistrict);
      if (districtObj) {
        const districtId = districtObj.id;
        if (upazilasData[districtId]) {
          setAvailableUpazilas(upazilasData[districtId]);
        } else {
          setAvailableUpazilas([]);
        }
      } else {
        setAvailableUpazilas([]);
      }
    } else {
      setAvailableUpazilas([]);
    }
    // Reset upazila selection when district changes, only if not initializing from userProfile
    if (userProfile && currentDistrict !== userProfile.district) {
        setValue('upazila', '');
    } else if (!userProfile) {
        setValue('upazila', '');
    }
  }, [currentDistrict, setValue, userProfile]);


  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async (data) => {
    setIsUpdating(true);
    try {
      // Update Firebase profile (displayName and photoURL)
      await updateFirebaseProfile({ displayName: data.name, photoURL: data.avatar });

      // Update backend profile data
      const res = await axiosSecure.patch(`/update-user-profile`, {
        name: data.name,
        avatar: data.avatar,
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upazila,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated!',
          text: 'Your profile has been successfully updated.',
        });
        queryClient.invalidateQueries(['userProfile', user?.email]); // Invalidate to refetch latest data
        setIsEditing(false); // Exit editing mode
      } else {
        Swal.fire('Info', 'No changes detected or update failed.', 'info');
        setIsEditing(false); // Exit editing mode even if no changes
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire('Error!', error.response?.data?.message || 'Failed to update profile.', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  if (authLoading || isProfileLoading) {
    return <LoadingSpinner />;
  }

  if (isProfileError) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">Error: {profileError?.message || 'Failed to load profile data.'}</h2>
        <p className="text-gray-600">Please try refreshing the page or logging in again.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto my-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">My Profile</h1>

      <div className="flex justify-center mb-8">
        <img
          src={userProfile.avatar || "https://placehold.co/100x100/cccccc/ffffff?text=User"}
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-400 shadow-md"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Edit/Save Button */}
        <div className="text-right mb-4">
          {!isEditing ? (
            <button
              type="button"
              onClick={handleEditToggle}
              className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 ml-auto"
            >
              <FaEdit /> Edit Profile
            </button>
          ) : (
            <button
              type="submit"
              className="btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 ml-auto"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <>
                  <span className="loading loading-spinner loading-sm mr-2"></span> Saving...
                </>
              ) : (
                <>
                  <FaSave /> Save Changes
                </>
              )}
            </button>
          )}
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><FaUser className="text-gray-500" /> Name</label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
            readOnly={!isEditing}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${isEditing ? 'bg-white focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-100 cursor-not-allowed'}`}
          />
        </div>

        {/* Avatar Image URL */}
        <div>
          <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><FaUser className="text-gray-500" /> Avatar URL</label>
          <input
            type="text"
            id="avatar"
            {...register("avatar")}
            readOnly={!isEditing}
            placeholder="Enter Image URL"
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${isEditing ? 'bg-white focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-100 cursor-not-allowed'}`}
          />
        </div>

        {/* Email (Read-only) */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><FaEnvelope className="text-gray-500" /> Email</label>
          <input
            type="email"
            id="email"
            {...register("email")}
            readOnly // Email is never editable
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Blood Group */}
        <div>
          <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><FaTint className="text-red-500" /> Blood Group</label>
          <select
            id="bloodGroup"
            {...register("bloodGroup", { required: true })}
            readOnly={!isEditing}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${isEditing ? 'bg-white focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-100 cursor-not-allowed'}`}
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
          <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><FaMapMarkerAlt className="text-gray-500" /> District</label>
          <select
            id="district"
            {...register("district", { required: true })}
            readOnly={!isEditing}
            disabled={!isEditing}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${isEditing ? 'bg-white focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-100 cursor-not-allowed'}`}
          >
            <option value="">Select District</option>
            {districtsData.map((d) => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* Upazila */}
        <div>
          <label htmlFor="upazila" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><FaMapMarkerAlt className="text-gray-500" /> Upazila</label>
          <select
            id="upazila"
            {...register("upazila", { required: true })}
            readOnly={!isEditing}
            disabled={!isEditing || !currentDistrict} // Disable if not editing or no district selected
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${isEditing ? 'bg-white focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-100 cursor-not-allowed'}`}
          >
            <option value="">Select Upazila</option>
            {availableUpazilas.map((u, index) => (
              <option key={index} value={u}>{u}</option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default UserProfilePage;
