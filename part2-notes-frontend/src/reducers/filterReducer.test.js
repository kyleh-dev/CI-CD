import deepFreeze from 'deep-freeze'
import { describe, expect } from 'vitest'
import filterReducer from './filterReducer'

describe('testing filter reducer', () => {

  test('should return filter input', () => {
    const initialState = ''
    const action = {
      type: 'filter/setFilter',
      payload: 'testing filter'
    }

    const state = filterReducer(initialState, action)
    deepFreeze(state)
    expect(state).toBe('testing filter')
  })
})