import { useState, useEffect } from 'react'
import Footer from './components/Footer'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  // const [newNote, setNewNote] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  // const addNote = event => {
  //   event.preventDefault()
  //   // const noteObject = {
  //   //   content: newNote,
  //   //   important: Math.random() > 0.5
  //   // }
  

  //   noteService.create(noteObject).then(returnedNote => {
  //     setNotes(notes.concat(returnedNote))
  //   })
  // } 
  const addPerson = (event) => {
    event.preventDefault()

    if(!newName.trim() || !newNumber.trim()) {
      setErrorMessage('name and number are required')
      setTimeout(() => setErrorMessage(null), 5000)
      return
    }

    const personObject = {
      id: notes.length + 1,
      name: newName.trim(),
      number: newNumber.trim()
    }

    noteService.create(personObject)
      .then( (returnedPerson) => {        
        if (Array.isArray(returnedPerson)) setNotes(returnedPerson)
        else setNotes(notes.concat(returnedPerson))

        setNewName('')
        setNewNumber('')
    }).catch( (error) => {
      setErrorMessage(error.response?.data?.error || error.message)
      setTimeout(() => setErrorMessage(null, 5000))
    })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => (note.id !== id ? note : returnedNote)))
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  // const handleNoteChange = event => {
  //   setNewNote(event.target.value)
  // }  

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => (
          <Note 
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <h2>Add a New Person</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      {/* <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form> */}
      <Footer />
    </div>
  )
}

export default App