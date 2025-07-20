const Favorite = require("../models/Favorite");

exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.id }).populate("propertyId");
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const { propertyId } = req.body;
    const newFavorite = new Favorite({ userId: req.user.id, propertyId });

    await newFavorite.save();
    res.status(201).json({ message: "Added to favorites" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
