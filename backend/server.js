const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const signatureRoutes = require("./routes/signatureRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const planRoutes = require("./routes/planRoutes");
const settingRoutes = require("./routes/settingRoutes");

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/signatures", signatureRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/settings", settingRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SignAdmin API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
