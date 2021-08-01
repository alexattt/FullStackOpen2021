import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilterCountries from './FilterCountries'
import './App.css'

function App() {
  const [ showCountryData, setShowCountryData ] = useState(false)
  const [ buttonValue, setButtonValue ] = useState()
  const [ countries, setCountries ] = useState([])
  const [ filterCountry, setFilter ] = useState('')
  const filteredCountries = countries
    .filter(country => country.name.toLowerCase().includes(filterCountry.toLowerCase()) || filterCountry === '')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterByCountry = (event) => {
    setFilter(event.target.value);
  }

  const handleShowButtonClick = (btnValue) => {
    setButtonValue(btnValue);
  }

  return (
    <div className="App">
      Find countries: <input value={filterCountry} onChange={handleFilterByCountry}/>
      <FilterCountries filteredCountries={filteredCountries} showCountryData={showCountryData} 
                       buttonValue={buttonValue} handleShowButtonClick={handleShowButtonClick} 
                       setShowCountryData={setShowCountryData} />
    </div>
  );
}
export default App;
