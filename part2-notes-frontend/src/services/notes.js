import axios from 'axios'
const apiRoot = import.meta.env.VITE_API_ROOT ?? 'http://localhost:3001/api'
const baseUrl = `${apiRoot}/api/persons`

const getAll = () => {
    const request =  axios.get(baseUrl)
    const nonExisting = {
        id: 10000,
        content: 'This note is not saved to server',
        important: true
    }
    return request.then(Response => Response.data.concat(nonExisting))
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(Response => Response.data)

}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(Response => Response.data)

}

export default { getAll, create, update }