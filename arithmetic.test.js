const getResult = require('./arithmetic');
const testCaseOne = require('./tests/arithmeticTestOne.json');
const testCaseTwo = require('./tests/arithmeticTestTwo.json');
const testCaseThree = require('./tests/arithmeticTestThree.json');

test('divide 180 / 99 ** 2 to equal 0.018365472910927456', () => {
  expect(getResult(testCaseOne)).toBe('{"result":"0.018365472910927456","transition":1}');
});

test('divide a string by 2 to equal NaN', () => {
  expect(getResult(testCaseTwo)).toBe('{"result":"NaN","transition":102}');
});

test('divide 10 / 2 to equal 5', () => {
  expect(getResult(testCaseThree)).toBe('{"result":"5","transition":25}');
});