import React from 'react'

const CountryData = ({country}) => {
  return (
    <div>
        <ul>
          {<h2>{country.name}</h2>}
          {<p>capital {country.capital}</p>}
          {<p>population {country.population}</p>}
          <h3>languages</h3>
          {<ul>
              {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
          </ul>}
          {<img src={country.flag} alt="country flag"></img>}
        </ul>
    </div>
  )
}

export default CountryData