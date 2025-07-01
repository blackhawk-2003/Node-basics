const express = require("express");

const router = express.Router();
const authMiddleware = require("../Middlewares/auth-middleware.js");

const {
  registerUser,
  loginUser,
  changePassword,
} = require("../Controller/auth-controller.js");
//All routes are related to authentication only

router.post("/register", registerUser);

router.post("/login", loginUser);

router.put("/change-password", authMiddleware, changePassword);
module.exports = router;
