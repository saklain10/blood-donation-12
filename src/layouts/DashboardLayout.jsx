
// src/layouts/DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar"; // Import the DashboardSidebar component

const DashboardLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 mt-20">
      {/* Sidebar for Dashboard */}
      <div className="">
        <DashboardSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 lg:p-8">
        <Outlet /> {/* This is where the nested dashboard routes will render */}
      </div>
    </div>
  );
};

export default DashboardLayout;
