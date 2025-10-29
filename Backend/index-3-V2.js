const express = require('express')
const mongoose = require('mongoose')
const app = express()

if (process.argv.length < 3) {
  console.log("Password is required and hasn't been given.");
  process.exit(1)
}

// const password = process.argv[2]
// const url = `mongodb+srv://kyle:${password}@cluster117.yaa9ruv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster117`
const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
})

//removes _id, __v object and string from the json data in MongoDB.
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema)

app.use(express.json())

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
    Note.find({}).then(notes => {
      response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id;

})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
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

    const note = {
        id: generateId(),
        content: body.content,
        important: body.important || false
    }

    notes = notes.concat(note)

    response.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


