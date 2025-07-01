const Image = require("../Models/image.js");
const uploadToCloudinary = require("../helpers/cloudinaryHelper.js");

const cloudinary = require("../config/cloudinary.js");
const fs = require("fs");

const uploadImageController = async (req, res) => {
  try {
    //check is the file is missing or not

    if (!req.file) {
      return res
        .status(400)
        .json({ sucess: false, message: "Please select an image" });
    }

    //upload to cloudinary

    const { url, public_id } = await uploadToCloudinary(req.file.path);

    //store the image url and public id in the database

    const newlyUpload = new Image({
      url: url,
      public_id: public_id,
      uploadedBy: req.userInfo.userId,
    });

    await newlyUpload.save();

    //delete the file from the local storage that was done by multer
    fs.unlinkSync(req.file.path);
    //return the newly uploaded image details
    res.status(201).json({
      sucess: true,
      image: newlyUpload,
      message: "image upload succesfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong please try again",
    });
  }
};

const fetchImageController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
    const totalImages = await Image.countDocuments();
    const totalPages = Math.ceil(totalImages / limit);

    const sortObj = {
      [sortBy]: sortOrder,
    };
    const images = await Image.find({}).sort(sortObj).skip(skip).limit(limit);
    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: totalPages,
      totalImages: totalImages,
      data: images,
      message: "The images were fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong please try again",
    });
  }
};

//Controller for deleting the image

const deleteImageController = async (req, res) => {
  try {
    const getCurrentImageId = req.params.id;
    const userId = req.userInfo.userId;
    //find the image that was uploaded by the user
    const image = await Image.findById(getCurrentImageId);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    //check if the current user is the one who uploaded
    if (image.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this image",
      });
    }

    //Now delete the image first from cloudinary storage

    await cloudinary.uploader.destroy(image.public_id);

    //Now delete this image from mongoDb aswell

    await Image.findByIdAndDelete(getCurrentImageId);

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong please try again",
    });
  }
};

module.exports = {
  uploadImageController,
  fetchImageController,
  deleteImageController,
};
