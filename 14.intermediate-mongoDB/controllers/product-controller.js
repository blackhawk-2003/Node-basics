const Product = require("../models/product");

//add some sample prodcuts
const insertSampleProducts = async (req, res) => {
  try {
    //create sample products here

    const products = [
      {
        name: "Laptop",
        category: "Electronics",
        price: 999,
        inStock: true,
        tags: ["tech", "computer"],
      },
      {
        name: "Smartphone",
        category: "Electronics",
        price: 699,
        inStock: true,
        tags: ["mobile", "tech"],
      },
      {
        name: "Headphones",
        category: "Electronics",
        price: 199,
        inStock: false,
        tags: ["audio", "tech"],
      },
      {
        name: "Running Shoes",
        category: "Sports",
        price: 89,
        inStock: true,
        tags: ["running", "footwear"],
      },
      {
        name: "Novel",
        category: "Books",
        price: 29,
        inStock: true,
        tags: ["fiction", "best-seller"],
      },
    ];

    const result = await Product.insertMany(products);
    res.status(201).json({
      message: "Sample products created",
      data: `Inserted ${result.length} products`,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, success: false, result: [] });
  }
};

const getProductsStats = async (req, res) => {
  try {
    const result = await Product.aggregate([
      //This is our stage one
      {
        $match: {
          inStock: true,
          price: { $gte: 100 },
        },
      },
      //This is our stage two. Grouping
      {
        $group: {
          _id: "$category",
          avgPrice: {
            $avg: "$price",
          },
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({
      message: "Products stats fetched",
      data: result,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error.message, success: false, result: [] });
  }
};

const getProductAanalysis = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $match: {
          category: "Electronics",
        },
      },
      //using some commmon aggregate operators
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$price",
          },
          averagePrice: {
            $avg: "$price",
          },
          maxProductPrice: {
            $max: "$price",
          },
          minProductPrice: {
            $min: "$price",
          },
        },
      },

      //using the project aggregate operator

      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          averagePrice: 1,
          maxProductPrice: 1,
          minProductPrice: 1,
          priceRange: {
            $subtract: ["$maxProductPrice", "$minProductPrice"],
          },
        },
      },
    ]);
    res.status(200).json({
      message: "Product analysis fetched",
      data: result,
      success: true,
    });
  } catch (error) {
    console.log(error);
    console.log(error);
    res
      .status(500)
      .json({ message: error.message, success: false, result: [] });
  }
};

module.exports = {
  insertSampleProducts,
  getProductsStats,
  getProductAanalysis,
};
