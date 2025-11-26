require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const usersRouter = require('./routes/users')
const loginRouter = require('./routes/login')
const auth = require('./middleware/authentication')
const cors = require('cors')

const requestLogger = (req, res, next) => {
  const { method, body, path } = req
  console.log('Method: ', method);
  console.log('Body: ', body);
  console.log('Path: ', path);
  console.log('---');
  next()
}

const errorHandler = (error, req, res, next) => {
  console.error(error)

  if (error.name === 'CastError') return res.status(400).send({ error: 'Malformatted ID' })
  else if (error.name === 'ValidationError') {
		const messages = Object.values(error.errors).map(e => e.message)
    return res.status(400).send({ error: messages.join(', ') })
  }
  next(error)
}

const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

let blogData = [
  {
    title: 'missing won',
    author: 'won',
    source_url: 'http//example.com',
    quote: 'the won that got away'
  }
]

mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Mongo DB connected'))

const app = express()
app.use(express.json())
app.use(requestLogger)
app.use(cors())
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.get('/api/me', auth, (req, res) => {
  res.json({ id: req.user.id, username: req.username })
})

app.get('/api/blogs', (req, res) => {
  res.json(blogData)
})

app.post('/api/blogs', (req, res, next) => {
  try{
    const { title, author, sourceUrl, quote } = req.body

    if (!title) return res.status(401).json({ error: 'Missing title' })

    const config = {
      title: title,
      author: author,
      source_url: sourceUrl,
      quote: quote
    }

    blogData.push(config)
    res.json(blogData)
  } catch(err) {next(err)}
})

app.use(unknownEndPoint)
app.use(errorHandler)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}.`);
})