import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


export default function PrivateRoute({ children, roles }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return <Navigate to="/login" replace />;
    }

    const userRole = decoded.role || localStorage.getItem("role"); // fallback
    if (roles && !roles.includes(userRole)) {
      return <Navigate to="/" replace />;
    }

    // token is valid and role matches → render page
    return children;
  } catch (err) {
    console.error("Invalid token", err);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return <Navigate to="/login" replace />;
  }
}
