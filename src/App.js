import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import Persons from './components/Persons'
import Form from './components/Form'
import Search from './components/Search'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhoneNumber, setNewPhoneNumber] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    useEffect(() => {
        const fetchPersons = async () => {
            try {
                const personsList = await personsService.getAll()
                setPersons(personsList)
            } catch (error) {
                setError('There was en error fetching data from the server')
                setTimeout(() => {
                    setError(null)
                }, 5000)
            }
        }

        fetchPersons()
    }, [])

    const handleNameChange = e => setNewName(e.target.value)
    const handlePhoneNumberChange = e => setNewPhoneNumber(e.target.value)
    const handleSearchChange = e => setSearchTerm(e.target.value)
    const sanitize = input => input.trim()
    const resetFormInputs = () => {
        setNewName('')
        setNewPhoneNumber('')
    }

    const addPerson = async e => {
        e.preventDefault()
        const nameExists = persons.some(person => person.name === sanitize(newName))

        if (nameExists && !newPhoneNumber) {
            alert(`${sanitize(newName)} is already added to the phonebook`)
        } else if (nameExists && newPhoneNumber) {
            await updatePhoneNumber()
        } else {
            const personObject = {
                name: sanitize(newName),
                number: sanitize(newPhoneNumber)
            }

            try {
                const returnedPerson = await personsService.create(personObject)
                setPersons(persons.concat(returnedPerson))
                setSuccess(`${returnedPerson.name} was added successfully`)
                setTimeout(() => {
                    setSuccess(null)
                }, 5000)
                resetFormInputs()
            } catch (error) {
                setError(`"${personObject.name}" could not be saved to the database`)
                setTimeout(() => {
                    setError(null)
                }, 5000)
            }
        }
    }

    const updatePhoneNumber = async () => {
        const updateConfirmed = window.confirm(`${sanitize(newName)} was already added to the phonebook, replace the old number with the new one?`)

        if (updateConfirmed) {
            const personObject = { 
                ...persons.find(person => person.name === sanitize(newName)), 
                number: sanitize(newPhoneNumber) 
            }
            try {
                const returnedPerson = await personsService.update(personObject.id, personObject)
                setPersons(persons.map(person => person.name === newName ? returnedPerson : person))
                setSuccess(`${returnedPerson.name}'s phone number was updated successfully`)
                setTimeout(() => {
                    setSuccess(null)
                }, 5000)
                resetFormInputs()
            } catch (error) {
                setError(`Informations about ${personObject.name} have already been deleted from the server`)
                setTimeout(() => {
                    setError(null)
                }, 5000)
            }
        }
    }

    const deletePerson = async person => {
        const { name, id } = person
        const confirmed = window.confirm(`Are you sure you want to delete ${name}?`)

        if (confirmed) {
            try {
                await personsService.remove(id)
                setPersons(persons.filter(p => p.id !== id))
                setSuccess(`${name} was deleted from the phonebook`)
                setTimeout(() => {
                    setSuccess(null)
                }, 5000)
            } catch (error) {
                setError(`${name} could not be removed`)
                setTimeout(() => {
                    setError(null)
                }, 5000)
            }
        }
    }

    const getMessage = () => {
        if (error) {
            return {
                type: 'error',
                payload: error
            }
        }

        if (success) {
            return {
                type: 'success',
                payload: success
            }
        }

        return null
    }

    return (
        <div className="small container">
            <h1>Phonebook</h1>
            <Notification 
                message={getMessage()} 
            />
            <div>
                <Search
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                />
            </div>
            <div>
                <h2>Add a Contact</h2>
                <Form
                    newName={newName}
                    newPhoneNumber={newPhoneNumber}
                    handleNameChange={handleNameChange}
                    handlePhoneNumberChange={handlePhoneNumberChange}
                    addPerson={addPerson}
                />
            </div>
            <div>
                <h2>Numbers</h2>
                <Persons 
                    persons={persons} 
                    searchTerm={searchTerm} 
                    handleDelete={deletePerson}
                />
            </div>
        </div>
    )
}

export default App