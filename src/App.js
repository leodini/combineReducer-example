import React from 'react';
import './App.css';
import { createStore, combineReducers } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux'


function counterReducer(state = { count: 0 }, action){
  switch(action.type){
    case 'INCREMENT_COUNT':
      return {...state, count: state.count + 1}
    case 'DECREMENT_COUNT':
      return {...state, count: state.count -1}
    default:
      return state
  }
}

function nameReducer(state = { name: '' }, action){
  switch(action.type){
    case 'UPDATE_NAME':
      return { ...state, name: action.payload }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  counterReducer,
  nameReducer
})


const INITIAL_STATE = {}

function Counter(){
  const { count, name } = useSelector(state => ({ 
  ...state.counterReducer,
  ...state.nameReducer }))
  const dispatch = useDispatch();
  function increment(){
    dispatch({
      type: 'INCREMENT_COUNT'
    })
  }
  
  function decrement(){
    dispatch({
      type: 'DECREMENT_COUNT'
    })
  }
  return(
    <>
    <h2>Counter: {count}</h2>
    <h3>Name: {name}</h3>
    <button onClick={increment}>+</button>
    <button onClick={decrement}>-</button>
    </>
  )
}

function Name() {
  const dispatch = useDispatch()
  function handleUpdateName(event){
    dispatch({
      type: 'UPDATE_NAME',
      payload: event.target.value
    })
  }
  return(
    <div>
      <input type="text" placeholder="input your name" 
      onChange={handleUpdateName}/>
    </div>
  )
}




const store = createStore(rootReducer, INITIAL_STATE)

function App() {


 
  return (
    <Provider store={store}>
      <Counter/>
      <Name/>
    </Provider>
  );
}

export default App;
