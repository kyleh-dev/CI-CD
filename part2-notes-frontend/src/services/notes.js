import axios from 'axios'
// Read Vite's `import.meta.env.VITE_API_ROOT` when running in the browser/dev server.
// When this module is executed directly with Node (for quick tests), `import.meta.env`
// can be undefined, so fall back to process.env.VITE_API_ROOT and then to a default.
const apiRoot = import.meta?.env?.VITE_API_ROOT  ?? 'http://localhost:3001'
const baseUrl = `${apiRoot}/api/persons`

axios.get(baseUrl).then(res => console.log(res.data))

const getAll = () => {
  const request = axios.get(baseUrl)
  console.log('notes service GET', baseUrl)
    
    // const nonExisting = {
    //     id: 10000,
    //     content: 'This note is not saved to server',
    //     important: true
    // }
  return request.then(Response => Response.data)
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