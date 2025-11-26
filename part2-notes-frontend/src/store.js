import { configureStore } from '@reduxjs/toolkit'
// import { combineReducers, createStore } from 'redux' 
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

// const reducer = combineReducers({
//     anecdotes: anecdoteReducer,
//     filter: filterReducer
//   })

// const store = createStore(reducer)

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer
  }
})

export default store