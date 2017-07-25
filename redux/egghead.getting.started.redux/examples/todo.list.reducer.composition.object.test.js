const todoAppReducer = require('./todo.list.reducer.composition.object').todoApp;
test('todoApp store should set visibility filters', () => {
  expect(todoAppReducer(undefined, {
    type: 'ADD',
    id: 1,
    text: 'item one'
  }).todos).toMatchObject([{
    "completed": false,
    "id": 1,
    "text": "item one",
  }])

  expect(todoAppReducer(undefined, {
    type: 'ADD',
    id: 1,
    text: 'item one'
  }).visibilityFilter).toBeUndefined();
});

test('todoApp should set visibility state', () => {
  expect(todoAppReducer(undefined, {
    type: 'SET_VISIBILITY_FILTER',
    filter: 'SOME_FILTER'
  }).visibilityFilter).toBe('SOME_FILTER')

});

