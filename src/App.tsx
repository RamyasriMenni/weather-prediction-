import React from 'react';
import { 
  Cloud, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  Sun, 
  Thermometer,
  Umbrella,
  Navigation,
  Activity
} from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { SoilMoistureCard } from './components/SoilMoistureCard';
import { useWeather } from './hooks/useWeather';

function App() {
  const { 
    weatherData, 
    soilData, 
    loading, 
    error, 
    fetchWeather, 
    fetchWeatherByCoords 
  } = useWeather();

  const handleSearch = (location: string) => {
    fetchWeather(location);
  };

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Unable to get your location. Please search manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const getBackgroundGradient = () => {
    if (!weatherData) return 'from-blue-600 via-blue-700 to-blue-800';
    
    const condition = weatherData.current.condition.text.toLowerCase();
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour > 18;
    
    if (condition.includes('sunny') || condition.includes('clear')) {
      return isNight 
        ? 'from-indigo-900 via-purple-900 to-blue-900'
        : 'from-blue-400 via-blue-500 to-blue-600';
    } else if (condition.includes('rain') || condition.includes('storm')) {
      return 'from-gray-700 via-gray-800 to-gray-900';
    } else if (condition.includes('cloud')) {
      return isNight
        ? 'from-gray-800 via-gray-900 to-black'
        : 'from-gray-500 via-gray-600 to-gray-700';
    } else if (condition.includes('snow')) {
      return 'from-blue-200 via-blue-300 to-blue-400';
    }
    
    return 'from-blue-600 via-blue-700 to-blue-800';
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Error</h2>
          <p className="text-white/80">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Weather Station
          </h1>
          <p className="text-white/80 text-lg">
            Complete environmental monitoring dashboard
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar 
          onSearch={handleSearch}
          onLocationRequest={handleLocationRequest}
          isLoading={loading}
        />

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-white text-center">Loading weather data...</p>
            </div>
          </div>
        ) : weatherData ? (
          <div className="space-y-8">
            {/* Current Weather Header */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left mb-6 md:mb-0">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {weatherData.location.name}
                  </h2>
                  <p className="text-white/80 mb-4">{weatherData.location.country}</p>
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <img 
                      src={`https:${weatherData.current.condition.icon}`}
                      alt={weatherData.current.condition.text}
                      className="w-16 h-16"
                    />
                    <div>
                      <div className="text-5xl font-bold text-white">
                        {Math.round(weatherData.current.temp_c)}°C
                      </div>
                      <div className="text-white/60 text-sm">
                        Feels like {Math.round(weatherData.current.feelslike_c)}°C
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-xl text-white mb-2">
                    {weatherData.current.condition.text}
                  </p>
                  <p className="text-white/60">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Weather Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <WeatherCard
                title="Wind Speed"
                value={Math.round(weatherData.current.wind_kph)}
                unit="km/h"
                icon={<Wind className="w-6 h-6 text-blue-400" />}
                description={`Direction: ${weatherData.current.wind_dir}`}
              />
              
              <WeatherCard
                title="Humidity"
                value={weatherData.current.humidity}
                unit="%"
                icon={<Droplets className="w-6 h-6 text-blue-400" />}
                description="Relative humidity"
              />
              
              <WeatherCard
                title="Visibility"
                value={weatherData.current.vis_km}
                unit="km"
                icon={<Eye className="w-6 h-6 text-purple-400" />}
                description="Clear visibility"
              />
              
              <WeatherCard
                title="Pressure"
                value={weatherData.current.pressure_mb}
                unit="mb"
                icon={<Gauge className="w-6 h-6 text-green-400" />}
                description="Atmospheric pressure"
              />
              
              <WeatherCard
                title="UV Index"
                value={weatherData.current.uv}
                icon={<Sun className="w-6 h-6 text-yellow-400" />}
                description={weatherData.current.uv > 7 ? "High exposure" : weatherData.current.uv > 3 ? "Moderate" : "Low"}
              />
              
              <WeatherCard
                title="Precipitation"
                value={weatherData.current.precip_mm.toFixed(1)}
                unit="mm"
                icon={<Umbrella className="w-6 h-6 text-blue-400" />}
                description="Last hour"
              />
              
              <WeatherCard
                title="Wind Gust"
                value={Math.round(weatherData.current.gust_kph)}
                unit="km/h"
                icon={<Navigation className="w-6 h-6 text-orange-400" />}
                description="Maximum gust"
              />
              
              <WeatherCard
                title="Cloud Cover"
                value={weatherData.current.cloud}
                unit="%"
                icon={<Cloud className="w-6 h-6 text-gray-400" />}
                description="Sky coverage"
              />
            </div>

            {/* Soil Moisture Section */}
            {soilData && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <SoilMoistureCard {...soilData} />
                
                <WeatherCard
                  title="Air Quality"
                  value="Good"
                  icon={<Activity className="w-6 h-6 text-green-400" />}
                  description="AQI: 45 - Clean air"
                />
              </div>
            )}

            {/* 5-Day Forecast */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">5-Day Forecast</h3>
              <div className="flex gap-4 overflow-x-auto pb-4">
                {weatherData.forecast.forecastday.map((day, index) => (
                  <ForecastCard
                    key={index}
                    date={day.date}
                    high={day.day.maxtemp_c}
                    low={day.day.mintemp_c}
                    condition={day.day.condition.text}
                    icon={day.day.condition.icon}
                    precipitation={day.day.totalprecip_mm}
                    humidity={day.day.avghumidity}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;