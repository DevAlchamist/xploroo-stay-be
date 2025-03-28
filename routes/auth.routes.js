const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUser,
} = require("../controllers/auth.controller");
const protect = require("../middleware/authMiddleware");
const userModel = require("../models/user.model");

const router = express.Router();
router.post("/register", registerUser);
router.get("/users", getAllUser);
router.post("/login", loginUser);
router.get("/me", protect, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password"); // Exclude password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Error fetching user", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
