const express = require("express");
const router = express.Router();
const Product = require("../model/Product");

router.get("/", async (req, res) => {
  let products = JSON.parse(JSON.stringify(await Product.find()));

  products.forEach((item) => {
    item.randomId = Math.floor(Math.random() * 9999999999999);
    item.pro = JSON.stringify(item);
  });

  res.render("home", {
    title: "Home page",
    products,
  });
});

module.exports = router;
