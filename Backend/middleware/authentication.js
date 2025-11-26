const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const auth = req.get('authorization')
  const token = auth.toLowerCase().startsWith('bearer') ? auth.slice(7) : null;

  try {
    if (!token) return res.status(401).json({ error: 'token missing' })
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({ error: 'invalid or expired token' })
  }
}