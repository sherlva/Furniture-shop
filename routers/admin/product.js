const express = require("express");
const router = express.Router();
const Product = require("../../model/Product");
const Categories = require("../../model/Category");

router.get("/", async (req, res) => {
  const products = await Product.find();

  res.render("admin/products", {
    title: "Category add",
    layout: "admin/layout",
    products,
  });
});

router.get("/add", async (req, res) => {
  const categories = await Categories.find();

  res.render("admin/productAdd", {
    title: "add",
    layout: "admin/layout",
    categories,
  });
});

router.post("/add", async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();
  } catch (error) {
    console.log(error);
  }
  res.redirect("/admin/products");
});

router.get("/update/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  const categories = await Categories.find();
  res.render("admin/productUpdate", {
    title: "PRoduct Update",
    layout: "admin/layout",
    product,
    categories,
  });
});

router.post("/update/:id", async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/admin/products");
});

router.get("/delete/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/admin/products");
});

module.exports = router;
