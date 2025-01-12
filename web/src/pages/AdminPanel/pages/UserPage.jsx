import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaSyncAlt, FaPlus } from "react-icons/fa";
import CreateEditModal from "../Modals/CreateEditModal";
import DeleteModal from "../Modals/DeleteModal";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [showCreateEditModal, setShowCreateEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch all users from the backend
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

  const handleCreateEdit = (user) => {
    setSelectedUser(user);
    setShowCreateEditModal(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  // Filter users based on the search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-800">Users Management</h1>
          <button
            onClick={() => handleCreateEdit(null)}
            className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            <FaPlus />
            Create User
          </button>
        </div>
        <div className="flex items-center justify-between mt-6">
          <input
            type="text"
            placeholder="Search by name, email, or role..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // Reset to first page on new search
            }}
            className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchUsers}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition ml-4"
          >
            <FaSyncAlt />
            Refresh
          </button>
        </div>
      </div>

      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              #
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
          {currentUsers.map((user, index) => (
            <tr
              key={user._id}
              className={`hover:bg-gray-50 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } transition`}
            >
              <td className="px-6 py-4 text-sm text-gray-600">
                {(currentPage - 1) * usersPerPage + index + 1}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">{user.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{user.role}</td>
              <td className="px-6 py-4 text-sm text-gray-600 flex gap-4">
                <button
                  onClick={() => handleCreateEdit(user)}
                  className="text-blue-500 hover:text-blue-700 transition"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(user)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

      {/* Modals */}
      {showCreateEditModal && (
        <CreateEditModal
          user={selectedUser}
          onClose={() => setShowCreateEditModal(false)}
          onSave={() => {
            setShowCreateEditModal(false);
            fetchUsers();
          }}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          entityName={selectedUser.name}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={async () => {
            const token = localStorage.getItem("authToken");
            try {
              await axios.delete(
                `http://localhost:5000/api/users/${selectedUser._id}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              setShowDeleteModal(false);
              fetchUsers();
            } catch (err) {
              alert("Failed to delete user.");
            }
          }}
        />
      )}
    </div>
  );
};

export default UsersPage;
