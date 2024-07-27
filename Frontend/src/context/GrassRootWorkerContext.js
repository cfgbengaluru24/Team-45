import React, { createContext, useState, useContext } from 'react';

const GrassRootWorkerContext = createContext();

export const GrassRootWorkerProvider = ({ children }) => {
  const [grassRootWorkerId, setGrassRootWorkerId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <GrassRootWorkerContext.Provider value={{ grassRootWorkerId, setGrassRootWorkerId, isLoggedIn, setIsLoggedIn }}>
      {children}
    </GrassRootWorkerContext.Provider>
  );
};

export const useGrassRootWorkerContext = () => useContext(GrassRootWorkerContext);