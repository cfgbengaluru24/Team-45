import React from "react";
import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import logo from "../../src/assets/images/loginPageImg.jpg"; // Replace with your logo path

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const HomePage = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-10 w-10" />
          </div>
          <nav className="space-x-6">
            <NavLink
              exact
              to="/"
              style={({ isActive }) => ({
                color: isActive ? "blue" : "gray",
              })}
              className="hover:text-gray-700"
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              style={({ isActive }) => ({
                color: isActive ? "blue" : "gray",
              })}
              className="hover:text-gray-700"
            >
              About Us
            </NavLink>
            <NavLink
              to="/projects"
              style={({ isActive }) => ({
                color: isActive ? "blue" : "gray",
              })}
              className="hover:text-gray-700"
            >
              Projects
            </NavLink>
            <NavLink
              to="/events"
              style={({ isActive }) => ({
                color: isActive ? "blue" : "gray",
              })}
              className="hover:text-gray-700"
            >
              Events
            </NavLink>
            <NavLink
              to="/get-involved"
              style={({ isActive }) => ({
                color: isActive ? "blue" : "gray",
              })}
              className="hover:text-gray-700"
            >
              Get Involved
            </NavLink>
            <NavLink
              to="/contact"
              style={({ isActive }) => ({
                color: isActive ? "blue" : "gray",
              })}
              className="hover:text-gray-700"
            >
              Contact Us
            </NavLink>
          </nav>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
            Donate Now
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative bg-cover bg-center h-screen"
        style={{
          backgroundImage: "url(https://via.placeholder.com/1920x1080)",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto flex flex-col items-center justify-center h-full text-center text-white relative z-10">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-bold"
          >
            Empowering Communities for a Better Future
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-4 text-xl md:text-2xl"
          >
            Join us in making a difference
          </motion.p>
          <div className="mt-6 space-x-4">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              Learn More
            </motion.button>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="bg-green-500 py-2 px-4 rounded hover:bg-green-600 transition duration-300"
            >
              Donate Now
            </motion.button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16">
        <div className="container mx-auto px-6">
          <motion.h2
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="text-3xl font-bold text-center"
          >
            About Our NGO
          </motion.h2>
          <motion.p
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="mt-4 text-center text-gray-700"
          >
            Our mission is to improve lives by providing essential services to
            communities in need.
          </motion.p>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="mt-8 flex justify-center"
          >
            <img
              src="https://via.placeholder.com/600x400"
              alt="About Us"
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-gray-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">Our Projects</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Dummy project cards */}
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300"
              >
                <img
                  src="https://via.placeholder.com/400x300"
                  alt={`Project ${index + 1}`}
                  className="rounded-lg mb-4"
                />
                <h3 className="text-2xl font-bold mb-2">
                  Project Title {index + 1}
                </h3>
                <p className="text-gray-700">
                  Short description of the project.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">Upcoming Events</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Dummy event cards */}
            {Array.from({ length: 3 }).map((_, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300"
              >
                <h3 className="text-2xl font-bold mb-2">
                  Event Title {index + 1}
                </h3>
                <p className="text-gray-700 mb-2">Date: 2024-07-27</p>
                <p className="text-gray-700">Brief details of the event.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section id="get-involved" className="py-16 bg-gray-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">Get Involved</h2>
          <p className="mt-4 text-center text-gray-700">
            Learn how you can contribute to our cause through volunteering,
            donations, or partnerships.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
              Volunteer Now
            </button>
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300">
              Partner With Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left">
              <p className="text-gray-700">123 NGO Street, City, Country</p>
              <p className="text-gray-700">Phone: (123) 456-7890</p>
              <p className="text-gray-700">Email: info@ngo.org</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <Link
                to="#"
                className="text-gray-700 hover:text-gray-900 transition duration-300"
              >
                <i className="fab fa-facebook"></i>
              </Link>
              <Link
                to="#"
                className="text-gray-700 hover:text-gray-900 transition duration-300"
              >
                <i className="fab fa-twitter"></i>
              </Link>
              <Link
                to="#"
                className="text-gray-700 hover:text-gray-900 transition duration-300"
              >
                <i className="fab fa-instagram"></i>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
