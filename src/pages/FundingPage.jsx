
// src/pages/FundingPage.jsx
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import LoadingSpinner from '../components/LoadingSpinner';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const FundingPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [loadingClientSecret, setLoadingClientSecret] = useState(false);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();

  const createPaymentIntent = async (amount) => {
    setLoadingClientSecret(true);
    setError(null);
    setClientSecret("");

    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid donation amount (must be positive).");
      setLoadingClientSecret(false);
      return;
    }

    try {
      const res = await axiosSecure.post('/create-payment-intent', { amount: amount * 100 });
      setClientSecret(res.data.clientSecret);
    } catch (err) {
      console.error("Error creating payment intent:", err);
      setError(err.response?.data?.message || err.message || 'Failed to create payment intent');
      Swal.fire({
        icon: 'error',
        title: 'Payment Setup Failed!',
        text: err.response?.data?.message || err.message || 'Failed to create payment intent.',
      });
    } finally {
      setLoadingClientSecret(false);
    }
  };

  useEffect(() => {
    createPaymentIntent(10); // Default donation amount
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto my-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Support Our Cause!</h1>
      <p className="text-gray-600 mb-8 text-center">
        Your generous contribution helps us save lives. Please enter the amount you wish to donate.
      </p>

      <div className="mb-6">
        <label htmlFor="donationAmount" className="block text-sm font-medium text-gray-700 mb-2">Donation Amount (BDT)</label>
        <input
          type="number"
          id="donationAmount"
          min="1"
          defaultValue="10"
          onChange={(e) => {
            const amount = parseFloat(e.target.value);
            if (!isNaN(amount) && amount > 0) {
              createPaymentIntent(amount);
            } else {
              setClientSecret("");
              setError("Please enter a valid donation amount.");
            }
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          placeholder="e.g., 100"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      {loadingClientSecret ? (
        <LoadingSpinner />
      ) : clientSecret ? (
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          {/* Pass clientSecret as a prop to CheckoutForm */}
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      ) : (
        <div className="text-center py-10 text-gray-500">
          <p className="text-xl">Enter a donation amount to proceed with payment.</p>
        </div>
      )}
    </div>
  );
};

export default FundingPage;
