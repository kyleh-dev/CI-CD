const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('error connecting to MongoDB: ', err.message))
mongoose.set('strictQuery', false)

