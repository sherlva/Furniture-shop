const express = require("express");
const router = express.Router();
const Product = require("../model/Product");

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.render("home", {
    title: "Home page",
    products,
  });
});

module.exports = router;
