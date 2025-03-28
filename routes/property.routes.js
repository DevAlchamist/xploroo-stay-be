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
const { upload, uploadImages } = require("../controllers/upload.controller");

router.get("/", getAllProperties);
router.get("/search", getPropertiesByQuery);
router.get("/:id", getPropertyById);
router.post("/", createProperty);
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);
router.post("/images", upload.any(), uploadImages);

module.exports = router;
