
// // src/pages/Login.jsx
// import Lottie from "lottie-react";
// import { useContext } from "react";
// import { BiEnvelope, BiKey } from "react-icons/bi";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import loginAnimation from "../assets/loginAnimation.json";
// import Title from "../components/Title";
// import { AuthContext } from "../providers/AuthProvider";
// import Swal from 'sweetalert2';
// import useAxiosPublic from "../hooks/useAxiosPublic"; // Keep useAxiosPublic

// const Login = () => {
//   const { signIn, setUser } = useContext(AuthContext); // Get setUser from AuthContext
//   const location = useLocation();
//   const navigate = useNavigate();
//   const axiosPublic = useAxiosPublic(); // Use axiosPublic for backend interaction

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const email = form.email.value;
//     const password = form.pass.value;

//     try {
//       // 1. Sign in with Firebase Auth
//       const userCredential = await signIn(email, password);
//       console.log("Firebase Sign In Success:", userCredential.user);

//       // 2. IMMEDIATELY update AuthContext user state with the Firebase user.
//       // This is crucial for useAxiosSecure's interceptor to have the latest user for subsequent calls.
//       // The onAuthStateChanged listener in AuthProvider will further enrich this user object.
//       setUser(userCredential.user);

//       // 3. Send user data to your backend (for loginCount update, etc.).
//       // This call to /add-user is typically public or doesn't strictly require the token for its primary function.
//       // The backend will handle setting the default role/status for new users or updating loginCount for existing ones.
//       const userDataForBackend = {
//         email: userCredential.user.email,
//       };
//       const backendResponse = await axiosPublic.post("/add-user", userDataForBackend);
//       console.log("Backend user update/add response on login:", backendResponse.data);

//       // Removed the direct axiosSecure call to /get-user-role-and-status here.
//       // The Dashboard component (or any component needing role) will use `useRole` hook,
//       // which will correctly fetch the role once the AuthContext's `user` object is fully ready
//       // (after onAuthStateChanged has fired and the token is available).

//       Swal.fire({
//         icon: 'success',
//         title: 'Login Successful!',
//         text: 'Welcome back to the Blood Donation Application!',
//       });

//       // Redirect to the intended page or home
//       navigate(location.state ? location.state : "/");

//     } catch (error) {
//       console.error("Login Error:", error);
//       let errorMessage = "Login failed. Please check your credentials and try again.";

//       if (error.code === 'auth/invalid-email' || error.code === 'auth/invalid-credential') {
//         errorMessage = "Invalid email or password. Please try again.";
//       } else if (error.code === 'auth/user-disabled') {
//         errorMessage = "Your account has been disabled. Please contact support.";
//       } else if (error.code === 'auth/user-not-found') {
//         errorMessage = "No account found with this email. Please register or try again.";
//       } else if (error.response && error.response.status === 401) {
//           errorMessage = "Session expired or unauthorized. Please log in again.";
//       }

//       Swal.fire({
//         icon: 'error',
//         title: 'Login Failed!',
//         text: errorMessage,
//       });
//     }
//   };

//   return (
//     <div className="bg-contain">
//       <div className="bg-white bg-opacity-90 min-h-screen">
//         <div className="w-11/12 mx-auto py-10 m-5 p-5">
//           <div className="title mt-5">
//             <Title>Login Now</Title>
//           </div>

//           <div className="flex justify-between items-center gap-5 pt-8 flex-col lg:flex-row">
//             <div className="login-for flex-1 w-full lg:w-auto">
//               <form
//                 onSubmit={handleSubmit}
//                 className="bg-white p-5 flex flex-col gap-8 backdrop-blur-sm bg-opacity-10 shadow-lg rounded-lg max-w-lg mx-auto"
//               >
//                 <h2 className="text-2xl font-semibold text-center text-gray-800">Login to Your Account</h2>
//                 <div className="flex justify-start items-center border-b-2 border-gray-300 focus-within:border-orange-400 transition-all duration-200">
//                   <BiEnvelope className="text-3xl text-slate-500 mr-2"></BiEnvelope>
//                   <input
//                     className="outline-none flex-1 p-2 bg-transparent"
//                     type="email"
//                     name="email"
//                     placeholder="Enter email"
//                     required
//                   />
//                 </div>
//                 <div className="space-y-1">
//                   <div className="flex justify-start items-center border-b-2 border-gray-300 focus-within:border-orange-400 transition-all duration-200">
//                     <BiKey className="text-3xl text-slate-500 mr-2"></BiKey>
//                     <input
//                       className="outline-none flex-1 p-2 bg-transparent"
//                       type="password"
//                       name="pass"
//                       placeholder="Enter Password"
//                       required
//                     />
//                   </div>
//                   <p className="text-end text-[13px] text-slate-500">
//                     forgot password?{" "}
//                   </p>
//                 </div>

//                 <div className="p-1 flex gap-3 -mt-4">
//                   <input type="checkbox" name="remember me" className="checkbox checkbox-sm" />
//                   Remember Me
//                 </div>

//                 <input
//                   type="submit"
//                   value="Login Now"
//                   className="btn cursor-pointer bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
//                 />
//                 <p className="text-center text-gray-600 text-sm">
//                   Don't have an account? <Link to="/registration" className="text-blue-600 hover:underline">Register here</Link>
//                 </p>
//               </form>
//             </div>
//             <div className="lottie flex-1 flex mx-20 hidden lg:block">
//               <Lottie animationData={loginAnimation} loop={true}></Lottie>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

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

