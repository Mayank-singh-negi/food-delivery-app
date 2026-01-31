const Food = require("../models/food");

const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addFood = async (req, res) => {
  try {
    const food = await Food.create(req.body);
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllFoods, addFood };
