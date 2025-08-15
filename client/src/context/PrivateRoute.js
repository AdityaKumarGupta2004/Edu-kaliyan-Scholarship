import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./auth"; // adjust path as needed

const AdminRoute = ({ children }) => {
  const { adminLoggedIn } = useContext(UserContext);

  if (!adminLoggedIn) {
    // Not an admin — redirect to login or homepage
    return <Navigate to="/admin_login" replace />;
  }

  return children;
};

export default AdminRoute;
