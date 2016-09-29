var express = require('express');
var router = express.Router();
var Category = require('../models/category');

router.get('/', function(req, res) {
    Category.forge({}).fetchAll().then(function (collection) {
      res.json(collection.toJSON())
  });
});

router.post('/', function(req, res) {
  var category = new Category(req.body);
  category.save().then(function (categoryInDB) {
    res.json(categoryInDB);
  });
});

module.exports = router;
