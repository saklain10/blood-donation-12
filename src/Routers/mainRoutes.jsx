
// src/Routers/mainRoutes.jsx
import axios from "axios";
import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Error from "../pages/Error";

// Public Pages
import AllPendingDonationRequests from "../pages/AllPendingDonationRequests";
import DonationRequestDetailsPage from "../pages/DonationRequestDetailsPage";
import BlogPage from "../pages/BlogPage";
import BlogDetailsPage from "../pages/BlogDetailsPage"; // Ensure this is imported
import SearchPage from "../pages/SearchPage";
import FundingPage from "../pages/FundingPage";

// Dashboard Pages
import UserProfilePage from "../pages/UserProfilePage";
import CreateDonationRequest from "../pages/CreateDonationRequest";
import MyDonationRequests from "../pages/MyDonationRequests";
import EditDonationRequestPage from "../pages/EditDonationRequestPage";
import AllBloodDonationRequests from "../pages/AllBloodDonationRequest";
import ContentManagement from "../pages/ContentManagement";
import AddBlogPage from "../pages/BlogPage";
import EditBlogPage from "../pages/EditBlogPage"; // Ensure this is imported
import AllUsers from "../pages/AllUsers";
import AllFundings from "../pages/AllFundings";
import Statistics from "../pages/Statistics";

// Dashboard Home Pages (specific to roles)
import UserDashboard from "../pages/UserDashboard";
import ModeratorDashboard from "../pages/ModeratorDashboard";
import AdminHome from "../pages/AdminHome";

import PrivateRoute from "./PrivateRoute";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/LoadingSpinner";

// A component to handle the redirection logic based on user role
const DashboardHomeRedirector = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) {
    return <LoadingSpinner />;
  }

  if (role === 'admin') {
    return <Navigate to="/dashboard/admin-home" replace />;
  } else if (role === 'volunteer') {
    return <Navigate to="/dashboard/moderator-home" replace />;
  } else if (role === 'donor') {
    return <Navigate to="/dashboard/donor-home" replace />;
  } else {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">Access Denied!</h2>
        <p className="text-gray-600">Your role is not recognized or you do not have access to the dashboard.</p>
      </div>
    );
  }
};


const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-pending-donation-requests",
        element: <AllPendingDonationRequests />,
      },
      {
        path: "/donation-details/:id",
        element: <PrivateRoute><DonationRequestDetailsPage /></PrivateRoute>,
        loader: async ({ params }) => {
          const { data } = await axios.get(`http://localhost:5000/donation-details/${params.id}`);
          return data;
        },
      },
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/blog-details/:id",
        element: <BlogDetailsPage />,
        loader: async ({ params }) => {
          const res = await axios.get(`http://localhost:5000/blog-details/${params.id}`);
          return res.data;
        },
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "registration",
        element: <Register />,
      },
      {
        path: "/funding",
        element: <PrivateRoute><FundingPage /></PrivateRoute>,
      },
      {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
          {
            index: true,
            element: <DashboardHomeRedirector />,
          },
          {
            path: "profile",
            element: <UserProfilePage />,
          },
          // Donor Routes
          {
            path: "donor-home",
            element: <UserDashboard />,
          },
          {
            path: "create-donation-request",
            element: <CreateDonationRequest />,
          },
          {
            path: "my-donation-requests",
            element: <MyDonationRequests />,
          },
          {
            path: "edit-donation-request/:id",
            element: <EditDonationRequestPage />,
            loader: async ({ params }) => {
              const { data } = await axios.get(`http://localhost:5000/donation-details/${params.id}`);
              return data;
            },
          },
          // Volunteer/Moderator Routes
          {
            path: "moderator-home",
            element: <ModeratorDashboard />,
          },
          {
            path: "all-blood-donation-requests",
            element: <AllBloodDonationRequests />,
          },
          {
            path: "content-management",
            element: <ContentManagement />,
          },
          {
            path: "content-management/add-blog",
            element: <AddBlogPage />,
          },
          {
            path: "content-management/edit-blog/:id", // Route for editing a blog
            element: <EditBlogPage />,
            loader: async ({ params }) => {
              const res = await axios.get(`http://localhost:5000/blog-details/${params.id}`); // Fetch blog details
              return res.data;
            },
          },
          // Admin Routes
          {
            path: "admin-home",
            element: <AdminHome />,
          },
          {
            path: "all-users",
            element: <AllUsers />,
          },
          {
            path: "all-fundings",
            element: <AllFundings />,
          },
          {
            path: "statistics",
            element: <Statistics />,
          },
        ],
      },
    ],
  },
]);

export default mainRoutes;
