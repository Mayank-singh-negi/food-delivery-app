const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const { protect, isAdmin } = require("../middleware/authMiddleware");

// USER ROUTES
router.post("/place", protect, placeOrder);
router.get("/my", protect, getMyOrders);

// ADMIN ROUTES
router.get("/admin", protect, isAdmin, getAllOrders);
router.put("/admin/:id/status", protect, isAdmin, updateOrderStatus);

module.exports = router;
