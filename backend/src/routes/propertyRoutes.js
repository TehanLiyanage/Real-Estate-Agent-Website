const express = require("express");
const { getAllProperties, addProperty, getPropertyById, updateProperty, deleteProperty } = require("../controllers/propertyController");

const router = express.Router();

router.get("/", getAllProperties);
router.post("/", addProperty);
router.get("/:id", getPropertyById);
router.put("/:id", updateProperty);  // ✅ Fix: Ensure updateProperty is imported
router.delete("/:id", deleteProperty);

module.exports = router;
