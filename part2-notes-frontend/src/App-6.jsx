import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Ancedote from './components/anecdote'
import AncedoteForm from './components/anecdoteForm'
import Filter from './components/Filter'
import { setAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdote'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then(anecdote => dispatch(setAnecdotes(anecdote)))
  }, [dispatch])
  return (
    <div>
      <Filter/>
      <Ancedote/>
      <AncedoteForm/>
    </div>
  )
}

export default App