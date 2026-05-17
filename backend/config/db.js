const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(url, { family: 4 });
    console.log("Successfully connect to MongoDB");
  } catch (error) {
    console.log("Error while connecting database: ", error.message);
  }
};

module.exports = connectDB;
