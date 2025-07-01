const User = require("../Models/User.js");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

//register endpoint logic controller
const registerUser = async (req, res) => {
  try {
    //first extract user information from our req body
    const { username, email, password, role } = req.body;
    //check ig the user is already exist in our database

    const checkExistingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (checkExistingUser) {
      return res
        .status(400)
        .json({ message: "User already exist", success: false });
    }
    //hash user password using bcrypt

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create a new document in our user collection
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    await newUser.save();

    if (newUser) {
      return res.status(201).json({
        message: "User created successfully",
        success: true,
        data: newUser,
      });
    } else {
      return res.status(400).json({
        message: "Failed to create user, Please Try again",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
    });
  }
};

//login controller

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    //first find the current user is exist in database or not

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "Invalid Credential",
        success: false,
      });
    }

    //check if the password is correct or not

    const isPasswordMatch = await bcrypt.compare(password, user.password); //compare the password with the hashed password
    if (!isPasswordMatch) {
      return res.status(404).json({
        message: "Invalid Credential",
        success: false,
      });
    }

    //bearer token bears the all the information of the currently logged in user

    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );

    res.status(200).json({
      message: "Login Successfull",
      success: true,
      accessToken: accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.userInfo.userId;

    //extract old and new password

    const { oldPassword, newPassword } = req.body;

    //find the current logedin user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    //check if the old password is correct

    const isValidPassword = await bcrypt.compare(oldPassword, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        message: "Invalid Old Password",
        success: false,
      });
    }

    //hash the new password
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    //update the user password

    user.password = newHashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password changed successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
    });
  }
};

module.exports = { registerUser, loginUser, changePassword };
