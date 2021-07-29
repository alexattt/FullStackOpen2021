import React, { useState } from 'react'

const Filter = ({filterName, setFilter}) => {
    const handleFilterByName = (event) => {
        console.log(event.target.value);
        setFilter(event.target.value);
    }

    return (
        <div>
            filter by: <input value={filterName} onChange={handleFilterByName} />
        </div>
    )
}

export default Filter