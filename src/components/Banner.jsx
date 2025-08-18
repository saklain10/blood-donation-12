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
      <section className="py-16 md:py-24 bg-red-600 text-white">
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