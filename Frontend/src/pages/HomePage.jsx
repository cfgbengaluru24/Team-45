import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link as ScrollLink } from "react-scroll";
import logo from "../../src/assets/images/loginPageImg.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
let image = [
  'https://aspireandglee.com/wp-content/uploads/2021/07/nityaberia-29.jpeg',
  'https://aspireandglee.com/wp-content/uploads/2021/07/nityaberia-27.jpg?w=1024',
  'https://aspireandglee.com/wp-content/uploads/2021/07/namkhana-19.jpeg'
];


const HomePage = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const navigate = useNavigate();

  const handleLogClick = () => {
    navigate('/user/login');
  };

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
            <ScrollLink
              to="about"
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-gray-700"
              activeClass="text-blue-500"
            >
              About Us
            </ScrollLink>
            <ScrollLink
              to="projects"
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-gray-700"
              activeClass="text-blue-500"
            >
              Projects
            </ScrollLink>
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
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative bg-cover bg-center h-screen"
        style={{
          backgroundImage:
            "url(https://aspireandglee.com/wp-content/uploads/2021/02/jeevan-shishu-7.jpg)",
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
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            onClick={handleLogClick}
          >
              Log In / Sign Up
            </button>
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
              src="http://localhost:5173/src/assets/images/image1.jpg"
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
            {Array.from({ length: 3 }).map((_, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300"
              >
                <img
                  src={image[index]}
                  alt={`Project ${index + 1}`}
                  className="rounded-lg mb-4"
                />
              </motion.div>
            ))}
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