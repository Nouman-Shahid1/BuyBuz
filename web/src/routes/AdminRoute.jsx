import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('role'); 

    const isAdmin = token && userRole === 'admin';

    return isAdmin ? children : <Navigate to="/login" replace />;
};

export default AdminRoute;
