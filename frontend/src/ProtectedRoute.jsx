import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('token');
  return hasToken ? children : <Navigate to="/login" replace />;
}


