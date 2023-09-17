import React, { useState } from 'react';
import './App.css';
import sunnyIcon from './pics/sunny.png';
import cloudyIcon from './pics/cloudy.png';
import hazeIcon from './pics/haze.png';
import rainIcon from './pics/rain.png';
import humidityIcon from './pics/humidity.png';
import windspeedIcon from './pics/windspeed.png';
import tempIcon from './pics/temp.png';

const weatherIcons = {
  Clear: sunnyIcon,
  Haze: hazeIcon,
  Clouds: cloudyIcon,
  Rain: rainIcon,
  Mist: rainIcon,
};

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const apiKey = "Get your own API key";

  const fetchWeatherData = () => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleSearch = () => {
    if (location.trim() !== '') {
      fetchWeatherData();
    } else {
      alert('Please enter a location.');
    }
  };

  const handleKeyUp = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  const renderWeatherInfo = () => {
    if (!weatherData) return null;

    const { name, sys, main, wind, weather } = weatherData;
    const { country } = sys;
    const { temp, feels_like, humidity } = main;
    const { speed } = wind;
    const { description, main: weatherMain } = weather[0];

    const temperature = Math.round(temp - 273.15);
    const feelsLike = Math.round(feels_like - 273.15);
    const windSpeed = Math.round(speed * 3.6);

    const weatherIcon = weatherIcons[weatherMain] || rainIcon;

    return (
      <div id="weatherInfo">
        <h2>{`${name}, ${country}`}</h2>
        <div className="weather-info">
          <img src={weatherIcon} className="weather-icon" alt="Weather Icon" />
          <p className="p1">Weather: {description}</p>
        </div>
        <div className="weather-info">
          <img src={tempIcon} className="img1" alt="Temperature Icon" />
          <p className="p2">Temperature: {temperature}°C</p>
        </div>
        <div className="weather-info">
          <p className="p3">Feels Like: {feelsLike}°C</p>
        </div>
        <div className="weather-info">
          <img src={humidityIcon} className="img2" alt="Humidity Icon" />
          <p className="p4">Humidity: {humidity}%</p>
        </div>
        <div className="weather-info">
          <img src={windspeedIcon} className="img3" alt="Wind Speed Icon" />
          <p className="p5">Wind Speed: {windSpeed} km/h</p>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        id="locationInput"
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={e => setLocation(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <button id="searchButton" onClick={handleSearch}>
        Search
      </button>
      {renderWeatherInfo()}
    </div>
  );
}

export default App;
