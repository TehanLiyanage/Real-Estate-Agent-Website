const express = require("express");
const { getFavorites, addFavorite } = require("../controllers/favoriteController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getFavorites);
router.post("/", authMiddleware, addFavorite);

module.exports = router;
