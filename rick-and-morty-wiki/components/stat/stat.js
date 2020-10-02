import React from 'react';

const stat = ({ name, value }) => {
    return (
        <li>
            <strong>{name}</strong> {value}
        </li>
    )
}

export default stat;