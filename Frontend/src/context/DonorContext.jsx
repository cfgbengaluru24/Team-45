import React, { createContext, useState, useContext } from 'react';

const DonorContext = createContext();

export const DonorProvider = ({ children }) => {
  const [donorId, setDonorId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <DonorContext.Provider value={{ donorId, setDonorId, isLoggedIn, setIsLoggedIn }}>
      {children}
    </DonorContext.Provider>
  );
};

export const useDonorContext = () => useContext(DonorContext);