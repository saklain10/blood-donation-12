
// src/pages/DonationRequestDetailsPage.jsx
import { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from 'sweetalert2';
import LoadingSpinner from "../components/LoadingSpinner";
import { FaCalendarAlt, FaClock, FaHospital, FaMapMarkerAlt, FaUser, FaEnvelope, FaInfoCircle, FaTint } from 'react-icons/fa';

const DonationRequestDetailsPage = () => {
  const donationRequest = useLoaderData(); // Data loaded from router loader
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDonating, setIsDonating] = useState(false); // State for donation loading

  if (authLoading) {
    return <LoadingSpinner />;
  }

  if (!donationRequest) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">Donation Request Not Found!</h2>
        <p className="text-gray-600">The request you are looking for does not exist or has been removed.</p>
      </div>
    );
  }

  // Destructure request details
  const {
    _id,
    requesterName,
    requesterEmail,
    recipientName,
    recipientDistrict,
    recipientUpazila,
    hospitalName,
    fullAddressLine,
    bloodGroup,
    donationDate,
    donationTime,
    requestMessage,
    donationStatus,
    donorName,
    donorEmail,
  } = donationRequest;

  const handleDonateClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDonation = async () => {
    setIsDonating(true);
    try {
      const res = await axiosSecure.patch(`/donate/${_id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Donation Confirmed!',
          text: 'Thank you for accepting the donation request. Status changed to "In Progress".',
        });
        setIsModalOpen(false);
        navigate(`/dashboard/my-donation-requests`); // Redirect to my donation requests to see the change
      } else {
        Swal.fire('Failed!', 'Could not confirm donation. It might already be taken or an error occurred.', 'error');
      }
    } catch (error) {
      console.error("Error confirming donation:", error);
      Swal.fire('Error!', error.response?.data?.message || 'Failed to confirm donation.', 'error');
    } finally {
      setIsDonating(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto my-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Donation Request Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Requester Info */}
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-blue-800 mb-3 flex items-center gap-2"><FaUser /> Requester Information</h2>
          <p className="text-gray-700"><span className="font-medium">Name:</span> {requesterName}</p>
          <p className="text-gray-700"><span className="font-medium">Email:</span> {requesterEmail}</p>
        </div>

        {/* Recipient Info */}
        <div className="bg-green-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-green-800 mb-3 flex items-center gap-2"><FaUser /> Recipient Information</h2>
          <p className="text-gray-700"><span className="font-medium">Name:</span> {recipientName}</p>
          <p className="text-gray-700 flex items-center gap-1"><FaMapMarkerAlt className="text-gray-500" /> <span className="font-medium">Location:</span> {recipientDistrict}, {recipientUpazila}</p>
        </div>
      </div>

      {/* Donation Details */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-inner mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2"><FaInfoCircle /> Donation Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <p className="text-gray-700 flex items-center gap-2"><FaTint className="text-red-500" /> <span className="font-medium">Blood Group:</span> <span className="font-bold text-red-600 text-lg">{bloodGroup}</span></p>
          <p className="text-gray-700 flex items-center gap-2"><FaCalendarAlt className="text-gray-500" /> <span className="font-medium">Date:</span> {donationDate}</p>
          <p className="text-gray-700 flex items-center gap-2"><FaClock className="text-gray-500" /> <span className="font-medium">Time:</span> {donationTime}</p>
          <p className="text-gray-700 flex items-center gap-2"><FaHospital className="text-gray-500" /> <span className="font-medium">Hospital:</span> {hospitalName}</p>
          <p className="text-gray-700 col-span-full flex items-center gap-2"><FaMapMarkerAlt className="text-gray-500" /> <span className="font-medium">Full Address:</span> {fullAddressLine}</p>
        </div>
        <div className="mt-4">
          <p className="text-gray-700"><span className="font-medium">Request Message:</span> {requestMessage}</p>
        </div>
        <div className="mt-4">
          <p className="text-gray-700"><span className="font-medium">Status:</span>
            <span className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold
              ${donationStatus === 'pending' ? 'bg-yellow-200 text-yellow-800' : ''}
              ${donationStatus === 'inprogress' ? 'bg-blue-200 text-blue-800' : ''}
              ${donationStatus === 'done' ? 'bg-green-200 text-green-800' : ''}
              ${donationStatus === 'canceled' ? 'bg-red-200 text-red-800' : ''}
            `}>
              {donationStatus}
            </span>
          </p>
        </div>
      </div>

      {/* Donor Information (if in progress or done) */}
      {(donationStatus === 'inprogress' || donationStatus === 'done') && (
        <div className="bg-purple-50 p-4 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-purple-800 mb-3 flex items-center gap-2"><FaUser /> Donor Information</h2>
          <p className="text-gray-700"><span className="font-medium">Name:</span> {donorName || 'N/A'}</p>
          <p className="text-gray-700"><span className="font-medium">Email:</span> {donorEmail || 'N/A'}</p>
        </div>
      )}

      {/* Donate Button - visible only if status is 'pending' and user is logged in and not the requester */}
      {user && user.email !== requesterEmail && donationStatus === 'pending' && (
        <div className="text-center mt-8">
          <button
            onClick={handleDonateClick}
            className="btn bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-200 shadow-lg"
          >
            Donate Now
          </button>
        </div>
      )}

      {/* Donation Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Confirm Your Donation</h2>
            <p className="mb-6 text-gray-700 text-center">
              By confirming, you agree to donate blood for **{recipientName}** ({bloodGroup} Blood Group).
              The request status will change to "In Progress".
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Your Name (Read Only)</label>
                <input
                  type="text"
                  value={user?.displayName || 'N/A'}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Your Email (Read Only)</label>
                <input
                  type="email"
                  value={user?.email || 'N/A'}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-200"
                disabled={isDonating}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDonation}
                className="btn bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center"
                disabled={isDonating}
              >
                {isDonating ? (
                  <>
                    <span className="loading loading-spinner loading-sm mr-2"></span> Confirming...
                  </>
                ) : (
                  "Confirm Donation"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequestDetailsPage;
