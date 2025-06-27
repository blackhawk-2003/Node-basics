const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://hawkb1433:hawkb14332025@cluster0.vwjkug4.mongodb.net/"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log("Error connecting to MongoDB", e);
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

//creating user model

const user = mongoose.model("User", userSchema);

async function runQueryExamples() {
  try {
    //creating a new document
    const user1 = new user({
      name: "updated Singh",
      email: "updatedssdoe@example.com",
      age: 21,
      isActive: false,
      tags: ["Developer"],
    });
    await user1.save();
    console.log("Created new user", user1);

    //get all users
    const allUser = await user.find({});
    console.log("All users", allUser);

    //get some user as per specific condition

    const getUserOfActiveFalse = await user.find({
      isActive: true,
    });
    console.log(getUserOfActiveFalse);

    //Using find one:- Gives always the first user that matches the user

    const getUserOfActiveFalse1 = await user.findOne({ isActive: true }); //returns the first user that matches the condition
    console.log(getUserOfActiveFalse1);

    //to get the user by id

    const getLastCreatedUserByUserId = await user.findById(user1.id);
    console.log(getLastCreatedUserByUserId);

    //Getting the user with some select properties

    const selectedField = await user.find().select("name email -_id");
    console.log(selectedField);

    //for pagination and limited user

    const limitedUser = await user.find().limit(5).skip(1);
    console.log(limitedUser);

    //to get the user in sorted manner

    const sortedUsers = await user.find().sort({ age: -1 });
    console.log(sortedUsers);

    const countDocuments = await user.countDocuments({ isActive: false });
    console.log(countDocuments);

    //deleting a user

    const deletedUser = await user.findByIdAndDelete(user1.id);
    console.log("Deleted user", deletedUser);

    //update can also be done by find by id and update
    const updatedUser = await user.findByIdAndUpdate(
      user1.id,
      {
        $set: { name: "Abhay Singh Doe" },
        $push: { tags: "updated" },
      },
      { new: true }
    );
    console.log(updatedUser);
  } catch (e) {
    console.log(e);
  } finally {
    await mongoose.connection.close();
  }
}

runQueryExamples();
