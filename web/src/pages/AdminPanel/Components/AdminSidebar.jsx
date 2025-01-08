import React from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaShoppingCart,
  FaMoneyBillWave,
  FaCogs,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminSidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    window.location.href = "/login";
  };

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-lg">
      {/* Logo Section */}
      <div className="p-6 text-center border-b border-gray-700">
        <h1 className="text-3xl font-extrabold tracking-wide">
          <span className="text-white">Buy</span>
          <span className="text-yellow-400">Buz</span>
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-6 space-y-6">
        <ul className="space-y-4">
          <li>
            <a
              href="/admin"
              className="flex items-center space-x-4 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all transform hover:scale-105"
            >
              <FaTachometerAlt className="text-yellow-300 text-lg" />
              <span className="text-lg font-semibold">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="/admin/users"
              className="flex items-center space-x-4 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all transform hover:scale-105"
            >
              <FaUsers className="text-yellow-300 text-lg" />
              <span className="text-lg font-semibold">Users</span>
            </a>
          </li>
          <li>
            <a
              href="/admin/orders"
              className="flex items-center space-x-4 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all transform hover:scale-105"
            >
              <FaShoppingCart className="text-yellow-300 text-lg" />
              <span className="text-lg font-semibold">Orders</span>
            </a>
          </li>
          <li>
            <a
              href="/admin/revenue"
              className="flex items-center space-x-4 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all transform hover:scale-105"
            >
              <FaMoneyBillWave className="text-yellow-300 text-lg" />
              <span className="text-lg font-semibold">Revenue</span>
            </a>
          </li>
          <li>
            <a
              href="/admin/settings"
              className="flex items-center space-x-4 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all transform hover:scale-105"
            >
              <FaCogs className="text-yellow-300 text-lg" />
              <span className="text-lg font-semibold">Settings</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-6 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg shadow-md hover:from-red-500 hover:to-red-400 transition-all transform hover:scale-105"
        >
          <FaSignOutAlt className="text-lg" />
          <span className="text-lg font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
