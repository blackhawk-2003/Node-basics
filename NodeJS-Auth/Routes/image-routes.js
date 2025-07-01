const express = require("express");
const authMiddleware = require("../Middlewares/auth-middleware");
const adminMiddleware = require("../Middlewares/admin-middleware");
const uploadMiddleware = require("../Middlewares/upload-middleware");
const {
  uploadImageController,
  fetchImageController,
  deleteImageController,
} = require("../Controller/image-controller");

const router = express.Router();

//upload the image
router.post(
  "/upload",
  authMiddleware,
  adminMiddleware,
  uploadMiddleware.single("image"), // This multer middleware is only required if you want to save the file locally also
  uploadImageController
);

//get all the images
router.get("/fetchimages", authMiddleware, fetchImageController);

//delete image route

router.delete(
  "/delete/:id",
  authMiddleware,
  adminMiddleware,
  deleteImageController
);

module.exports = router;
