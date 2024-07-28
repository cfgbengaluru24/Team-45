import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAdminContext } from '../context/AdminContext';
import { useGrassRootWorkerContext } from '../context/GrassRootWorkerContext';
import { useDonorContext } from '../context/DonorContext';
import { useSchoolContext } from '../context/SchoolContext';
import LoginPageImg from "../../src/assets/images/loginPageImg.jpg";

const UserLoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    userType: "admin",
  });

  // context
  const { adminId, setAdminId } = useAdminContext();
  const { grassRootWorkerId, setGrassRootWorkerId } = useGrassRootWorkerContext();
  const { donorId, setDonorId } = useDonorContext();
  const { schoolId, setSchoolId } = useSchoolContext();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/...", // Replace with your actual endpoint
        credentials
      );
      console.log(response.data);
      localStorage.setItem("mentor_Id", response.data);

      // save data in context
      const user = credentials.userType;
      if (user === "admin") {
        setAdminId(response.id);
      } else if (user === "grassRootWorker") {
        setGrassRootWorkerId(response.id);
      } else if (user === "donor") {
        setDonorId(response.id);
      } else if (user === "school") {
        setSchoolId(response.id);
      }

      navigate(`/${credentials.userType}/dashboard`);
    } catch (error) {
      console.error("There was an error logging in!", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600">
      <div className="flex bg-white shadow-lg rounded-lg w-full max-w-4xl">
        <div className="hidden md:block md:w-1/2">
          <img
            src={LoginPageImg}
            alt="Login"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="Logo" className="h-12" />
          </div>
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">User Type</label>
              <select
                name="userType"
                value={credentials.userType}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="admin">Admin</option>
                <option value="donor">Donor</option>
                <option value="grassRootWorker">Grass Root Worker</option>
                <option value="school">School</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-700">Don't have an account?</p>
            <div className="space-x-2">
              <Link
                to="/admin/register"
                className="text-blue-500 hover:text-blue-700"
              >
                Admin
              </Link>
              <Link
                to="/school/register"
                className="text-blue-500 hover:text-blue-700"
              >
                School
              </Link>
              <Link
                to="/grassRoot/register"
                className="text-blue-500 hover:text-blue-700"
              >
                Grassroot Worker
              </Link>
              <Link
                to="/donor/register"
                className="text-blue-500 hover:text-blue-700"
              >
                Donor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage;