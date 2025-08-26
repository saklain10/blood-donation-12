# Blood Donation App - Client (Frontend)

## Project Overview

The **Blood Donation App** is a comprehensive, user-friendly platform designed to connect blood donors with individuals in urgent need of blood. Built with **React.js** on the frontend, this application aims to simplify and streamline the entire blood donation process, from requesting blood to managing donor profiles and overseeing administrative tasks. Our goal is to create a seamless and efficient ecosystem that promotes timely blood donations and ultimately saves lives by fostering a strong community of donors and recipients.

## Live Links

* **Client Live Link:** [https://ph11-assignment-12-saklain.web.app](https://ph11-assignment-12-saklain.web.app)
* **Server Live Link:** [https://ph-11-assignment-12-saklain.vercel.app](https://ph-11-assignment-12-saklain.vercel.app)
* **Server Repo Link:** [https://github.com/saklain10/blood-donation-12-server](https://github.com/saklain10/blood-donation-12-server)

## Key Features

This application offers a wide range of functionalities tailored for different user roles:

### **General Features:**

1.  **User Authentication & Authorization:**
    * Secure registration and login system using Firebase Authentication.
    * Supports three distinct user roles: **Donor**, **Volunteer**, and **Admin**, each with specific permissions and dashboard access.
    * Private routes are protected, ensuring users are redirected to login if not authenticated, but maintain their intended destination upon successful login.
2.  **Fully Responsive Design:**
    * Crafted with **Tailwind CSS** and **DaisyUI** to ensure a beautiful and adaptive user interface that looks great and functions perfectly on all devices, including mobile phones, tablets, and desktops.
3.  **Interactive UI/UX:**
    * Utilizes **Framer Motion** for smooth, engaging animations and transitions, enhancing the overall user experience.
    * Incorporates `sweetalert2` for user-friendly notifications, alerts, and confirmations for all CRUD (Create, Read, Update, Delete) operations and authentication processes.
    * Modern icons from `react-icons` are used throughout the application for better visual communication.
4.  **Real-time Data Management:**
    * Leverages **@tanstack/react-query** for efficient data fetching, caching, synchronization, and invalidation, ensuring that the UI always reflects the most up-to-date information from the backend without manual refreshes.

### **Public-facing Features:**

5.  **Home Page (`/`):**
    * Features an engaging banner with calls to action like "Join as a donor" and "Search Donors."
    * Includes a dynamically rendered "Featured" section (content can be customized).
    * Provides a "Contact Us" section with a form and contact details for inquiries.
    * A comprehensive footer with navigation links and copyright information.
6.  **Donor Search Page (`/search`):**
    * Allows public users to search for active blood donors based on specific criteria such as blood group, district, and upazila.
    * Displays search results in an intuitive card format, providing essential donor information.
7.  **Public Blood Donation Requests Page (`/blood-donation-requests`):**
    * Showcases all pending blood donation requests in a clear and organized tabular or card format.
    * Provides vital information about each request, including recipient name, location, blood group, and required date/time.
    * A "View Details" button on each request leads to a private details page (requiring login).
8.  **Blog Page (`/blog`):**
    * Displays all published blog posts, offering valuable information, news, or articles related to blood donation.
    * Each blog post has a dedicated detail page for full content viewing.

### **Dashboard Features (Private):**

9.  **Dynamic Dashboard Layout:**
    * A fully responsive sidebar layout that adapts to different screen sizes, providing easy navigation within the dashboard.
10. **User Profile Management (`/dashboard/profile`):**
    * Users can view their registered information (name, email, avatar, blood group, district, upazila).
    * An editable form allows users to update their personal details, excluding email.
11. **Donor Dashboard (`/dashboard/donor-home`):**
    * A personalized welcome message for donors.
    * Displays a summary of the donor's recent (up to 3) blood donation requests.
    * Provides a quick link to view all their donation requests.
12. **My Donation Requests (`/dashboard/my-donation-requests`):**
    * Donors can view a comprehensive list of all their created blood donation requests in a tabular format.
    * Includes filtering options by status (pending, in-progress, done, canceled) for easy management.
    * Allows donors to edit or delete their own pending requests.
    * Donors can mark their accepted (in-progress) requests as "Done" or "Canceled."
13. **Create Donation Request (`/dashboard/create-donation-request`):**
    * A dedicated form for donors and admins to create new blood donation requests.
    * Automatically populates requester's name and email.
    * Captures detailed information about the recipient, hospital, full address, blood group, required date, time, and an optional message.
    * Users with "blocked" status are prevented from creating requests.
14. **Admin Dashboard (`/dashboard/admin-home`):**
    * Provides an overview of key statistics: total users, total funding received, and total blood donation requests.
    * Offers quick access to user management, all blood donation requests, and content management.
15. **All Users Management (`/dashboard/all-users`):**
    * Admins have a complete tabular view of all registered users.
    * Functionalities to block/unblock user accounts and change user roles (make volunteer, make admin).
16. **All Blood Donation Requests (`/dashboard/all-blood-donation-requests`):**
    * Admins and Volunteers can view and manage all blood donation requests across the platform.
    * Includes filtering by status and allows status updates (e.g., pending to in-progress, in-progress to done/canceled).
    * Admins can edit and delete any request.
17. **Content Management (`/dashboard/content-management`):**
    * Admins and Volunteers can add new blog posts (initially in "draft" status).
    * Admins can publish/unpublish and delete any blog post.
    * Volunteers can edit blog content but cannot publish/unpublish or delete.
18. **Funding Page (`/funding`):**
    * Integrates **Stripe** for secure online donations, allowing users to contribute financially to support the app's operations.

## Technologies Used

* **Frontend Framework:** React.js (v18.2.0)
* **Build Tool:** Vite (v5.x)
* **Styling:**
    * Tailwind CSS (v3.x) for utility-first CSS.
    * DaisyUI (v4.x) as a Tailwind CSS component library for pre-built, customizable UI elements.
* **State Management & Data Fetching:**
    * @tanstack/react-query (v4.x) for robust data fetching, caching, and synchronization.
* **Form Management:**
    * `react-hook-form` (v7.x) for efficient and flexible form validation.
* **Authentication:**
    * Firebase Authentication (v10.x) for user registration, login, and session management.
* **HTTP Client:**
    * Axios (v1.x) for making API requests to the backend.
* **Animations:**
    * `framer-motion` (v12.x) for declarative animations.
    * `lottie-react` (v2.x) for integrating Lottie animations (e.g., loading spinners).
* **Alerts & Notifications:**
    * `sweetalert2` (v11.x) for beautiful, customizable pop-up alerts.
* **Icons:**
    * `react-icons` (v5.x) for a wide variety of customizable vector icons.
* **Routing:**
    * `react-router-dom` (v6.x) for declarative routing within the application.
* **Payment Gateway:**
    * `@stripe/react-stripe-js` and `@stripe/stripe-js` for client-side integration with Stripe.
* **Location Data:**
    * Custom local data for Bangladesh districts and upazilas (`src/data/bangladeshGeocode.js`).

## Local Setup Instructions

To run this client-side project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <YOUR_CLIENT_REPO_URL>
    cd mission-scic11-client-template-main
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file** in the root directory of the client project and add your Firebase and Stripe Publishable keys. These keys are essential for authentication and payment functionalities.
    ```env
    VITE_FIREBASE_API_KEY=your_firebase_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    VITE_FIREBASE_APP_ID=your_firebase_app_id
    VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
    ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The client application will typically be accessible at `http://localhost:5173`. Ensure your backend server is also running or deployed for full functionality..................


