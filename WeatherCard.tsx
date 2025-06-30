import React from 'react';
import { Cloud, Droplets, Wind, Eye, Gauge, Sun, Thermometer } from 'lucide-react';

interface WeatherCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
  description?: string;
  trend?: 'up' | 'down' | 'stable';
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  title,
  value,
  unit,
  icon,
  description,
  trend
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-red-500';
      case 'down': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-white/20 rounded-xl">
          {icon}
        </div>
        {trend && (
          <div className={`text-sm font-medium ${getTrendColor()}`}>
            {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}
          </div>
        )}
      </div>
      
      <h3 className="text-white/80 text-sm font-medium mb-2">{title}</h3>
      
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-2xl font-bold text-white">{value}</span>
        {unit && <span className="text-white/60 text-sm">{unit}</span>}
      </div>
      
      {description && (
        <p className="text-white/60 text-xs">{description}</p>
      )}
    </div>
  );
};