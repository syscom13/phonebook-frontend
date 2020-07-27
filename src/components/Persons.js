import React from 'react'
import Person from './Person'

const Persons = ({ persons, searchTerm, handleDelete }) => {
    const renderedPersons =  persons.filter(person => {
        return person.name.toLowerCase().includes(searchTerm.toLowerCase())
    }).map(person => {
        return (
            <Person 
                key={person.id} 
                person={person} 
                handleDelete={handleDelete}
            />
        )
    })

    return (
        <table>
            <tbody>
                {renderedPersons}
            </tbody>
        </table>
    )
}

export default Persons