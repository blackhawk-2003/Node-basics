const express = require("express");

const app = express();

const requesTimeStampLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`Request at ${timestamp} - ${req.method} ${req.url} 
    `);
  next();
};

app.use(requesTimeStampLogger);

app.get("/", (req, res) => {
  res.send("Hello from home page");
});

app.get("/about", (req, res) => {
  res.send("Hello from about page");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
