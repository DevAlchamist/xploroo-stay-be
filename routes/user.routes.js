const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
  deleteUser,
} = require("../controllers/user.controller");

const router = express.Router();
router.get("/:id", getUserProfile);
router.post("/update/:id", updateUserProfile);
router.delete("/delete", deleteUser);

module.exports = router;
