const combineReducers = require('redux').combineReducers;
const todos = require('./todo.list.reducer.composition.array')
const visibilityFilter = require('./todo.list.reducer.composition.object').visibilityFilter;

const todoAppReducer = combineReducers({
  todos,
  visibilityFilter
});
