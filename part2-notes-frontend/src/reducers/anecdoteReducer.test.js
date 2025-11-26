import deepFreeze from "deep-freeze";
import { describe, expect, test } from "vitest";
import anecdoteReducer from './anecdoteReducer'

describe('testing reducer', () => { 
  // const dispatch = useDispatch()
  // const anecdotes = useSelector(state => state)

  test('should return proper anecdote and vote increment', () => {
    const initialState = anecdoteReducer(undefined, {type: '@@INIT'})

    const target = initialState[1] // choose the second anecdote

    const action = {
      type: 'anecdotes/vote',
      payload: target.id,
    }

    deepFreeze(initialState)

    const newState = anecdoteReducer(initialState, action)
    // console.log(newState)

    expect(newState[1]).toEqual({
      content: 'Adding manpower to a late software project makes it later!',
      id: target.id,
      votes: 1
    })
  })

  test('create new input should return proper object format', () => {
    const initialState = []
    const action = {
      type: 'anecdotes/create',
      payload: 'testing anecdote'
    }

    const state = anecdoteReducer(initialState, action)
    const lastElIndex = state.length - 1

    expect(state[lastElIndex]).toEqual({
      content: 'testing anecdote',
      id: state[lastElIndex].id,
      votes: 0
    })
  })
})