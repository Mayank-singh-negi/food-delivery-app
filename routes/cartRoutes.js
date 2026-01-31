const express = require("express");
const router = express.Router();

const {
  addToCart,
  getMyCart,
  updateCartItem,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addToCart);
router.get("/", protect, getMyCart);
router.put("/update", protect, updateCartItem);

module.exports = router;
