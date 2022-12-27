const express = require("express");
const router = express.Router();
const Category = require("../categoreis/Category");

router.get("/admin/articles", (req, res) => {
  res.render("admin/articles/index");
});

router.get("/admin/articles/new", (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/articles/new", { categories: categories });
  });
});

module.exports = router;
