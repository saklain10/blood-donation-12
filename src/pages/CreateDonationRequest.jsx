
// src/pages/CreateDonationRequest.jsx
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import LoadingSpinner from "../components/LoadingSpinner";
import { districtsData, upazilasData } from "../data/bangladeshGeocode"; // Import geo data
import useRole from "../hooks/useRole"; // Import useRole to check user status

const CreateDonationRequest = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, watch } = useForm();
  const currentDistrict = watch('recipientDistrict'); // Watch for changes in district dropdown
  const [role, isRoleLoading] = useRole(); // Get user role and status

  const [availableUpazilas, setAvailableUpazilas] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  }, [currentDistrict]);


  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Check user status again before submitting, just in case
      if (role === 'donor' && user?.status === 'blocked') {
        Swal.fire({
          icon: 'error',
          title: 'Access Denied!',
          text: 'Your account is blocked. You cannot create donation requests.',
        });
        setIsSubmitting(false);
        return;
      }

      const donationRequestData = {
        ...data,
        requesterName: user?.displayName,
        requesterEmail: user?.email,
        // donationStatus will be 'pending' by default on backend
      };

      const res = await axiosSecure.post("/create-donation-request", donationRequestData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Request Created!',
          text: 'Your blood donation request has been successfully created.',
        });
        reset(); // Clear form fields
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

  if (authLoading || isRoleLoading) {
    return <LoadingSpinner />;
  }

  // Check if the user is a blocked donor
  if (role === 'donor' && user?.status === 'blocked') {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">Access Denied!</h2>
        <p className="text-gray-600">Your account is blocked. You cannot create donation requests.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto my-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Create New Donation Request</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Requester Name (Read-only) */}
        <div>
          <label htmlFor="requesterName" className="block text-sm font-medium text-gray-700 mb-1">Requester Name</label>
          <input
            type="text"
            id="requesterName"
            value={user?.displayName || ''}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Requester Email (Read-only) */}
        <div>
          <label htmlFor="requesterEmail" className="block text-sm font-medium text-gray-700 mb-1">Requester Email</label>
          <input
            type="email"
            id="requesterEmail"
            value={user?.email || ''}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Recipient Name */}
        <div>
          <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-1">Recipient Name</label>
          <input
            type="text"
            id="recipientName"
            {...register("recipientName", { required: true })}
            placeholder="Enter Recipient Name"
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
            {districtsData.map((d) => (
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
            placeholder="Enter Hospital Name"
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
            placeholder="Enter Full Address Line"
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
          <label htmlFor="requestMessage" className="block text-sm font-medium text-gray-700 mb-1">Request Message</label>
          <textarea
            id="requestMessage"
            {...register("requestMessage", { required: true })}
            rows="4"
            placeholder="Enter detailed reason for blood request"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Request Button */}
        <button
          type="submit"
          className="btn bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-200 shadow-lg flex items-center justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner loading-sm mr-2"></span> Submitting...
            </>
          ) : (
            "Request Blood"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
