import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import React, { useContext } from 'react';

function ProtectedRoutes({ roles = [], children }) {
  const isAuthenticated = localStorage.getItem('token');
  const { userRole } = useContext(AuthContext);
  const primaryRole = userRole ? userRole[0] : null;
  console.log(primaryRole);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles && roles.length > 0 && !roles.includes(primaryRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default ProtectedRoutes;