import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

interface Props { children: React.ReactElement; }

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const token = useSelector((s: RootState) => s.auth.token);
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
