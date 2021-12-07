/**
 * External deps
 */

import React, { useContext, createContext } from 'react';

/**
 * Internal deps
 */
import { useLocalStorage } from '../hooks';

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => null,
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  //this will store whether we are logged in or not in local storage.
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage(false);

  const contextValue = {
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
