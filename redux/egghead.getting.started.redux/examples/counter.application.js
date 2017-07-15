const counter = require('./counter');
// to create store for client application which can subscribe, dispact action and also returns state
const createStore = require('redux').createStore;


// created store
const counterStore = createStore(counter)
counterStore.subscribe((data) => {
   console.log('data >>>>>> ', this);
});

console.log(counterStore.getState())

counterStore.dispatch({ type: 'INCREMENT'})

console.log(counterStore.getState())

counterStore.dispatch({ type: 'INCREMENT'})

console.log(counterStore.getState())

counterStore.dispatch({ type: 'DECREMENT'})

console.log(counterStore.getState())

counterStore.dispatch({ type: 'DECREMENT'})

console.log(counterStore.getState())

counterStore.dispatch({ type: 'DECREMENT'})

console.log(counterStore.getState());



