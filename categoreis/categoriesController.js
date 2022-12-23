const express = require("express");
const router = express.Router();

router.get("/categorias", (req, res) => {
  res.send("Ola sou rota de categorias");
});

module.exports = router;
