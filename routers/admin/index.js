const express = require("express");
const router = express.Router();

// index route === /admin
router.get("/", (req, res) => {
  res.render("admin", { 
    title: "Admin panel",
    layout: "admin/layout",
  });
});

// products
router.use("/products", require("./product"));

// categories
router.use("/category", require("./category"));

module.exports = router;
