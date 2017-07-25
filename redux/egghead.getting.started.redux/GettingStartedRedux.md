
> egghead.io getting started with redux - Dan Abramov
> https://egghead.io/lessons/javascript-redux-the-single-immutable-state-tree

# Three Principles of Redux  

## 1. State Or State Tree:

Entire application/UI is stored as a single object called as _state_ or _state tree_.  
```javascript
ex: 
// * Counter app counter is state
var counter = 0;
// * Counter array app needs array to store counters
var counters = [];
// * ToDo app needs more complex state with array of object with todo, completed
var todos = [{
  id: 0,
  text: 'todo name',
  completed: false
}]
```

## 2. State tree is Read-only
State cannot be modified directly. To modify state needs to dispatch _action_. _action_ is plain JS object and Its minimal representation of the change requested for data/state.  
Only required property to state is _type_.   
```javascript
// * Counter app needs increment and decrement action
{
  type: "DECREMENT"
}

// * Counters app action would need index
{
  type:increment,
  index: 9
}
// * Todo add todo
 {
   id: 0,
   type: "add_todo",
   text: "item to add" 
 }
```
 
## 3. Reducer function
_Reducer_ function takes previous _state_ and the _action_ as arguments and returns entire new application state. _Reducer_ should be a pure function. 

```javascript
function Reducer(previousState, action){
  return modifiedState;
}
```

>__Pure functions__
>1. pure function do not modify arguments or have side-effect
>2. it has same behaviour with fixed set of arguments
>3. they do not call db or network


## Reducer for simple counter example [#5]
[counter example counter.js](www.google.com)

```javascript
module.exports = function counter(state, action){
  if(typeof state === 'undefined') return 0;
  if(action.type === 'INCREMENT') return state + 1;
  if(action.type === 'DECREMENT') return state - 1;
  return state;
};
```
 
## Redux Application: Store Methods: getState(), dispatch(), and subscribe() [#6]
[application example consuming counter.application.js]()
```javascript
const counter = require('./counter');
// to create store for client application which can subscribe,
// dispact action and also returns state
const createStore = require('redux').createStore;


// created store
const counterStore = createStore(counter);
counterStore.subscribe((data) => {
   console.log('data >>>>>> ', this);
});

console.log(counterStore.getState())

counterStore.dispatch({ type: 'INCREMENT'})

```

## Implementing store from scratch
[example simpleStore.js]()

```javascript
 module.exports = function simpleStore(reducer){
   let state;
   let listeners = [];
   const getState = () => state;
 
   const dispatch = (action) => {
     state = reducer(state, action);
     listeners.forEach(listener => listener())
   };
 
   const subscribe = (listener) => {
     listeners.push(listener);
     return () => {
       listeners = listeners.filter( l => l !== listener);
     }
   };
 
   dispatch({});
 
   return {getState, dispatch, subscribe};
 };
```
## React Counter Example
[example react.store.js]()

```javascript
const counterReduceer = require('./counter');
const { createStore } = require('redux');

const counterStore = createStore(counterReduceer);

const Counter = ({ value, onIncrement, onDecrement}) =>{
  return (<div>
      <h1>{value}</h1>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
    </div>);
};

const render = () => {
  ReactDOM.render(
    <Counter
      value={counterStore.getState()
      onIncrement={()=> {
        counterStore.despatch({type: 'INCREMENT'})
      }}
      onDecrement={() => {
        counterStore.despatch({type: 'DECREMENT'})
      }}
    }/>,
    document.getElementById('root')
  );
};

counterStore.subscribe(render);
render();

```

##  Avoiding Array Mutations with concat(), slice(), and ...spread
### concat()

```javascript
function add(array, value) {
  // return array.concat(array, value);
  return [...array, value];
}
```
### slice()
 
```javascript
function remove(array, index) {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

```
### spread
```javascript
function increment(array, index) {
  return [...array.slice(0, index), array[index] + 1,...array.slice(index + 1)];
}
```
##  Avoiding Object Mutations ... assign, spread
### Object assign

```javascript
module.exports = {
  toggleTodo(todo){
    return Object.assign({}, todo, {
      complete: !todo.complete,
    })
  },
  // es7
  // toggleTodoSpread(todo){
  //   return {
  //     ...todo,
  //     complete: !todo.complete,
  //   };
  // }
};
```

## Redux: Writing a Todo List Reducer
### (Adding a Todo) 
```javascript
module.exports = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, {
        id: action.id,
        text: action.text,
        completed: false,
      }]
  }
}

```
### (Toggling a Todo)
```javascript
module.exports = (state = [], action) => {
  switch (action.type) {
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
```
## Redux: Reducer Composition with Arrays
Idea is that reducer can contain other reducers which would be responsible to take care of part of the state in the application. This way reducer becomes managable in a big state tree.

```javascript
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
```

## Redux: Reducer Composition with Objects
By combining such composition reducer entire apps reducer can be managed with small chunks at a time.

```javascript
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
```
## Redux: Reducer Composition with combineReducers()
Composition reducer is common pattern hence redux provide method called as _combineReducers_ to get app reducer. It just need reducers with same name as the state and that's it. It creates reducer function for each state key automatically.

```javascript
const combineReducers = require('redux').combineReducers;
const todos = require('./todo.list.reducer.composition.array')
const visibilityFilter = require('./todo.list.reducer.composition.object').visibilityFilter;

const todoAppReducer = combineReducers({
  todos,
  visibilityFilter
});

```
## Redux: Implementing combineReducers() from Scratch  

 
 










Redux: Implementing combineReducers() from Scratch  

Redux: React Todo List Example (Adding a Todo)  
Redux: React Todo List Example (Toggling a Todo)  
Redux: React Todo List Example (Filtering Todos)  

Redux: Extracting Presentational Components (Todo, TodoList)  
Redux: Extracting Presentational Components (AddTodo, Footer, FilterLink)  
Redux: Extracting Container Components (FilterLink)  
Redux: Extracting Container Components (VisibleTodoList, AddTodo)  

Redux: Passing the Store Down Explicitly via Props  
Redux: Passing the Store Down Implicitly via Context  
Redux: Passing the Store Down with <Provider> from React Redux  

Redux: Generating Containers with connect() from React Redux (VisibleTodoList)  
Redux: Generating Containers with connect() from React Redux (AddTodo)  
Redux: Generating Containers with connect() from React Redux (FooterLink)  

Redux: Extracting Action Creators  

