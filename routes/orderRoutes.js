const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} = require("../controllers/orderController");

const { protect, isAdmin } = require("../middleware/authMiddleware");

// USER ROUTES
router.post("/", protect, placeOrder);      // ✅ POST /api/orders
router.get("/my", protect, getMyOrders);    // GET /api/orders/my

// ADMIN ROUTES
router.get("/admin", protect, isAdmin, getAllOrders);
router.put("/admin/:id/status", protect, isAdmin, updateOrderStatus);

module.exports = router;
