import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download, BookmarkCheck, Check } from 'lucide-react';
import { PlanWeek, Language } from '../lib/types';
import { saveCultivationPlan } from '../lib/firebase';
import { TRANSLATIONS } from '../lib/i18n';

interface FixedFooterProps {
  plan: PlanWeek[];
  cropId: string;
  locationName: string;
  lat: number;
  lon: number;
  language: Language;
}

export default function FixedFooter({ plan, cropId, locationName, lat, lon, language }: FixedFooterProps) {
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const t = TRANSLATIONS[language];

  if (!plan.length) return null;

  const handleExportCSV = () => {
    const headers = 'Week,Tamil Month,Gregorian Date,Tithi,Nakshatra,Auspicious,Task\n';
    const rows = plan.map(p => 
      `${p.week},"${p.tamilMonth}","${p.gregorianDate}","${p.panchangam.tithi}","${p.panchangam.nakshatra}",${p.panchangam.isAuspiciousForSowing},"${language === 'en' ? p.task : p.tamilTask}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ParuvaKaala_${cropId}_Schedule.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveToFirebase = async () => {
    setSaving(true);
    await saveCultivationPlan(cropId, locationName, lat, lon, plan);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#090d0b]/90 backdrop-blur-xl border-t border-emerald-500/20 p-4 z-40 shadow-[0_-15px_40px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Progress indicator */}
        <div className="flex-1 hidden md:block">
          <div className="flex items-center gap-4 text-sm font-bold text-gray-200">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Calendar size={18} />
            </div>

            <div className="flex-1">
              <div className="flex justify-between mb-1.5 text-xs text-gray-300">
                <span>{language === 'en' ? 'Sowing & Cultivation Strategy (16 Weeks)' : '16 வார சாகுபடி திட்டமிடல்'}</span>
                <span className="text-emerald-400 font-black">100% Ready</span>
              </div>
              <div className="w-full bg-[#121a15] border border-white/5 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-lime-400 h-full rounded-full w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 w-full md:w-auto shrink-0">
          <button
            onClick={handleExportCSV}
            className="flex-1 md:flex-none px-5 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-600 hover:to-emerald-500 text-white rounded-xl font-black text-xs shadow-lg shadow-emerald-950/30 transition-all flex items-center justify-center gap-2"
          >
            <Download size={15} />
            <span>{t.exportSchedule}</span>
          </button>

          <button
            onClick={handleSaveToFirebase}
            disabled={saving}
            className="flex-1 md:flex-none px-5 py-3.5 border border-emerald-500/30 bg-[#121a15] hover:bg-emerald-950/50 text-emerald-300 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2"
          >
            {saved ? (
              <>
                <Check size={15} className="text-emerald-400" />
                <span>Saved to Cloud!</span>
              </>
            ) : (
              <>
                <BookmarkCheck size={15} className="text-emerald-400" />
                <span>{saving ? 'Saving...' : t.savePlan}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </footer>
  );
}
