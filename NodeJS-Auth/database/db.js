const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB Successfully");
  } catch (error) {
    console.log("Connection failed to MongoDb", error);
    process.exit(1);
  }
};

module.exports = connectToDb;
