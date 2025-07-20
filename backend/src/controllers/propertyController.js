const mongoose = require("mongoose");
const Property = require("../models/Property");

// ✅ Get All Properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties.length > 0 ? properties : []);
  } catch (error) {
    console.error("❌ Error fetching properties:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Get Property by ID
const getPropertyById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid property ID format." });
    }

    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found." });
    }

    res.json(property);
  } catch (error) {
    console.error("❌ Error fetching property by ID:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Add a New Property
const addProperty = async (req, res) => {
  try {
    let { 
      type, price, bedrooms, tenure, added, postcode, 
      title, shortDescription, longDescription, image, images, 
      floorPlan, googleMap 
    } = req.body;

    if (!type || !price || !bedrooms || !tenure || !added || !postcode || !title || 
        !shortDescription || !longDescription || !image || !images || !floorPlan || !googleMap) {
      return res.status(400).json({ message: "All fields are required." });
    }

    added = new Date(added);
    if (isNaN(added.getTime())) {
      return res.status(400).json({ message: "Invalid date format for 'added' field." });
    }

    const newProperty = new Property({ 
      type, price, bedrooms, tenure, added, postcode, 
      title, shortDescription, longDescription, image, images, 
      floorPlan, googleMap 
    });

    await newProperty.save();
    res.status(201).json({ message: "Property added successfully", property: newProperty });

  } catch (error) {
    console.error("❌ Error Adding Property:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Update a Property by ID
const updateProperty = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid property ID format." });
    }

    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found." });
    }

    res.json({ message: "Property updated successfully", property: updatedProperty });
  } catch (error) {
    console.error("❌ Error updating property:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Delete Property by ID
const deleteProperty = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid property ID format." });
    }

    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found." });
    }

    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting property:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Ensure all functions are correctly exported
module.exports = { getAllProperties, getPropertyById, addProperty, updateProperty, deleteProperty };
