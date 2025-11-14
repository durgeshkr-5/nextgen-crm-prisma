// src/routes/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  // if no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role-based redirection logic
  switch (user.role) {
    case "Admin":
      if (window.location.pathname !== "/admin-dashboard") {
        return <Navigate to="/admin-dashboard" replace />;
      }
      break;
    case "Manager":
      if (window.location.pathname !== "/manager-dashboard") {
        return <Navigate to="/manager-dashboard" replace />;
      }
      break;
    case "SalesRep":
      if (window.location.pathname !== "/sales-dashboard") {
        return <Navigate to="/sales-dashboard" replace />;
      }
      break;
    default:
      return <Navigate to="/login" replace />;
  }

  // if user has a valid role and is already on their dashboard
  return children;
};

export default PrivateRoute;
