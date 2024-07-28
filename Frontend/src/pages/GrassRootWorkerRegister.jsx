// src/GrassRootWorkerRegister.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useGrassRootWorkerContext } from '../context/GrassRootWorkerContext';
import { useNavigate } from 'react-router-dom';

const GrassRootWorkerRegister = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    region: '',
    password: '',
  });
  const { grassRootWorkerId, setGrassRootWorkerId } = useGrassRootWorkerContext();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const url = 'http://localhost:8080/v1/grassroots/register'; // Replace with your API endpoint
    const headers = {
      'Content-Type': 'application/json',
    };
    const d = {
      "email" : `${formData.email}`,
      "name" : `${formData.name}`,
      "phone_number" : `${formData.phoneNumber}`,
      "password": `${formData.password}`,
      "city": `${formData.region}` 
    }
    try {
      const response = await axios.post(url, d, { headers });
      console.log('Response:', response.data);
      setGrassRootWorkerId(response.id);
    } catch (error) {
      console.error('Error:', error);
    }
    navigate('/grassRooter/dashboard');

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Grass Root Worker Register</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Region</label>
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              placeholder="Enter your region"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default GrassRootWorkerRegister;
