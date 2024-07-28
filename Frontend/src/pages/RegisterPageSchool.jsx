import React, { useState, useContext } from 'react';
import axios from 'axios';
import { SchoolContext } from '../context/SchoolContext';

const RegisterPageSchool = ({ role }) => {
  const [formData, setFormData] = useState({
    name: '',
    full_name: '',
    location: '',
    password: '',
    phone: '',
    role: role,
    email: '',
    document: null,
    verifiedAdmin: 0,
    verifiedGrassroot: 0,
  });

  const { schoolId, setSchoolId } = useContext(SchoolContext);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmitForSchool = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('full_name', formData.full_name);
    data.append('password', formData.password);
    data.append('location', formData.location);
    data.append('phone', formData.phone);
    data.append('email', formData.email);
    data.append('role', formData.role);
    data.append('verifiedAdmin', formData.verifiedAdmin);
    data.append('verifiedGrassroot', formData.verifiedGrassroot);
    data.append('document', formData.document);

    try {
      const response = await axios.post('/api/register/school', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setSchoolId(response.id);
      // alert('Registration successful!');
    } catch (error) {
      console.error(error);
      alert('Registration failed.');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Registration For School</h2>
      <form onSubmit={handleSubmitForSchool} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Name</label>
          <input className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" id="name" name="name" type="text" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="full_name">Full Name</label>
          <input className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" id="full_name" name="full_name" type="text" value={formData.full_name} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
          <input className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="location">Location</label>
          <input className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" id="location" name="location" type="text" value={formData.location} onChange={handleChange} required />
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
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="document">Documents</label>
          <input className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" id="document" name="document" type="file" onChange={handleChange} required />
        </div>
        <div>
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPageSchool;