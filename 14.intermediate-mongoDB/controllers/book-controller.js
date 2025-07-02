const Author = require("../models/Author");
const Book = require("../models/Book");

const createAuthor = async (req, res) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).json({
      message: "Author add successfully",
      data: author,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error creating author",
      success: false,
    });
  }
};

const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      message: "Book added successfully",
      data: book,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error creating Book",
      success: false,
    });
  }
};

const getBookWithAuthor = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("author");
    if (!book) {
      return res.status(404).json({
        message: "Book not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Book with author found",
      data: book,
      success: true,
    });
  } catch (error) {
    onsole.log(error);
    res.status(500).json({
      message: "Error Fetching Book",
      success: false,
    });
  }
};

module.exports = { createAuthor, createBook, getBookWithAuthor };
