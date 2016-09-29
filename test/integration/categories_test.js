// in test/integration/categories_test.js
var expect = require('chai').expect;
var request = require('supertest');
var app = require('../../app');
var Category = require('../../models/category');
var db = require('../../config/db');

describe('Category', function () {
  before(function(done) {
    db.knex.migrate.latest()
      .then(function() {
        done();
      });
  });

  beforeEach(function (done) {
    Category.forge({}).fetchAll().then(function (collection) {
      collection.forEach(function (model) {
        model.destroy();
      });
      done();
    });
  });

  after(function (done) {
    Category.forge({}).fetchAll().then(function (collection) {
      collection.forEach(function (model) {
        model.destroy();
      });
      done();
    });
  });

  describe('GET /categories', function () {
    it('returns a list of categories in the database', function (done) {
      var categoryAttrs = {
        name: 'Home',
      };

      new Category(categoryAttrs).save().then(function(model) {
        request(app).get('/categories')
          .end(function (req, res) {
            expect(res.body[0].name).to.equal('Home');
            done();
          });
      });
    });
  });

  describe('POST /categories', function () {
    it('adds a category to the database', function (done) {
      var categoryAttrs = {
        name: 'Garden',
      };

      request(app).post('/categories')
        .send(categoryAttrs)
        .end(function (req, res) {
          expect(res.body.name).to.equal('Garden');
          Category.forge({}).fetchAll().then(function (collection) {
            expect(collection.length).to.equal(1);
            done();
          });
        })
    });
  });

});
