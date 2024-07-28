import React, { createContext, useState, useContext } from 'react';
import Proptypes from 'prop-types';
export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  AdminProvider.propTypes = {
    children: Proptypes.node.isRequired
  }
  const [adminId, setAdminId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AdminContext.Provider value={{ adminId, setAdminId, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AdminContext.Provider>
  );
};

// export const useAdminContext = () => useContext(AdminContext);