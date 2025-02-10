/**
 * Establishes a connection to the MongoDB database.
 * Utilizes the connection string from the environment variable `MONGO_URI`.
 * @async
 * @function connectDB
 * @returns {Promise<void>} Logs the status of the connection or exits the process on failure.
 */
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
