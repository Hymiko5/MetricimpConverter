const Parser = require('expr-eval').Parser;
const parser = new Parser();

function ConvertHandler() {
  
  this.getNum = function(input) {
    
    let result = input.match(/[^a-zA-Z]+/);
    if(!result)result = 1;
    try{
      if(result.toString().match(/\//g)!=null&&result.toString().match(/\//g).length >= 2)return null;
      let expr = parser.parse(result.toString());
      result = expr.evaluate();
    }catch(err){
      return null;
    }
    
    return parseFloat(result);
  };
  
  this.getUnit = function(input) {
    let result = input.match(/[a-zA-Z]+/).toString();
    if(result == 'l'){
      result = result.toUpperCase();
    }
    else if(result != 'L'){
      result = result.toLowerCase();
    }
    
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch(initUnit)
    {
      case 'gal':
        result = 'L';
          break;
      case 'L':
        result = 'gal';
          break;
      case 'mi':
        result = 'km';
          break;
      case 'km':
        result = 'mi';
          break;
      case 'lbs':
        result = 'kg';
          break;
      case 'kg':
        result = 'lbs';
          break;
    }
    return result;
    
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch(unit){
      case 'gal':
        result = 'gallons';
          break;
      case 'L':
        result = 'liters';
          break;
      case 'mi':
        result = 'miles';
          break;
      case 'km':
        result = 'kilometers';
          break;
      case 'lbs':
        result = 'pounds';
          break;
      case 'kg':
        result = 'kilograms'
          break;
    }
    if(result)return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch(initUnit)
    {
      case 'gal':
        result = initNum * galToL;
          break;
      case 'L':
        result = initNum / galToL;
          break;
      case 'mi':
        result = initNum * miToKm;
          break;
      case 'km':
        result = initNum / miToKm;
          break;
      case 'lbs':
        result = initNum * lbsToKg;
          break;
      case 'kg':
        result = initNum / lbsToKg;
          break;
    }
    if(result){
      return parseFloat(result.toFixed(5));
    }
    
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    if(!returnUnit&&!initNum){
      result = "invalid number and unit";
    }
    else if(!returnUnit){
      result = "invalid unit";
    }
    else if(!returnNum){
      result = "invalid number";
    }
    else {
      result = { initNum, initUnit, returnNum, returnUnit, string:  `${initNum} ${this.spellOutUnit(initUnit)} converts to ${ returnNum} ${this.spellOutUnit(returnUnit)}`};
    }
    
    return result;
  };
  
}

module.exports = ConvertHandler;
