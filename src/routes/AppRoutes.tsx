import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import UsersList from "../pages/UsersList";
import ProtectedRoute from "../components/ProtectedRoute";
import AppHeader from "../components/Header";

const AppRoutes: React.FC = () => (
  <BrowserRouter>
  <AppHeader />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/users" element={<ProtectedRoute><UsersList /></ProtectedRoute>} />
      <Route path="/" element={<Navigate to="/users" replace />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
