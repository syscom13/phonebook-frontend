import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    const classText = message.type === 'error' ? 'error' : 'success'

    return (
        <div className={classText}>
            {message.payload}
        </div>
    )

}

export default Notification