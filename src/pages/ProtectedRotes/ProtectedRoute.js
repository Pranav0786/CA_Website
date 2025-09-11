import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("role"); // stored during login
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRole && userRole !== allowedRole) {
    // user is logged in but trying to access wrong role's route
    return <Navigate to={userRole === "CA" ? "/ca" : "/businessman"} replace />;
  }

  return children;
};

export default ProtectedRoute;
