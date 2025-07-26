// src/hooks/useAxiosSecure.js
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000', // IMPORTANT: Replace with your actual backend URL (e.g., your Vercel deployment URL)
});

const useAxiosSecure = () => {
  const { auth, loading, logOut } = useContext(AuthContext); // Get auth instance, loading, and logOut
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        // Only try to get token if auth is NOT loading and a current user exists
        // and the user object has the getIdToken method.
        if (!loading && auth.currentUser && typeof auth.currentUser.getIdToken === 'function') {
          try {
            const token = await auth.currentUser.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
          } catch (tokenError) {
            console.error("Error getting ID token in interceptor:", tokenError);
            // If token fetching fails, consider it an unauthenticated state
            await logOut();
            navigate('/login');
            return Promise.reject(tokenError);
          }
        } else if (!loading && !auth.currentUser) {
            // If not loading but no current user, it means user is genuinely not logged in.
            console.warn("No authenticated user for secure request. Redirecting to login.");
            await logOut(); // Ensure logout state is clean
            navigate('/login');
            return Promise.reject(new Error("No authenticated user."));
        }
        // If loading, the request will be implicitly held until loading becomes false.
        // Or if auth.currentUser is null/undefined but loading is true, it's still processing.
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          console.error("Unauthorized or Forbidden access. Logging out...");
          await logOut(); // Log out the user
          navigate('/login'); // Redirect to login page
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, loading, logOut, navigate]); // Added 'auth' to dependency array for clarity

  return axiosSecure;
};

export default useAxiosSecure;
