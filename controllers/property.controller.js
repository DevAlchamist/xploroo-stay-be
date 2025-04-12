const Bookings = require("../models/booking.model");
const Property = require("../models/property.model");
const Review = require("../models/review.model");
const handleEmail = require("./email.controller");

// @desc Get all properties
// @route GET /api/properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Get property by ID
// @route GET /api/properties/:id
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const createProperty = async (req, res) => {
  console.log("Incoming property data:", req.body);
  try {
    console.log("Incoming property data:", req.body);

    // Create and save the property document
    const newProperty = new Property(req.body);
    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ message: "Failed to create property", error });
  }
};

// @desc Update a property
// @route PUT /api/properties/:id
const updateProperty = async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProperty)
      return res.status(404).json({ message: "Property not found" });
    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const booking = await Bookings.find()
      .populate("user", "name email")
      .populate("property", "title location price");

    if (booking) {
      res.json(booking);
    } else {
      res.status(404).json({ message: "booking not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
// @desc Get properties based on filters
// @route GET /api/properties/search
const getPropertiesByQuery = async (req, res) => {
  try {
    const { location, minPrice, maxPrice, type } = req.query;

    let query = {};
    if (location) query.location = location;
    if (minPrice) query.price = { $gte: minPrice };
    if (maxPrice) query.price = { ...query.price, $lte: maxPrice };
    if (type) query.type = type;

    const properties = await Property.find(query).populate(
      "owner",
      "name email"
    );
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving properties" });
  }
};

// @desc Delete a property
// @route DELETE /api/properties/:id
const deleteProperty = async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    if (!deletedProperty)
      return res.status(404).json({ message: "Property not found" });
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  getPropertiesByQuery,
  updateProperty,
  deleteProperty,
  getAllBookings,
};
