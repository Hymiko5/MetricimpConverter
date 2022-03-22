'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.get('/api/convert', (req, res) => {
    let input = req.query.input;
   
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    console.log(initUnit)
    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    res.json(toString);
  });
 
};
