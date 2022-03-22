const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Write the following tests in tests/1_unit-tests.js:',() => {
    test('convertHandler should correctly read a whole number input.', (done) => {
      const input = '3L';
      assert.equal(convertHandler.getNum(input), 3);
      done();
    });
    test('convertHandler should correctly read a decimal number input.', (done) => {
      const input = '5.6gal';
      assert.equal(convertHandler.getNum(input), 5.6);
      done();
    });
    test('convertHandler should correctly read a fractional input.', (done) => {
      const input = '6/5mi';
      assert.equal(convertHandler.getNum(input), 6/5);
      done();
    });
    test('convertHandler should correctly read a fractional input with a decimal.', (done) => {
      const input = '9.5/5mi';
      assert.equal(convertHandler.getNum(input), 9.5/5);
      done();
    });
    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', (done) => {
      const input = '3/2/3gal';
      assert.equal(convertHandler.getNum(input), null);
      done();
    });
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', (done) => {
      const input = 'km';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    })
    test('convertHandler should correctly read each valid input unit.', (done) => {
      const input = [ 'gal','l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG' ];
      input.forEach((i) => {
        if(i!='L'&&i!='l'){
          assert.equal(convertHandler.getUnit(i), i.toLowerCase());
        }
        else{
          assert.equal(convertHandler.getUnit(i), 'L');
        }
      })
      done();
    });
    test('convertHandler should correctly return an error for an invalid input unit.', (done) => {
      const input = '5,6min';
      assert.equal(convertHandler.getReturnUnit(input), null);
      done();
    });
    test('convertHandler should return the correct return unit for each valid input unit.', (done) => {
      const input = [{ in: 'gal', out: 'L' }, { in: 'L', out: 'gal' }, { in: 'mi', out: 'km' }, { in: 'km', out: 'mi' }, { in: 'lbs', out: 'kg' }, { in: 'kg', out: 'lbs' }]
      input.forEach((i) => {
        assert.equal(convertHandler.getReturnUnit(i.in), i.out);
      })
      done();
    });
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', (done) => {
      const input = [{ in: 'gal', out: 'gallons' }, { in: 'L', out: 'liters' }, { in: 'mi', out: 'miles' }, { in: 'km', out: 'kilometers' }];
      input.forEach((i) => {
        assert.equal(convertHandler.spellOutUnit(i.in), i.out);
      })
      done();
    });
    test('convertHandler should correctly convert gal to L.', (done) => {
      const input = { num: 1, unit: 'gal' };
      const expect = { num: 3.78541, unit: 'L' }
      assert.approximately(convertHandler.convert(input.num, input.unit), expect.num, 0.01);
      assert.equal(convertHandler.getReturnUnit(input.unit), expect.unit);
      done();
    });
    test('convertHandler should correctly convert L to gal.', (done) => {
      const input = { num: 1, unit: 'L' };
      const expect = { num: 0.26417, unit: 'gal' }
      assert.approximately(convertHandler.convert(input.num, input.unit), expect.num, 0.01);
      assert.equal(convertHandler.getReturnUnit(input.unit), expect.unit);
      done();
    });
    test('convertHandler should correctly convert mi to km.', (done) => {
      const input = { num: 1, unit: 'mi' };
      const expect = { num: 1.60934, unit: 'km' }
      assert.approximately(convertHandler.convert(input.num, input.unit), expect.num, 0.01);
      assert.equal(convertHandler.getReturnUnit(input.unit), expect.unit);
      done();
    });
    test('convertHandler should correctly convert km to mi.', (done) => {
      const input = { num: 1, unit: 'km' };
      const expect = { num: 0.62137, unit: 'mi' }
      assert.approximately(convertHandler.convert(input.num, input.unit), expect.num, 0.01);
      assert.equal(convertHandler.getReturnUnit(input.unit), expect.unit);
      done();
    });
    test('convertHandler should correctly convert lbs to kg.', (done) => {
      const input = { num: 1, unit: 'lbs' };
      const expect = { num: 0.45359, unit: 'kg' }
      assert.approximately(convertHandler.convert(input.num, input.unit), expect.num, 0.01);
      assert.equal(convertHandler.getReturnUnit(input.unit), expect.unit);
      done();
    });
    test('convertHandler should correctly convert kg to lbs.', (done) => {
      const input = { num: 1, unit: 'kg' };
      const expect = { num: 2.20462, unit: 'lbs' }
      assert.approximately(convertHandler.convert(input.num, input.unit), expect.num, 0.01);
      assert.equal(convertHandler.getReturnUnit(input.unit), expect.unit);
      done();
    })
  })
});