import React from 'react'
import axios from 'axios'


const PersonForm = ({persons, setPersons, newName, setNewName, newPhoneNumber, setNewPhoneNumber}) => {

    const addPerson = (event) => {
      event.preventDefault()
      const personObject = {
        name: newName,
        number: newPhoneNumber
    }

    if (persons.some(p => p.name === newName)) {
      alert(`${newName} already exists in the phonebook!`);
      return;
    } else {
      setNewName(event.target.value);
    }

    axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data));
        setNewName('');
        setNewPhoneNumber('');
      })
    }
    
    const handlePersonNameChange = (event) => {
        setNewName(event.target.value);
    }
    
    const handlePersonNumberChange = (event) => {
        setNewPhoneNumber(event.target.value);
    }

    return (
        <form onSubmit={addPerson}> 
            <div>
            name: <input value={newName || ''} onChange={handlePersonNameChange}/>
            <br></br>
            number: <input value={newPhoneNumber || ''} onChange={handlePersonNumberChange}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm
