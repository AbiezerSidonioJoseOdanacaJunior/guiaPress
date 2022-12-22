const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Views Parser
app.set("view engine", "ejs");

//Static
app.use(express.static("public"));

//Body-Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(8080, () => {
  console.log("Meu Servidor está rodando na Prota 8080!");
});
