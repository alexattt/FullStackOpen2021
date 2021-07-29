import React, { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: '1' },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: '2' },
    { name: 'Dan Abramov', number: '12-43-234345', id: '3' },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: '4' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newPhoneNumber, setNewPhoneNumber ] = useState('')
  const [ filterName, setFilter ] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} setFilter={setFilter}/>
      <h2>Add new contact</h2>
      <PersonForm persons={persons} setPersons={setPersons} 
                  newName={newName} setNewName={setNewName} 
                  newPhoneNumber={newPhoneNumber} setNewPhoneNumber={setNewPhoneNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filterName={filterName}/>
    </div>
  )
}

export default App