const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // Ensure environment variables are loaded

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("❌ MONGO_URI is not defined in .env file");
      return;
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected...");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
  }
};


module.exports = connectDB;

