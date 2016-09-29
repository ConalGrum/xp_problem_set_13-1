var http = require('http');
var expect = require('chai').expect;
var app = require('../../app');
var db = require('../../config/db');
var Category = require('../../models/category');
var Product = require('../../models/product');

before(function() {
    var server = http.createServer(app);
    server.listen(0);
    browser.baseUrl = 'http://localhost:' + server.address().port;
    browser.ignoreSynchronization = true;
});

describe('Express', function() {
    describe('Given I visit /index', function() {
        it('Then I see the express Single Page Application', function() {
            browser.get('/');
            element(by.tagName('h1')).getText().then(function(text) {
                expect(text).to.equal('Products and Categories');
            });
            element(by.id('h1ref')).getText().then(function(text) {
                expect(text).to.equal('Products and Categories');
            });
            element(by.id('product')).getText().then(function(text) {
                expect(text).to.equal('New Product Form');
            });
            element(by.id('category')).getText().then(function(text) {
                expect(text).to.equal('New Category Form');
            });

        });

        it('and enter new category information and expect it to be retrieve from the database', function() {
            browser.get('/');
            element(by.id('txtCategoryName')).sendKeys('Google is my friend Category');
            element(by.id('btnCategorySubmit')).click();

            Category.forge({
                name: 'Google is my friend Category'
            }).fetch().then(function(collection) {
                expect(collection.attributes.name).to.equal('Google is my friend Category');
            });
        });

        it('and enter new product information and expect it to be retrieve from the database', function() {
            // Category.save({
            //     name: "garden"
            // }, {
            //     name: "home"
            // }, {
            //     name: "vehicle"
            // })

            browser.get('/');
            element(by.id('txtProductName')).sendKeys('Random Product Name');
            element(by.id('txtPrice')).sendKeys('180.0');
            element(by.id('txtDescription')).sendKeys('I must write tests before adding my description element');
            //element(by.id('garden')).click();
            element(by.id('btnProductSubmit')).click();

            Product.forge({
                name: 'Random Product Name'
            }).fetch().then(function(collection) {
                expect(collection.attributes.name).to.equal('Random Product Name');
                expect(collection.attributes.price).to.equal(180.0);
                expect(collection.attributes.description).to.equal('I must write tests before adding my description element');
                //expect(collection.attributes.categories).to.equal();
            });
        });
    });


});
