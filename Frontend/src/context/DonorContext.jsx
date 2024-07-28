import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
export const DonorContext = createContext();

export const DonorProvider = ({ children }) => {
  DonorProvider.propTypes = {
    children: PropTypes.node.isRequired
  }
  const [donorId, setDonorId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <DonorContext.Provider value={{ donorId, setDonorId, isLoggedIn, setIsLoggedIn }}>
      {children}
    </DonorContext.Provider>
  );
};

// export const useDonorContext = () => {
//   const context = useContext(DonorContext);
//   if (!context) {
//     throw new Error('useDonorContext must be used within a DonorProvider');
//   }
//   return context;
// }