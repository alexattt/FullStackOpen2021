import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Notification from './Notification'
import Error from './Error'
import personService from './services/persons'
import './App.css' 

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhoneNumber, setNewPhoneNumber ] = useState('')
  const [ filterName, setFilter ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAllPersons()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div className="mainContainer">
      <Notification message={notificationMessage}/>
      <Error message={errorMessage}/>
      <p className="phonebookTitle">Phonebook</p>
      <Filter filterName={filterName} setFilter={setFilter}/>
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} filterName={filterName}/>
      <h2>Add new contact</h2>
      <PersonForm persons={persons} setPersons={setPersons} 
                  newName={newName} setNewName={setNewName} 
                  newPhoneNumber={newPhoneNumber} setNewPhoneNumber={setNewPhoneNumber}
                  setNotificationMessage={setNotificationMessage}
                  setErrorMessage={setErrorMessage} />
    </div>
  )
}

export default App