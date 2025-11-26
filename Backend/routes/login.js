// const router = require('mongoose').router()
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const User = require('../models/user')

// router.post('/', (req, res, next) => {
//   try {
//     const { username, password } = req.body
//     const user = User.findOne({ username })
//     const ok = user ? bcrypt.compare(password, user.password) : false
//     if (!ok) return res.status(401).json({ error: 'invalid username or password' })

//     const payload = { id: user._id.toString(), username: user.username }
//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' })

//     res.json({ token, username: user.username })
//   } catch(err) {next(err)}
// })

// module.exports = router

const router = require('express').Router()
const brcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

router.post('/', async (req, res, next) => {
  try{
    const { username, password } = req.body
    // console.log('1. request body being retrieved: ', username, password)
    const user = await User.findOne({ userName: username })
    // console.log('2. user being processed', user)
    const isAuthorized = await brcrypt.compare(password, user.passwordHash)
    // console.log('3. bcrypt compare is processed', isAuthorized)
    if(!isAuthorized) return res.status(401).json({ error: 'Password entered is incorrect or does not exist.' })

    const payload = { id: user._id.toString(), username: user.userName }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' })

    return res.json({ token, username: user.userName })
  } catch(err) {next(err)}
})

module.exports = router