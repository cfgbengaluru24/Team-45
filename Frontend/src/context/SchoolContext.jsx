import React, { createContext, useState, useContext } from 'react';

// Create a context
const SchoolContext = createContext();

// Create a provider component
export const SchoolProvider = ({ children }) => {
  const [schoolId, setSchoolId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <SchoolContext.Provider value={{ schoolId, setSchoolId, isLoggedIn, setIsLoggedIn }}>
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchoolContext = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchoolContext must be used within a SchoolProvider');
  }
  return context;
};
