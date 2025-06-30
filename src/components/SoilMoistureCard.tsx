import React from 'react';
import { Droplets, Thermometer, Activity, Leaf } from 'lucide-react';

interface SoilMoistureCardProps {
  moisture: number;
  temperature: number;
  ph: number;
  nutrients: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
  };
}

export const SoilMoistureCard: React.FC<SoilMoistureCardProps> = ({
  moisture,
  temperature,
  ph,
  nutrients
}) => {
  const getMoistureLevel = (moisture: number) => {
    if (moisture < 30) return { level: 'Low', color: 'text-red-400', bg: 'bg-red-400' };
    if (moisture < 60) return { level: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-400' };
    return { level: 'High', color: 'text-green-400', bg: 'bg-green-400' };
  };

  const getPHLevel = (ph: number) => {
    if (ph < 6.0) return { level: 'Acidic', color: 'text-red-400' };
    if (ph > 8.0) return { level: 'Alkaline', color: 'text-blue-400' };
    return { level: 'Neutral', color: 'text-green-400' };
  };

  const moistureInfo = getMoistureLevel(moisture);
  const phInfo = getPHLevel(ph);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 col-span-full lg:col-span-2">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-500/20 rounded-xl">
          <Leaf className="w-6 h-6 text-green-400" />
        </div>
        <h2 className="text-xl font-bold text-white">Soil Conditions</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Moisture Level */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-400" />
              <span className="text-white/80 font-medium">Soil Moisture</span>
            </div>
            <span className={`text-sm font-medium ${moistureInfo.color}`}>
              {moistureInfo.level}
            </span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Level</span>
              <span className="text-white font-medium">{moisture}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${moistureInfo.bg} transition-all duration-500`}
                style={{ width: `${moisture}%` }}
              />
            </div>
          </div>

          {/* Temperature */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-orange-400" />
              <span className="text-white/80 font-medium">Soil Temp</span>
            </div>
            <span className="text-white font-medium">{temperature}°C</span>
          </div>
        </div>

        {/* pH and Nutrients */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400" />
              <span className="text-white/80 font-medium">pH Level</span>
            </div>
            <span className={`text-sm font-medium ${phInfo.color}`}>
              {phInfo.level}
            </span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">pH Value</span>
              <span className="text-white font-medium">{ph}</span>
            </div>
          </div>

          {/* Nutrients */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <h4 className="text-white/80 font-medium text-sm">Nutrients (ppm)</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Nitrogen (N)</span>
                <span className="text-white">{nutrients.nitrogen}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Phosphorus (P)</span>
                <span className="text-white">{nutrients.phosphorus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Potassium (K)</span>
                <span className="text-white">{nutrients.potassium}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};