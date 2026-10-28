import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

function App() {
  // 1. State Management (useState)
  const [query, setQuery] = useState('Beirut');
  const [activeCity, setActiveCity] = useState('Beirut');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 2. Data Fetching Side Effect (useEffect)
  useEffect(() => {
    if (!activeCity) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        // Step A: Geocode city name to lat/lon
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(activeCity)}&count=1`
        );
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
          throw new Error('City not found. Please try another location.');
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        // Step B: Fetch current weather using coordinates
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        const data = await weatherRes.json();

        setWeatherData({
          city: `${name}, ${country}`,
          temperature: data.current_weather.temperature,
          windSpeed: data.current_weather.windspeed,
          weatherCondition: `Code ${data.current_weather.weathercode}`,
        });
      } catch (err) {
        setError(err.message || 'Failed to fetch weather data.');
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [activeCity]); // Runs on initial mount and whenever activeCity changes

  const handleSearch = (searchCity) => {
    setActiveCity(searchCity);
  };

  return (
    <div className="app-container">
      <h1>Weather Dashboard</h1>
      
      {/* Prop passing parent -> child */}
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />

      {/* Conditional Rendering */}
      {loading && <LoadingSpinner />}
      {error && !loading && <ErrorMessage message={error} />}
      {weatherData && !loading && !error && <WeatherCard data={weatherData} />}
    </div>
  );
}

export default App;