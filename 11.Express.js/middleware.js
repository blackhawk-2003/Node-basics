const express = require("express");

const app = express();

//define first middleware fucnction

const myFirstMiddleware = (req, res, next) => {
  console.log("First middleware will run on every request");
  next();
};

app.use(myFirstMiddleware);

app.get("/", (req, res) => {
  res.send("Hello from home page");
});

app.get("/about", (req, res) => {
  res.send("Hello from about page");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
