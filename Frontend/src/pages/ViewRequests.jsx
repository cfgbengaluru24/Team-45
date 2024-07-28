// src/components/ViewRequests.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewRequests = ({ schoolUUID }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8080/v1/admin/requests');
        // Filter requests by school UUID
        const schoolRequests = response.data.filter(request => request.school_uuid === schoolUUID);
        setRequests(schoolRequests);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };
    fetchRequests();
  }, [schoolUUID]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Your Requests</h2>
      {requests.length > 0 ? (
        <div className="grid gap-4">
          {requests.map((query) => (
            <div key={query.id} className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-bold mb-2">Type: {query.type}</h3>
              <p className="text-gray-700 mb-2">Details: {query.details}</p>
              <p className="text-gray-700 mb-2">Assigned Grassroot: {query.assigned_grassroot}</p>
              <p className="text-gray-700 mb-2">Status: {query.status}</p>
              <p className="text-gray-700 mb-2">Cost: {query.cost}</p>
              <p className="text-gray-700 mb-2">Donated: {query.donated}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700">No Requests Available.</p>
      )}
    </div>
  );
};

export default ViewRequests;