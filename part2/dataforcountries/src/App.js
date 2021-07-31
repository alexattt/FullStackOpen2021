import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryData from './CountryData'
import './App.css'

function App() {
  const [ showCountryData, setShowCountryData ] = useState(false)
  const [ buttonValue, setButtonValue ] = useState()
  const [ countries, setCountries ] = useState([])
  const [ filterCountry, setFilter ] = useState('')
  const filteredCountries = countries
    .filter(country => country.name.toLowerCase().includes(filterCountry.toLowerCase()) || filterCountry === '')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleFilterByCountry = (event) => {
    setFilter(event.target.value);
  }

  const handleShowButtonClick = (btnValue) => {
    setButtonValue(btnValue);
  }

  const onClick = (btnValue) => {
    handleShowButtonClick(btnValue);
    setShowCountryData(!showCountryData);
  }

  return (
    <div className="App">
      Find countries: <input value={filterCountry} onChange={handleFilterByCountry}/>
      {filteredCountries.length > 10 && <p>Please be more specific, too many countries!</p>}
      {filteredCountries.length < 10 && filteredCountries.length !== 1 && 
        <ul>
          {
            filteredCountries.map(country=> 
              <div className="countryAndButton" key={country.alpha2Code}>
                <p> {country.name}</p>
                <button type="button" onClick={() => onClick(filteredCountries.indexOf(country))}>Show</button>
              </div>
            )
          }
          {showCountryData ? <CountryData country={filteredCountries[buttonValue]}/> : <div></div>}
        </ul>
      }
      {filteredCountries.length === 1 && 
        <CountryData country={filteredCountries[0]}/>
      }
    </div>
  );
}
export default App;
