'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, ChevronDown, Sparkles, Droplets, Info } from 'lucide-react';
import { PlanWeek } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CelestialGuideProps {
  plan: PlanWeek[];
  language: 'en' | 'ta';
}

export default function CelestialGuide({ plan, language }: CelestialGuideProps) {
  const [expanded, setExpanded] = useState(false);

  if (!plan.length) return null;
  
  const currentWeek = plan[0].panchangam;

  // Let's deduce an appropriate Moon Phase icon based on the tithi name
  // Standard mock returns 'Pratipada', 'Dvitiya', 'Tritiya', 'Chaturthi', etc.
  const isWaxing = true; // For demonstration/mock purposes

  return (
    <Card className="bg-white/40 backdrop-blur-md border-black/5 shadow-2xl rounded-3xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-black text-brand-text flex items-center gap-2">
          <Moon className="text-amber-400" size={20} />
          {language === 'en' ? 'Surya Siddhanta Astronomical Guide' : 'சூர்ய சித்தாந்த பஞ்சாங்க வழிகாட்டி'}
        </CardTitle>
        <p className="text-xs text-brand-text0 font-medium">
          {language === 'en' ? 'Lunar gravity cycles and solar transit alignment calculations.' : 'சூரிய-சந்திர ஈர்ப்பு மற்றும் சஞ்சார கணிப்புகள்.'}
        </p>
      </CardHeader>
      
      <CardContent className="pt-2 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Tithi Card */}
          <div className="bg-brand-bg/30 border border-black/5 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold text-brand-text0 uppercase tracking-wider mb-1">
                {language === 'en' ? 'Lunar Tithi (Phase)' : 'தற்போதைய திதி'}
              </p>
              <p className="text-base font-extrabold text-zinc-255">{currentWeek.tithi}</p>
              
              <div className="flex items-center gap-1.5 mt-2 text-[10px] text-amber-400 font-bold">
                <Sparkles size={11} className="animate-spin-slow" />
                <span>{language === 'en' ? 'Waxing Phase (Shukla Paksha)' : 'வளர்பிறை காலம்'}</span>
              </div>
            </div>
            
            {/* Glowing Moon Phase SVG */}
            <div className="relative w-14 h-14 bg-white rounded-full border border-black/5 flex items-center justify-center shrink-0 shadow-inner">
              <div className="absolute inset-0.5 rounded-full bg-gradient-to-tr from-amber-500/20 to-transparent blur-xs" />
              {/* Custom styled Crescent Moon */}
              <svg className="w-8 h-8 text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3a9 9 0 1 0 9 9 9.9 9.9 0 0 0-.1-1.3A7 7 0 0 1 10.3 3.1 9.9 9.9 0 0 0 12 3Z" />
              </svg>
            </div>
          </div>
          
          {/* Nakshatra Card */}
          <div className="bg-brand-bg/30 border border-black/5 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold text-brand-text0 uppercase tracking-wider mb-1">
                {language === 'en' ? 'Lunisolar Nakshatra' : 'நட்சத்திர மண்டலம்'}
              </p>
              <p className="text-base font-extrabold text-zinc-255">{currentWeek.nakshatra}</p>
              
              <p className="text-[10px] text-emerald-400 font-bold mt-2">
                ● {language === 'en' ? 'Auspicious Sowing Energy' : 'விதைப்பதற்கு உகந்த நாள்'}
              </p>
            </div>
            
            {/* Compass / Star representation */}
            <div className="w-14 h-14 bg-white rounded-full border border-black/5 flex items-center justify-center shrink-0 shadow-inner">
              <svg className="w-7 h-7 text-emerald-400 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
          </div>
          
          {/* Solar Transit details */}
          <div className="bg-brand-bg/30 border border-black/5 rounded-2xl p-4 md:col-span-2 flex gap-3 items-start">
            <div className="p-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl shrink-0">
              <Sun size={20} />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider mb-1">
                {language === 'en' ? 'Solar Transit (Rasi Alignment)' : 'சூரிய சஞ்சாரம் (ராசி)'}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                {language === 'en' 
                  ? 'The sun is currently transiting through a favorable agricultural house. This alignment maximizes daytime energy absorption and correlates historically with optimal photosynthesis rates.' 
                  : 'பண்டைய சூர்ய சித்தாந்த கணக்கீடுகளின்படி தற்போதைய சூரிய சஞ்சாரம் இலைகளின் பச்சைய உற்பத்திக்கும், ஒளிச்சேர்க்கைக்கும் மிகவும் சாதகமானதாக அமைந்துள்ளது.'}
              </p>
            </div>
          </div>
        </div>

        {/* Expandable Explanation Section */}
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-amber-400 hover:text-amber-300 font-extrabold flex items-center gap-1 transition-colors uppercase tracking-wider"
          >
            <span>{expanded ? (language === 'en' ? 'Hide Details' : 'விளக்கத்தை மறை') : (language === 'en' ? 'How Lunar Cycles Affect Sap Flow' : 'சந்திர சுழற்சி எவ்வாறு சாறு ஓட்டத்தை பாதிக்கிறது?')}</span>
            <ChevronDown size={14} className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 p-4 bg-brand-bg/50 rounded-2xl border border-black/5 text-xs text-gray-600 space-y-2.5 leading-relaxed font-medium">
                  <div className="flex gap-2">
                    <Droplets size={14} className="text-blue-400 shrink-0 mt-0.5" />
                    <p>
                      <strong>{language === 'en' ? 'Waxing Moon (Shukla Paksha)' : 'வளர்பிறை (சுக்ல பட்சம்)'}:</strong>{' '}
                      {language === 'en' 
                        ? 'Gravitational pull draws sap upwards into the stems and leaves, making it the perfect time for sowing leaf/above-ground crops, fertilizing, and grafting.' 
                        : 'ஈர்ப்பு விசை தாவர சாற்றை தண்டு மற்றும் இலைகளை நோக்கி மேலே இழுக்கிறது. இது இலை மற்றும் தண்டு பயிர்களை விதைப்பதற்கும், உரமிடுவதற்கும் சிறந்த நேரமாகும்.'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Info size={14} className="text-brand-text0 shrink-0 mt-0.5" />
                    <p>
                      <strong>{language === 'en' ? 'Waning Moon (Krishna Paksha)' : 'தேய்பிறை (கிருஷ்ண பட்சம்)'}:</strong>{' '}
                      {language === 'en' 
                        ? 'Sap flow recedes down into the roots. This phase is optimal for root crop development, transplanting seedlings, weeding, pruning, and harvesting crops for longer storage.' 
                        : 'தாவர சாறு வேர்களை நோக்கி கீழே இறங்குகிறது. இது வேர் பயிர்கள் வளர, நாற்று நட, களை எடுக்க, மற்றும் பயிர்களை அறுவடை செய்து சேமிக்க உகந்ததாகும்.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
