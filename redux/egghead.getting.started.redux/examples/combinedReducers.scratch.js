const todos = require('./todo.list.reducer.composition.array')
const visibilityFilter = require('./todo.list.reducer.composition.object').visibilityFilter;

const customeCombineReducers =  (reducers) =>{
  return (state = {}, action) => {
    return Object
      .keys(reducers)
      .reduce((nextState, reducer) => {
        nextState[reducer] = reducers[reducer](
          state[reducer],
          action
        );
        return nextState;
      }, {})
  }
};

const todoAppReducer = customeCombineReducers({
  todos,
  visibilityFilter
});

