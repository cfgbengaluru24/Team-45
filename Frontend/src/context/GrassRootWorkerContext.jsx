import React, { createContext, useState, useContext } from 'react';
import Proptypes from 'prop-types';
export const GrassRootWorkerContext = createContext();

export const GrassRootWorkerProvider = ({ children }) => {
  GrassRootWorkerProvider.propTypes = {
    children: Proptypes.node.isRequired
  }
  const [grassRootWorkerId, setGrassRootWorkerId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <GrassRootWorkerContext.Provider value={{ grassRootWorkerId, setGrassRootWorkerId, isLoggedIn, setIsLoggedIn }}>
      {children}
    </GrassRootWorkerContext.Provider>
  );
};

export const useGrassRootWorkerContext = () => useContext(GrassRootWorkerContext);