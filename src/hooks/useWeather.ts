import { useState, useEffect } from 'react';
import { WeatherData, SoilData } from '../types/weather';

const API_KEY = 'demo_key'; // In production, use environment variables
const BASE_URL = 'https://api.weatherapi.com/v1';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [soilData, setSoilData] = useState<SoilData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate mock soil data based on weather conditions
  const generateSoilData = (weather: WeatherData): SoilData => {
    const baseTemp = weather.current.temp_c;
    const humidity = weather.current.humidity;
    const precipitation = weather.current.precip_mm;
    
    return {
      moisture: Math.min(100, Math.max(20, humidity + precipitation * 5)),
      temperature: Math.max(0, baseTemp - 5 + Math.random() * 10),
      ph: 6.0 + Math.random() * 2.5,
      nutrients: {
        nitrogen: Math.floor(50 + Math.random() * 100),
        phosphorus: Math.floor(20 + Math.random() * 60),
        potassium: Math.floor(80 + Math.random() * 120)
      }
    };
  };

  // Mock weather data for demo purposes
  const generateMockWeatherData = (location: string): WeatherData => {
    const temp = Math.floor(Math.random() * 35) + 5;
    const conditions = [
      { text: 'Sunny', icon: '//cdn.weatherapi.com/weather/64x64/day/113.png' },
      { text: 'Partly cloudy', icon: '//cdn.weatherapi.com/weather/64x64/day/116.png' },
      { text: 'Cloudy', icon: '//cdn.weatherapi.com/weather/64x64/day/119.png' },
      { text: 'Light rain', icon: '//cdn.weatherapi.com/weather/64x64/day/296.png' },
      { text: 'Heavy rain', icon: '//cdn.weatherapi.com/weather/64x64/day/308.png' }
    ];
    
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    const humidity = Math.floor(Math.random() * 60) + 30;
    const windSpeed = Math.floor(Math.random() * 25) + 5;
    
    return {
      location: {
        name: location,
        country: 'Demo Country',
        lat: 40.7128,
        lon: -74.0060
      },
      current: {
        temp_c: temp,
        temp_f: Math.round(temp * 9/5 + 32),
        condition,
        wind_mph: windSpeed,
        wind_kph: Math.round(windSpeed * 1.609),
        wind_dir: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
        pressure_mb: Math.floor(Math.random() * 50) + 1000,
        pressure_in: 29.5 + Math.random() * 2,
        precip_mm: Math.random() * 10,
        precip_in: Math.random() * 0.4,
        humidity,
        cloud: Math.floor(Math.random() * 100),
        feelslike_c: temp + Math.floor(Math.random() * 6) - 3,
        feelslike_f: Math.round((temp + Math.floor(Math.random() * 6) - 3) * 9/5 + 32),
        vis_km: Math.floor(Math.random() * 15) + 5,
        vis_miles: Math.floor(Math.random() * 10) + 3,
        uv: Math.floor(Math.random() * 11),
        gust_mph: windSpeed + Math.floor(Math.random() * 10),
        gust_kph: Math.round((windSpeed + Math.floor(Math.random() * 10)) * 1.609)
      },
      forecast: {
        forecastday: Array.from({ length: 5 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() + i);
          const dayTemp = Math.floor(Math.random() * 30) + 10;
          const dayCondition = conditions[Math.floor(Math.random() * conditions.length)];
          
          return {
            date: date.toISOString().split('T')[0],
            day: {
              maxtemp_c: dayTemp + Math.floor(Math.random() * 8),
              maxtemp_f: Math.round((dayTemp + Math.floor(Math.random() * 8)) * 9/5 + 32),
              mintemp_c: dayTemp - Math.floor(Math.random() * 8),
              mintemp_f: Math.round((dayTemp - Math.floor(Math.random() * 8)) * 9/5 + 32),
              avgtemp_c: dayTemp,
              avgtemp_f: Math.round(dayTemp * 9/5 + 32),
              maxwind_mph: Math.floor(Math.random() * 30) + 10,
              maxwind_kph: Math.round((Math.floor(Math.random() * 30) + 10) * 1.609),
              totalprecip_mm: Math.random() * 15,
              totalprecip_in: Math.random() * 0.6,
              avgvis_km: Math.floor(Math.random() * 15) + 5,
              avgvis_miles: Math.floor(Math.random() * 10) + 3,
              avghumidity: Math.floor(Math.random() * 40) + 40,
              daily_will_it_rain: Math.random() > 0.7 ? 1 : 0,
              daily_chance_of_rain: Math.floor(Math.random() * 100),
              daily_will_it_snow: 0,
              daily_chance_of_snow: 0,
              condition: dayCondition,
              uv: Math.floor(Math.random() * 11)
            }
          };
        })
      }
    };
  };

  const fetchWeather = async (location: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate mock data
      const mockWeather = generateMockWeatherData(location);
      const mockSoil = generateSoilData(mockWeather);
      
      setWeatherData(mockWeather);
      setSoilData(mockSoil);
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate mock data for coordinates
      const mockWeather = generateMockWeatherData(`${lat.toFixed(2)}, ${lon.toFixed(2)}`);
      const mockSoil = generateSoilData(mockWeather);
      
      setWeatherData(mockWeather);
      setSoilData(mockSoil);
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load default location on mount
  useEffect(() => {
    fetchWeather('New York');
  }, []);

  return {
    weatherData,
    soilData,
    loading,
    error,
    fetchWeather,
    fetchWeatherByCoords
  };
};