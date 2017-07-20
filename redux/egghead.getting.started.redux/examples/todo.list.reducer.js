module.exports = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, {
        id: action.id,
        text: action.text,
        completed: false,
      }]
    case 'TOGGLE':
      return state.map(item => {
        if(item.id !== action.id)
          return item;

        return Object.assign({}, item, {
          completed: !item.completed,
        })
      })
  }
}