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
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 p-4 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Progress indicator */}
        <div className="flex-1 hidden md:block">
          <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Calendar size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span>{language === 'en' ? 'Week 1 of 16' : '16-ல் 1-வது வாரம்'}</span>
                <span className="text-emerald-600">6%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div 
                  className="bg-gradient-to-r from-emerald-400 to-lime-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '6%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-3 w-full md:w-auto">
          <Button
            className="flex-1 md:flex-none px-6 py-3 bg-gradient-to-r from-emerald-500 to-lime-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2 hover:from-emerald-600 hover:to-lime-600"
            asChild={false}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2"
            >
              <Download size={20} />
              <span className="hidden sm:inline">{language === 'en' ? 'Export Plan' : 'பதிவிறக்கு'}</span>
            </motion.div>
          </Button>
          
          <Button
            variant="outline"
            className="flex-1 md:flex-none px-6 py-3 border-2 border-emerald-500 text-emerald-600 rounded-xl font-bold hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2"
            asChild={false}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2"
            >
              <CalendarPlus size={20} />
              <span className="hidden sm:inline">{language === 'en' ? 'Sync Calendar' : 'நாட்காட்டி'}</span>
            </motion.div>
          </Button>
        </div>
      </div>
    </motion.footer>
  );
}
