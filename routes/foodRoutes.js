const express = require("express");
const router = express.Router();

const { getAllFoods, addFood } = require("../controllers/foodController");

// GET all foods
router.get("/", getAllFoods);

// POST add food (admin later)
router.post("/", addFood);

module.exports = router;
