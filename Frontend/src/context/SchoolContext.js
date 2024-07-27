import React, { createContext, useState, useContext } from 'react';

const SchoolContext = createContext();

export const SchoolProvider = ({ children }) => {
  const [schoolId, setSchoolId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <SchoolContext.Provider value={{ schoolId, setSchoolId, isLoggedIn, setIsLoggedIn }}>
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchoolContext = () => useContext(SchoolContext);