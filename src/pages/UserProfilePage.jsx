
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
