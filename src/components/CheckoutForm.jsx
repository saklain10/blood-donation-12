
// src/components/CheckoutForm.jsx
import React, { useState, useContext, useEffect } from 'react'; // Added useEffect
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { AuthContext } from '../providers/AuthProvider';

// Receive clientSecret as a prop
const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [cardError, setCardError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  // Reset processing state if clientSecret changes (e.g., user changes amount)
  useEffect(() => {
    setProcessing(false);
    setCardError('');
    setTransactionId('');
  }, [clientSecret]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      // Stripe.js has not yet loaded or clientSecret is not available
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    setProcessing(true);
    setCardError('');

    // Confirm Payment with the clientSecret received as prop
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret, // Use the clientSecret passed as prop
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || 'anonymous@example.com',
            name: user?.displayName || 'Anonymous Donor',
          },
        },
      }
    );

    if (confirmError) {
      console.error('[confirmError]', confirmError);
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }

    console.log('[PaymentIntent]', paymentIntent);
    setProcessing(false);

    if (paymentIntent.status === 'succeeded') {
      setTransactionId(paymentIntent.id);
      Swal.fire({
        icon: 'success',
        title: 'Payment Successful!',
        html: `Thank you for your donation!<br>Transaction ID: <strong>${paymentIntent.id}</strong>`,
      });

      // Save payment info to your backend
      const donationInfo = {
        amount: paymentIntent.amount / 100, // Convert cents back to dollars
        donorEmail: user?.email,
        donorName: user?.displayName,
        transactionId: paymentIntent.id,
        paymentDate: new Date(),
      };

      try {
        const res = await axiosSecure.post('/add-funding', donationInfo);
        if (res.data.insertedId) {
          console.log("Donation saved to backend:", res.data);
        } else {
          console.error("Failed to save donation info to backend.");
        }
      } catch (backendErr) {
        console.error("Error saving donation to backend:", backendErr);
        Swal.fire({
          icon: 'error',
          title: 'Backend Save Failed!',
          text: 'Payment succeeded but failed to record in our system. Please contact support.',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Payment Failed!',
        text: 'Your payment was not successful. Please try again.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      {cardError && <p className="text-red-500 text-sm">{cardError}</p>}

      <button
        type="submit"
        className="btn bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-200 shadow-lg flex items-center justify-center w-full"
        disabled={!stripe || !elements || processing || !clientSecret} // Disable if clientSecret is not ready
      >
        {processing ? (
          <>
            <span className="loading loading-spinner loading-sm mr-2"></span> Processing...
          </>
        ) : (
          "Donate Now"
        )}
      </button>

      {transactionId && (
        <p className="text-green-600 text-center mt-4">
          Transaction Complete! Your Transaction ID: <span className="font-bold">{transactionId}</span>
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
