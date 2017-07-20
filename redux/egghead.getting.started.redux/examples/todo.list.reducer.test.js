const deepFreeze = require('deep-freeze')
const todoReducer = require('./todo.list.reducer');

test('should add item to the list', () => {
  const action = {
    type: 'ADD',
    id: 1,
    text: 'item one'
  };

  const initialState = [];
  const postAddState = [{
    id: 1,
    text: 'item one',
    completed: false,
  }];
  deepFreeze(action);
  deepFreeze(postAddState);

  expect(todoReducer(initialState, action)).toMatchObject(postAddState)

});


test('should toggle item from the list', ()=>{
  const action = {
    type: 'TOGGLE',
    id: 1,
  }

  const initialState = [{
    id: 1,
    text: 'A',
    completed: false,
  },{
    id: 2,
    text: 'B',
    completed: false,
  }];
  const postState = [{
    id: 1,
    text: 'A',
    completed: true,
  },{
    id: 2,
    text: 'B',
    completed: false,
  }];

  expect(todoReducer(initialState, action)).toMatchObject(postState)
})