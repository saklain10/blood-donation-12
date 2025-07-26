
// src/pages/SearchPage.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../hooks/useAxiosPublic'; // Use axiosPublic for public search
import LoadingSpinner from '../components/LoadingSpinner';
import Swal from 'sweetalert2';
import { districtsData, upazilasData } from "../data/bangladeshGeocode"; // Import geo data
import { FaSearch, FaTint, FaMapMarkerAlt, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

const SearchPage = () => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const axiosPublic = useAxiosPublic();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentDistrict = watch('district');
  const [availableUpazilas, setAvailableUpazilas] = useState([]);

  // Effect to update available upazilas when currentDistrict changes
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
    setValue('upazila', ''); // Reset upazila when district changes
  }, [currentDistrict, setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);
    setSearchResults([]); // Clear previous results

    try {
      const queryParams = new URLSearchParams();
      if (data.bloodGroup) queryParams.append('bloodGroup', data.bloodGroup);
      if (data.district) queryParams.append('district', data.district);
      if (data.upazila) queryParams.append('upazila', data.upazila);

      const res = await axiosPublic.get(`/search-donors?${queryParams.toString()}`);
      setSearchResults(res.data);
      if (res.data.length === 0) {
        Swal.fire({
          icon: 'info',
          title: 'No Donors Found',
          text: 'No donors matched your search criteria. Please try different filters.',
        });
      }
    } catch (err) {
      console.error("Error searching donors:", err);
      setError("Failed to search for donors. Please try again.");
      Swal.fire({
        icon: 'error',
        title: 'Search Failed!',
        text: err.response?.data?.message || 'Failed to search for donors. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto my-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Search Donors</h1>
      <p className="text-gray-600 mb-8 text-center">
        Find blood donors near you by filtering by blood group, district, and upazila.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-10 p-5 border border-gray-200 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Blood Group */}
          <div>
            <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
            <select
              id="bloodGroup"
              {...register("bloodGroup")}
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

          {/* District */}
          <div>
            <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">District</label>
            <select
              id="district"
              {...register("district")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select District</option>
              {districtsData.map((d) => (
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
              disabled={!currentDistrict}
            >
              <option value="">Select Upazila</option>
              {availableUpazilas.map((u, index) => (
                <option key={index} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="btn bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-200 shadow-lg flex items-center justify-center w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading loading-spinner loading-sm mr-2"></span> Searching...
            </>
          ) : (
            <>
              <FaSearch className="mr-2" /> Search Donors
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="text-center py-4 text-red-600 font-semibold">
          {error}
        </div>
      )}

      {isLoading ? (
        <LoadingSpinner />
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {searchResults.map((donor) => (
            <div key={donor.email} className="bg-blue-50 p-5 rounded-lg shadow-md flex flex-col items-center text-center">
              <img
                src={donor.avatar || "https://placehold.co/80x80/cccccc/ffffff?text=Donor"}
                alt="Donor Avatar"
                className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-blue-300"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2"><FaUser /> {donor.name}</h3>
              <p className="text-gray-600 mb-1 flex items-center gap-2"><FaTint className="text-red-500" /> Blood Group: <span className="font-bold text-red-600">{donor.bloodGroup}</span></p>
              <p className="text-gray-600 mb-1 flex items-center gap-2"><FaMapMarkerAlt className="text-gray-500" /> Location: {donor.district}, {donor.upazila}</p>
              <p className="text-gray-600 mb-1 flex items-center gap-2"><FaEnvelope className="text-gray-500" /> Email: {donor.email}</p>
              {/* Optional: Add phone number if available and required */}
              {/* <p className="text-gray-600 flex items-center gap-2"><FaPhone className="text-gray-500" /> Phone: {donor.phone || 'N/A'}</p> */}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          <p className="text-xl">Enter your search criteria above to find donors.</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
