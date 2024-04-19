// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isAuthenticated, ...rest }) => {
    console.log(isAuthenticated)
    console.log(element)
  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/login" replace />}
    />
  );
};

export default ProtectedRoute;
