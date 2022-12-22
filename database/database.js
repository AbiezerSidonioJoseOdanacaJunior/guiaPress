const sequelize = require("sequelize");

const connection = new sequelize("blogPress", "root", "@bibi#14", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
