import React, { useState, useEffect } from 'react'
import axios from 'axios';
import WeatherData from './WeatherData';

const CountryData = ({country}) => {
  const [ weatherData, setWeatherData ] = useState()

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios.get('http://api.weatherstack.com/current', {
        params: {
          query: country.capital,
          access_key: api_key,
        },
      })
      .then(response => {
        const apiResponse = response.data;
        setWeatherData(apiResponse);
      });
  }, [])

  return (
    <div>
        <ul>
          {<h2>{country.name}</h2>}
          {<p>Capital: {country.capital}</p>}
          {<p>Population: {country.population}</p>}
          <h3>Languages</h3>
          {<ul>
              {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
          </ul>}
          {<img src={country.flag} alt="country flag"></img>}
          <WeatherData weatherData={weatherData}/>
        </ul>
    </div>
  )
}

export default CountryData