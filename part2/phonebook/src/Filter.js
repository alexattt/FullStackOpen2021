import React from 'react'

const Filter = ({filterName, setFilter}) => {
    const handleFilterByName = (event) => {
        setFilter(event.target.value);
    }

    return (
        <div className="filterContainer">
            Filter by name: <input value={filterName} onChange={handleFilterByName} />
        </div>
    )
}

export default Filter