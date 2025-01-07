import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const isAuthenticated = () => {
        const token = localStorage.getItem('authToken');
        console.log('Checking authentication in AdminRoute:', token); 
        return !!token;
    };

    return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default AdminRoute;
