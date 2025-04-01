require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(express.json());
const allowedOrigins = [
  "https://xploroo-stays.vercel.app",
  "http://localhost:3000",
]; // Add your frontend URL

app.use(
  cors({
    origin: allowedOrigins, // Restrict to your frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies if needed
  })
);
app.options("*", cors());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/properties", require("./routes/property.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/payments", require("./routes/payment.routes"));

// Test Route
app.use("/", (req, res) => {
  res.status(200).json({ message: "API is working!" });
});

// Export app for use in serverless function
module.exports = app;
