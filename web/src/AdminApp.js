import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./pages/AdminPanel/Components/AdminLayout";
import AdminDashboard from "./pages/AdminPanel/pages/Dashboard";
import UsersPage from "./pages/AdminPanel/pages/UserPage";
import OrdersPage from "./pages/AdminPanel/pages/OrdersPage";
import RevenuePage from "./pages/AdminPanel/pages/RevenuePage";
import SettingsPage from "./pages/AdminPanel/pages/SettingsPage";

const AdminApp = () => {
  return (
    <Routes>
      {/* Admin routes wrapped with AdminLayout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} /> {/* This handles /admin */}
        <Route path="users" element={<UsersPage />} /> {/* This handles /admin/users */}
        <Route path="orders" element={<OrdersPage />} /> {/* This handles /admin/orders */}
        <Route path="revenue" element={<RevenuePage />} /> {/* This handles /admin/revenue */}
        <Route path="settings" element={<SettingsPage />} /> {/* This handles /admin/settings */}
      </Route>
    </Routes>
  );
};

export default AdminApp;
