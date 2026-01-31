const Cart = require("../models/cart");
const mongoose = require("mongoose");

// ================= ADD TO CART =================
const addToCart = async (req, res) => {
  try {
    const { food, quantity } = req.body;
    const userId = req.user._id;

    // 🔹 VALIDATION
    if (!food) {
      res.status(400);
      throw new Error("Food id is required");
    }

    if (quantity !== undefined && quantity < 1) {
      res.status(400);
      throw new Error("Quantity must be at least 1");
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [
          {
            food: new mongoose.Types.ObjectId(food),
            quantity: quantity || 1,
          },
        ],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.food.toString() === food
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity || 1;
      } else {
        cart.items.push({
          food: new mongoose.Types.ObjectId(food),
          quantity: quantity || 1,
        });
      }
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      data: cart,
    });
  } catch (error) {
    throw error;
  }
};

// ================= GET MY CART =================
const getMyCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.food"
    );

    if (!cart) {
      return res.status(200).json({
        success: true,
        items: [],
        message: "Cart is empty",
      });
    }

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    throw error;
  }
};

// ================= UPDATE CART ITEM =================
const updateCartItem = async (req, res) => {
  try {
    const { food, quantity } = req.body;

    // 🔹 VALIDATION
    if (!food) {
      res.status(400);
      throw new Error("Food id is required");
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      res.status(404);
      throw new Error("Cart not found");
    }

    const item = cart.items.find(
      (i) => i.food.toString() === food
    );

    if (!item) {
      res.status(404);
      throw new Error("Item not found in cart");
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (i) => i.food.toString() !== food
      );
    } else {
      item.quantity = quantity;
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated",
      data: cart,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addToCart,
  getMyCart,
  updateCartItem,
};
