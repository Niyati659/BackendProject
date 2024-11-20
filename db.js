const mongoose = require("mongoose");
require("dotenv").config();

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "socialmedia", // Replace with your actual database name
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit process on failure
  }
}

module.exports = connectDB;
