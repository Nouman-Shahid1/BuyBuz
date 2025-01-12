import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteModal from "../Modals/DeleteModal"; // Import the DeleteModal
import {
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaShoppingCart,
} from "react-icons/fa";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // Default filter set to 'all'
  const [selectedOrder, setSelectedOrder] = useState(null); // Track the selected order for deletion
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Manage modal visibility
  const [stats, setStats] = useState({ pending: 0, completed: 0 });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/orders/", {
          headers: {
            "Cache-Control": "no-cache",
          },
        });
        if (response.status === 200) {
          setOrders(response.data);

          // Calculate statistics
          const pending = response.data.filter(
            (order) => order.status.toLowerCase() === "pending"
          ).length;
          const completed = response.data.filter(
            (order) => order.status.toLowerCase() === "completed"
          ).length;

          setStats({ pending, completed });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const deleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/orders/${orderId}`
      );
      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderId)
        );
        setStats((prevStats) => ({
          ...prevStats,
          pending:
            orders.find((order) => order._id === orderId)?.status.toLowerCase() ===
            "pending"
              ? prevStats.pending - 1
              : prevStats.pending,
          completed:
            orders.find((order) => order._id === orderId)?.status.toLowerCase() ===
            "completed"
              ? prevStats.completed - 1
              : prevStats.completed,
        }));
      }
      setShowDeleteModal(false); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const toggleOrderStatus = async (orderId, currentStatus) => {
    try {
      const updatedStatus =
        currentStatus.toLowerCase() === "pending" ? "Completed" : "Pending";
      const response = await axios.put(
        `http://localhost:5000/api/orders/${orderId}`,
        { status: updatedStatus }
      );
      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: updatedStatus } : order
          )
        );
        setStats((prevStats) => ({
          pending:
            currentStatus.toLowerCase() === "pending"
              ? prevStats.pending - 1
              : prevStats.pending + 1,
          completed:
            currentStatus.toLowerCase() === "pending"
              ? prevStats.completed + 1
              : prevStats.completed - 1,
        }));
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter(
          (order) =>
            order.status.toLowerCase() === filter.toLowerCase() // Normalize status and filter for comparison
        );

  return (
    <div className="p-6 bg-gray-50 ">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Manage Orders</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-6 bg-blue-600 text-white rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Pending Orders</h2>
            <p className="text-4xl font-bold">{stats.pending}</p>
          </div>
          <FaClipboardList className="text-6xl opacity-50" />
        </div>
        <div className="p-6 bg-green-600 text-white rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Completed Orders</h2>
            <p className="text-4xl font-bold">{stats.completed}</p>
          </div>
          <FaCheckCircle className="text-6xl opacity-50" />
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="flex gap-4 mb-6">
        {["all", "pending", "completed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-6 py-2 rounded-full ${
              filter === status
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-800"
            } shadow-lg font-semibold hover:opacity-90 transition`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)} Orders
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div
                key={order._id}
                className="border p-6 rounded-lg shadow-lg bg-white hover:shadow-xl transition"
              >
                <p className="text-gray-700 mb-2">
                  <strong>Order ID:</strong> {order._id}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Name:</strong> {order.shippingAddress.firstName}{" "}
                  {order.shippingAddress.lastName}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Items:</strong>
                  <ul className="list-disc list-inside">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.product?.name || "Unknown Product"} (x
                        {item.quantity})
                      </li>
                    ))}
                  </ul>
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Total:</strong> ${order.total.toFixed(2)}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`${
                      order.status.toLowerCase() === "pending"
                        ? "text-yellow-500"
                        : "text-green-500"
                    } font-bold`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </p>
                <div className="flex flex-col gap-2 mt-4">
                  <button
                    onClick={() => toggleOrderStatus(order._id, order.status)}
                    className={`py-2 px-4 rounded-lg ${
                      order.status.toLowerCase() === "pending"
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    } text-white font-semibold transition`}
                  >
                    {order.status.toLowerCase() === "pending"
                      ? "Mark as Completed"
                      : "Mark as Pending"}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowDeleteModal(true);
                    }}
                    className="py-2 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition"
                  >
                    Delete Order
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-gray-600 text-center">
              No {filter} orders found.
            </p>
          )}
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteModal
          entityName={`Order #${selectedOrder?._id}`}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => deleteOrder(selectedOrder?._id)}
        />
      )}
    </div>
  );
};

export default OrdersPage;
