import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
// Create a context
export const SchoolContext = createContext();

// Create a provider component
export const SchoolProvider = ({ children }) => {
  SchoolProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const [schoolId, setSchoolId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <SchoolContext.Provider value={{ schoolId, setSchoolId, isLoggedIn, setIsLoggedIn }}>
      {children}
    </SchoolContext.Provider>
  );
};

// export const useSchoolContext = () => {
//   const context = useContext(SchoolContext);
//   if (!context) {
//     throw new Error('useSchoolContext must be used within a SchoolProvider');
//   }
//   return context;
// };
