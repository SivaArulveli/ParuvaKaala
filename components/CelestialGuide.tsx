'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, ChevronDown, Circle } from 'lucide-react';
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

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg border-amber-100">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Moon className="text-amber-600" size={24} />
          {language === 'en' ? 'Surya Siddhanta Guide' : 'சூர்ய சித்தாந்தம்'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tithi Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white">
            <p className="text-sm text-gray-600 mb-1">{language === 'en' ? 'Current Tithi' : 'தற்போதைய திதி'}</p>
            <p className="text-lg font-bold text-gray-800">{currentWeek.tithi}</p>
            <div className="flex items-center gap-2 mt-2">
              <Circle className="text-amber-500 fill-amber-100" size={16} />
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                {language === 'en' ? 'Waxing Phase' : 'வளர்பிறை'}
              </span>
            </div>
          </div>
          
          {/* Nakshatra Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white">
            <p className="text-sm text-gray-600 mb-1">{language === 'en' ? 'Nakshatra' : 'நட்சத்திரம்'}</p>
            <p className="text-lg font-bold text-gray-800">{currentWeek.nakshatra}</p>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-2">
              {language === 'en' ? 'Auspicious Alignment' : 'நல்ல நாள்'}
            </p>
          </div>
          
          {/* Solar Transit */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 md:col-span-2 shadow-sm border border-white">
            <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
              <Sun size={16} className="text-amber-500" />
              {language === 'en' ? 'Solar Transit (Rasi)' : 'சூரிய சஞ்சாரம் (ராசி)'}
            </p>
            <p className="text-base text-gray-800 font-medium">
              {language === 'en' 
                ? 'The sun is currently transiting through a favorable house for agricultural yields according to the ancient Surya Siddhanta calculations.' 
                : 'பண்டைய சூர்ய சித்தாந்த கணக்கீடுகளின்படி விவசாய விளைச்சலுக்கு சாதகமான வீட்டில் சூரியன் தற்போது சஞ்சரிக்கிறார்.'}
            </p>
          </div>
        </div>
        
        {/* Expandable "Learn More" section */}
        <motion.button
          onClick={() => setExpanded(!expanded)}
          className="mt-5 text-amber-700 text-sm hover:text-amber-800 font-semibold flex items-center gap-1 transition-colors"
        >
          {expanded ? (language === 'en' ? 'Show Less' : 'குறைவாக காட்டு') : (language === 'en' ? 'Learn More About Calculations' : 'கணக்கீடுகள் பற்றி மேலும் அறிக')}
          <ChevronDown size={16} className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
        </motion.button>
        
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 text-sm text-gray-700 bg-white/40 rounded-xl p-4 border border-white/50 leading-relaxed">
                {language === 'en' 
                  ? 'ParuvaKaala leverages planetary ephemeris data to determine the exact angular distance between the Sun and Moon (Tithi) to predict optimal sap flow in crops. This data is then cross-referenced with Sentinel-1 SAR soil moisture readings to create a highly accurate, micro-climate specific agricultural timeline.'
                  : 'பருவகாலமானது சூரியன் மற்றும் சந்திரனுக்கு இடையிலான சரியான கோண தூரத்தை (திதி) தீர்மானிக்க கிரக எபிமெரிஸ் தரவைப் பயன்படுத்துகிறது. இந்த தரவு பின்னர் சென்டினல்-1 SAR மண் ஈரப்பதம் அளவீடுகளுடன் குறுக்கு-குறிப்பு செய்யப்படுகிறது.'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
