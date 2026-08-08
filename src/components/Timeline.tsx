import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Droplets, Sprout, Sparkles, Activity, CheckCircle2, ChevronRight, X, Info } from 'lucide-react';
import { PlanWeek, Language } from '../lib/types';
import { TRANSLATIONS } from '../lib/i18n';

interface TimelineProps {
  plan: PlanWeek[];
  language: Language;
}

export default function Timeline({ plan, language }: TimelineProps) {
  const [showAll, setShowAll] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState<PlanWeek | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const t = TRANSLATIONS[language];

  if (!plan.length) return null;

  const categories = [
    { id: 'all', label: language === 'en' ? 'All Weeks' : 'அனைத்தும்' },
    { id: 'sowing', label: language === 'en' ? 'Sowing' : 'விதைத்தல்' },
    { id: 'irrigation', label: language === 'en' ? 'Irrigation' : 'நீர்ப்பாசனம்' },
    { id: 'fertilizer', label: language === 'en' ? 'Fertilizer' : 'உரமிடுதல்' },
    { id: 'harvest', label: language === 'en' ? 'Harvest' : 'அறுவடை' }
  ];

  const filteredPlan = plan.filter(p => categoryFilter === 'all' || p.taskCategory === categoryFilter);
  const displayedPlan = showAll ? filteredPlan : filteredPlan.slice(0, 5);

  const getCategoryColor = (cat: PlanWeek['taskCategory']) => {
    switch (cat) {
      case 'sowing': return 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40';
      case 'irrigation': return 'text-blue-400 border-blue-500/30 bg-blue-950/40';
      case 'fertilizer': return 'text-amber-400 border-amber-500/30 bg-amber-950/40';
      case 'weeding': return 'text-purple-400 border-purple-500/30 bg-purple-950/40';
      case 'harvest': return 'text-lime-400 border-lime-500/30 bg-lime-950/40';
      default: return 'text-gray-400 border-white/10 bg-gray-900';
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-[#121a15]/80 backdrop-blur-xl border border-emerald-500/20 shadow-2xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <Calendar className="text-emerald-400" size={20} />
            {t.timelineTitle}
          </h3>
          <p className="text-xs text-gray-400 font-medium">
            {language === 'en' ? '16-week hyper-localized cultivation schedule' : '16 வார சாகுபடி காலவரிசை'}
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
                categoryFilter === cat.id
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-[#090d0b] text-gray-400 border border-white/5 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {displayedPlan.map((week) => {
          const isAuspicious = week.panchangam.isAuspiciousForSowing;

          return (
            <motion.div
              key={week.week}
              onClick={() => setSelectedWeek(week)}
              whileHover={{ scale: 1.01 }}
              className={`p-4 rounded-2xl bg-[#090d0b]/70 hover:bg-[#090d0b] transition-all cursor-pointer border-l-4 ${
                isAuspicious
                  ? 'border-l-emerald-500 shadow-[inset_4px_0_15px_rgba(16,185,129,0.1)]'
                  : 'border-l-gray-600'
              } border-t border-r border-b border-white/5 shadow-md`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${getCategoryColor(week.taskCategory)}`}>
                  {language === 'en' ? `Week ${week.week}` : `வாரம் ${week.week}`} • {week.taskCategory}
                </span>

                <span className="text-[11px] text-gray-400 font-bold">
                  {week.gregorianDate} ({week.tamilMonth})
                </span>
              </div>

              <div className="mb-2 flex items-center justify-between gap-2 bg-[#121a15] p-2 rounded-xl border border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <Sprout size={15} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-200">{week.panchangam.nakshatra}</p>
                    <p className="text-[10px] text-gray-400">{week.panchangam.tithi}</p>
                  </div>
                </div>

                {isAuspicious && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                    <Sparkles size={10} className="animate-spin-slow" />
                    {language === 'en' ? 'Auspicious' : 'உகந்தது'}
                  </span>
                )}
              </div>

              <p className="text-sm font-extrabold text-white leading-snug">
                {language === 'en' ? week.task : week.tamilTask}
              </p>

              <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-400 font-semibold">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Activity size={10} className="text-emerald-400" />
                    NDVI: {week.satellite.ndvi}
                  </span>
                  <span className="flex items-center gap-1">
                    <Droplets size={10} className="text-blue-400" />
                    Soil: {week.soil.surfaceMoisture}%
                  </span>
                </div>
                <span className="text-emerald-400 flex items-center gap-0.5">
                  Details <ChevronRight size={12} />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <button
        onClick={() => setShowAll(!showAll)}
        className="w-full text-center text-emerald-400 text-xs py-3 bg-[#090d0b]/80 hover:bg-emerald-950/40 border border-emerald-500/20 hover:border-emerald-500/40 rounded-xl transition-all font-black uppercase tracking-wider shadow-lg"
      >
        {showAll
          ? (language === 'en' ? 'Show Top 5 Weeks' : 'சுருக்குக')
          : (language === 'en' ? `View All ${filteredPlan.length} Weeks` : `அனைத்து ${filteredPlan.length} வாரங்களையும் காண்க`)}
      </button>

      {/* Week Detail Modal Drawer */}
      <AnimatePresence>
        {selectedWeek && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#121a15] border border-emerald-500/30 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedWeek(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full bg-[#090d0b]"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                  <Calendar size={20} />
                </div>
                <div>
                  <h4 className="text-base font-black text-white">
                    Week {selectedWeek.week} Details ({selectedWeek.gregorianDate})
                  </h4>
                  <p className="text-xs text-emerald-400 font-bold">{selectedWeek.tamilMonth}</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-gray-300">
                <div className="p-3 bg-[#090d0b] rounded-2xl border border-white/5 space-y-1">
                  <p className="font-extrabold text-white text-sm">
                    {language === 'en' ? selectedWeek.task : selectedWeek.tamilTask}
                  </p>
                </div>

                <div className="p-3 bg-[#090d0b] rounded-2xl border border-amber-500/20 space-y-1">
                  <p className="font-bold text-amber-400 flex items-center gap-1">
                    <Sparkles size={13} /> Panchangam & Celestial Guidance:
                  </p>
                  <p className="leading-relaxed">
                    {language === 'en' ? selectedWeek.auspiciousReason : selectedWeek.tamilAuspiciousReason}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 bg-[#090d0b] rounded-xl border border-white/5">
                    <span className="text-gray-400 uppercase font-bold block">Tithi</span>
                    <span className="text-white font-bold">{selectedWeek.panchangam.tithi}</span>
                  </div>
                  <div className="p-2.5 bg-[#090d0b] rounded-xl border border-white/5">
                    <span className="text-gray-400 uppercase font-bold block">Nakshatra</span>
                    <span className="text-white font-bold">{selectedWeek.panchangam.nakshatra}</span>
                  </div>
                  <div className="p-2.5 bg-[#090d0b] rounded-xl border border-white/5">
                    <span className="text-gray-400 uppercase font-bold block">Sap Flow</span>
                    <span className="text-emerald-400 font-bold">{selectedWeek.panchangam.sapFlowState}</span>
                  </div>
                  <div className="p-2.5 bg-[#090d0b] rounded-xl border border-white/5">
                    <span className="text-gray-400 uppercase font-bold block">Soil Moisture</span>
                    <span className="text-blue-400 font-bold">{selectedWeek.soil.surfaceMoisture}%</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedWeek(null)}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl transition-all"
              >
                Close Details
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
