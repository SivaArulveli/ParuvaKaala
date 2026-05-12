'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Droplets, Eye, Sprout, CheckCircle2, AlertCircle } from 'lucide-react';
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
    if (weekNum === 1) return <Sprout size={18} />;
    if (weekNum % 3 === 0) return <Droplets size={18} />;
    if (weekNum % 4 === 0) return <Eye size={18} />;
    return <Calendar size={18} />;
  };

  return (
    <Card className="bg-gradient-to-br from-emerald-50 to-lime-50 shadow-inner border-emerald-100 lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] overflow-y-auto">
      <CardHeader className="pb-4">
        <CardTitle className="font-bold text-gray-800 text-lg flex items-center gap-2">
          <Calendar className="text-emerald-600" size={20} />
          {language === 'en' ? 'Execution Timeline' : 'செயல்பாட்டு காலவரிசை'}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          <AnimatePresence>
            {plan.slice(0, showAll ? 16 : 4).map((week, i) => (
              <motion.div 
                variants={fadeInUp} 
                key={week.week}
                layout
                className={`mb-3 p-3 rounded-xl bg-white/60 backdrop-blur-sm hover:bg-white/90 transition-all cursor-pointer border-l-4 ${week.panchangam.auspicious ? 'border-emerald-500' : 'border-gray-300'} shadow-sm`}
              >
                {/* Top row: Date range + Status badge */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded uppercase tracking-wider">
                    Week {week.week}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                    {week.panchangam.auspicious ? <CheckCircle2 size={14} className="text-emerald-500" /> : <AlertCircle size={14} className="text-gray-400" />}
                    {week.gregorianDate}
                  </span>
                </div>
                
                {/* Middle: Nakshatra */}
                <div className="mb-2 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    {getIcon(week.week)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{week.panchangam.nakshatra}</p>
                    <p className="text-xs text-gray-500">{week.panchangam.tithi}</p>
                  </div>
                </div>
                
                {/* Bottom: Action */}
                <p className="text-sm font-bold text-gray-900 leading-snug">
                  {language === 'en' ? week.task : week.tamilTask}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        <button 
          onClick={() => setShowAll(!showAll)}
          className="w-full text-center text-emerald-600 text-sm mt-4 py-2 hover:bg-emerald-100 rounded-lg transition-colors font-medium"
        >
          {showAll ? (language === 'en' ? 'Show Less' : 'குறைவாக காட்டு') : (language === 'en' ? 'View All 16 Weeks →' : 'அனைத்து 16 வாரங்களையும் காண்க →')}
        </button>
      </CardContent>
    </Card>
  );
}
