// src/pages/Error.jsx
import { useRouteError } from "react-router";
import { Link } from "react-router-dom"; // Import Link for navigation

const Error = () => {
  const error = useRouteError();
  console.error(error); // Use console.error for better visibility in logs

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-lg">
        {/* Error Icon */}
        <div className="mx-auto h-24 w-24 text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.731 0 2.813-1.874 1.948-3.374L13.948 3.374c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        
        {/* Error Title */}
        <h1 className="text-6xl font-extrabold text-red-600">Oops!</h1>

        {/* Error Message */}
        <p className="text-2xl text-gray-600 font-semibold">Something went wrong.</p>
        <p className="text-sm text-gray-500">
          {error.statusText || error.message}
        </p>
        
        {/* Home Button */}
        <Link to="/" className="inline-block px-8 py-3 mt-4 text-white font-bold bg-red-500 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
