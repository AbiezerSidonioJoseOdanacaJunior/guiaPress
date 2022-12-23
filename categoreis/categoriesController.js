const express = require("express");
const router = express.Router();

router.get("/admin/categories/new", (req, res) => {
  res.render("admin/categories/new");
});

router.get("/categorias", (req, res) => {
  res.send("Ola sou rota de categorias");
});

module.exports = router;
