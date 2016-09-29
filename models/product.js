// in models/product.js
var db = require('../config/db');

var Product = db.Model.extend({
  tableName: 'products'
});

module.exports = Product;
