import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import React, { useContext } from 'react';

function ProtectedRoutes({ roles = [], children }) {
  const isAuthenticated = localStorage.getItem('token');
  const { userRole } = useContext(AuthContext);
  console.log(userRole);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles.length > 0 && !roles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default ProtectedRoutes;