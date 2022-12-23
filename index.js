const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const categoriesController = require("./categoreis/categoriesController");
const articlesController = require("./articles/articlesController");

const Category = require("./categoreis/Category");
const Article = require("./articles/Article");

// Views Parser
app.set("view engine", "ejs");

//Static
app.use(express.static("public"));

//Body-Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Database
connection
  .authenticate()
  .then(() => {
    console.log("Banco criado com sucesso");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/", categoriesController);

app.use("/", articlesController);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(8080, () => {
  console.log("Meu Servidor está rodando na Prota 8080!");
});
