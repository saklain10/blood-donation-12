// // src/pages/Banner.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import Lottie from 'lottie-react';
// import { motion } from 'framer-motion'; // Import motion from framer-motion

// // Import your Lottie JSON files
// import bannerAnimation from '../assets/bannerAnimation.json'; // Ensure this path is correct
// import bloodDropAnimation from '../assets/bloodDropAnimation.json'; // Ensure this path is correct

// const Banner = () => {
//   // Framer Motion variants for animations
//   const fadeInVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
//   };

//   const staggerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.3,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//   };

//   return (
//     <div className="bg-gray-50 font-inter">
//       {/* Banner Section */}
//       <section className="relative bg-gradient-to-r from-red-600 to-red-800 text-white py-20 md:py-32 overflow-hidden">
//         <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between z-10 relative">
//           <motion.div
//             className="md:w-1/2 text-center md:text-left mb-10 md:mb-0"
//             initial="hidden"
//             animate="visible"
//             variants={staggerVariants}
//           >
//             <motion.h1
//               className="text-4xl md:text-6xl font-extrabold leading-tight mb-6"
//               variants={itemVariants}
//             >
//               Donate Blood, Save Lives.
//             </motion.h1>
//             <motion.p
//               className="text-lg md:text-xl mb-8 opacity-90"
//               variants={itemVariants}
//             >
//               Every drop counts. Join our community to make a difference.
//             </motion.p>
//             <motion.div
//               className="flex flex-col sm:flex-row justify-center md:justify-start gap-4"
//               variants={itemVariants}
//             >
//               <Link
//                 to="/registration"
//                 className="btn bg-white text-red-700 hover:bg-red-100 px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
//               >
//                 Join as a Donor
//               </Link>
//               <Link
//                 to="/search"
//                 className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-700 px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
//               >
//                 Search Donors
//               </Link>
//             </motion.div>
//           </motion.div>
//           <motion.div
//             className="md:w-1/2 flex justify-center md:justify-end"
//             initial={{ opacity: 0, x: 100 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1, ease: "easeOut" }}
//           >
//             {/* Lottie animation for banner */}
//             <Lottie animationData={bannerAnimation} loop={true} className="w-full max-w-md md:max-w-lg" />
//           </motion.div>
//         </div>
//         {/* Background elements for visual appeal */}
//         <div className="absolute top-0 left-0 w-full h-full opacity-10">
//           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
//             <circle cx="20" cy="20" r="15" fill="currentColor" className="text-red-500" />
//             <circle cx="80" cy="80" r="20" fill="currentColor" className="text-red-400" />
//             <rect x="50" y="10" width="10" height="10" fill="currentColor" className="text-red-300" />
//           </svg>
//         </div>
//       </section>

//       {/* Featured Section */}
//       <section className="py-16 md:py-24 bg-white">
//         <div className="container mx-auto px-6 text-center">
//           <motion.h2
//             className="text-3xl md:text-4xl font-bold text-gray-800 mb-12"
//             initial={{ opacity: 0, y: -50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, amount: 0.5 }}
//             transition={{ duration: 0.8 }}
//           >
//             Why Donate Blood?
//           </motion.h2>
//           <motion.div
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.3 }}
//             variants={staggerVariants}
//           >
//             {/* Feature Card 1 */}
//             <motion.div
//               className="bg-red-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
//               variants={itemVariants}
//             >
//               <div className="text-red-600 text-5xl mb-6 flex justify-center">
//                 <Lottie animationData={bloodDropAnimation} loop={true} className="w-24 h-24" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-4">Save Lives</h3>
//               <p className="text-gray-700">
//                 Your single donation can save up to three lives. It's a simple act with a profound impact.
//               </p>
//             </motion.div>
//             {/* Feature Card 2 */}
//             <motion.div
//               className="bg-red-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
//               variants={itemVariants}
//             >
//               <div className="text-red-600 text-5xl mb-6 flex justify-center">
//                  <Lottie animationData={bloodDropAnimation} loop={true} className="w-24 h-24" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Impact</h3>
//               <p className="text-gray-700">
//                 Donating blood strengthens our community by ensuring a stable supply for emergencies and medical treatments.
//               </p>
//             </motion.div>
//             {/* Feature Card 3 */}
//             <motion.div
//               className="bg-red-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
//               variants={itemVariants}
//             >
//               <div className="text-red-600 text-5xl mb-6 flex justify-center">
//                  <Lottie animationData={bloodDropAnimation} loop={true} className="w-24 h-24" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-4">Health Benefits</h3>
//               <p className="text-gray-700">
//                 Regular blood donation can help reduce iron stores, which may reduce the risk of heart disease.
//               </p>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Contact Us Section */}
//       <section className="py-16 md:py-24 bg-gray-100">
//         <div className="container mx-auto px-6">
//           <motion.h2
//             className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12"
//             initial={{ opacity: 0, y: -50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, amount: 0.5 }}
//             transition={{ duration: 0.8 }}
//           >
//             Contact Us
//           </motion.h2>
//           <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
//             {/* Contact Form */}
//             <motion.div
//               className="bg-white p-8 rounded-lg shadow-lg w-full lg:w-1/2 max-w-xl"
//               initial={{ opacity: 0, x: -100 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 0.8 }}
//             >
//               <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h3>
//               <form className="space-y-4">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
//                   <input
//                     type="text"
//                     id="name"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//                     placeholder="John Doe"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
//                   <input
//                     type="email"
//                     id="email"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//                     placeholder="john.doe@example.com"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
//                   <textarea
//                     id="message"
//                     rows="5"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//                     placeholder="Your message..."
//                   ></textarea>
//                 </div>
//                 <button
//                   type="submit"
//                   className="btn bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-200 shadow-lg w-full"
//                 >
//                   Send Message
//                 </button>
//               </form>
//             </motion.div>
//             {/* Contact Info */}
//             <motion.div
//               className="lg:w-1/2 text-center lg:text-left"
//               initial={{ opacity: 0, x: 100 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 0.8 }}
//             >
//               <h3 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h3>
//               <p className="text-gray-700 text-lg mb-2">
//                 Have questions or need assistance? Feel free to reach out to us!
//               </p>
//               <p className="text-red-600 text-3xl font-bold mt-6">
//                 +880 123 456 7890
//               </p>
//               <p className="text-gray-700 mt-2">
//                 (Available 24/7 for emergencies)
//               </p>
//             </motion.div>
//           </div>
//         </div>
//       </section>
//       <footer className="bg-red-700 text-white py-4 text-center">
//       <div className="container mx-auto px-4">
//         <p>&copy; {new Date().getFullYear()} Blood Donation App. All rights reserved.</p>
//         <p className="text-sm mt-1">Designed with ❤️ for a noble cause.</p>
//       </div>
//     </footer>
//     </div>
//   );
// };

// export default Banner;


// // import React from 'react';

// // // Main App component that contains the Banner
// // // The entire application is contained within this single component.
// // const App = () => {

// //   // Sample data for the Recent Donations section
// //   const recentDonations = [
// //     { id: 1, title: 'Life Saved in Urgent Surgery', image: 'https://placehold.co/600x400/FF5757/FFFFFF?text=Donor+1', description: 'A critical blood donation helped a patient undergoing emergency surgery. Your contribution matters.' },
// //     { id: 2, title: 'Supporting Cancer Treatment', image: 'https://placehold.co/600x400/FF5757/FFFFFF?text=Donor+2', description: 'Blood transfusions are vital for chemotherapy patients. Thank you to all our regular donors.' },
// //     { id: 3, title: 'Newborn received fresh blood', image: 'https://placehold.co/600x400/FF5757/FFFFFF?text=Donor+3', description: 'A tiny life was given a second chance thanks to a heroic blood donor. Every drop counts.' },
// //   ];

// //   // Updated Testimonials with Bangladeshi names and images
// //   const testimonials = [
// //     { id: 1, name: 'Tanjin B.', review: 'Donating blood was so easy and the staff was amazing. I feel proud to have helped someone in need.', avatar: 'https://i.ibb.co/L5r647k/tanjin.jpg' },
// //     { id: 2, name: 'Anik A.', review: 'I was in a car accident and needed a transfusion. I’m alive today because of a stranger\'s kindness. Thank you.', avatar: 'https://i.ibb.co/z5pB8tJ/anik.jpg' },
// //     { id: 3, name: 'Shaila P.', review: 'This app made it so simple to find a donor for my father. It\'s a lifesaver!', avatar: 'https://i.ibb.co/3sXf2QJ/shaila.jpg' }
// //   ];

// //   return (
// //     <div className="bg-gray-50 font-sans leading-normal tracking-normal text-gray-800">
// //       {/* Navbar Section */}
// //       <nav className="bg-white shadow-md sticky top-0 z-50 rounded-b-xl">
// //         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
// //           <a href="#" className="text-red-700 text-2xl font-bold rounded-lg">BloodBridge</a>
// //           <div className="flex space-x-4">
// //             <a href="#" className="text-gray-600 hover:text-red-700 font-medium transition-colors duration-300">Home</a>
// //             <a href="#" className="text-gray-600 hover:text-red-700 font-medium transition-colors duration-300">Find Donors</a>
// //             <a href="#" className="text-gray-600 hover:text-red-700 font-medium transition-colors duration-300">About</a>
// //             <a href="#" className="text-gray-600 hover:text-red-700 font-medium transition-colors duration-300">Contact</a>
// //           </div>
// //         </div>
// //       </nav>

// //       {/* Banner Section */}
// //       <section className="relative bg-gradient-to-r from-red-600 to-red-800 text-white py-20 md:py-32 overflow-hidden rounded-b-3xl shadow-xl">
// //         <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between z-10 relative">
// //           <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
// //             <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
// //               Donate Blood, Save Lives.
// //             </h1>
// //             <p className="text-lg md:text-xl mb-8 opacity-90">
// //               Every drop counts. Join our community to make a difference.
// //             </p>
// //             <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
// //               <a
// //                 href="#"
// //                 className="btn bg-white text-red-700 hover:bg-red-100 px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
// //               >
// //                 Join as a Donor
// //               </a>
// //               <a
// //                 href="#"
// //                 className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-700 px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
// //               >
// //                 Search Donors
// //               </a>
// //             </div>
// //           </div>
// //           <div className="md:w-1/2 flex justify-center md:justify-end">
// //             {/* Replaced Lottie animation with a simple visual cue */}
// //             <div className="relative w-full max-w-md md:max-w-lg h-64 bg-white bg-opacity-10 rounded-full flex items-center justify-center shadow-inner">
// //               <span className="text-6xl text-white opacity-80 animate-pulse">
// //                 🩸
// //               </span>
// //             </div>
// //           </div>
// //         </div>
// //         <div className="absolute top-0 left-0 w-full h-full opacity-10">
// //           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
// //             <circle cx="20" cy="20" r="15" fill="currentColor" className="text-red-500" />
// //             <circle cx="80" cy="80" r="20" fill="currentColor" className="text-red-400" />
// //             <rect x="50" y="10" width="10" height="10" fill="currentColor" className="text-red-300" />
// //           </svg>
// //         </div>
// //       </section>

// //       {/* Why Donate Blood? Section */}
// //       <section className="py-16 md:py-24 bg-white">
// //         <div className="container mx-auto px-6 text-center">
// //           <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
// //             Why Donate Blood?
// //           </h2>
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
// //             <div className="bg-red-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
// //               <div className="text-red-600 text-5xl mb-6 flex justify-center">
// //                 {/* Replaced Lottie animation with inline SVG */}
// //                 <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 14a4 4 0 100-8 4 4 0 000 8z" fill="#DC2626"/>
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 16a4 4 0 100-8 4 4 0 000 8z" fill="#FFFFFF"/>
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 009-9H3a9 9 0 009 9z" />
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 009-9H3a9 9 0 009 9z" />
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17v-5h5v5h-5z" />
// //                 </svg>
// //               </div>
// //               <h3 className="text-xl font-semibold text-gray-900 mb-4">Save Lives</h3>
// //               <p className="text-gray-700 mb-4">
// //                 Your single donation can save up to three lives. It's a simple act with a profound impact.
// //               </p>
// //               <a href="#" className="text-red-600 font-semibold hover:underline">See more &rarr;</a>
// //             </div>
// //             <div className="bg-red-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
// //               <div className="text-red-600 text-5xl mb-6 flex justify-center">
// //                 {/* Replaced Lottie animation with inline SVG */}
// //                 <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" fill="#DC2626"/>
// //                 </svg>
// //               </div>
// //               <h3 className="text-xl font-semibold text-gray-900 mb-4">Strengthen Community</h3>
// //               <p className="text-gray-700 mb-4">
// //                 Donating blood strengthens our community by ensuring a stable supply for emergencies.
// //               </p>
// //               <a href="#" className="text-red-600 font-semibold hover:underline">See more &rarr;</a>
// //             </div>
// //             <div className="bg-red-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
// //               <div className="text-red-600 text-5xl mb-6 flex justify-center">
// //                 {/* Replaced Lottie animation with inline SVG */}
// //                 <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 14a4 4 0 100-8 4 4 0 000 8z" fill="#DC2626"/>
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 16a4 4 0 100-8 4 4 0 000 8z" fill="#FFFFFF"/>
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 009-9H3a9 9 0 009 9z" />
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 009-9H3a9 9 0 009 9z" />
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17v-5h5v5h-5z" />
// //                 </svg>
// //               </div>
// //               <h3 className="text-xl font-semibold text-gray-900 mb-4">Health Benefits</h3>
// //               <p className="text-gray-700 mb-4">
// //                 Regular blood donation can help reduce iron stores, which may reduce the risk of heart disease.
// //               </p>
// //               <a href="#" className="text-red-600 font-semibold hover:underline">See more &rarr;</a>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* How It Works Section */}
// //       <section className="py-16 md:py-24 bg-gray-100">
// //         <div className="container mx-auto px-6 text-center">
// //           <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
// //             The Donation Process
// //           </h2>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //             <div className="flex flex-col items-center text-center p-6">
// //               <div className="bg-red-500 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mb-4">1</div>
// //               <h3 className="text-xl font-semibold text-gray-800 mb-2">Register</h3>
// //               <p className="text-gray-700">Sign up on our platform and complete your donor profile.</p>
// //             </div>
// //             <div className="flex flex-col items-center text-center p-6">
// //               <div className="bg-red-500 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mb-4">2</div>
// //               <h3 className="text-xl font-semibold text-gray-800 mb-2">Find a Center</h3>
// //               <p className="text-gray-700">Locate a nearby blood donation center or event near you.</p>
// //             </div>
// //             <div className="flex flex-col items-center text-center p-6">
// //               <div className="bg-red-500 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mb-4">3</div>
// //               <h3 className="text-xl font-semibold text-gray-800 mb-2">Donate</h3>
// //               <p className="text-gray-700">Give a safe and simple donation that can save a life.</p>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Upcoming Events Section (Sales Promotion) */}
// //       <section className="py-16 md:py-24 bg-white">
// //         <div className="container mx-auto px-6 text-center">
// //           <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
// //             Upcoming Blood Drives
// //           </h2>
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
// //             <div className="bg-red-50 p-6 rounded-lg shadow-md flex flex-col justify-between">
// //               <div className="flex justify-center mb-4">
// //                 {/* Replaced Lottie with inline SVG */}
// //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
// //                   <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
// //                 </svg>
// //               </div>
// //               <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Blood Drive</h3>
// //               <p className="text-gray-700 mb-4"><b>Date:</b> October 26, 2025<br/><b>Location:</b> City Hall</p>
// //               <a href="#" className="btn bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-full font-semibold transition-colors duration-300">Details</a>
// //             </div>
// //             <div className="bg-red-50 p-6 rounded-lg shadow-md flex flex-col justify-between">
// //               <div className="flex justify-center mb-4">
// //                 {/* Replaced Lottie with inline SVG */}
// //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
// //                   <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
// //                 </svg>
// //               </div>
// //               <h3 className="text-xl font-semibold text-gray-900 mb-2">University Health Fair</h3>
// //               <p className="text-gray-700 mb-4"><b>Date:</b> November 10, 2025<br/><b>Location:</b> State University Campus</p>
// //               <a href="#" className="btn bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-full font-semibold transition-colors duration-300">Details</a>
// //             </div>
// //             <div className="bg-red-50 p-6 rounded-lg shadow-md flex flex-col justify-between">
// //               <div className="flex justify-center mb-4">
// //                 {/* Replaced Lottie with inline SVG */}
// //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
// //                   <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
// //                 </svg>
// //               </div>
// //               <h3 className="text-xl font-semibold text-gray-900 mb-2">Hospital A & B Charity</h3>
// //               <p className="text-gray-700 mb-4"><b>Date:</b> December 5, 2025<br/><b>Location:</b> St. Mary's Hospital</p>
// //               <a href="#" className="btn bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-full font-semibold transition-colors duration-300">Details</a>
// //             </div>
// //             <div className="bg-red-50 p-6 rounded-lg shadow-md flex flex-col justify-between">
// //               <div className="flex justify-center mb-4">
// //                 {/* Replaced Lottie with inline SVG */}
// //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
// //                   <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
// //                 </svg>
// //               </div>
// //               <h3 className="text-xl font-semibold text-gray-900 mb-2">Winter Donation Marathon</h3>
// //               <p className="text-gray-700 mb-4"><b>Date:</b> December 20-22, 2025<br/><b>Location:</b> Central Park Hall</p>
// //               <a href="#" className="btn bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-full font-semibold transition-colors duration-300">Details</a>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
      
// //       {/* Recent Donations Section */}
// //       <section className="py-16 md:py-24 bg-gray-100">
// //         <div className="container mx-auto px-6 text-center">
// //           <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
// //             Recent Success Stories
// //           </h2>
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
// //             {recentDonations.map(story => (
// //               <div 
// //                 key={story.id} 
// //                 className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
// //               >
// //                 <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden">
// //                     <img src={story.image} alt={story.title} className="w-full h-full object-cover"/>
// //                 </div>
// //                 <div className="p-6 flex flex-col justify-between flex-1">
// //                   <div>
// //                     <h3 className="text-xl font-semibold text-gray-900 mb-2">{story.title}</h3>
// //                     <p className="text-gray-700 mb-4">{story.description}</p>
// //                   </div>
// //                   <a href="#" className="text-red-600 font-semibold hover:underline mt-auto">See more &rarr;</a>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Reviews/Testimonials Section */}
// //       <section className="py-16 md:py-24 bg-white">
// //         <div className="container mx-auto px-6 text-center">
// //           <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
// //             What Our Community Says
// //           </h2>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //             {testimonials.map(testimonial => (
// //               <div 
// //                 key={testimonial.id} 
// //                 className="bg-red-50 p-6 rounded-lg shadow-md flex flex-col items-center text-center h-full justify-center hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
// //               >
// //                 <img src={testimonial.avatar} alt={testimonial.name} className="w-20 h-20 rounded-full mb-4 object-cover"/>
// //                 <p className="text-gray-700 italic mb-4">"{testimonial.review}"</p>
// //                 <p className="font-semibold text-gray-900">- {testimonial.name}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Newsletter Section */}
// //       <section className="py-16 md:py-24 bg-red-600 text-white rounded-t-3xl shadow-xl">
// //         <div className="container mx-auto px-6 text-center">
// //           <h2 className="text-3xl md:text-4xl font-bold mb-4">
// //             Stay Informed. Join Our Newsletter.
// //           </h2>
// //           <p className="text-lg mb-8 opacity-90">
// //             Get updates on blood needs, upcoming drives, and impact stories.
// //           </p>
// //           <form 
// //             className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto"
// //           >
// //             <input
// //               type="email"
// //               placeholder="Enter your email address"
// //               className="flex-1 px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
// //             />
// //             <button 
// //               type="submit" 
// //               className="btn bg-white text-red-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-full transition-colors duration-300"
// //             >
// //               Subscribe
// //             </button>
// //           </form>
// //         </div>
// //       </section>

// //       {/* Contact Us Section */}
// //       <section className="py-16 md:py-24 bg-gray-100">
// //         <div className="container mx-auto px-6">
// //           <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
// //             Contact Us
// //           </h2>
// //           <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
// //             <div
// //               className="bg-white p-8 rounded-lg shadow-lg w-full lg:w-1/2 max-w-xl"
// //             >
// //               <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h3>
// //               <form className="space-y-4">
// //                 <div>
// //                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
// //                   <input
// //                     type="text"
// //                     id="name"
// //                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
// //                     placeholder="John Doe"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
// //                   <input
// //                     type="email"
// //                     id="email"
// //                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
// //                     placeholder="john.doe@example.com"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
// //                   <textarea
// //                     id="message"
// //                     rows="5"
// //                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
// //                     placeholder="Your message..."
// //                   ></textarea>
// //                 </div>
// //                 <button
// //                   type="submit"
// //                   className="btn bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-200 shadow-lg w-full"
// //                 >
// //                   Send Message
// //                 </button>
// //               </form>
// //             </div>
// //             <div
// //               className="lg:w-1/2 text-center lg:text-left"
// //             >
// //               <h3 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h3>
// //               <p className="text-gray-700 text-lg mb-2">
// //                 Have questions or need assistance? Feel free to reach out to us!
// //               </p>
// //               <p className="text-red-600 text-3xl font-bold mt-6">
// //                 +880 123 456 7890
// //               </p>
// //               <p className="text-gray-700 mt-2">
// //                 (Available 24/7 for emergencies)
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Footer Section */}
// //       <footer className="bg-red-700 text-white py-4 text-center rounded-t-xl">
// //         <div className="container mx-auto px-4">
// //           <p>&copy; {new Date().getFullYear()} Blood Donation App. All rights reserved.</p>
// //           <p className="text-sm mt-1">Designed with ❤️ for a noble cause.</p>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // };

// // export default App;


// src/pages/Banner.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';

// Import your Lottie JSON files
import bannerAnimation from '../assets/bannerAnimation.json';
import bloodDropAnimation from '../assets/bloodDropAnimation.json';
// import howItWorksAnimation from '../assets/howItWorksAnimation.json'; // New Lottie animation file
// import statsAnimation from '../assets/statsAnimation.json'; // New Lottie animation file

const Banner = () => {
  // Framer Motion variants for animations
  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-gray-50 font-inter">
      {/* 1. Banner Section */}
      <section className="relative bg-gradient-to-r from-red-600 to-red-800 text-white py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between z-10 relative">
          <motion.div
            className="md:w-1/2 text-center md:text-left mb-10 md:mb-0"
            initial="hidden"
            animate="visible"
            variants={staggerVariants}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold leading-tight mb-6"
              variants={itemVariants}
            >
              Donate Blood, Save Lives.
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl mb-8 opacity-90"
              variants={itemVariants}
            >
              Every drop counts. Join our community to make a difference.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center md:justify-start gap-4"
              variants={itemVariants}
            >
              <Link
                to="/registration"
                className="btn bg-white text-red-700 hover:bg-red-100 px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Join as a Donor
              </Link>
              <Link
                to="/search"
                className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-700 px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Search Donors
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            className="md:w-1/2 flex justify-center md:justify-end"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Lottie animation for banner */}
            <Lottie animationData={bannerAnimation} loop={true} className="w-full max-w-md md:max-w-lg" />
          </motion.div>
        </div>
        {/* Background elements for visual appeal */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="20" cy="20" r="15" fill="currentColor" className="text-red-500" />
            <circle cx="80" cy="80" r="20" fill="currentColor" className="text-red-400" />
            <rect x="50" y="10" width="10" height="10" fill="currentColor" className="text-red-300" />
          </svg>
        </div>
      </section>

      {/* 2. About Us Section (New) */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            Our Mission
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We are dedicated to building a seamless connection between blood donors and recipients. Our platform simplifies the process of finding and donating blood, ensuring that help is always just a few clicks away.
          </motion.p>
        </div>
      </section>

      {/* 3. Why Donate Blood Section (Existing - now 3) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-12"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            Why Donate Blood?
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerVariants}
          >
            {/* Feature Card 1 */}
            <motion.div
              className="bg-red-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
              variants={itemVariants}
            >
              <div className="text-red-600 text-5xl mb-6 flex justify-center">
                <Lottie animationData={bloodDropAnimation} loop={true} className="w-24 h-24" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Save Lives</h3>
              <p className="text-gray-700">
                Your single donation can save up to three lives. It's a simple act with a profound impact.
              </p>
            </motion.div>
            {/* Feature Card 2 */}
            <motion.div
              className="bg-red-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
              variants={itemVariants}
            >
              <div className="text-red-600 text-5xl mb-6 flex justify-center">
                <Lottie animationData={bloodDropAnimation} loop={true} className="w-24 h-24" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Impact</h3>
              <p className="text-gray-700">
                Donating blood strengthens our community by ensuring a stable supply for emergencies and medical treatments.
              </p>
            </motion.div>
            {/* Feature Card 3 */}
            <motion.div
              className="bg-red-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
              variants={itemVariants}
            >
              <div className="text-red-600 text-5xl mb-6 flex justify-center">
                <Lottie animationData={bloodDropAnimation} loop={true} className="w-24 h-24" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Health Benefits</h3>
              <p className="text-gray-700">
                Regular blood donation can help reduce iron stores, which may reduce the risk of heart disease.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. How It Works Section (New) */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">How It Works</h2>
            <ul className="space-y-6 text-gray-700 text-lg">
              <li className="flex items-start">
                <span className="text-red-600 font-bold text-xl mr-4">1.</span>
                <p>
                  <strong className="text-gray-900">Sign Up:</strong> Register as a donor or a recipient in minutes with our simple form.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold text-xl mr-4">2.</span>
                <p>
                  <strong className="text-gray-900">Search:</strong> Donors can find requests, and recipients can search for nearby donors.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold text-xl mr-4">3.</span>
                <p>
                  <strong className="text-gray-900">Connect:</strong> Directly contact a match and arrange the donation.
                </p>
              </li>
            </ul>
          </motion.div>
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
{/*             <Lottie animationData={howItWorksAnimation} loop={true} className="w-full max-w-md mx-auto" /> */}
          </motion.div>
        </div>
      </section>

      {/* 5. Statistics Section (New) */}
      <section className="py-16 md:py-24 bg-red-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            Our Impact So Far
          </motion.h2>
          <div className="flex flex-col md:flex-row justify-around items-center gap-10">
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
            >
{/*               <Lottie animationData={statsAnimation} loop={true} className="w-48 h-48 mx-auto mb-4" /> */}
              <div className="text-4xl font-extrabold text-red-100">500+</div>
              <p className="text-lg text-red-200">Donors Registered</p>
            </motion.div>
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-6xl font-extrabold text-red-100">250+</div>
              <p className="text-lg text-red-200">Lives Saved</p>
            </motion.div>
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="text-6xl font-extrabold text-red-100">100+</div>
              <p className="text-lg text-red-200">Donation Drives</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section (New) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-12"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            What Our Users Say
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <motion.div
              className="bg-gray-100 p-8 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-gray-700 italic mb-4">
                "I was able to find a matching donor for my sister in just a few hours. This platform is a lifesaver. Thank you so much!"
              </p>
              <p className="font-semibold text-gray-900">- Sarah Mehjabin.</p>
            </motion.div>
            <motion.div
              className="bg-gray-100 p-8 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-gray-700 italic mb-4">
                "Donating blood has never been easier. The app made it simple to find someone in urgent need right in my area."
              </p>
              <p className="font-semibold text-gray-900">- Mamun Hossain.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. Call to Action Section (New) */}
      <section className="py-16 md:py-24 bg-red-600 text-white text-center">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            Ready to Make a Difference?
          </motion.h2>
          <motion.p
            className="text-lg mb-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join our network of compassionate donors today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/registration"
              className="btn bg-white text-red-700 hover:bg-red-100 px-10 py-4 rounded-full text-lg font-semibold shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Become a Donor
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 8. Contact Us Section (Existing - now 8) */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            Contact Us
          </motion.h2>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
            {/* Contact Form */}
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg w-full lg:w-1/2 max-w-xl"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Rakib Hossain"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="rakib@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-200 shadow-lg w-full"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
            {/* Contact Info */}
            <motion.div
              className="lg:w-1/2 text-center lg:text-left"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h3>
              <p className="text-gray-700 text-lg mb-2">
                Have questions or need assistance? Feel free to reach out to us!
              </p>
              <p className="text-red-600 text-3xl font-bold mt-6">
                +880 123 456 7890
              </p>
              <p className="text-gray-700 mt-2">
                (Available 24/7 for emergencies)
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <footer className="bg-red-700 text-white py-4 text-center">
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} Blood Donation App. All rights reserved.</p>
        <p className="text-sm mt-1">Designed with ❤️ for a noble cause.</p>
      </div>
    </footer>
    </div>
  );
};

export default Banner;