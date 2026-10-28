import React from 'react';

function WeatherCard({ data }) {
  return (
    <div className="weather-card">
      <h2>{data.city}</h2>
      <p className="temp">{data.temperature}°C</p>
      <p>Condition: {data.weatherCondition}</p>
      <p>Wind Speed: {data.windSpeed} km/h</p>
    </div>
  );
}

export default WeatherCard;