
// // src/components/LoadingSpinner.jsx
// import React from 'react';

// const LoadingSpinner = () => {
//   return (
//     // Changed inset-80 to inset-0 to ensure the spinner is centered on the whole screen
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 z-50">
//       <div className="flex flex-col items-center">
//         <span className="loading loading-spinner loading-lg text-blue-600"></span>
//         <p className="mt-3 text-xl font-semibold text-gray-700">Loading...</p> {/* Simplified loading text */}
//       </div>
//     </div>
//   );
// };

// export default LoadingSpinner;

// src/components/LoadingSpinner.jsx
import React from 'react';
import Lottie from 'lottie-react'; // Import Lottie library
import bloodDonationAnimation from '../assets/blood-donation-animation.json'; // Adjust path as per your file location

const LoadingSpinner = () => {
  return (
    // Changed inset-80 to inset-0 to ensure the spinner is centered on the whole screen
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 z-50">
      <div className="flex flex-col items-center">
        {/* Lottie Animation for Blood Donation */}
        <Lottie
          animationData={bloodDonationAnimation}
          loop={true} // The animation will loop continuously
          autoplay={true} // The animation will start playing automatically
          style={{ width: 150, height: 150 }} // Adjust size as needed
        />
        <p className="mt-3 text-xl font-semibold text-gray-700">Donating hope, one drop at a time...</p> {/* Modern, donor-related loading text */}
      </div>
    </div>
  );
};

export default LoadingSpinner;