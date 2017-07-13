const counter = require('./counter');

test('should be defined', () => {
  expect(counter).toBeDefined();
});

test('should increment counter', ()=>{
  expect(counter(0, { type: 'INCREMENT' })).toBe(1);
});

test('should increment counter', ()=>{
  expect(counter(1, { type: 'INCREMENT' })).toBe(2);
});

test('should decrement counter', ()=>{
  expect(counter(2, { type: 'DECREMENT' })).toBe(1);
});

test('should decrement counter', ()=>{
  expect(counter(1, { type: 'DECREMENT' })).toBe(0);
});

test('should handle unsupported type', ()=>{
  expect(counter(1, { type: 'SOMETHING' })).toBe(1);
});

test('should handle if state not mentioned', ()=>{
  expect(counter()).toBe(0);
});
