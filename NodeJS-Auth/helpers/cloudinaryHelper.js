const cloudinary = require("../config/cloudinary.js");

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.log("Error while uploading to Cloudinary:", error);
    throw new error("Error while uploading to Cloudinary");
  }
};

module.exports = uploadToCloudinary;
