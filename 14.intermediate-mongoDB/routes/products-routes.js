const express = require("express");

const router = express.Router();

const {
  insertSampleProducts,
  getProductsStats,
  getProductAanalysis,
} = require("../controllers/product-controller");

//to create the sample products
router.post("/sample-products", insertSampleProducts);

//to get the prodcut stats

router.get("/stats", getProductsStats);

//to get the product analysis

router.get("/analysis", getProductAanalysis);

module.exports = router;
