require('dotenv').config()
const express = require('express')
const Note = require('./models/notes')
// const mongoose = require('mongoose')
const app = express()

// if (process.argv.length < 3) {
//   console.log("Password is required and hasn't been given.");
//   process.exit(1)
// }

// const password = process.argv[2]
// const url = `mongodb+srv://kyle:${password}@cluster117.yaa9ruv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster117`

// mongoose.set('strictQuery', false)
// mongoose.connect(url)

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean
// })

//removes _id, __v object and string from the json data in MongoDB.
// noteSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })

// const Note = mongoose.model('Note', noteSchema)

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }

  next(error)
}

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

const generateId = () => {
  const maxId = notes.length > 0 
    ? Math.max(...notes.map(note => Number(note.id)))
    : 0
  return String(maxId + 1);
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({})
  .then(notes => response.json(notes))
  .catch(err => {
    console.error(err);
    response.status(500).end();
  })
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id;
  Note.findById(id)
  .then(note => {
    if (note) response.json(note);
    else response.status(404).end();
  })
  .catch(err => {
    next(err)
    // console.log(error);
    // response.status(400).send({error: 'malformmatted id'});
  })
})

app.delete('/api/notes/:id', (request, response) => {
  // const id = request.params.id
  // notes = notes.filter(note => note.id !== id)
  // response.status(204).end()

  Note.findByIdAndDelete(request.params.id)
  .then(note => {
    response.status(204).end()
  })
  .catch(err => {
    // console.log(error);
    // response.status(500).end();
    next(err)
  });
})

app.post('/api/notes', (request, response) => {
  const body = request.body
  // console.log('Method:', request.method);
  // console.log('Content-Type:', request.headers['content-type']);
  // console.log('Body:', request.body);
  if(!body.content) {
      return response.status(400).json({
          error: 'content missing'
      })
  }

  const note = new Note({
      id: generateId(),
      content: body.content,
      important: body.important || false,
  })
  //new note is concating to existing local notes data, then sent as a response via json format
  // notes = notes.concat(note)
  // response.json(notes)

  note.save().then(savedNote => {
    response.json(savedNote)
  });
})

app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body;

  Note.findById(request.params.id)
  .then(note => {
    if (!note) {
      return response.status(404).end()
    }

    note.content = content
    note.important = important

    return note.save().then((updatedNote) => {
      response.json(updatedNote)
    })
  })
  .catch(err => next(err))
})

const unknownEndPoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndPoint);
app.use(errorHandler);

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


