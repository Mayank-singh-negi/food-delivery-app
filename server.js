const { errorHandler } = require("./middleware/errorMiddleware");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// load env
dotenv.config();

// connect database
connectDB();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const foodRoutes = require("./routes/foodRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");




app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/foods", foodRoutes);   // 👈 THIS LINE
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


// sab routes ke BAAD
app.use(errorHandler);
