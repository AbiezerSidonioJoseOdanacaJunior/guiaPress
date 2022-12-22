const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bem Vindo ao meu site de Blog");
});

app.listen(8080, () => {
  console.log("Meu Servidor está rodando na Prota 8080!");
});
