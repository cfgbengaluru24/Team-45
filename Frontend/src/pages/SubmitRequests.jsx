import React, { useState } from 'react';
import axios from 'axios';

const SubmitRequest = ({ SchoolName }) => {
  const [formData, setFormData] = useState({
    type: 'Infrastructure',
    details: '',
    assigned_grassroot: '',
    status: '',
    cost: 0,
    donated: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('type', formData.type);
    data.append('details', formData.details);
    data.append('assigned_grassroot', formData.assigned_grassroot);
    data.append('cost', formData.cost);
    data.append('donated', formData.donated);

    try {
      const response = await axios.post('/api/submit-request', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Request submitted successfully:', response.data);
      setFormData({
        requestType: 'Infrastructure',
        details: '',
        assigned_grassroot: '',
        status: '',
        cost: 0,
        donated: null,
      });
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Submit Query</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="requestType">
            Type of Request :
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Infrastructure">Infrastructure</option>
            <option value="Scholarships">Scholarships</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Details :
          </label>
          <input
            id="details"
            name="details"
            type="text"
            value={formData.details}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
          Cost (in Rupees):
          </label>
          <input
            id="cost"
            name="cost"
            type="number"
            value={formData.cost}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmitRequest;