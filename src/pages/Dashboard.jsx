
// src/pages/Dashboard.jsx
import { Outlet } from "react-router-dom"; // Import Outlet for nested routes
import DashboardSidebar from "../components/DashboardSidebar"; // Import the DashboardSidebar component
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";
import useRole from "../hooks/useRole"; // Import useRole

const Dashboard = () => {
  const { loading: authLoading } = useContext(AuthContext);
  const [role, isRoleLoading] = useRole(); // Get role to ensure it's loaded

  if (authLoading || isRoleLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Dashboard Sidebar */}
      <div className="lg:w-64 p-4 lg:p-6">
        <DashboardSidebar />
      </div>

      {/* Main Content Area */}
      {/* This is where nested dashboard routes (e.g., AdminHome, UserDashboard, UserProfilePage) will render */}
      <div className="flex-1 p-4 lg:p-8">
        {/* The Outlet will render the specific dashboard page based on the route */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
