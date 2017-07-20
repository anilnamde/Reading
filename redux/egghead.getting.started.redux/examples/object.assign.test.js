const toggle = require('./object.assign');

test('should toggle todo', ()=>{
  let todo = {
    complete: false
  };
  let todoExpected = {
    complete: true
  };
  expect(toggle.toggleTodo(todo)).toEqual(todoExpected)
})

