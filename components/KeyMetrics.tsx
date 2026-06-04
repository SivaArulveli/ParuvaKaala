'use client';

import { useState } from 'react';
import { Gauge, TrendingUp, Droplets, Sun, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlanWeek } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface KeyMetricsProps {
  plan: PlanWeek[];
  language: 'en' | 'ta';
}

export default function KeyMetrics({ plan, language }: KeyMetricsProps) {
  const [activeInfo, setActiveInfo] = useState<number | null>(null);

  if (!plan.length) return null;

  // Calculate aggregate metrics
  const avgNdvi = (plan.reduce((acc, p) => acc + p.satellite.ndvi, 0) / plan.length).toFixed(2);
  const nextAuspicious = plan.find(p => p.panchangam.auspicious)?.week || 1;

  const metrics = [
    {
      id: 0,
      icon: <TrendingUp className="text-emerald-400" size={24} />,
      value: avgNdvi,
      label: language === 'en' ? 'Avg NDVI' : 'சராசரி NDVI',
      status: language === 'en' ? 'Optimal Growth' : 'சீரான வளர்ச்சி',
      description: language === 'en' 
        ? 'Normalized Difference Vegetation Index. Readings between 0.6 and 0.9 indicate healthy, dense leaf canopy and active chlorophyll absorption.' 
        : 'பயிர்களின் பசுமை குறியீடு. 0.6 முதல் 0.9 வரையிலான அளவீடுகள் பயிரின் சிறந்த வளர்ச்சியையும் இலைகளின் ஆரோக்கியத்தையும் குறிக்கிறது.',
    },
    {
      id: 1,
      icon: <Droplets className="text-blue-400" size={24} />,
      value: 'Optimal',
      label: language === 'en' ? 'Soil Moisture' : 'மண் ஈரம்',
      status: language === 'en' ? 'Low Risk' : 'குறைந்த ஆபத்து',
      description: language === 'en' 
        ? 'Derived from Sentinel-1 radar bands. Current soil layer indicates high water-retention capacity, reducing the immediate need for heavy irrigation.' 
        : 'செயற்கைக்கோள் ரேடார் மூலம் கணக்கிடப்பட்ட மண் ஈரப்பதம். இது பயிர்களுக்கு தேவையான ஈரப்பதம் போதிய அளவில் இருப்பதை உறுதி செய்கிறது.',
    },
    {
      id: 2,
      icon: <Sun className="text-amber-400" size={24} />,
      value: `Wk ${nextAuspicious}`,
      label: language === 'en' ? 'Next Auspicious' : 'அடுத்த நல்ல நாள்',
      status: language === 'en' ? 'Moon & Sun Align' : 'அனுமுகூர்த்த நாள்',
      description: language === 'en' 
        ? 'Based on Surya Siddhanta calendar calculations. Ideal combination of a growing moon (Shukla Paksha) and auspicious Nakshatra (e.g. Rohini) for maximum sap pressure.' 
        : 'சூர்ய சித்தாந்த பஞ்சாங்க முறைப்படி கணக்கிடப்பட்டது. வளர்பிறை மற்றும் உகந்த நட்சத்திரம் கூடும் நாளே அடுத்த நல்ல நாளாகும்.',
    }
  ];

  return (
    <Card className="bg-white/40 backdrop-blur-md border-black/5 shadow-2xl rounded-3xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent pointer-events-none" />
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-black text-brand-text flex items-center gap-2">
          <Gauge className="text-emerald-400" size={20} />
          {language === 'en' ? 'Telemetry Summary' : 'விவசாய குறியீடுகள்'}
        </CardTitle>
        <p className="text-xs text-brand-text0 font-medium">
          {language === 'en' ? 'Click on any metric card to read detailed explanation.' : 'விளக்கத்தைக் காண அட்டவணையை கிளிக் செய்யவும்.'}
        </p>
      </CardHeader>
      
      <CardContent className="pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {metrics.map((metric) => (
            <motion.button
              key={metric.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveInfo(activeInfo === metric.id ? null : metric.id)}
              className={`text-left p-5 rounded-2xl border transition-all duration-300 relative group flex flex-col justify-between min-h-[130px] ${
                activeInfo === metric.id
                  ? 'bg-emerald-950/20 border-emerald-500 text-white shadow-lg'
                  : 'bg-white/30 border-black/5 hover:border-black/10 hover:bg-white/50'
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <div className="p-2 bg-white/80 rounded-xl border border-black/5 group-hover:border-emerald-500/20 transition-colors">
                  {metric.icon}
                </div>
                <Info size={14} className="text-brand-text0 group-hover:text-emerald-400 transition-colors" />
              </div>
              
              <div className="mt-3">
                <p className="text-xs font-semibold text-brand-text0 uppercase tracking-wider">{metric.label}</p>
                <p className="text-2xl font-black text-brand-text mt-1">{metric.value}</p>
                <p className={`text-[10px] font-bold mt-1 ${metric.id === 2 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  ● {metric.status}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Dynamic Details Drawers */}
        <AnimatePresence mode="wait">
          {activeInfo !== null && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 bg-brand-bg/50 border border-black/5 rounded-2xl relative">
                <button
                  onClick={() => setActiveInfo(null)}
                  className="absolute top-3 right-3 text-gray-600 hover:text-white"
                >
                  <X size={14} />
                </button>
                <div className="flex gap-2 items-start">
                  <div className="mt-0.5">{metrics[activeInfo].icon}</div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-emerald-400 tracking-wider">
                      {metrics[activeInfo].label} {language === 'en' ? 'Details' : 'விளக்கம்'}
                    </h4>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed font-medium">
                      {metrics[activeInfo].description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
