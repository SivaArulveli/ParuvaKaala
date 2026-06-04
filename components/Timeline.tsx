'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Droplets, Eye, Sprout, Sparkles, CheckCircle2, Moon, Activity } from 'lucide-react';
import { PlanWeek } from '@/lib/types';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TimelineProps {
  plan: PlanWeek[];
  language: 'en' | 'ta';
}

export default function Timeline({ plan, language }: TimelineProps) {
  const [showAll, setShowAll] = useState(false);

  const getIcon = (weekNum: number) => {
    if (weekNum === 1) return <Sprout size={16} className="text-emerald-400" />;
    if (weekNum % 3 === 0) return <Droplets size={16} className="text-blue-400" />;
    if (weekNum % 4 === 0) return <Eye size={16} className="text-purple-400" />;
    return <Calendar size={16} className="text-gray-600" />;
  };

  return (
    <Card className="bg-white/40 backdrop-blur-md border-black/5 shadow-2xl rounded-3xl lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] flex flex-col">
      <CardHeader className="pb-4 shrink-0 border-b border-black/5">
        <CardTitle className="font-black text-brand-text text-lg flex items-center gap-2">
          <Calendar className="text-emerald-400" size={20} />
          {language === 'en' ? 'Sowing & Action Timeline' : 'விவசாய காலவரிசை'}
        </CardTitle>
        <p className="text-xs text-brand-text0 font-medium">
          {language === 'en' ? 'Calculated agricultural weeks (1 - 16)' : 'கணக்கிடப்பட்ட விவசாய வாரங்கள் (1 - 16)'}
        </p>
      </CardHeader>
      
      <CardContent className="pt-4 overflow-y-auto flex-1 custom-scrollbar space-y-3">
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-3">
          <AnimatePresence>
            {plan.slice(0, showAll ? 16 : 4).map((week, i) => (
              <motion.div 
                variants={fadeInUp} 
                key={week.week}
                layout
                className={`p-4 rounded-2xl bg-white/50 hover:bg-white/80 transition-all cursor-pointer border-l-4 ${
                  week.panchangam.auspicious 
                    ? 'border-emerald-500 shadow-[inset_4px_0_12px_rgba(16,185,129,0.08)]' 
                    : 'border-gray-200'
                } border-t border-r border-b border-black/5 shadow-md`}
              >
                {/* Header row: Week indicator + Date */}
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    week.panchangam.auspicious 
                      ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-gray-50 text-gray-600 border border-black/5'
                  }`}>
                    {language === 'en' ? `Week ${week.week}` : `வாரம் ${week.week}`}
                  </span>
                  
                  <span className="flex items-center gap-1 text-[11px] text-brand-text0 font-bold">
                    {week.gregorianDate}
                  </span>
                </div>
                
                {/* Center: Nakshatra info */}
                <div className="mb-3 flex items-center justify-between gap-2 bg-brand-bg/30 p-2 rounded-xl border border-black/5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-white border border-black/10 flex items-center justify-center shrink-0">
                      {getIcon(week.week)}
                    </div>
                    <div>
                      <p className="text-xs font-black text-gray-800">{week.panchangam.nakshatra}</p>
                      <p className="text-[10px] text-brand-text0">{week.panchangam.tithi}</p>
                    </div>
                  </div>
                  
                  {week.panchangam.auspicious && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/20 border border-emerald-500/20 px-1.5 py-0.5 rounded-md">
                      <Sparkles size={10} className="animate-spin-slow" />
                      {language === 'en' ? 'Auspicious' : 'உகந்தது'}
                    </span>
                  )}
                </div>
                
                {/* Task Content */}
                <p className="text-sm font-extrabold text-gray-900 leading-snug">
                  {language === 'en' ? week.task : week.tamilTask}
                </p>
                
                {/* Quick soil stats */}
                <div className="mt-2.5 pt-2 border-t border-black/5 flex items-center gap-3 text-[10px] text-brand-text0 font-semibold">
                  <span className="flex items-center gap-1">
                    <Activity size={10} className="text-emerald-500" />
                    NDVI: {week.satellite.ndvi.toFixed(2)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Droplets size={10} className="text-blue-400" />
                    {language === 'en' ? `Soil: ${week.satellite.soilMoisture}` : `மண்: ${week.satellite.soilMoisture === 'Low' ? 'குறைவு' : 'நன்று'}`}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </CardContent>

      <div className="p-4 shrink-0 border-t border-black/5">
        <button 
          onClick={() => setShowAll(!showAll)}
          className="w-full text-center text-emerald-400 text-xs py-2.5 bg-brand-bg/40 hover:bg-emerald-950/20 border border-emerald-500/10 hover:border-emerald-500/30 rounded-xl transition-all font-black uppercase tracking-wider"
        >
          {showAll ? (language === 'en' ? 'Show Less' : 'குறைவாக காட்டு') : (language === 'en' ? 'View All 16 Weeks' : 'அனைத்து 16 வாரங்களையும் காண்க')}
        </button>
      </div>
    </Card>
  );
}
