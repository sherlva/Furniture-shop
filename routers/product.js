const express = require("express");
const router = express.Router();
const Product = require("../model/Product");
const Categories = require("../model/Category")

router.get("/add", async (req, res) => {
    const categories = await Categories.find();
    // console.log(categories);
    res.render("add", {
        title: "add",
        layout: 'admin',
        categories,
    });
});

router.post("/add", async (req, res) => {
    const product = new Product(req.body)

    try {
        await product.save()
    } catch (error) {
        console.log(error);
        return
    }
    res.redirect('/')

});


module.exports = router;