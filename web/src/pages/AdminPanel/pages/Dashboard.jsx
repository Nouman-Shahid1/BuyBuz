import React from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaShoppingCart,
  FaMoneyBillWave,
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

const AdminDashboard = () => {
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [5000, 10000, 7500, 12500, 15000, 20000],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };

  const ordersData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Orders",
        data: [50, 75, 60, 90, 120, 150],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100">
     

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition">
          <div className="flex items-center space-x-4">
            <FaUsers className="text-4xl" />
            <h3 className="text-lg font-semibold">Total Users</h3>
          </div>
          <p className="text-3xl font-bold mt-2">1,245</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition">
          <div className="flex items-center space-x-4">
            <FaShoppingCart className="text-4xl" />
            <h3 className="text-lg font-semibold">Total Orders</h3>
          </div>
          <p className="text-3xl font-bold mt-2">789</p>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition">
          <div className="flex items-center space-x-4">
            <FaMoneyBillWave className="text-4xl" />
            <h3 className="text-lg font-semibold">Revenue</h3>
          </div>
          <p className="text-3xl font-bold mt-2">$12,345</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Revenue Growth</h2>
          <Bar
            data={revenueData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                },
              },
            }}
          />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Orders Overview</h2>
          <Line
            data={ordersData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
