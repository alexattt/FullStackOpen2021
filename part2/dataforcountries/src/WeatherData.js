import React from 'react';

const WeatherData = ({weatherData}) => {
  return (
    <div>
        {weatherData !== undefined && 
            <h3>Weather in {weatherData.location.name}</h3>
        }
        {weatherData !== undefined && 
            <p>Temperature: {weatherData.current.temperature} Celsius</p>
        }
        {weatherData !== undefined && 
            <img className="weatherIcon" src={weatherData.current.weather_icons[0]} alt="Current weather icon"/>
        }
        {weatherData !== undefined && 
            <p>Wind: {weatherData.current.wind_speed}mph, direction: {weatherData.current.wind_dir}</p>
        }
    </div>
  )
}

export default WeatherData