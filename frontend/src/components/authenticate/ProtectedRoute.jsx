// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const { userInfo } = useSelector((state) => state.user);

    if (!userInfo || !userInfo.name) {
        // If the user is not authenticated, redirect to the landing page
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
