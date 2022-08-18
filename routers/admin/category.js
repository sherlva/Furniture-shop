const express = require("express");
const router = express.Router();
const Categories = require("../../model/Category");

router.get('/', async(req,res)=>{
  const categories = await Categories.find();
  
  res.render("admin/categories", {
    title: "Category add",
    layout: "admin/layout",
    categories
  });
})

router.get("/add", async (req, res) => {
  res.render("admin/categoryAdd", {
    title: "Category add",
    layout: "admin/layout",
  });
});

router.post("/add", async (req, res) => {
  const category = new Categories(req.body);
  try {
    await category.save();
  } catch (error) {
    console.log(error);
  }
  res.redirect("/admin/category");
});

router.get("/update/:id", async (req, res) => {
  const category = await Categories.findById(req.params.id);
  res.render("admin/categoryUpdate", {
    title: "Category Update",
    layout: "admin/layout",
    category,
  });
});

router.post("/update/:id", async (req, res) => {
  try {
    await Categories.findByIdAndUpdate(req.params.id, req.body);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/admin/category");
});

router.get("/delete/:id", async (req, res) => {
  try {
    await Categories.findByIdAndDelete(req.params.id);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/category");
});

module.exports = router;
