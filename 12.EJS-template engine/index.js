const express = require("express");

const path = require("path");

const app = express();

//set the view engine as ejs

app.set("view engine", "ejs");

//set the directory for the views

app.set("views", path.join(__dirname, "views"));

const products = [
  { id: 1, name: "product1" },
  { id: 2, name: "product2" },
  { id: 3, name: "product3" },
];

app.get("/", (req, res) => {
  res.render("home", { title: "home", products: products });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Page" });
});

const port = 3000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
