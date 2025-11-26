import axios from 'axios'

const baseUrl = '/api/me'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const verifyToken = async () => {
  const config = { headers: { Authorization: token } }

  const response = await axios.get(baseUrl, config)
  return response.data
}

export default { setToken, verifyToken}

