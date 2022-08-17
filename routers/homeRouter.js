const express = require("express");
const router = express.Router();


router.get("/", async (req, res) => {
  // const products = await Mongo.find();
  res.render("home", {
    title: "Home page",
    // products,
  });
});

module.exports = router;