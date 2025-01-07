import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('authToken');

    // Check if the user is authenticated
    const isAuthenticated = !!token;

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
