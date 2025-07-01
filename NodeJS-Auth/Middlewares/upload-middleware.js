const multer = require("multer");

const path = require("path");

//This is multer middleware is only required if you want to save the file locally also

//set our multer storage

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.filename + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

//file fiter function

const checkFileFilter = (req, file, sb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    sb(null, true);
  } else {
    sb(new Error("Not an image. Please upload only image"));
  }
};

//create the multer middleware

module.exports = multer({
  storage: storage,
  fileFilter: checkFileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, //5mb
  },
});
