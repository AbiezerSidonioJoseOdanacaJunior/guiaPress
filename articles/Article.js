const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categoreis/Category");

const Article = connection.define("articles", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Category.hasMany(Article);
Article.belongsTo(Category);

module.exports = Article;
