const baseUrl = 'http://localhost:3001/notes'



const getAll = async () => {
  const response = await fetch(baseUrl)

  if(!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  const data = await response.json()
  return data
}

const postAnecdote = async content => {
  const option = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({content, id: 10, votes: 0})
  }

  const response = await fetch(baseUrl, option)

  if(!response.ok) throw new Error('Failed to fetch notes')

  return await response.json()
}



export default { getAll, postAnecdote}