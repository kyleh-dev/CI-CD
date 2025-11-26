import { useState, useEffect } from 'react'
import Footer from './components/Footer'
import Note from './components/Note'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'
import noteService from './services/notes'
import loginService from './services/login'

const App = () => {
  const [notes, setNotes] = useState([])
  // const [newNote, setNewNote] = useState('')
  // const [newName, setNewName] = useState('')
  // const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  // const [loginVisible, setLoginVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
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
  // const handleLogin = async event => {
  //   event.preventDefault();
  //   console.log('logging in with', username, password)
  // }

  // const addPerson = (event) => {
  //   event.preventDefault()

  //   if(!newName.trim() || !newNumber.trim()) {
  //     setErrorMessage('name and number are required')
  //     setTimeout(() => setErrorMessage(null), 5000)
  //     return
  //   }

  //   const personObject = {
  //     id: notes.length + 1,
  //     name: newName.trim(),
  //     number: newNumber.trim()
  //   }

  //   noteService.create(personObject)
  //     .then( (returnedPerson) => {
  //       if (Array.isArray(returnedPerson)) setNotes(returnedPerson)
  //       else setNotes(notes.concat(returnedPerson))

  //       setNewName('')
  //       setNewNumber('')
  //   }).catch( (error) => {
  //     setErrorMessage(error.response?.data?.error || error.message)
  //     setTimeout(() => setErrorMessage(null), 5000)
  //   })
  // }

  const addNote = noteObject => {
    // event.preventDefault();
    // const noteObject = {
    //   content: newNote,
    //   important: Math.random() > 0.5
    // }
    noteService.create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      // setNewNote('')
    })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

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


  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      // window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      // noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // const handleNoteChange = event => {
  //   setNewNote(event.target.value)
  // }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const loginForm = (
  // { handleSubmit,
  //   handleUsernameChange,
  //   handlePasswordChange,
  //   username,
  //   password}
  ) => (
    // <form onSubmit={handleLogin}>
    //   <div>
    //     <label>
    //       <input type="text" value={username} onChange={({target}) => setUsername(target.value)} />
    //     </label>
    //   </div>
    //   <button type='submit'>login</button>
    // </form>
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value) }
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  // const noteForm = () => (
  //   <form onSubmit={addNote}>
  //     <input value={newNote} onChange={handleNoteChange}/>
  //     <button type='submit'>save</button>
  //   </form>
  // )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <Togglable buttonLabel="new note">
            <NoteForm createNote={addNote}/>
          </Togglable>
        </div>
      )}

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
      {/* <h2>Add a New Person</h2>
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
      </form> */}
      {/* <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form> */}
      <Footer />
    </div>
  )
}

export default App