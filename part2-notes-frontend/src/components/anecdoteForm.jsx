import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdote'

const AncedoteForm = () => {
  const dispatch = useDispatch()

  const addAncedote = async event => {
    event.preventDefault()
    const content = event.target.ancedote.value
    event.target.ancedote.value = ''
    const newAnecdote = await anecdoteService.postAnecdote(content)
    dispatch(create(newAnecdote))
  }

  return (
      <form onSubmit={addAncedote}>
        <h2>create new</h2>
        <input name='ancedote' />
        <button type='submit'>create</button>
      </form>
  )
}

export default AncedoteForm