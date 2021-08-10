import React from 'react'
import personService from './services/persons'

const PersonForm = ({persons, setPersons, newName, setNewName, newPhoneNumber, setNewPhoneNumber, setNotificationMessage, setErrorMessage}) => {

    const addPerson = (event) => {
      event.preventDefault()
      const personObject = {
        name: newName,
        number: newPhoneNumber
      }

      if (persons.some(p => p.name === newName)) {
        if (window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)) {
          const currentPerson = persons.find(p=> p.name === newName);
          const updatedPerson = { ...currentPerson, number: newPhoneNumber }

          personService
            .updatePerson(currentPerson.id, updatedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(p => p.id !== currentPerson.id ? p : returnedPerson));
              setNewName('');
              setNewPhoneNumber('');
            })
            .catch(error => {
              if ((error.response.data.error).includes('name')) {
                setErrorMessage(
                  'Name is too short, required length is at least 3 characters!'
                )
              }
              if ((error.response.data.error).includes('number')) {
                setErrorMessage(
                  'Number is too short, required length is at least 8 characters!'
                )
              }
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            })
            

          return;  
        }
        else {
          return;
        }
      } else {
        setNewName(event.target.value);
      }

      personService
        .createPerson(personObject)
        .then(response => {
          setNotificationMessage(
            `Added ${personObject.name}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          setPersons(persons.concat(response.data));
          setNewName('');
          setNewPhoneNumber('');
        })
        .catch(error => {
          if ((error.response.data.error).includes('name')) {
            setErrorMessage(
              'Name is too short, required length is at least 3 characters!'
            )
          }
          if ((error.response.data.error).includes('number')) {
            setErrorMessage(
              'Number is too short, required length is at least 8 characters!'
            )
          }
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
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
          <div className="personInputForm">
            Name: <input value={newName || ''} onChange={handlePersonNameChange}/>
            <br></br>
            Number: <input value={newPhoneNumber || ''} onChange={handlePersonNumberChange}/>
            </div>
            <div>
            <button className="addPersonBtn" type="submit">Add</button>
          </div>
      </form>
    )
}

export default PersonForm
