
// src/pages/CreateDonationRequest.jsx
import React, { useContext, useEffect, useState, useMemo } from 'react'; // Added useMemo
import { useForm } from 'react-hook-form';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { districtsData, upazilasData } from "../data/bangladeshGeocode"; // Direct import
import LoadingSpinner from '../components/LoadingSpinner';
import { useQueryClient } from '@tanstack/react-query';

const CreateDonationRequest = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, watch, setValue, reset } = useForm();
  const queryClient = useQueryClient();

  const currentDistrict = watch('recipientDistrict');
  const [availableUpazilas, setAvailableUpazilas] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Memoize the mutable copies of the data
  const memoizedDistrictsData = useMemo(() => [...districtsData], [districtsData]);
  const memoizedUpazilasData = useMemo(() => ({ ...upazilasData }), [upazilasData]);

  // Set default values for requester name and email
  useEffect(() => {
    if (user) {
      setValue('requesterName', user.displayName || '');
      setValue('requesterEmail', user.email || '');
    }
  }, [user, setValue]);

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
    setValue('recipientUpazila', '');
  }, [currentDistrict, setValue, memoizedDistrictsData, memoizedUpazilasData]); // Use memoized data in dependencies


  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const donationRequestData = {
        requesterName: data.requesterName,
        requesterEmail: data.requesterEmail,
        recipientName: data.recipientName,
        recipientDistrict: data.recipientDistrict,
        recipientUpazila: data.recipientUpazila,
        hospitalName: data.hospitalName,
        fullAddressLine: data.fullAddressLine,
        bloodGroup: data.bloodGroup,
        donationDate: data.donationDate,
        donationTime: data.donationTime,
        requestMessage: data.requestMessage,
        donationStatus: 'pending',
      };

      const res = await axiosSecure.post("/create-donation-request", donationRequestData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Request Created!',
          text: 'Your donation request has been successfully created.',
        });
        reset();
        queryClient.invalidateQueries({ queryKey: ['userRole', user?.email] });
        queryClient.invalidateQueries({ queryKey: ['myDonationRequests', user?.email] });
        queryClient.invalidateQueries({ queryKey: ['allBloodDonationRequests'] });
      } else {
        Swal.fire('Failed!', 'Could not create donation request. Please try again.', 'error');
      }
    } catch (error) {
      console.error("Error creating donation request:", error);
      Swal.fire('Error!', error.response?.data?.message || 'Failed to create donation request.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto my-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Create New Donation Request</h1>

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

        {/* Request Button */}
        <button
          type="submit"
          className="btn bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-200 shadow-lg flex items-center justify-center w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner loading-sm mr-2"></span> Creating Request...
            </>
          ) : (
            "Create Request"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
