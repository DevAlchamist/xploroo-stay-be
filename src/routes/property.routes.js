const express = require("express");
const router = express.Router();
const {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getPropertiesByQuery,
} = require("../controllers/property.controller");

router.get("/", getAllProperties);
router.get("/", getPropertiesByQuery);
router.get("/:id", getPropertyById);
router.post("/", createProperty);
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);

module.exports = router;
