const todos = require('./todo.list.reducer.composition.array').todos;

const visibilityFilter = (state, action) => {
  switch(action.type){
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
  return state;
};


const todoApp = (state = {}, action) => {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter( state.visibilityFilter, action)
  }
}

module.exports = {todoApp, visibilityFilter};