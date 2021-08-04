import React from 'react';
import CountryData from './CountryData';

const FilterCountries = ({filteredCountries, showCountryData, buttonValue, handleShowButtonClick, setShowCountryData}) => {

    const onClick = (btnValue) => {
        handleShowButtonClick(btnValue);
        setShowCountryData(!showCountryData);
    }

    return (
        <div>
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
    )
}

export default FilterCountries