const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID"],
      default: "PENDING",
    },
    orderStatus: {
      type: String,
      enum: ["PREPARING", "OUT_FOR_DELIVERY", "DELIVERED"],
      default: "PREPARING",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
