import React from "react";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">BuyBuz</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-800 font-medium">
              Welcome, {localStorage.getItem("name") || "Admin"}
            </span>
          </div>
        </header>
        <main className="p-6 bg-gray-100 flex-1">
          <Outlet /> {/* Render child routes here */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
