const express = require("express");
const router = express.Router();
const Category = require("./Category");
const adminAuth = require("../middleware/adminAuth");

const slugify = require("slugify");

router.get("/admin/categories/new", (req, res) => {
  res.render("admin/categories/new");
});

router.post("/categories/save", adminAuth, (req, res) => {
  var title = req.body.title;
  if (title != undefined) {
    Category.create({
      title: title,
      slug: slugify(title),
    }).then(() => {
      res.redirect("/admin/categories");
    });
  } else {
    res.redirect("admin/categories/new");
  }
});

router.get("/admin/categories/edit/:id", adminAuth, (req, res) => {
  var id = req.params.id;

  if (isNaN(id)) {
    res.redirect("/admin/categories");
  }
  Category.findByPk(id)
    .then((category) => {
      if (category != undefined) {
        res.render("admin/categories/edit", { category: category });
      } else {
        res.redirect("/admin/categories");
      }
    })
    .catch((error) => {
      res.redirect("/admin/categories");
    });
});

router.post("/categories/delete", adminAuth, (req, res) => {
  var id = req.body.id;
  if (id != undefined) {
    if (!isNaN(id)) {
      Category.destroy({
        where: {
          id: id,
        },
      }).then(() => {
        res.redirect("/admin/categories");
      });
    } else {
      //Qudnfo não for um número
      res.redirect("/admin/categories");
    }
  } else {
    //Qudno for NULL
    res.redirect("/admin/categories");
  }
});

router.post("/categories/update", adminAuth, (req, res) => {
  var id = req.body.id;
  var title = req.body.title;

  Category.update(
    { title: title, slug: slugify(title) },
    {
      where: {
        id: id,
      },
    }
  ).then(() => {
    res.redirect("/admin/categories");
  });
});

router.get("/admin/categories", adminAuth, (req, res) => {
  Category.findAll().then((categories) => {
    res.render("admin/categories/index", { categories: categories });
  });
});

module.exports = router;
