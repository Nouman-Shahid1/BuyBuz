import React from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaShoppingCart,
  FaMoneyBillWave,
  FaCogs,
  FaSignOutAlt,
} from "react-icons/fa";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

const AdminDashboard = () => {
  // Chart data
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [5000, 10000, 7500, 12500, 15000, 20000],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const ordersData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Orders",
        data: [50, 75, 60, 90, 120, 150],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    window.location.href = '/login';
};

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-800 to-blue-600 text-white flex flex-col shadow-lg">
        <div className="p-6 text-2xl font-extrabold border-b border-blue-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-6 space-y-4">
          <ul>
            <li>
              <a
                href="/admin"
                className="flex items-center space-x-4 p-3 rounded-lg bg-blue-700 hover:bg-blue-900 transition transform hover:scale-105"
              >
                <FaTachometerAlt />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/users"
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
              >
                <FaUsers />
                <span>Users</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
              >
                <FaShoppingCart />
                <span>Orders</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
              >
                <FaMoneyBillWave />
                <span>Revenue</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
              >
                <FaCogs />
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
  <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
  <div className="flex items-center space-x-4">
    <span className="text-gray-800 font-medium">
      Welcome, {localStorage.getItem("name") || "Admin"}
    </span>
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition"
    >
      Logout
    </button>
  </div>
</header>


        {/* Dashboard Content */}
        <main className="p-6 bg-gray-100 flex-1">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition">
              <div className="flex items-center space-x-4">
                <FaUsers className="text-blue-800 text-4xl" />
                <h3 className="text-lg font-semibold text-gray-600">
                  Total Users
                </h3>
              </div>
              <p className="text-3xl font-bold text-blue-800 mt-2">1,245</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition">
              <div className="flex items-center space-x-4">
                <FaShoppingCart className="text-green-600 text-4xl" />
                <h3 className="text-lg font-semibold text-gray-600">
                  Total Orders
                </h3>
              </div>
              <p className="text-3xl font-bold text-green-600 mt-2">789</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition">
              <div className="flex items-center space-x-4">
                <FaMoneyBillWave className="text-red-600 text-4xl" />
                <h3 className="text-lg font-semibold text-gray-600">Revenue</h3>
              </div>
              <p className="text-3xl font-bold text-red-600 mt-2">$12,345</p>
            </div>
          </div>

          {/* Chart Section */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Revenue Growth
              </h2>
              <Bar data={revenueData} options={{ responsive: true }} />
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Orders Overview
              </h2>
              <Line data={ordersData} options={{ responsive: true }} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
