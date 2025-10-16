const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const app = express()

app.use(express.json())
app.use(cors())

morgan.token('context', (req) => JSON.stringify(req.body))

const midWare1 = (req, res, next) => {
	req.context = req.body
	next()
}

app.use(midWare1)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :context'))
app.use(express.static(path.join(__dirname, 'dist')));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

let phoneBookEntries = [
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

app.get('/info', (req, res) => {
	const entryLength = phoneBookEntries.length
	const now = new Date()
	res.write(`<p>Phonebook has info for ${entryLength} people</p>`)
	res.write(`<p>${now}</p>`)
	res.end()
})

app.get('/api/persons', (req, res) => {
	res.json(phoneBookEntries)
})

app.get('/api/persons/:id', (req, res) => {
	const id = req.params.id;
	const entry = phoneBookEntries.find( entry => entry.id === id)

	if (entry) res.json(entry)
	else res.status(404).json({
		error: "Id can't be found"
	})
})

app.delete('/api/persons/:id', (req, res) => {
	const id = req.params.id;
	phoneBookEntries = phoneBookEntries.filter(entry => entry.id !== id)

	res.json(phoneBookEntries)
})

app.post('/api/persons', (req, res) => {
	const body = req.body;
	const findName = phoneBookEntries.find(entry => body.name === entry.name)
	
	if(!body.name) {
		return res.status(400).json({
			error: 'name missing'
		})
	} 
	else if (!body.number) {
		return res.status(400).json({
			error: 'number missing'
		})
	}
	else if (findName) {
		return res.status(409).json({
			error: 'name must be unique'
		})
	}
	
	let id 
	do {
		id = Math.floor(Math.random() * 10000).toString()
	} while(phoneBookEntries.find(entry => entry.id === id))

	const newEntry = {
		id,
		name: body.name,
		number: body.number
	};

	phoneBookEntries = phoneBookEntries.concat(newEntry)
	res.json(phoneBookEntries)
})



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server is running on PORT: ${PORT}`);
})


//------------------------------------------------------------------------------- Attempt 1 --------------------------------------------------------------------------------
