const express = require("express");

const app = express();

//Create the root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = 3000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
