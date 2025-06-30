import React from 'react';

interface ForecastCardProps {
  date: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  precipitation: number;
  humidity: number;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({
  date,
  high,
  low,
  condition,
  icon,
  precipitation,
  humidity
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 min-w-[200px]">
      <div className="text-center">
        <p className="text-white/80 text-sm font-medium mb-2">
          {formatDate(date)}
        </p>
        
        <div className="flex justify-center mb-3">
          <img 
            src={`https:${icon}`} 
            alt={condition}
            className="w-12 h-12"
          />
        </div>
        
        <p className="text-white/70 text-xs mb-3 h-8 flex items-center justify-center">
          {condition}
        </p>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-white font-bold text-lg">{Math.round(high)}°</span>
          <span className="text-white/60 text-sm">{Math.round(low)}°</span>
        </div>
        
        <div className="space-y-1 text-xs">
          <div className="flex justify-between text-white/60">
            <span>Rain:</span>
            <span>{precipitation}mm</span>
          </div>
          <div className="flex justify-between text-white/60">
            <span>Humidity:</span>
            <span>{humidity}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};