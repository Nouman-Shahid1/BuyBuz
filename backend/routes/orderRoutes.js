const express = require("express");
const Order = require("../models/order");
const router = express.Router();

// Create a new order
router.post("/", async (req, res) => {
    try {
      console.log("Request body:", req.body);
  
      const {
        user,
        email,
        items,
        shippingAddress,
        deliveryMethod,
        subtotal,
        shippingCost,
        total,
      } = req.body;
  
      if (!user) {
        return res.status(400).json({ message: "User ID is required." });
      }
      if (!email) {
        return res.status(400).json({ message: "Email is required." });
      }
  
      const newOrder = new Order({
        user,
        email,
        items,
        shippingAddress,
        deliveryMethod,
        subtotal,
        shippingCost,
        total,
      });
  
      const savedOrder = await newOrder.save();
      res.status(201).json(savedOrder);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Failed to create order", error });
    }
  });
  
  
// Get all orders
// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "items.product", // Populate the product field in items
        select: "name price", // Include name and price fields from Product model
      })
      .sort({ createdAt: -1 }) // Sort by creation date
      .exec();

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Failed to delete order", error });
  }
});






// Get orders for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
});

// Get order by ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch order", error });
  }
});

// Update order status
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update order", error });
  }
});

module.exports = router;
