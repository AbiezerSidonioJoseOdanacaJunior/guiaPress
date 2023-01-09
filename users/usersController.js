const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");

router.get("/admin/users", (req, res) => {
  res.send("Listagem de Usuarios");
});

router.get("/admin/users/create", (req, res) => {
  res.render("admin/users/create");
});

router.post("/user/create", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);

  User.create({
    email: email,
    password: hash,
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      res.redirect("/");
    });
});

module.exports = router;
