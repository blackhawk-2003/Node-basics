const express = require("express");

const router = express.Router();

const { registerUser, loginUser } = require("../Controller/auth-controller.js");
//All routes are related to authentication only

router.post("/register", registerUser);

router.post("/login", loginUser);
module.exports = router;
