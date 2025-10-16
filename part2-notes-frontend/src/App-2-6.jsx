import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  // const [persons, setPersons] = useState([
  //     { name: 'Arto Hellas' }
  // ])
const [newNumber, setNewNumber] = useState('')
const [newName, setNewName] = useState('')
const [searchName, setNewSearch] = useState('')
const [phoneNumbers, setPhoneNumbers] = useState([]);

const handleNotChange = (event) => setNewName(event.target.value);
const handleNotChangeNum = (event) => setNewNumber(event.target.value);
const handleNotChangeSearch = (event) => setNewSearch(event.target.value);

const filteredResults = phoneNumbers.filter( entry => entry.name.toLowerCase().includes(searchName.toLowerCase()))

const addNumber = (event) => {
  event.preventDefault()

  const nameExists = phoneNumbers.some((entry) => entry.name === newName)

  if (nameExists) {
      window.alert(`${newName} is already added to the phonebook`)
      return;
  }

  const numberObject = {
      name: newName,
      number: newNumber
  }


  setPhoneNumbers(phoneNumbers.concat(numberObject))
  setNewName('')
  setNewNumber('')
}

const hook = () => {
  console.log('effect')
  axios.get('http://localhost:3001/api/persons').then(resolve => {
      console.log(resolve.data)
      setPhoneNumbers(resolve.data)
  })
}

useEffect(hook, [])

return (
<div>
  <h2>PhoneBook</h2>
  <div>
      filter shown with {' '}
      <input
          type='search'
          onChange={handleNotChangeSearch}
          placeholder= "Enter Person's Name"
      />
      <ul>
          {filteredResults.length === 0 ? <p>No Matches for {searchName} </p> : filteredResults.map(info => (<li key={info.id}>{info.name}: {info.number}</li>))}
      </ul>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addNumber}>
          <div>name: <input onChange={handleNotChange}/></div>
          <div>number: <input onChange={handleNotChangeNum} /></div>
          <div><button type="submit">add</button></div>
      </form>
  <h2>Numbers</h2>
  <ul>{phoneNumbers.map((info => <li key={info.id}>{info.name}: {info.number}</li>))}</ul>
</div>
)
}

export default App