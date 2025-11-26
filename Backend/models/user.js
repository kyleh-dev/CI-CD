const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    minLength: 3
  },
  passwordHash: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('User', userSchema)