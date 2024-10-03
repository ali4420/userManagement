// src/components/Auth/PrivateRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log('PrivateRoute - currentUser:', currentUser);

  return currentUser ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
