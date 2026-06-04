'use client';

import { motion } from 'framer-motion';
import { Calendar, Download, CalendarPlus } from 'lucide-react';
import { PlanWeek } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface FixedFooterProps {
  plan: PlanWeek[];
  language: 'en' | 'ta';
}

export default function FixedFooter({ plan, language }: FixedFooterProps) {
  if (!plan.length) return null;

  return (
    <motion.footer
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20 }}
      className="fixed bottom-0 left-0 right-0 bg-brand-bg/80 backdrop-blur-xl border-t border-black/10 p-4 z-50 shadow-[0_-15px_40px_rgba(0,0,0,0.6)]"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        {/* Progress indicator */}
        <div className="flex-1 hidden md:block">
          <div className="flex items-center gap-4 text-sm font-bold text-gray-800">
            <div className="w-10 h-10 rounded-xl bg-white border border-black/5 flex items-center justify-center text-emerald-400 shrink-0">
              <Calendar size={18} />
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between mb-1.5 text-xs text-gray-600">
                <span>{language === 'en' ? 'Active: Week 1 of 16 (Sowing Phase)' : 'நடப்பு: 16-ல் 1-வது வாரம் (விதைப்பு கட்டம்)'}</span>
                <span className="text-emerald-400 font-extrabold">6%</span>
              </div>
              <div className="w-full bg-white border border-black/5 rounded-full h-2 overflow-hidden">
                <motion.div 
                  className="bg-gradient-to-r from-emerald-500 to-lime-400 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '6%' }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-4 w-full md:w-auto shrink-0">
          <Button
            className="flex-1 md:flex-none px-6 py-5 bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-650 hover:to-emerald-550 text-white rounded-xl font-black shadow-lg shadow-emerald-950/30 transition-all flex items-center justify-center gap-2 border-0"
            asChild={false}
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2"
            >
              <Download size={16} />
              <span>{language === 'en' ? 'Export Schedule' : 'அட்டவணையை ஏற்று'}</span>
            </motion.div>
          </Button>
          
          <Button
            variant="outline"
            className="flex-1 md:flex-none px-6 py-5 border border-black/10 bg-white hover:bg-gray-50 text-gray-900 hover:text-white rounded-xl font-black transition-all flex items-center justify-center gap-2"
            asChild={false}
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2"
            >
              <CalendarPlus size={16} className="text-emerald-400" />
              <span>{language === 'en' ? 'Sync Calendar' : 'நாட்காட்டி இணைப்பு'}</span>
            </motion.div>
          </Button>
        </div>
      </div>
    </motion.footer>
  );
}
