const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define("users", {
  eamil: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;
