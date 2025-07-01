const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized!! Please Log in First to access this page",
      success: false,
    });
  }

  //decode this token

  try {
    const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userInfo = decodedTokenInfo;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = authMiddleware;
