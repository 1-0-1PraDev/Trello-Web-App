import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: React.FC = () => {
    const userInfo = localStorage.getItem('userInfo');
    const user = userInfo ? JSON.parse(userInfo) : null;

    return user ? (
        <Outlet />
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRoute;
