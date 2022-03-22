const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  suite('Write the following tests in tests/2_functional-tests.js:', () => {
    test('Convert a valid input such as 10L: GET request to /api/convert.', (done) => {
      const expect = { initNum:10, initUnit:"L", returnNum:2.64172,returnUnit:"gal",string:"10 liters converts to 2.64172 gallons" }
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: "10L" })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.initNum, expect.initNum);
          assert.equal(res.body.initUnit, expect.initUnit);
          assert.equal(res.body.returnNum, expect.returnNum);
          assert.equal(res.body.returnUnit, expect.returnUnit);
          assert.equal(res.body.string, expect.string);
          done();
        })
    });
    test('Convert an invalid input such as 32g: GET request to /api/convert.', (done) => {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: "32g" })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.text, '"invalid unit"');
          done();
        })
    });
    test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.', (done) => {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: "3/7.2/4kg" })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.text, '"invalid number"');
          done();
        })
    });
    test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.', (done) => {
      chai
        .request(server)
        .get('/api/convert')
        .query({ input: "3/7.2/4kilomegagram" })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.text, '"invalid number and unit"');
          done();
        })
    });
    test('Convert with no number such as kg: GET request to /api/convert.', (done) => {
      const expect = { initNum:1, initUnit:"kg", returnNum:2.20462,returnUnit:"lbs",string:"1 kilograms converts to 2.20462 pounds" }
       chai
        .request(server)
        .get('/api/convert')
        .query({ input: "kg" })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.initNum, expect.initNum);
          assert.equal(res.body.initUnit, expect.initUnit);
          assert.equal(res.body.returnNum, expect.returnNum);
          assert.equal(res.body.returnUnit, expect.returnUnit);
          assert.equal(res.body.string, expect.string);
          done();
        })
    });
  })
});
