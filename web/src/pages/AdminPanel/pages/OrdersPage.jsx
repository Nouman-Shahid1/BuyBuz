import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteModal from "../Modals/DeleteModal"; // Import the DeleteModal

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");
  const [selectedOrder, setSelectedOrder] = useState(null); // Track the selected order for deletion
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Manage modal visibility

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
      }
      setShowDeleteModal(false); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const toggleOrderStatus = async (orderId, currentStatus) => {
    try {
      const updatedStatus = currentStatus === "pending" ? "completed" : "pending";
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
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Orders</h1>

      <div className="flex gap-4 mb-6">
        {["all", "pending", "completed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded ${
              filter === status
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
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
                className="border p-4 rounded-lg shadow bg-white"
              >
                <p className="text-gray-600 mb-2">
                  <strong>Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Name:</strong> {order.shippingAddress.firstName}{" "}
                  {order.shippingAddress.lastName}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Address:</strong> {order.shippingAddress.address},{" "}
                  {order.shippingAddress.city}, {order.shippingAddress.state},{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Items:</strong>
                  <ul className="list-disc list-inside">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.product?.name || "Unknown Product"} (x{item.quantity})
                      </li>
                    ))}
                  </ul>
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Total:</strong> ${order.total.toFixed(2)}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`${
                      order.status === "pending"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </p>
                {order.status === "pending" && (
                  <button
                    onClick={() => toggleOrderStatus(order._id, order.status)}
                    className="w-full py-2 px-4 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Mark as Complete
                  </button>
                )}
                {order.status === "completed" && (
                  <button
                    onClick={() => toggleOrderStatus(order._id, order.status)}
                    className="w-full py-2 px-4 mt-4 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Mark as Pending
                  </button>
                )}
                <button
                  onClick={() => {
                    setSelectedOrder(order); // Set the selected order for deletion
                    setShowDeleteModal(true); // Open the delete modal
                  }}
                  className="w-full py-2 px-4 mt-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete Order
                </button>
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
        entityName={`Order #${deleteOrder._id}`}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => deleteOrder(selectedOrder._id)} 
        />
      )}
    </div>
  );
};

export default OrdersPage;
