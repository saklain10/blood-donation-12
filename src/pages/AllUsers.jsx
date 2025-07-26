
// src/pages/AllUsers.jsx
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from 'sweetalert2'; // Import SweetAlert2
import LoadingSpinner from "../components/LoadingSpinner"; // Import LoadingSpinner
import { FaUserShield, FaHandsHelping, FaUserTimes, FaUserCheck } from 'react-icons/fa'; // Icons for roles and status

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const axiosSecure = useAxiosSecure();

  // Function to fetch users
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axiosSecure.get("/get-users");
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please try again.");
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to load users. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [axiosSecure]); // Depend on axiosSecure to re-fetch if it changes (e.g., after login)

  const handleRoleChange = async (email, newRole) => {
    try {
      const { data } = await axiosSecure.patch("/update-user-role", {
        email,
        role: newRole,
      });
      if (data.modifiedCount) {
        Swal.fire({
          icon: 'success',
          title: 'Role Updated!',
          text: `User role updated to ${newRole} successfully.`,
        });
        fetchUsers(); // Re-fetch users to update UI
      } else {
        Swal.fire('Failed!', 'Could not update user role.', 'error');
      }
    } catch (err) {
      console.error("Error updating user role:", err);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: err.response?.data?.msg || 'Failed to update user role.',
      });
    }
  };

  const handleStatusChange = async (email, newStatus) => {
    try {
      const { data } = await axiosSecure.patch("/update-user-status", {
        email,
        status: newStatus,
      });
      if (data.modifiedCount) {
        Swal.fire({
          icon: 'success',
          title: 'Status Updated!',
          text: `User status updated to ${newStatus} successfully.`,
        });
        fetchUsers(); // Re-fetch users to update UI
      } else {
        Swal.fire('Failed!', 'Could not update user status.', 'error');
      }
    } catch (err) {
      console.error("Error updating user status:", err);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: err.response?.data?.msg || 'Failed to update user status.',
      });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">Error: {error}</h2>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Users</h1>
      <p className="text-gray-600 mb-6">Manage user roles and statuses here.</p>

      {users.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No users found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 border-b border-gray-200">Avatar</th>
                <th className="py-3 px-6 border-b border-gray-200">Name</th>
                <th className="py-3 px-6 border-b border-gray-200">Email</th>
                <th className="py-3 px-6 border-b border-gray-200">Role</th>
                <th className="py-3 px-6 border-b border-gray-200">Status</th>
                <th className="py-3 px-6 border-b border-gray-200 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {users.map((user) => (
                <tr key={user.email} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6">
                    <img src={user.avatar || "https://placehold.co/40x40/cccccc/ffffff?text=User"} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                  </td>
                  <td className="py-3 px-6">{user.name || 'N/A'}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6 capitalize">{user.role}</td>
                  <td className="py-3 px-6">
                    <span className={`px-2 py-1 rounded-sm text-xs font-semibold ${
                      user.status === 'active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="btn btn-ghost btn-xs m-1">...</div>
                      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        {/* Role Change Options */}
                        {user.role !== 'admin' && (
                          <li>
                            <button onClick={() => handleRoleChange(user.email, 'admin')} className="flex items-center gap-2">
                              <FaUserShield /> Make Admin
                            </button>
                          </li>
                        )}
                        {user.role !== 'volunteer' && user.role !== 'admin' && (
                          <li>
                            <button onClick={() => handleRoleChange(user.email, 'volunteer')} className="flex items-center gap-2">
                              <FaHandsHelping /> Make Volunteer
                            </button>
                          </li>
                        )}
                        {user.role !== 'donor' && user.role !== 'admin' && user.role !== 'volunteer' && (
                          <li>
                            <button onClick={() => handleRoleChange(user.email, 'donor')} className="flex items-center gap-2">
                              <FaUserCheck /> Make Donor
                            </button>
                          </li>
                        )}
                        {/* Status Change Options */}
                        {user.status === 'active' ? (
                          <li>
                            <button onClick={() => handleStatusChange(user.email, 'blocked')} className="flex items-center gap-2 text-red-600">
                              <FaUserTimes /> Block
                            </button>
                          </li>
                        ) : (
                          <li>
                            <button onClick={() => handleStatusChange(user.email, 'active')} className="flex items-center gap-2 text-green-600">
                              <FaUserCheck /> Unblock
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

