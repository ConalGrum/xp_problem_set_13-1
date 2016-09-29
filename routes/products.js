var express = require('express');
var router = express.Router();
var Product = require('../models/product');

router.put('/:id', function(req, res) {
  var product = new Product(req.body);
  product.save().then(function (productInDB) {
    res.json(productInDB);
  });
});

router.get('/', function(req, res) {
  console.log("in product.js *****")
    Product.forge({}).fetchAll().then(function (collection) {
      res.json(collection.toJSON())
  });
});

router.post('/', function(req, res) {
  var product = new Product(req.body);
  product.save().then(function (productInDB) {
    res.json(productInDB);
  });
});

router.get('/:id', function(req, res) {
  var product = new Product(req.body);
  product.save().then(function (productInDB) {
    res.json(productInDB);
  });
});


module.exports = router;
