// AuthContext.js

import React, { createContext, useState, useContext } from 'react';

// Create a context for authentication
const AuthContext = createContext();

// Create an AuthProvider component to wrap the entire app
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // Function to login (set token in localStorage)
  const login = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  // Function to logout (remove token from localStorage)
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // Function to check if user is authenticated
  const isAuthenticated = () => {
    return !!token;
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};
