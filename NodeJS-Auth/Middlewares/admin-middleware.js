const isAdminUser = (req, res, next) => {
  if (req.userInfo.role !== "admin") {
    return res.status(403).send({
      message: "Forbidden!! ONly admin can access this page",
      success: false,
    });
  }
  next();
};

module.exports = isAdminUser;
