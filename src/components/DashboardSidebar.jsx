
// src/components/DashboardSidebar.jsx
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import useRole from '../hooks/useRole';
import { FaHome, FaUser, FaPlus, FaHandsHelping, FaUsers, FaChartBar, FaBlog, FaDollarSign, FaSignOutAlt } from 'react-icons/fa';

const DashboardSidebar = () => {
  const { logOut } = useContext(AuthContext);
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) {
    return (
      <div className="w-64 bg-gray-800 text-white h-screen p-4 flex flex-col items-center justify-center sticky top-0">
        <span className="loading loading-spinner loading-lg text-blue-400"></span>
        <p className="mt-2 text-sm">Loading Menu...</p>
      </div>
    );
  }

  return (
    <div className="w-64 mt-8 ml-8 rounded-xl bg-base-100 h-screen p-4 flex flex-col shadow-2xl sticky top-0 overflow-y-auto">
      <div className="text-2xl font-bold text-center mb-8 text-black">Dashboard</div>

      <nav className="flex-grow">
        <ul className="space-y-2">
          {/* Common Links for all roles */}
          <li>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                  isActive ? 'bg-red-500 text-white shadow-md' : 'hover:bg-base-700'
                }`
              }
            >
              <FaUser className="mr-3" /> My Profile
            </NavLink>
          </li>

          {/* Donor Specific Links */}
          {role === 'donor' && (
            <>
              <li>
                <NavLink
                  to="/dashboard/donor-home"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                      isActive ? 'bg-red-500 text-white shadow-md' : 'hover:bg-red-200'
                    }`
                  }
                >
                  <FaHome className="mr-3" /> Donor Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/create-donation-request"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                      isActive ? 'bg-red-500 text-white shadow-md' : 'hover:bg-red-200'
                    }`
                  }
                >
                  <FaPlus className="mr-3" /> Create Donation Request
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/my-donation-requests"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                      isActive ? 'bg-red-500 text-white shadow-md' : 'hover:bg-red-200'
                    }`
                  }
                >
                  <FaHandsHelping className="mr-3" /> My Donation Requests
                </NavLink>
              </li>
            </>
          )}

          {/* Volunteer Specific Links */}
          {role === 'volunteer' && (
            <>
              <div className="divider text-gray-500 uppercase text-xs mt-4 mb-2">Volunteer Panel</div>
              <li>
                <NavLink
                  to="/dashboard/moderator-home"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                      isActive ? 'bg-red-500 text-white shadow-md' : 'hover:bg-red-200'
                    }`
                  }
                >
                  <FaHome className="mr-3" /> Moderator Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/all-blood-donation-requests"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                      isActive ? 'bg-red-500 text-white shadow-md' : 'hover:bg-red-200'
                    }`
                  }
                >
                  <FaHandsHelping className="mr-3" /> All Blood Requests
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/content-management"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                      isActive ? 'bg-red-500 text-white shadow-md' : 'hover:bg-red-200'
                    }`
                  }
                >
                  <FaBlog className="mr-3" /> Content Management
                </NavLink>
              </li>
            </>
          )}

          {/* Admin Specific Links */}
          {role === 'admin' && (
            <>
              <div className="divider text-gray-500 uppercase text-xs mt-4 mb-2">Admin Panel</div>
              <li>
                <NavLink
                  to="/dashboard/admin-home"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                      isActive ? 'bg-red-500 text-white shadow-md' : 'hover:bg-red-200'
                    }`
                  }
                >
                  <FaHome className="mr-3" /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/create-donation-request"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                      isActive ? 'bg-red-500 text-white shadow-md' : 'hover:bg-red-200'
                    }`
                  }
                >
                  <FaPlus className="mr-3" /> Create Donation Request
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/all-users"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                      isActive ? 'bg-red-500 text-white shadow-md' : 'hover:bg-red-200'
                    }`
                  }
                >
                  <FaUsers className="mr-3" /> All Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/all-blood-donation-requests"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                      isActive ? 'bg-red-500 text-white shadow-md' : 'hover:bg-red-200'
                    }`
                  }
                >
                  <FaHandsHelping className="mr-3" /> All Blood Requests
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/content-management"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                      isActive ? 'bg-red-500 text-white shadow-md' : 'hover:bg-red-200'
                    }`
                  }
                >
                  <FaBlog className="mr-3" /> Content Management
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/all-fundings"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                      isActive ? 'bg-red-500 text-white shadow-md' : 'hover:bg-red-200'
                    }`
                  }
                >
                  <FaDollarSign className="mr-3" /> All Fundings
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/statistics"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                      isActive ? 'bg-red-500 text-white shadow-md' : 'hover:bg-red-200'
                    }`
                  }
                >
                  <FaChartBar className="mr-3" /> Statistics
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Back to Home & Logout */}
      <div className="mt-auto pt-4 border-t border-gray-700">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                  isActive ? 'bg-red-500 text-white shadow-md' : 'hover:bg-red-200'
                }`
              }
            >
              <FaHome className="mr-3" /> Back to Home
            </NavLink>
          </li>
          <li>
            <button
              onClick={logOut}
              className="flex items-center p-3 rounded-lg w-full text-left transition-colors duration-200 hover:bg-red-500 text-red-300 hover:text-white"
            >
              <FaSignOutAlt className="mr-3" /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardSidebar;
