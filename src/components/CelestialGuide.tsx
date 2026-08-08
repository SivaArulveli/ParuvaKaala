import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, ChevronDown, Sparkles, Droplets, Info } from 'lucide-react';
import { PlanWeek, Language } from '../lib/types';
import { TRANSLATIONS } from '../lib/i18n';

interface CelestialGuideProps {
  plan: PlanWeek[];
  language: Language;
}

export default function CelestialGuide({ plan, language }: CelestialGuideProps) {
  const [expanded, setExpanded] = useState(false);
  const t = TRANSLATIONS[language];

  if (!plan.length) return null;
  const panchangam = plan[0].panchangam;

  return (
    <div className="p-6 rounded-3xl bg-[#121a15]/80 backdrop-blur-xl border border-amber-500/20 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Moon className="text-amber-400" size={20} />
          {t.celestialTitle}
        </h3>
        <span className="px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1.5">
          <Sparkles size={12} className="animate-spin-slow" />
          {panchangam.sapFlowState}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tithi & Moon Phase Card */}
        <div className="bg-[#090d0b]/60 border border-white/5 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              {language === 'en' ? 'Lunar Tithi (Phase)' : 'தற்போதைய திதி'}
            </p>
            <p className="text-base font-extrabold text-white">{panchangam.tithi}</p>

            <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-400 font-bold">
              <span>{panchangam.paksha === 'Shukla' ? t.waxingPhase : t.waningPhase}</span>
              <span className="text-gray-500">•</span>
              <span>{panchangam.moonPhasePercent}%</span>
            </div>
          </div>

          {/* Dynamic SVG Moon Visualizer */}
          <div className="relative w-14 h-14 bg-gradient-to-br from-amber-950 to-zinc-900 rounded-full border border-amber-500/40 flex items-center justify-center shrink-0 shadow-lg">
            <svg className="w-9 h-9 text-amber-300 drop-shadow-[0_0_10px_rgba(245,158,11,0.6)]" viewBox="0 0 24 24" fill="currentColor">
              {panchangam.moonPhasePercent > 80 ? (
                <circle cx="12" cy="12" r="9" />
              ) : panchangam.moonPhasePercent > 30 ? (
                <path d="M12 3a9 9 0 1 0 9 9 9.9 9.9 0 0 0-.1-1.3A7 7 0 0 1 10.3 3.1 9.9 9.9 0 0 0 12 3Z" />
              ) : (
                <path d="M12 3a9 9 0 0 0-9 9 9 9 0 0 0 9 9 7 7 0 0 1-7-7 7 7 0 0 1 7-7Z" />
              )}
            </svg>
          </div>
        </div>

        {/* Nakshatra Card */}
        <div className="bg-[#090d0b]/60 border border-white/5 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              {language === 'en' ? 'Lunisolar Nakshatra' : 'நட்சத்திர மண்டலம்'}
            </p>
            <p className="text-base font-extrabold text-white">{panchangam.nakshatra}</p>

            <p className={`text-xs font-bold mt-2 ${panchangam.isAuspiciousForSowing ? 'text-emerald-400' : 'text-gray-400'}`}>
              ● {panchangam.isAuspiciousForSowing 
                  ? (language === 'en' ? 'Auspicious Sowing Energy' : 'விதைப்பதற்கு உகந்த நாள்') 
                  : (language === 'en' ? 'Land Preparation Phase' : 'நிலம் தயாரிக்கும் காலம்')}
            </p>
          </div>

          <div className="w-14 h-14 bg-gradient-to-br from-emerald-950 to-zinc-900 rounded-full border border-emerald-500/40 flex items-center justify-center shrink-0 shadow-lg">
            <svg className="w-7 h-7 text-emerald-400 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
        </div>

        {/* Solar Transit & Tamil Month */}
        <div className="bg-[#090d0b]/60 border border-white/5 rounded-2xl p-4 md:col-span-2 flex gap-3 items-start">
          <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl shrink-0">
            <Sun size={20} />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider mb-1">
              {language === 'en' ? 'Solar Transit & Tamil Month' : 'சூரிய சஞ்சாரம் மற்றும் தமிழ் மாதம்'}
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed font-medium">
              {language === 'en'
                ? `Sun transiting ${panchangam.sunSign} (${panchangam.tamilMonth}). Solar intensity and daytime solar angles maximize photosynthesis and crop vegetative growth.`
                : `சூரியன் ${panchangam.sunSign} ராசியில் (${panchangam.tamilMonth}) சஞ்சரிக்கிறது. இந்த சஞ்சாரம் இலை பச்சைய உற்பத்திக்கும், ஒளிச்சேர்க்கைக்கும் ஏற்றது.`}
            </p>
          </div>
        </div>
      </div>

      {/* Sap Flow Explanation Toggle */}
      <div className="mt-4 pt-3 border-t border-white/5">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-amber-400 hover:text-amber-300 font-extrabold flex items-center gap-1 transition-colors uppercase tracking-wider"
        >
          <span>
            {expanded
              ? (language === 'en' ? 'Hide Details' : 'விளக்கத்தை மறை')
              : (language === 'en' ? 'How Lunar Gravity Controls Plant Sap Flow' : 'சந்திர ஈர்ப்பு விசை தாவர சாற்றை எவ்வாறு பாதிக்கிறது?')}
          </span>
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
              <div className="mt-3 p-4 bg-[#090d0b]/80 rounded-2xl border border-white/5 text-xs text-gray-300 space-y-2.5 leading-relaxed font-medium">
                <div className="flex gap-2">
                  <Droplets size={14} className="text-blue-400 shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-amber-300">{t.waxingPhase}:</strong>{' '}
                    {language === 'en'
                      ? 'Gravitational pull draws sap upwards into stems and leaves. Ideal for sowing leafy crops, applying nitrogen fertilizers, and grafting.'
                      : 'ஈர்ப்பு விசை தாவர சாற்றை மேலே இழுக்கிறது. விதைப்பதற்கும், தழைச்சத்து உரம் இடுவதற்கும் உகந்த காலம்.'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Info size={14} className="text-gray-400 shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-emerald-400">{t.waningPhase}:</strong>{' '}
                    {language === 'en'
                      ? 'Sap flows down into the root system. Ideal for root crops (Groundnut, Tapioca), transplanting seedlings, pruning, and harvesting for long shelf-life.'
                      : 'சாறு வேர்களை நோக்கி கீழே இறங்குகிறது. கிழங்கு பயிர்கள் வளர, நாற்று நட மற்றும் தானியங்களை அறுவடை செய்து சேமிக்க உகந்தது.'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
