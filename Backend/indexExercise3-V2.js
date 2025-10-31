require('dotenv').config()
const express = require('express')
const Entry = require('./models/phoneBook')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const app = express()

const requestLogger = (req, res, next) => {
	console.log('Method: ', req.method);
	console.log('Path: ', req.path);
	console.log('Body: ', req.body);
	console.log('---');
	next()
};

const errorHandler = (error, req, res, next) => {
	console.error(error);

	if (error.name === "CastError") return res.status(400).send({error: 'Malformatted ID'})
	else if (error.name === "ValidationError") {
		const messages = Object.values(error.errors).map(e => e.message)
		return res.status(400).json({error: messages.join(', ')})
	}
	next(error);
};

const unknownEndPoint = (req, res) => {
	res.status(404).send({error: 'unknown endpoint'});
}

app.use(express.json())
app.use(cors())
app.use(requestLogger)

morgan.token('context', (req) => JSON.stringify(req.body))

// const midWare1 = (req, res, next) => {
// 	req.context = req.body
// 	next()
// }

// app.use(midWare1)
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :context'))
// app.use(express.static(path.join(__dirname, 'dist')));

// app.get(/^\/(?!api).*/, (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

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
	Entry.find({})
	.then(result => res.json(result))
	.catch(err => {
		console.error(err)
		res.status(500).end()
	})
})

app.get('/api/persons/:id', (req, res, next) => {
	const id = req.params.id;
	// const entry = phoneBookEntries.find( entry => entry.id === id)

	// if (entry) res.json(entry)
	// else res.status(404).json({
	// 	error: "Id can't be found"
	// })
	Entry.findById(id)
	.then(entry => {
		if(entry) res.json(entry)
	})
	.catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
	// const id = req.params.id;
	// phoneBookEntries = phoneBookEntries.filter(entry => entry.id !== id)
	// res.json(phoneBookEntries)
	const id = req.params.id;
	Entry.findByIdAndDelete(id)
	.then(result => res.status(204).end())
	.catch(err => next(err))
})

app.post('/api/persons', async (req, res, next) => {
	const body = req.body;
	// const findName = phoneBookEntries.find(entry => body.name === entry.name)
	
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
	// else if (findName) {
	// 	return res.status(409).json({
	// 		error: 'name must be unique'
	// 	})
	// }
	
	// let id 
	// do {
	// 	id = Math.floor(Math.random() * 10000).toString()
	// } while(phoneBookEntries.find(entry => entry.id === id))

	const newEntry = new Entry({
		name: body.name,
		number: body.number
	});
	//local way to save newEntry into the data and send a json response
	// phoneBookEntries = phoneBookEntries.concat(newEntry)
	// res.json(phoneBookEntries)
	newEntry.save()
	.then(result => res.json(result))
	.catch(err => next(err));
})

app.put('/api/persons/:id', (req, res, next) => {
	const id = req.params.id;
	const {name, number} = req.body;

	Entry.findById(id)
	.then(entry => {
		if (!entry) return res.status(404).end();

		entry.name = name;
		entry.number = number;

		return entry.save()
		.then(updatedEntry => res.json(updatedEntry))
		.catch(next);
	})
})

app.use(unknownEndPoint);
app.use(errorHandler);

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server is running on PORT: ${PORT}`);
})


//------------------------------------------------------------------------------- Attempt 1 --------------------------------------------------------------------------------
