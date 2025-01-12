import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./pages/AdminPanel/Components/AdminLayout";
import AdminDashboard from "./pages/AdminPanel/pages/Dashboard";
import UsersPage from "./pages/AdminPanel/pages/UserPage";
import OrdersPage from "./pages/AdminPanel/pages/OrdersPage";
import RevenuePage from "./pages/AdminPanel/pages/RevenuePage";
import SettingsPage from "./pages/AdminPanel/pages/SettingsPage";
import ProductPage from "./pages/AdminPanel/pages/ProductPage";
import CategoryPage from "./pages/AdminPanel/pages/CategoryPage";
import AdminRoute from "./routes/AdminRoute";

const AdminApp = () => {
  return (
    <Routes>
      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="revenue" element={<RevenuePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="categories" element={<CategoryPage />} />
      </Route>
    </Routes>
  );
};

export default AdminApp;
