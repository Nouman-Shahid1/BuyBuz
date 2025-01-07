import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaSyncAlt } from "react-icons/fa";
import {
    FaTachometerAlt,
    FaUsers,
    FaShoppingCart,
    FaMoneyBillWave,
    FaCogs,
    FaSignOutAlt,
  } from "react-icons/fa";
const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Users displayed per page

  // Fetch users
  const fetchUsers = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("Unauthorized: Please log in to access this page.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
      setError("");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Unauthorized: Invalid or expired token.");
      } else {
        setError("Failed to fetch users. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (id) => {
    alert(`Edit user with ID: ${id}`);
    // Implement edit functionality
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    const token = localStorage.getItem("authToken");
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      alert("Failed to delete user. Please try again.");
    }
  };

  // Filtered users based on search
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="ml-4 text-blue-500 font-semibold text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 font-semibold text-lg">{error}</p>
      </div>
    );
  }

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
            {/* Top Navbar */}
            <header className="bg-white shadow-md p-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
              <div className="flex items-center space-x-4">
                <span className="text-gray-800 font-medium">Welcome, Admin</span>
                <button className="px-4 py-2 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition">
                  Logout
                </button>
              </div>
            </header>
    
            {/* Dashboard Content */}
            <main className="p-6 bg-gray-100 flex-1">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
        <p className="text-gray-600 mt-2">
          View, manage, and update user details from this dashboard.
        </p>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
          <p className="text-3xl font-bold text-blue-500">{users.length}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700">Total Buyers</h3>
          <p className="text-3xl font-bold text-green-500">
            {users.filter((user) => user.role === "buyer").length}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700">Total Admins</h3>
          <p className="text-3xl font-bold text-red-500">
            {users.filter((user) => user.role === "admin").length}
          </p>
        </div>
      </div>

      {/* Search and Refresh */}
      <div className="flex items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Search by name, email, or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchUsers}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition ml-4"
        >
          <FaSyncAlt />
          Refresh
        </button>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600">{user._id}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.role}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 flex gap-4">
                    <button
                      onClick={() => handleEdit(user._id)}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6">
        {[...Array(Math.ceil(filteredUsers.length / usersPerPage)).keys()].map(
          (number) => (
            <button
              key={number}
              onClick={() => paginate(number + 1)}
              className={`px-4 py-2 mx-1 rounded-md shadow-sm ${
                currentPage === number + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              } hover:bg-blue-600 hover:text-white transition`}
            >
              {number + 1}
            </button>
          )
        )}
      </div>
      </main>
      </div>
      </div>
  );
};

export default UsersPage;
