module.exports = {
  toggleTodo(todo){
    return Object.assign({}, todo, {
      complete: !todo.complete,
    })
  },
  // toggleTodoSpread(todo){
  //   return {
  //     ...todo,
  //     complete: !todo.complete,
  //   };
  // }
};
