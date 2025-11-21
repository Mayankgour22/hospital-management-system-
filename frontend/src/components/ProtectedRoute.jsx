import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {

    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    
    alert("Access Denied! Only doctors can view this page.");
    return <Navigate to="/" replace />;
  }


  return children;
};

export default ProtectedRoute;
