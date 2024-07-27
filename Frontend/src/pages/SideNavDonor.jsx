import React, { useState } from "react";

const SideNavDonor = ({ fun }) => {
  const [mode, setMode] = useState("Profile");
  return (
    <div className="h-screen w-48 bg-gray-800 text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Donor Dashboard</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <button
              onClick={() => {
                setMode("Profile");
                fun("Profile");
              }}
              className={`hover:text-gray-300 ${
                mode === "Profile" ? "underline underline-offset-2 text-gray-600" : " "
              }`}
            >
              My Profile
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={() => {
                setMode("Donate");
                fun("Donate");
              }}
              className={`hover:text-gray-300 ${
                mode === "Donate" ? "underline underline-offset-2 text-gray-600" : " "
              }`}
            >
              Donate
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={() => {
                setMode("DonateHistory");
                fun("DonateHistory");
              }}
              className={`hover:text-gray-300 ${
                mode === "DonateHistory" ? "underline underline-offset-2 text-gray-600" : " "
              }`}
            >
              Donation History
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNavDonor;
