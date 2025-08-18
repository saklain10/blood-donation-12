
// src/pages/Login.jsx
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import LoadingSpinner from '../components/LoadingSpinner';

const Login = () => {
  const { signIn, loading } = useContext(AuthContext); // Get loading state
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isLoggingIn, setIsLoggingIn] = useState(false); // State for login process

  const from = location.state?.from?.pathname || "/dashboard";

  const onSubmit = async (data) => {
    setIsLoggingIn(true); // Start loading indicator
    try {
      const result = await signIn(data.email, data.password);
      const user = result.user;
      console.log("Firebase Login Successful:", user);

      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'Welcome back!',
        showConfirmButton: false,
        timer: 1500
      });
      reset(); // Clear form fields
      navigate(from, { replace: true }); // Redirect to dashboard or previous page

    } catch (error) {
      console.error("Login Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed!',
        text: error.message || 'Please check your credentials and try again.',
      });
    } finally {
      setIsLoggingIn(false); // End loading indicator
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login Now</h2>
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

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="********"
            />
            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200 flex items-center justify-center"
            disabled={isLoggingIn} // Disable button during login
          >
            {isLoggingIn ? (
              <>
                <span className="loading loading-spinner loading-sm mr-2"></span> Logging In...
              </>
            ) : (
              "Login Now"
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

