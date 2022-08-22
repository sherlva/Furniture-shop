const express = require("express");
const router = express.Router();
const Product = require("../../model/Product");
const Categories = require("../../model/Category");
const upload = require("../../middleware/upload");

router.get("/", async (req, res) => {
  const products = await Product.find();

  res.render("admin/products", {
    title: "Product add",
    layout: "admin",
    products,
  });
});

router.get("/add",  async (req, res) => {
  const categories = await Categories.find();

  res.render("admin/productAdd", {
    title: "add",
    layout: "admin",
    categories,
  });
});

router.post("/add",upload.single("img"), async (req, res) => {

  if (!req.file) {
    console.log("Img is not picked");
    res.redirect("/admin/product/add");
    return;
  }

  req.body.img = "/uploads/" + req.file.filename;

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
    layout: "admin",
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
