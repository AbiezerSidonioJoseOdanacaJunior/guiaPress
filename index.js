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
  Article.findAll({
    order: [["id", "DESC"]],
  }).then((articles) => {
    Category.findAll().then((categories) => {
      res.render("index", { articles: articles, categories: categories });
    });
  });
});

app.get("/:slug", (req, res) => {
  var slug = req.params.slug;
  Article.findOne({
    where: {
      slug: slug,
    },
  })
    .then((article) => {
      if (article != undefined) {
        Category.findAll().then((categories) => {
          res.render("article", { article: article, categories: categories });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((error) => {
      res.redirect("/");
    });
});

app.listen(8080, () => {
  console.log("Meu Servidor está rodando na Prota 8080!");
});
