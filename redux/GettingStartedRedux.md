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


# Reducer for simple counter example ()
 


