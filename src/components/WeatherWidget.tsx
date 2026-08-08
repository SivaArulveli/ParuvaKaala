import { CloudRain, Thermometer, Wind, Droplets, Sun, AlertTriangle } from 'lucide-react';
import { SoilMoistureData, Language } from '../lib/types';
import { TRANSLATIONS } from '../lib/i18n';

interface WeatherWidgetProps {
  soil: SoilMoistureData;
  locationName: string;
  language: Language;
}

export default function WeatherWidget({ soil, locationName, language }: WeatherWidgetProps) {
  const t = TRANSLATIONS[language];

  return (
    <div className="p-6 rounded-3xl bg-[#121a15]/80 backdrop-blur-xl border border-blue-500/20 shadow-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <CloudRain className="text-blue-400" size={20} />
            {t.weatherTitle}
          </h3>
          <p className="text-xs text-gray-400 font-medium mt-0.5">
            {locationName} • Open-Meteo Live Agrometeorology
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          soil.status === 'Critical Dry' ? 'bg-red-950 text-red-400 border border-red-500/30' :
          soil.status === 'Low' ? 'bg-amber-950 text-amber-400 border border-amber-500/30' :
          'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
        }`}>
          {soil.status} Soil Moisture
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Surface Temp */}
        <div className="p-3.5 bg-[#090d0b]/60 border border-white/5 rounded-2xl flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
            <Thermometer size={18} />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">Temperature</p>
            <p className="text-base font-black text-white">{soil.temperature}°C</p>
          </div>
        </div>

        {/* Humidity */}
        <div className="p-3.5 bg-[#090d0b]/60 border border-white/5 rounded-2xl flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl">
            <Droplets size={18} />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">Humidity</p>
            <p className="text-base font-black text-white">{soil.humidity}%</p>
          </div>
        </div>

        {/* ET0 Evapotranspiration */}
        <div className="p-3.5 bg-[#090d0b]/60 border border-white/5 rounded-2xl flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <Sun size={18} />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">ET0 Loss</p>
            <p className="text-base font-black text-white">{soil.et0} mm/d</p>
          </div>
        </div>

        {/* 7-day Rainfall */}
        <div className="p-3.5 bg-[#090d0b]/60 border border-white/5 rounded-2xl flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-xl">
            <Wind size={18} />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">7d Rain Forecast</p>
            <p className="text-base font-black text-white">{soil.precipitationForecast7d} mm</p>
          </div>
        </div>
      </div>

      {/* Soil Moisture Bar */}
      <div className="p-4 bg-[#090d0b]/70 border border-white/5 rounded-2xl space-y-2">
        <div className="flex justify-between text-xs font-bold">
          <span className="text-gray-300">Surface Soil Moisture (0 - 7cm)</span>
          <span className="text-emerald-400">{soil.surfaceMoisture}% Volumetric</span>
        </div>
        <div className="w-full bg-[#121a15] rounded-full h-2.5 overflow-hidden border border-white/5">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              soil.surfaceMoisture < 35 ? 'bg-gradient-to-r from-red-500 to-amber-500' : 'bg-gradient-to-r from-emerald-500 to-cyan-400'
            }`}
            style={{ width: `${soil.surfaceMoisture}%` }}
          />
        </div>

        <div className="flex justify-between text-[11px] text-gray-400 pt-1">
          <span>Subsoil Layer (7-28cm): {soil.deepMoisture}%</span>
          {soil.precipitationForecast7d > 20 && (
            <span className="text-cyan-400 font-bold flex items-center gap-1">
              <AlertTriangle size={12} /> Rain expected - hold heavy irrigation
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
