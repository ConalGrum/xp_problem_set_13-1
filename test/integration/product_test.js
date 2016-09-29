// in test/integration/books_test.js
"use strict"
var expect = require('chai').expect;
var request = require('supertest');
var app = require('../../app');
var Product = require('../../models/product');
var db = require('../../config/db');

describe('Products', function () {
  before(function(done) {
    db.knex.migrate.latest()
      .then(function() {
        done();
      });
  });

  beforeEach(function (done) {
    Product.forge({}).fetchAll().then(function (collection) {
      collection.forEach(function (model) {
        model.destroy();
      });
      done();
    });
  });

  after(function (done) {
    Product.forge({}).fetchAll().then(function (collection) {
      collection.forEach(function (model) {
        model.destroy();
      });
      done();
    });
  });

  describe('GET /products', function () {
    it('returns a list of products in the database', function (done) {
      var attrs = {
        name: 'Plumbus',
        price: 1.00,
        categories: 'home',
        description: 'A regular old Plumbus'
      };

      new Product(attrs).save().then(function(model) {
        request(app).get('/products')
          .end(function (req, res) {
            console.log("res body -->",res.body[0]);
            expect(res.body[0].name).to.equal('Plumbus');
            expect(res.body[0].price).to.equal(1.00);
            expect(res.body[0].categories).to.equal('home')
            expect(res.body[0].description).to.equal('A regular old Plumbus');
            done();
          });
      });
    });
  });

  describe('POST /products', function () {
    it('adds a product to the database', function (done) {
        var productAttrs = {
        name: 'cabbage',
        price: 1.40,
        categories: 'home',
        description: 'A regular old cabbage'
      };

      request(app).post('/products')
        .send(productAttrs)
        .end(function (req, res) {
          expect(res.body.name).to.equal('cabbage');
          expect(res.body.description).to.equal('A regular old cabbage');
          expect(res.body.price).to.equal(1.40);
          expect(res.body.categories).to.equal('home')
          Product.forge({}).fetchAll().then(function (collection) {
            expect(collection.length).to.equal(1);
            done();
          });
        })
    });
  });

  describe('PUT /products/:id', function () {
    it('post and updates a product in the database', function () {
        var updatedAttrs = {
          name: 'cauliflower',
          price: 1.50,
          categories: 'home',
          description: 'A regular old cauliflower'
        };

        Product.forge({name: 'cabbage',price: 1.40, categories: 'home', description: 'A regular old cabbage'}).save().then(function () {
          Product.forge({name: 'cabbage'}).fetch().then(function (collection) {
              updatedAttrs.id = collection.id;
              request(app).put('/products/' + updatedAttrs.id).send(updatedAttrs)
                .then(function (res) {
                  expect(200)
                  expect(res.body.name).to.equal('cauliflower');
                  expect(res.body.description).to.equal('A regular old cauliflower');
                  expect(res.body.categories).to.equal('home')
                  expect(res.body.price).to.equal(1.50);
                  Product.forge({}).fetchAll().then(function (collection) {
                    expect(collection.length).to.equal(1);
                  });
                });
          });
        });
     });
  });
});
