const express = require("express");

const router = express.Router();
const authMiddleware = require("../Middlewares/auth-middleware.js");

//We need to protect this route if the user is not logged in using middleware

router.get("/welcome", authMiddleware, (req, res) => {
  const { username, userId, role } = req.userInfo;
  res.json({
    message: "Welcome to the home page",
    user: {
      _id: userId,
      username: username,
      role: role,
    },
  });
});

module.exports = router;
