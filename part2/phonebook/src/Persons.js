import React from 'react'

const Persons = ({persons, filterName}) => {
    return (
        <div>
            <ul>
                {persons.filter(person => 
                         person.name.toLowerCase().includes(filterName.toLowerCase()) || filterName === '')
                        .map(person => <p key={person.id}>{person.name} {person.number}</p>)}
            </ul>
        </div>
    )
}

export default Persons