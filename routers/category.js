const express = require("express");
const router = express.Router();
const Categories = require("../model/Category")

router.get("/add", async (req, res) => {
    // const categories = await Categories.find();
    // console.log(categories);
    res.render("categoryAdd", {
        title: "Category add",
        layout: 'admin'
        // categories,
    });
});

router.post("/add", async (req, res) => {
    const category = new Categories(req.body)

    try {
        await category.save()
    } catch (error) {
        console.log(error);
    }
    res.redirect('/')

    
});


module.exports = router