import React, { createContext, useState, useContext } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminId, setVolunteerId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AdminContext.Provider value={{ adminId, setAdminId, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);