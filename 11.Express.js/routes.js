const express = require("express");

const app = express();

//root route

app.get("/", (req, res) => {
  res.send("Welcome to our home page");
});

///get all products

app.get("/products", (req, res) => {
  const products = [
    { id: 1, name: "product1", price: 10 },
    { id: 2, name: "product2", price: 20 },
    { id: 3, name: "product3", price: 30 },
  ];
  res.json(products);
});

//to get a single product using dynamic routing

app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const products = [
    { id: 1, name: "product1", price: 10 },
    { id: 2, name: "product2", price: 20 },
    { id: 3, name: "product3", price: 30 },
  ];

  const getSingleProducts = products.find(
    (product) => (product.id = productId)
  );
  if (getSingleProducts) {
    res.json(getSingleProducts);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
