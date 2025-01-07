import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = () => {
        const token = localStorage.getItem('authToken');
        console.log('Checking authentication in PrivateRoute:', token); 
        return !!token;
    };

    return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
