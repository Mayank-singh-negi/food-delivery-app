const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: String,
    category: String,
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// ✅ SAFE EXPORT (THIS FIXES YOUR ERROR)
module.exports =
  mongoose.models.Food || mongoose.model("Food", foodSchema);
