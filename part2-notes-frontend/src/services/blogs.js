import axios from 'axios'

const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (content) => {
  const response = axios.post(baseUrl, content)
  return response.then(response => response.data)
}

export default { getAll, create }