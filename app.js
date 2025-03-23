require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", require("./routes/auth.routes"));

// Test Route
app.use("/", (req, res) => {
  res.status(200).json({ message: "API is working!" });
});

// Export app for use in serverless function
module.exports = app;
