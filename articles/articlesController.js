const express = require("express");
const router = express.Router();

router.get("/artigos", (req, res) => {
  res.send("Olá eu sou a rota de artigos");
});

module.exports = router;
