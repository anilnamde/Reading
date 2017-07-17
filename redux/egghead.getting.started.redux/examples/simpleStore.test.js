const createStore = require('./simpleStore');

test('store should be defined', ()=>{
  expect(createStore).toBeInstanceOf(Function);
});

test('store should get state', ()=>{
  const reducer = (state=0, action) => state;
  expect(createStore(reducer).getState).toBeInstanceOf(Function)
})

test('store should dispatch action', ()=>{
  const reducer = (state=0, action) => state;
  expect(createStore(reducer).dispatch).toBeInstanceOf(Function)
})

test('store should subscribe action', ()=>{
  const reducer = (state=0, action) => state;
  expect(createStore(reducer).subscribe).toBeInstanceOf(Function)
})
