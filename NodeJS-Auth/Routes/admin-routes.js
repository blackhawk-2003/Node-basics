const express = require("express");
const authMiddleware = require("../Middlewares/auth-middleware.js");
const adminMiddleware = require("../Middlewares/admin-middleware.js");

const router = express.Router();

router.get("/welcome", authMiddleware, adminMiddleware, (req, res) => {
  res.json({
    message: "Welcome to the admin page",
  });
});

module.exports = router;
