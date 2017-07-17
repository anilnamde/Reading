const ArrayOperations = require('./array.immutable');
const deepFreeze = require('deep-freeze');

test('should add value to array immutable', ()=>{
  const input = [];
  const output = [1];

  deepFreeze(input);

  let results = ArrayOperations.add(input, 1);
  expect(results.join(',')).toBe(output.join(','));
});

test('should remove value of array immutable', ()=>{
  const input = [0,2,3];
  const output = [0, 3];

  deepFreeze(input);

  let results = ArrayOperations.remove(input, 1);
  expect(results.join(',')).toBe(output.join(','));
});

test('should increment value in array immutable', ()=>{
  const input = [0, 2, 3];
  const output = [1, 2, 3];

  deepFreeze(input);

  let results = ArrayOperations.increment(input, 0);
  expect(results.join(',')).toBe(output.join(','));
});