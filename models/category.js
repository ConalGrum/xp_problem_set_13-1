// in models/product.js
var db = require('../config/db');

var Category = db.Model.extend({
  tableName: 'categories'
});

module.exports = Category;
