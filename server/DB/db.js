const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("db is connected");
  } catch (error) {
    console.log("db is not connected");

    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
