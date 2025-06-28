require("dotenv").config();

const bookRoutes = require("./Routes/book-routes.js");

const connectToDb = require("./database/Db.js");
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

connectToDb();

//middleware

app.use(express.json());

//routes here
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
