import { useState } from 'react';
import { Gauge, TrendingUp, Droplets, Sun, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlanWeek, Language } from '../lib/types';
import { TRANSLATIONS } from '../lib/i18n';

interface KeyMetricsProps {
  plan: PlanWeek[];
  language: Language;
}

export default function KeyMetrics({ plan, language }: KeyMetricsProps) {
  const [activeInfo, setActiveInfo] = useState<number | null>(null);
  const t = TRANSLATIONS[language];

  if (!plan.length) return null;

  const avgNdvi = (plan.reduce((acc, p) => acc + p.satellite.ndvi, 0) / plan.length).toFixed(2);
  const nextAuspiciousWeek = plan.find(p => p.panchangam.isAuspiciousForSowing)?.week || 1;
  const currentSoilMoisture = plan[0].soil.surfaceMoisture;

  const metrics = [
    {
      id: 0,
      icon: <TrendingUp className="text-emerald-400" size={24} />,
      value: avgNdvi,
      label: t.avgNdvi,
      status: language === 'en' ? 'Optimal Growth' : 'சீரான வளர்ச்சி',
      description: language === 'en'
        ? 'Normalized Difference Vegetation Index. Readings between 0.60 and 0.85 indicate healthy chlorophyll content and dense canopy cover.'
        : 'பயிர்களின் பசுமை குறியீடு. 0.60 முதல் 0.85 வரையிலான அளவீடுகள் பயிரின் சிறந்த வளர்ச்சியையும் ஆரோக்கியத்தையும் குறிக்கிறது.'
    },
    {
      id: 1,
      icon: <Droplets className="text-blue-400" size={24} />,
      value: `${currentSoilMoisture}%`,
      label: t.soilMoisture,
      status: plan[0].soil.status,
      description: language === 'en'
        ? 'Volumetric soil water content derived from Open-Meteo & SAR radar feeds. 0-7cm layer moisture status for root hydration.'
        : 'நேரலை ஓபன்-மீட்டியோ ரேடார் மூலம் கணக்கிடப்பட்ட மண் ஈரப்பதம். பயிர்களின் வேர் பகுதிக்கு தேவையான ஈரப்பதம்.'
    },
    {
      id: 2,
      icon: <Sun className="text-amber-400" size={24} />,
      value: `Week ${nextAuspiciousWeek}`,
      label: t.nextAuspicious,
      status: language === 'en' ? 'Moon & Sun Align' : 'அனுமுகூர்த்த நாள்',
      description: language === 'en'
        ? 'Surya Siddhanta calendar calculation. Ideal combination of a rising moon (Shukla Paksha) and favorable Nakshatra.'
        : 'சூர்ய சித்தாந்த பஞ்சாங்க முறைப்படி கணக்கிடப்பட்ட உகந்த நாள். வளர்பிறை மற்றும் சிறந்த நட்சத்திரம் கூடும் காலம்.'
    }
  ];

  return (
    <div className="p-6 rounded-3xl bg-[#121a15]/80 backdrop-blur-xl border border-emerald-500/20 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Gauge className="text-emerald-400" size={20} />
          {t.metricsTitle}
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <motion.button
            key={metric.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveInfo(activeInfo === metric.id ? null : metric.id)}
            className={`text-left p-5 rounded-2xl border transition-all duration-300 relative group flex flex-col justify-between min-h-[130px] ${
              activeInfo === metric.id
                ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg'
                : 'bg-[#090d0b]/60 border-white/5 hover:border-white/20'
            }`}
          >
            <div className="flex justify-between items-center w-full">
              <div className="p-2 bg-[#121a15] rounded-xl border border-white/10 group-hover:border-emerald-500/30">
                {metric.icon}
              </div>
              <Info size={14} className="text-gray-400 group-hover:text-emerald-400 transition-colors" />
            </div>

            <div className="mt-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{metric.label}</p>
              <p className="text-2xl font-black text-white mt-1">{metric.value}</p>
              <p className={`text-[10px] font-bold mt-1 ${metric.id === 2 ? 'text-amber-400' : 'text-emerald-400'}`}>
                ● {metric.status}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Info Drawer */}
      <AnimatePresence mode="wait">
        {activeInfo !== null && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-[#090d0b]/90 border border-emerald-500/20 rounded-2xl relative">
              <button
                onClick={() => setActiveInfo(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
              >
                <X size={14} />
              </button>
              <div className="flex gap-2 items-start">
                <div className="mt-0.5">{metrics[activeInfo].icon}</div>
                <div>
                  <h4 className="text-xs font-black uppercase text-emerald-400 tracking-wider">
                    {metrics[activeInfo].label}
                  </h4>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed font-medium">
                    {metrics[activeInfo].description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
