const User = require("../models/User");
const Order = require("../models/order");

exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalOrders = await Order.countDocuments();

    const pendingOrders = await Order.countDocuments({ status: "Pending" });
    const completedOrders = await Order.countDocuments({ status: "Completed" });

    const totalRevenueAggregation = await Order.aggregate([
      { $match: { status: "Completed" } },
      { $group: { _id: null, totalRevenue: { $sum: "$total" } } },
    ]);
    const totalRevenue = totalRevenueAggregation[0]?.totalRevenue || 0;

    const monthlyStats = await Order.aggregate([
      { $match: { status: "Completed" } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          monthlyRevenue: { $sum: "$total" },
          monthlyOrders: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const monthlyRevenue = monthlyStats.map((stat) => ({
      month: new Date(stat._id.year, stat._id.month - 1).toLocaleString(
        "default",
        { month: "short" }
      ),
      amount: stat.monthlyRevenue,
    }));

    const monthlyOrders = monthlyStats.map((stat) => ({
      month: new Date(stat._id.year, stat._id.month - 1).toLocaleString(
        "default",
        { month: "short" }
      ),
      count: stat.monthlyOrders,
    }));

    res.status(200).json({
      totalUsers,
      totalOrders,
      pendingOrders,
      completedOrders,
      totalRevenue,
      monthlyRevenue,
      monthlyOrders,
    });
  } catch (error) {
    console.error("Error fetching stats:", error.message);
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
};
