const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const session = require("express-session");

const categoriesController = require("./categoreis/categoriesController");
const articlesController = require("./articles/articlesController");
const usersController = require("./users/usersController");

const Category = require("./categoreis/Category");
const Article = require("./articles/Article");
const User = require("./users/User");

// Views Parser
app.set("view engine", "ejs");

//Static
app.use(express.static("public"));

//Sessions
app.use(
  session({
    secret: "abyouqlqrcoisa",
    cookie: { maxAge: 9000000 },
  })
);

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

app.use("/", usersController);

app.get("/", (req, res) => {
  Article.findAll({
    order: [["id", "DESC"]],
    limit: 4,
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

app.get("/category/:slug", (req, res) => {
  var slug = req.params.slug;
  Category.findOne({
    where: {
      slug: slug,
    },
    include: [{ model: Article }],
  })
    .then((category) => {
      if (category != undefined) {
        Category.findAll().then((categories) => {
          res.render("index", {
            articles: category.articles,
            categories: categories,
          });
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
