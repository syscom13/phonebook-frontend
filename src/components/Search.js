import React from 'react'

const Search = ({ searchTerm, handleSearchChange }) => {
    return (
        <React.Fragment>
            Filter shown with&nbsp;
            <input
                value={searchTerm}
                onChange={handleSearchChange}
                type="text"
            />
        </React.Fragment>
    )
}

export default Search