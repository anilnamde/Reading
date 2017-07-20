function todo(state, action) {
  switch (action.type) {
    case 'ADD':
      return {
        id: action.id,
        text: action.text,
        completed: false,
      }
    case 'TOGGLE':

      if (state.id !== action.id)
        return state;

      return Object.assign({}, state, {
        completed: !state.completed,
      });
    default:
      return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD':
      return [...state, todo(undefined, action)]
    case 'TOGGLE':
      return state.map(statex => todo(statex, action));
  }
}

exports.todo = todo;
exports.todos = todos;