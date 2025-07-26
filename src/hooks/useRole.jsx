// src/hooks/useRole.jsx
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
  const { user, loading } = useContext(AuthContext); // Get user and loading from AuthContext
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading: isRoleLoading, isError, error } = useQuery({
    queryKey: ['userRole', user?.email], // Query key depends on user email
    queryFn: async () => {
      if (!user?.email) { // Only fetch if user email is available
        return null;
      }
      const res = await axiosSecure.get('/get-user-role-and-status');
      return res.data?.role; // Return only the role
    },
    // The query will only run if user is not loading and user email is available
    enabled: !loading && !!user?.email,
    staleTime: 1000 * 60 * 5, // Data considered fresh for 5 minutes
    cacheTime: 1000 * 60 * 10, // Data stays in cache for 10 minutes
    onError: (err) => {
      console.error("Error fetching user role:", err);
      // Optionally handle error, e.g., set a default role or show a message
    }
  });

  return [role, isRoleLoading, isError, error];
};

export default useRole;
