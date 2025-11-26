import { createSlice } from '@reduxjs/toolkit'
import Ancedote from '../components/anecdote'
// import Ancedote from '../components/ancedote'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = String(action.payload)
      // console.log('id of payload', id)
      state.forEach(anecdote => { if(anecdote.id === id) anecdote.votes += 1 } )
    },
    create(state, action) {
      const anecdote = action.payload
      state.push(anecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, create, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
// const reducer = (state = initialState, action) => {
//   // console.log('state now: ', state)
//   // console.log('action', action)

//   switch (action.type) {
//     case 'NEW_ANECDOTES': {
//       return state.concat(action.payload)
//     }
//     case 'VOTE': {
//       const id = action.payload      
//       // console.log('payload id', id)
//       return state.map(el => el.id === id ? {...el, votes: el.votes + 1} : el)
//     } 
//     default: 
//       return state
//   }
// }

// export const vote = id => {
//   return {
//     type: 'VOTE',
//     payload: id
//   }
// }

// export const create = anecdote => {
//   return {
//     type: 'NEW_ANECDOTES',
//     payload: {
//       content: anecdote,
//       id: getId(),
//       votes: 0
//     }
//   }
// }



// console.log('final', reducer(initialState, vote(initialState[1].id)))

// export default reducer