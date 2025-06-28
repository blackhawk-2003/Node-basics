//We are going to create all the controllers here based on the routes
const Book = require("../Models/Book.js");

//to get all the books
const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find({});
    if (allBooks?.length > 0) {
      res.status(200).json({
        message: "Books Found SuccesFully",
        data: allBooks,
        success: true,
      });
    } else {
      res.status(404).json({
        message: "No Books Found",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

//To get a book by id
const getSingleBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const singleBook = await Book.findById(bookId);
    if (singleBook) {
      res.status(200).json({
        message: "Book Found SuccesFully",
        data: singleBook,
        success: true,
      });
    } else {
      res.status(404).json({
        message: "Book Not Found with the current ID",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

//To add a new book
const addNewBook = async (req, res) => {
  try {
    const newBookData = req.body;
    const newBook = await Book.create(newBookData);
    if (newBook) {
      res.status(201).json({
        success: true,
        message: "Book added successfully",
        data: newBook,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to add book" });
    console.log(error);
  }
};

const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const updatedData = req.body;
    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedData, {
      new: true,
    });
    if (updatedBook) {
      res.status(200).json({
        message: "Book updated successfully",
        data: updatedBook,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update book", success: false });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (deleteBook) {
      res.status(200).json({
        message: "Book deleted successfully",
        success: true,
        data: deletedBook,
      });
    } else {
      res
        .status(404)
        .json({ message: "Book not found with the current ID", success });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllBooks,
  getSingleBookById,
  addNewBook,
  updateBook,
  deleteBook,
};
