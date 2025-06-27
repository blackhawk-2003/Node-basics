const express = require("express");

const app = express();

//Middleware

app.use(express.json());

let books = [
  {
    id: 1,
    title: "Book 10",
  },
  {
    id: 2,
    title: "Book 2",
  },
  {
    id: 3,
    title: "Book 3",
  },
];

//intro route

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to our book store",
  });
});

//get all books routes

app.get("/get", (req, res) => {
  res.json(books);
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//get a single book route

app.get("/get/:id", (req, res) => {
  const id = req.params.id;
  const book = books.find((book) => {
    return book.id == id;
  });
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({
      message: "Book not found!! Try with a diferent book id",
    });
  }
});

//create a book

app.post("/add", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: `Book ${books.length + 1}`,
  };
  books.push(newBook);
  res.status(200).json({
    data: newBook,
    message: "Book created successfully!!",
  });
});

//update a book by id

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const book = books.find((book) => {
    return book.id == id;
  });
  if (book) {
    const { title } = req.body;
    book.title = title;
    res.status(200).json({
      data: book,
      message: "Book updated successfully!!",
    });
  } else {
    res.status(404).json({
      message: "Book not found!! Try with a diferent book id",
    });
  }
});

//delete a book

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const book = books.find((book) => {
    return book.id == id;
  });
  if (book) {
    const index = books.indexOf(book);
    books.splice(index, 1);
    res.status(200).json({
      message: "Book deleted successfully!!",
    });
  } else {
    res.status(404).json({
      message: "Book not found!! Try with a diferent book id",
    });
  }
});

//We have succesfully created all the crud operations for our books collection
//we will create models and controllers and routes and seprately from the next part to keep the app.js
//or the main starter file as clean as possible
