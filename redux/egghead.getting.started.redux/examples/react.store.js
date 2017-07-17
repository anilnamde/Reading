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
