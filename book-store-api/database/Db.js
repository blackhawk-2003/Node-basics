//connect to the database

const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://hawkb1433:hawkb14332025@cluster0.3oc8orp.mongodb.net/"
    );
    console.log("MongoDb is succesfully connnected");
  } catch (error) {
    console.error("MongoDb Connection failed", error);
    process.exit(1);
  }
};

module.exports = connectToDb;
