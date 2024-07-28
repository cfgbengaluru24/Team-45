// src/components/DashboardSchool.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubmitRequests from './SubmitRequests';
import ViewRequests from './ViewRequests';

const DashboardSchool = ({ SchoolName, schoolUUID }) => {
  const [choice, setChoice] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (choice) {
        try {
          const response = await axios.post('http://localhost:8080/v1/school/', {
            schoolUUID: schoolUUID,
            choice: choice
          });
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [choice, schoolUUID]);

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <div className="flex justify-center mb-6">
        <button
          className={`mx-2 px-4 py-2 font-bold rounded ${choice === 'viewRequests' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setChoice('viewRequests')}
        >
          View Requests
        </button>
        <button
          className={`mx-2 px-4 py-2 font-bold rounded ${choice === 'submitRequests' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setChoice('submitRequests')}
        >
          Submit Request
        </button>
      </div>

      {choice === 'viewRequests' ? (
        <ViewRequests schoolUUID={schoolUUID} data={data} />
      ) : choice === 'submitRequests' ? (
        <SubmitRequests SchoolName={SchoolName} data={data} />
      ) : (
        <p className="text-center text-gray-700">Please select an option.</p>
      )}
    </div>
  );
};

export default DashboardSchool;
