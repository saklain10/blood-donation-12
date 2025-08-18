
// src/pages/Register.jsx
import React, { useContext, useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { districtsData, upazilasData } from "../data/bangladeshGeocode";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const currentDistrict = watch('district');
  const [availableUpazilas, setAvailableUpazilas] = useState([]);

  // Memoize the mutable copies of the data
  const memoizedDistrictsData = useMemo(() => [...districtsData], [districtsData]);
  const memoizedUpazilasData = useMemo(() => ({ ...upazilasData }), [upazilasData]);

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
    setValue('upazila', '');
  }, [currentDistrict, setValue, memoizedDistrictsData, memoizedUpazilasData]);

  const onSubmit = async (data) => {
    if (data.password !== data.confirm_password) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch!',
        text: 'Password and Confirm Password do not match.',
      });
      return;
    }

    try {
      const result = await createUser(data.email, data.password);
      const loggedUser = result.user;
      console.log("Firebase User Created:", loggedUser);

      // Ensure photoURL is a string, even if empty
      const photoURL = data.avatar || ''; // Use empty string if avatar is null/undefined

      // Call updateUserProfile only if it's a function
      if (typeof updateUserProfile === 'function') {
        await updateUserProfile(data.name, photoURL);
        console.log("User profile updated in Firebase.");
      } else {
        console.warn("updateUserProfile is not a function. Skipping Firebase profile update.");
      }

      const userInfo = {
        email: data.email,
        name: data.name,
        avatar: photoURL, // Use the sanitized photoURL
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upazila,
        role: 'donor',
        status: 'active',
      };

      const res = await axiosPublic.post('/add-user', userInfo);
      if (res.data.insertedId || res.data.modifiedCount > 0 || res.data.upsertedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'Welcome to Blood Donation App!',
        });
        navigate('/dashboard');
      } else {
        Swal.fire('Failed!', 'User registration failed on backend.', 'error');
      }
    } catch (error) {
      console.error("Registration Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed!',
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 mt-20">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register Now!</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="your.email@example.com"
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your Full Name"
            />
            {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
          </div>

          {/* Avatar URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Avatar URL (ImageBB)</label>
            <input
              type="text"
              {...register("avatar")}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., https://i.ibb.co/xyz/avatar.jpg"
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Blood Group</label>
            <select
              {...register("bloodGroup", { required: "Blood Group is required" })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
            {errors.bloodGroup && <span className="text-red-500 text-xs">{errors.bloodGroup.message}</span>}
          </div>

          {/* District */}
          <div>
            <label className="block text-sm font-medium text-gray-700">District</label>
            <select
              {...register("district", { required: "District is required" })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select District</option>
              {memoizedDistrictsData.map((d) => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
            {errors.district && <span className="text-red-500 text-xs">{errors.district.message}</span>}
          </div>

          {/* Upazila */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Upazila</label>
            <select
              {...register("upazila", { required: "Upazila is required" })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              disabled={!currentDistrict}
            >
              <option value="">Select Upazila</option>
              {availableUpazilas.map((u, index) => (
                <option key={index} value={u}>{u}</option>
              ))}
            </select>
            {errors.upazila && <span className="text-red-500 text-xs">{errors.upazila.message}</span>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  message: "Password must have at least one uppercase letter, one lowercase letter, one number, and one special character."
                }
              })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="********"
            />
            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              {...register("confirm_password", { required: "Confirm Password is required" })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="********"
            />
            {errors.confirm_password && <span className="text-red-500 text-xs">{errors.confirm_password.message}</span>}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;


