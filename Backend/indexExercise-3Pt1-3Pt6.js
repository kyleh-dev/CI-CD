const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3001

let person = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// const requestLogger = (request, response, next) => {
//     console.log('Method: ', request.method)
//     console.log('Path: ', request.path)
//     console.log('Body: ', request.body)
//     console.log('---')
//     next()
// }
app.use(express.json())
// app.use(requestLogger)
app.use(morgan((tokens, req, res) => {
  const result = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
  return result
}))

app.get('/', (request, response) => {
    response.send('<h1>Phone Book Exercise</h1>')
})

app.get('/api/person', (request, response) => {
    response.json(person)
})

app.get('/info', (request, response) => {
    const entriesCount = person.length;
    const requestTime = new Date();

    const infoContent = `
    <p>Phonebook has info for ${entriesCount} people</p>
    <p>${requestTime}</p>
    `
    response.send(infoContent)
})

app.get('/api/person/:id', (request, response) => {
    const personId = request.params.id;
    const personData = person.find(el => el.id === personId);

    if (!personData) response.status(404).end()
    response.json(personData)
})

app.delete('/api/person/:id', (request, response)  => {
    const personId = request.params.id;
    person = person.filter( el => el.id !== personId);

    response.status(204).end()
})

app.post('/api/person', (request, response) => {
    const {name, number} = request.body;

    if (!name || !number) response.status(404).json({error: 'name or number is missing'})

    const dataContent = {
        id: newId(),
        name: name,
        number: number
    }
    response.json(dataContent)

})

const newId = () => {
    const maxId = person.length > 0 ? Math.max(...person.map(el => Number(el.id))) : 0;
    return String(maxId + 1);
}

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));