require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const productRoutes = require("./routes/products-routes");
const bookRoutes = require("./routes/book-routes");
//connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

//user middleware
app.use(express.json());

const PORT = process.env.PORT || 3000;

//create the routes
app.use("/products", productRoutes);
app.use("/reference", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
