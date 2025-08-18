
// // src/components/Header.jsx
// import { useContext, useState } from "react";
// import { CgMenuMotion } from "react-icons/cg";
// import { RiMenuAddLine } from "react-icons/ri";
// import { Link, NavLink } from "react-router-dom";
// import { AuthContext } from "../providers/AuthProvider";
// import { motion } from "framer-motion"; // Import motion for animations

// const Header = () => {
//   const { user, logOut } = useContext(AuthContext);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   // Updated menu items for Blood Donation App
//   const menu = [
//     {
//       name: "Home",
//       path: "/",
//     },
//     {
//       name: "Donation Requests", // Renamed from "Available Books"
//       path: "/all-pending-donation-requests", // New public route for pending requests
//     },
//     {
//       name: "Search Donors", // Added Search Donors link
//       path: "/search",
//     },
//     {
//       name: "Blog", // New route for Blog page
//       path: "/blog",
//     },
//   ];

//   // Framer Motion variants for dropdown and menu items
//   const menuVariants = {
//     hidden: { opacity: 0, y: -20 },
//     visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
//   };

//   const menuItemVariants = {
//     hidden: { opacity: 0, y: -20 },
//     visible: { opacity: 1, y: 0 },
//     hover: { scale: 1.05, color: "#3b82f6" }, // Tailwind blue-500
//   };

//   const mobileMenuVariants = {
//     hidden: { x: "100%" },
//     visible: { x: 0, transition: { type: "tween", ease: "easeOut", duration: 0.3 } },
//   };


//   return (
//     <nav className="overflow-x-clip bg-white shadow-md">
//       {user && user?.displayName && (
//         <p className="text-center text-white bg-red-500 py-2 bg-opacity-90 font-semibold">
//           Welcome {user?.displayName} 🩸🩸. Now You Can Donate Blood!
//         </p>
//       )}
//       <div className="w-11/12 mx-auto py-4 flex justify-between items-center relative">
//         <Link to="/" className="logo flex items-center gap-2">
//           <span className="text-2xl font-bold text-red-600">
//             🩸 Blood Donation
//           </span>
//         </Link>

//         {/* menu-lg start */}
//         <motion.ul
//           className="hidden lg:flex items-center gap-5"
//           variants={menuVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {menu.map((item) => (
//             <motion.li key={item.path} variants={menuItemVariants} whileHover="hover">
//               <NavLink
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `font-medium text-lg px-3 py-2 rounded-md transition-colors duration-200 ${isActive ? "bg-red-500 text-white shadow-lg" : "text-gray-700 hover:bg-gray-100"}`
//                 }
//               >
//                 {item.name}
//               </NavLink>
//             </motion.li>
//           ))}
//           {user && user?.email ? (
//             <>
//               <motion.li variants={menuItemVariants} whileHover="hover">
//                 <NavLink
//                   to="/funding"
//                   className={({ isActive }) =>
//                     `font-medium text-lg px-3 py-2 rounded-md transition-colors duration-200 ${isActive ? "bg-red-500 text-white shadow-lg" : "text-gray-700 hover:bg-gray-100"}`
//                   }
//                 >
//                   Funding
//                 </NavLink>
//               </motion.li>
//               <motion.li variants={menuItemVariants} whileHover="hover">
//                 <NavLink
//                   to="/dashboard"
//                   className={({ isActive }) =>
//                     `font-medium text-lg px-3 py-2 rounded-md transition-colors duration-200 ${isActive ? "bg-red-500 text-white shadow-lg" : "text-gray-700 hover:bg-gray-100"}`
//                   }
//                 >
//                   Dashboard
//                 </NavLink>
//               </motion.li>
//               {/* Logout button moved here, next to Dashboard */}
//               <motion.li variants={menuItemVariants} whileHover="hover">
//                 <button
//                   onClick={logOut}
//                   className="font-medium text-lg text-red-600 hover:text-red-800 py-2 px-3 rounded-md transition-colors duration-200 bg-red-100 hover:bg-red-500 shadow-sm"
//                 >
//                   Logout
//                 </button>
//               </motion.li>
//               {/* User Avatar with Dropdown - Now only contains Profile link */}
//               <motion.li className="relative group ml-2" variants={menuItemVariants}> {/* This group controls the dropdown's visibility */}
//                 <img
//                   src={user?.photoURL || "https://placehold.co/40x40/cccccc/ffffff?text=User"}
//                   alt="User Avatar"
//                   className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-400 hover:border-blue-600 transition-all duration-200 shadow-md"
//                 />
//                 {/* Dropdown content */}
//                 <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 hidden group-hover:block z-50">
//                   <span className="block px-4 py-2 text-sm text-gray-700 font-semibold truncate">{user?.displayName || user?.email}</span>
//                   <hr className="my-1" />
//                   <Link to="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">Profile</Link>
//                 </div>
//               </motion.li>
//             </>
//           ) : (
//             <>
//               <motion.li variants={menuItemVariants} whileHover="hover">
//                 <NavLink
//                   to="/login"
//                   className={({ isActive }) =>
//                     `font-medium text-lg px-3 py-2 rounded-md transition-colors duration-200 ${isActive ? "bg-red-500 text-white shadow-lg" : "text-gray-700 hover:bg-gray-100"}`
//                   }
//                 >
//                   Login
//                 </NavLink>
//               </motion.li>
//               <motion.li variants={menuItemVariants} whileHover="hover">
//                 <NavLink
//                   to="/registration"
//                   className={({ isActive }) =>
//                     `font-medium text-lg px-3 py-2 rounded-md transition-colors duration-200 ${isActive ? "bg-red-500 text-white shadow-lg" : "text-gray-700 hover:bg-gray-100"}`
//                   }
//                 >
//                   Register
//                 </NavLink>
//               </motion.li>
//             </>
//           )}
//         </motion.ul>

//         {/* Mobile menu */}
//         <div className="lg:hidden">
//           {!isMenuOpen ? (
//             <RiMenuAddLine
//               onClick={() => {
//                 setIsMenuOpen(true);
//               }}
//               className="text-3xl cursor-pointer text-gray-700 hover:text-blue-600 transition-colors duration-200"
//             ></RiMenuAddLine>
//           ) : (
//             <CgMenuMotion
//               onClick={() => setIsMenuOpen(false)}
//               className="text-3xl cursor-pointer text-gray-700 hover:text-blue-600 transition-colors duration-200"
//             ></CgMenuMotion>
//           )}

//           <motion.ul
//             className={`flex flex-col lg:hidden gap-5 absolute z-50 bg-white shadow-lg w-full top-[calc(100%+10px)] left-0 p-4 rounded-b-lg border-t border-gray-200 ${
//               isMenuOpen ? "block" : "hidden"
//             }`}
//             initial="hidden"
//             animate={isMenuOpen ? "visible" : "hidden"}
//             variants={mobileMenuVariants}
//             onClick={() => setIsMenuOpen(false)} // Close menu on item click
//           >
//             {menu.map((item) => (
//               <motion.li key={item.path} variants={menuItemVariants}>
//                 <NavLink
//                   className="block w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 transition duration-200 text-gray-700"
//                   to={item.path}
//                 >
//                   {item.name}
//                 </NavLink>
//               </motion.li>
//             ))}
//             {user && user?.email ? (
//               <>
//                 <motion.li variants={menuItemVariants}>
//                   <NavLink
//                     to="/funding"
//                     className="block w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 transition duration-200 text-gray-700"
//                   >
//                     Funding
//                   </NavLink>
//                 </motion.li>
//                 <motion.li variants={menuItemVariants}>
//                   <NavLink
//                     to="/dashboard"
//                     className="block w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 transition duration-200 text-gray-700"
//                   >
//                     Dashboard
//                   </NavLink>
//                 </motion.li>
//                 {/* Profile link in mobile menu */}
//                 <motion.li variants={menuItemVariants}>
//                   <Link to="/dashboard/profile" className="block w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 transition duration-200 text-gray-700">
//                     Profile
//                   </Link>
//                 </motion.li>
//                 {/* Logout button in mobile menu */}
//                 <motion.li variants={menuItemVariants}>
//                   <button onClick={logOut} className="block w-full text-left py-2 px-3 rounded-md text-red-600 hover:bg-red-100 transition duration-200">
//                     Logout
//                   </button>
//                 </motion.li>
//               </>
//             ) : (
//               <>
//                 <motion.li variants={menuItemVariants}>
//                   <NavLink
//                     to="/login"
//                     className="block w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 transition duration-200 text-gray-700"
//                   >
//                     Login
//                   </NavLink>
//                 </motion.li>
//                 <motion.li variants={menuItemVariants}>
//                   <NavLink
//                     to="/registration"
//                     className="block w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 transition duration-200 text-gray-700"
//                   >
//                     Register
//                   </NavLink>
//                 </motion.li>
//               </>
//             )}
//           </motion.ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Header;


// src/components/Header.jsx
import { useContext, useState, useEffect } from "react";
import { CgMenuMotion } from "react-icons/cg";
import { RiMenuAddLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { motion } from "framer-motion";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State to control the visibility of the welcome message
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

  // Effect to hide the welcome message after 5 seconds
  useEffect(() => {
    let timer;
    if (user) {
      // Set a timer to hide the message
      timer = setTimeout(() => {
        setShowWelcomeMessage(false);
      }, 5000);
    }
    // Cleanup function to clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [user]);

  // Updated menu items for Blood Donation App
  const menu = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Donation Requests", // Renamed from "Available Books"
      path: "/all-pending-donation-requests", // New public route for pending requests
    },
    {
      name: "Search Donors", // Added Search Donors link
      path: "/search",
    },
    {
      name: "Blog", // New route for Blog page
      path: "/blog",
    },
  ];

  // Framer Motion variants for dropdown and menu items
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05, color: "#3b82f6" }, // Tailwind blue-500
  };

  const mobileMenuVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { type: "tween", ease: "easeOut", duration: 0.3 } },
  };

  return (
    // Navbar is now sticky with full width
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      {/* Welcome message that disappears after 5 seconds */}
      {showWelcomeMessage && user && user?.displayName && (
        <p className="text-center text-white bg-red-500 py-2 bg-opacity-90 font-semibold">
          Welcome {user?.displayName} 🩸🩸. Now You Can Donate Blood!
        </p>
      )}

      <div className="w-11/12 mx-auto py-4 flex justify-between items-center relative">
        <Link to="/" className="logo flex items-center gap-2">
          <span className="text-2xl font-bold text-red-600">
            🩸 Blood Donation
          </span>
        </Link>

        {/* menu-lg start */}
        <motion.ul
          className="hidden lg:flex items-center gap-5"
          variants={menuVariants}
          initial="hidden"
          animate="visible"
        >
          {menu.map((item) => (
            <motion.li key={item.path} variants={menuItemVariants} whileHover="hover">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `font-medium text-lg px-3 py-2 rounded-md transition-colors duration-200 ${isActive ? "bg-red-500 text-white shadow-lg" : "text-gray-700 hover:bg-gray-100"}`
                }
              >
                {item.name}
              </NavLink>
            </motion.li>
          ))}
          {user && user?.email ? (
            <>
              <motion.li variants={menuItemVariants} whileHover="hover">
                <NavLink
                  to="/funding"
                  className={({ isActive }) =>
                    `font-medium text-lg px-3 py-2 rounded-md transition-colors duration-200 ${isActive ? "bg-red-500 text-white shadow-lg" : "text-gray-700 hover:bg-gray-100"}`
                  }
                >
                  Funding
                </NavLink>
              </motion.li>
              <motion.li variants={menuItemVariants} whileHover="hover">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `font-medium text-lg px-3 py-2 rounded-md transition-colors duration-200 ${isActive ? "bg-red-500 text-white shadow-lg" : "text-gray-700 hover:bg-gray-100"}`
                  }
                >
                  Dashboard
                </NavLink>
              </motion.li>
              {/* Logout button moved here, next to Dashboard */}
              <motion.li variants={menuItemVariants} whileHover="hover">
                <button
                  onClick={logOut}
                  className="font-medium text-lg text-red-600 hover:text-red-800 py-2 px-3 rounded-md transition-colors duration-200 bg-red-100 hover:bg-red-500 shadow-sm"
                >
                  Logout
                </button>
              </motion.li>
              {/* User Avatar with Dropdown - Now only contains Profile link */}
              <motion.li className="relative group ml-2" variants={menuItemVariants}> {/* This group controls the dropdown's visibility */}
                <img
                  src={user?.photoURL || "https://placehold.co/40x40/cccccc/ffffff?text=User"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-400 hover:border-blue-600 transition-all duration-200 shadow-md"
                />
                {/* Dropdown content */}
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 hidden group-hover:block z-50">
                  <span className="block px-4 py-2 text-sm text-gray-700 font-semibold truncate">{user?.displayName || user?.email}</span>
                  <hr className="my-1" />
                  <Link to="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">Profile</Link>
                </div>
              </motion.li>
            </>
          ) : (
            <>
              <motion.li variants={menuItemVariants} whileHover="hover">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `font-medium text-lg px-3 py-2 rounded-md transition-colors duration-200 ${isActive ? "bg-red-500 text-white shadow-lg" : "text-gray-700 hover:bg-gray-100"}`
                  }
                >
                  Login
                </NavLink>
              </motion.li>
              <motion.li variants={menuItemVariants} whileHover="hover">
                <NavLink
                  to="/registration"
                  className={({ isActive }) =>
                    `font-medium text-lg px-3 py-2 rounded-md transition-colors duration-200 ${isActive ? "bg-red-500 text-white shadow-lg" : "text-gray-700 hover:bg-gray-100"}`
                  }
                >
                  Register
                </NavLink>
              </motion.li>
            </>
          )}
        </motion.ul>

        {/* Mobile menu */}
        <div className="lg:hidden">
          {!isMenuOpen ? (
            <RiMenuAddLine
              onClick={() => {
                setIsMenuOpen(true);
              }}
              className="text-3xl cursor-pointer text-gray-700 hover:text-blue-600 transition-colors duration-200"
            ></RiMenuAddLine>
          ) : (
            <CgMenuMotion
              onClick={() => setIsMenuOpen(false)}
              className="text-3xl cursor-pointer text-gray-700 hover:text-blue-600 transition-colors duration-200"
            ></CgMenuMotion>
          )}

          <motion.ul
            className={`flex flex-col lg:hidden gap-5 absolute z-50 bg-white shadow-lg w-full top-[calc(100%+10px)] left-0 p-4 rounded-b-lg border-t border-gray-200 ${
              isMenuOpen ? "block" : "hidden"
            }`}
            initial="hidden"
            animate={isMenuOpen ? "visible" : "hidden"}
            variants={mobileMenuVariants}
            onClick={() => setIsMenuOpen(false)} // Close menu on item click
          >
            {menu.map((item) => (
              <motion.li key={item.path} variants={menuItemVariants}>
                <NavLink
                  className="block w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 transition duration-200 text-gray-700"
                  to={item.path}
                >
                  {item.name}
                </NavLink>
              </motion.li>
            ))}
            {user && user?.email ? (
              <>
                <motion.li variants={menuItemVariants}>
                  <NavLink
                    to="/funding"
                    className="block w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 transition duration-200 text-gray-700"
                  >
                    Funding
                  </NavLink>
                </motion.li>
                <motion.li variants={menuItemVariants}>
                  <NavLink
                    to="/dashboard"
                    className="block w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 transition duration-200 text-gray-700"
                  >
                    Dashboard
                  </NavLink>
                </motion.li>
                {/* Profile link in mobile menu */}
                <motion.li variants={menuItemVariants}>
                  <Link to="/dashboard/profile" className="block w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 transition duration-200 text-gray-700">
                    Profile
                  </Link>
                </motion.li>
                {/* Logout button in mobile menu */}
                <motion.li variants={menuItemVariants}>
                  <button onClick={logOut} className="block w-full text-left py-2 px-3 rounded-md text-red-600 hover:bg-red-100 transition duration-200">
                    Logout
                  </button>
                </motion.li>
              </>
            ) : (
              <>
                <motion.li variants={menuItemVariants}>
                  <NavLink
                    to="/login"
                    className="block w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 transition duration-200 text-gray-700"
                  >
                    Login
                  </NavLink>
                </motion.li>
                <motion.li variants={menuItemVariants}>
                  <NavLink
                    to="/registration"
                    className="block w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 transition duration-200 text-gray-700"
                  >
                    Register
                  </NavLink>
                </motion.li>
              </>
            )}
          </motion.ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
