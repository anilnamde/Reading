const deepFreeze = require('deep-freeze')
const todos = require('./todo.list.reducer.composition.array').todos;
const todo = require('./todo.list.reducer.composition.array').todo;

describe('todos', ()=>{
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

    expect(todos(initialState, action)).toMatchObject(postAddState)

  });


  test('should toggle item from the list', ()=>{
    const action = {
      type: 'TOGGLE',
      id: 1,
    };

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

    expect(todos(initialState, action)).toMatchObject(postState)
  })

})


describe('todo', ()=>{
  test('should add item to the list', () => {
    const action = {
      type: 'ADD',
      id: 1,
      text: 'item one'
    };

    const initialState = undefined;
    const postAddState = {
      id: 1,
      text: 'item one',
      completed: false,
    };
    expect(todo(initialState, action)).toMatchObject(postAddState)

  });


  test('should toggle item from the list', ()=>{
    const action = {
      type: 'TOGGLE',
      id: 1,
    };

    const initialState = {
      id: 1,
      text: 'A',
      completed: false,
    };

    const postState = {
      id: 1,
      text: 'A',
      completed: true,
    };
    expect(todo(initialState, action)).toMatchObject(postState)
  })

})






