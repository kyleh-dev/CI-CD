// const router = require('mongoose').Router()
// const bcrypt = require('bcrypte')
// const User = require('../models/user')

// router.post('/', async (req, res, next) => {
//   try {
//     const { username, password } = req.body

//     if(!password || password < 8) return res.status(400).json({ error: 'Password must be at least 8 chars' })

//     const passwordHash = bcrypt.hash(password, 10)
//     const user = new User(username, passwordHash)
//     const saved = user.save()
//     res.status(201).json({ id: saved.id, username: saved.username })
//   } catch (err) {next(err)}
// })

// module.exports = router

const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

router.post('/', async (req, res, next) => {
  try{
    // console.log('1. got request body', req.body)
    const { username, password } = req.body
    const isExistingUser = await User.findOne({ username: username })
    // console.log('2. isExisting: ', isExistingUser)
    if (isExistingUser) {
      console.log('3. existing user has been found')
      return res.status(401).json({ error: 'user already exists' })
    }
    else if (!password || password.length < 8) {
      console.log('4. password doe not match criteria', password)
      return res.status(400).json({ error: 'Password must be at least 8 chars' })
    }

    // console.log('5. hashing password')
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ userName: username, passwordHash: hashedPassword })
    // console.log('new user:', user)
    const saved = await user.save()
    res.status(201).json({ id: saved.id, username: saved.username })
  } catch(err) {next(err)}
})

module.exports = router