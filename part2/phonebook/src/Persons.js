import React from 'react'
import personService from './services/persons'

const Persons = ({persons, setPersons, filterName}) => {

    const onClick = (deleteIdValue, deletePersonName) => {
        personService
            .deletePerson(deleteIdValue)
            .then(() => {
                if (window.confirm(`Delete ${deletePersonName}?`)) {
                    setPersons(persons.filter(person => person.id !== deleteIdValue))
                }
            })
    }

    return (
        <div className="personListContainer">
            <ul>
                {persons.filter(person => 
                    person.name.toLowerCase()
                    .includes(filterName.toLowerCase()) || filterName === '')
                    .map(person => 
                    <div key={person.id} className="personRow">
                        <p><strong>{person.name}</strong></p>
                        <p className="personNumber">{person.number}</p>
                        <button className="deleteBtn" type="button" 
                                onClick={() => onClick(person.id, person.name)}>Delete
                        </button>       
                    </div>
                )}
            </ul>
        </div>
    )
}

export default Persons