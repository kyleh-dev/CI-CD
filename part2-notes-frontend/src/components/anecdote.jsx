import { useDispatch, useSelector } from "react-redux";
import { vote } from '../reducers/anecdoteReducer'

const filterAncedotes = (filter, ancedotes) => {
  return ancedotes.filter(ancedote => ancedote.content.toLowerCase().includes(filter.toLowerCase()))
}

const Ancedote = () => {
  const dispatch = useDispatch()
  const filterValue = useSelector(state => state.filter)
  const initialAnecdotes = useSelector(state => state.anecdotes)
  
  const anecdotes = filterValue ? filterAncedotes(filterValue, initialAnecdotes) : initialAnecdotes
  // console.log(anecdotes)
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )  
}

export default Ancedote