import { useState, useEffect } from 'react';
import styles from './WeatherWidget.module.css';

const WeatherWidget = ({ date, location }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate weather data (in production, use OpenWeather API)
    const fetchWeather = async () => {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const weatherData = {
          temp: Math.floor(Math.random() * 15) + 20, // 20-35°C
          condition: ['Sunny', 'Cloudy', 'Partly Cloudy', 'Rainy'][Math.floor(Math.random() * 4)],
          humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
          windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
          icon: getWeatherIcon(['Sunny', 'Cloudy', 'Partly Cloudy', 'Rainy'][Math.floor(Math.random() * 4)])
        };
        setWeather(weatherData);
        setLoading(false);
      }, 1000);
    };

    if (date && location) {
      fetchWeather();
    }
  }, [date, location]);

  const getWeatherIcon = (condition) => {
    const icons = {
      'Sunny': '☀️',
      'Cloudy': '☁️',
      'Partly Cloudy': '⛅',
      'Rainy': '🌧️',
      'Stormy': '⛈️'
    };
    return icons[condition] || '🌤️';
  };

  if (!date || !location) return null;

  if (loading) {
    return (
      <div className={styles.weatherWidget}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading weather...</p>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className={styles.weatherWidget}>
      <div className={styles.weatherHeader}>
        <span className={styles.weatherIcon}>{weather.icon}</span>
        <div>
          <h4>Weather Forecast</h4>
          <p className={styles.location}>📍 {location}</p>
        </div>
      </div>
      
      <div className={styles.weatherDetails}>
        <div className={styles.mainTemp}>
          <span className={styles.temp}>{weather.temp}°C</span>
          <span className={styles.condition}>{weather.condition}</span>
        </div>
        
        <div className={styles.weatherStats}>
          <div className={styles.stat}>
            <span className={styles.statIcon}>💧</span>
            <span className={styles.statValue}>{weather.humidity}%</span>
            <span className={styles.statLabel}>Humidity</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statIcon}>💨</span>
            <span className={styles.statValue}>{weather.windSpeed} km/h</span>
            <span className={styles.statLabel}>Wind</span>
          </div>
        </div>
      </div>

      <div className={styles.weatherTip}>
        {weather.condition === 'Rainy' && (
          <p>⚠️ Rain expected - Consider indoor backup plan</p>
        )}
        {weather.condition === 'Sunny' && weather.temp > 30 && (
          <p>🌡️ Hot day - Ensure adequate cooling arrangements</p>
        )}
        {weather.condition === 'Sunny' && weather.temp <= 30 && (
          <p>✅ Perfect weather for your event!</p>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
