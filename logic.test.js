const getResult = require('./logic');
const testCaseOne = require('./tests/logicTestOne.json');
const testCaseTwo = require('./tests/logicTestTwo.json');
const testCaseThree = require('./tests/logicTestThree.json');

test('150 > 45 equal to true', () => {
  expect(getResult(testCaseOne)).toBe('{"validAmount":"true","transition":5}');
});

test('15>= 18 equal to false', () => {
  expect(getResult(testCaseTwo)).toBe('{"adult":"false","transition":23}');
});

test('age >= 18 equal to age not defined error', () => {
  expect(getResult(testCaseThree)).toBe('{"adult":"Uncaught ReferenceError: age is not defined","transition":45}');
});