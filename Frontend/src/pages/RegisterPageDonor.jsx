// src/RegisterPageDonor.js
import React, { useState } from 'react';
import axios from 'axios';
import { useDonorContext } from '../context/DonorContext';

const RegisterPageDonor = ({ role }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    role : role,
    password : '',
    anonymous: null,
    get_updates: null,
  });

  const { donorId, setDonorId } = useDonorContext();
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmitForDonor = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('full_name', formData.full_name);
    data.append('phone', formData.phone);
    data.append('email', formData.email);
    data.append('role', formData.role);
    data.append('anonymous', formData.anonymous);
    data.append('get_updates', formData.get_updates);

    const d = {
      "email":formData.email,
      "name":formData.full_name,
      "phone_number": formData.phone,
      "password": formData.password,
      "anonymous": formData.anonymous === "yes" ? true : false,
      "get_reports": formData.get_updates === "yes" ? true : false
    }
    console.log(d);
  //   {
  //     "email":"",
  //     "name":"kahc",
  //     "phone_number": "",
  //     "password":""
  // }

    try {
      const response = await axios.post('http://localhost:8080/v1/donors/register', data, {
        headers: {
          'Content-Type': 'json',
        },
      });
      console.log(response.data);

      setDonorId(response.id);
      // alert('Registration successful!');
    } catch (error) {
      console.error(error);
      // alert('Registration failed.');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Registration For Donor</h2>
      <form onSubmit={handleSubmitForDonor} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="full_name">Full Name</label>
          <input className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" id="name" name="full_name" type="text" value={formData.full_name} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
          <input className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" id="name" name="password" type="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">Phone No.</label>
          <input className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email Id</label>
          <input className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stay Anonymous</label>
          <div className="flex items-center">
            <input className="mr-2 leading-tight" type="radio" id="anonymityYes" name="anonymous" value="yes" checked={formData.anonymous === 'yes'} onChange={handleChange} />
            <label className="text-sm" htmlFor="anonymityYes">Yes</label>
          </div>
          <div className="flex items-center">
            <input className="mr-2 leading-tight" type="radio" id="anonymityNo" name="anonymous" value="no" checked={formData.anonymous === 'no'} onChange={handleChange} />
            <label className="text-sm" htmlFor="anonymityNo">No</label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Get Updates</label>
          <div className="flex items-center">
            <input className="mr-2 leading-tight" type="radio" id="reportYes" name="get_updates" value="yes" checked={formData.get_updates === 'yes'} onChange={handleChange} />
            <label className="text-sm" htmlFor="reportYes">Yes</label>
          </div>
          <div className="flex items-center">
            <input className="mr-2 leading-tight" type="radio" id="reportNo" name="get_updates" value="no" checked={formData.get_updates === 'no'} onChange={handleChange} />
            <label className="text-sm" htmlFor="reportNo">No</label>
          </div>
        </div>
        <div>
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPageDonor;