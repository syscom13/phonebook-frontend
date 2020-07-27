import React from 'react'

const Form = ({ 
    newName, 
    newPhoneNumber, 
    handleNameChange, 
    handlePhoneNumberChange, 
    addPerson
}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                Name: 
                <input
                    value={newName}
                    onChange={handleNameChange}
                    type="text"
                />
            </div>
            <div>
                Phone Number: 
                <input
                    value={newPhoneNumber}
                    onChange={handlePhoneNumberChange}
                    type="text"
                />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default Form