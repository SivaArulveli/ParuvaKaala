import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, X, Calendar, MapPin, ChevronRight, Clock } from 'lucide-react';
import { fetchSavedPlans } from '../lib/firebase';
import { SavedPlanRecord, PlanWeek, Language } from '../lib/types';
import { TRANSLATIONS } from '../lib/i18n';

interface SavedPlansProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: PlanWeek[], cropId: string, locationName: string) => void;
  language: Language;
}

export default function SavedPlans({ isOpen, onClose, onSelectPlan, language }: SavedPlansProps) {
  const [plans, setPlans] = useState<SavedPlanRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const t = TRANSLATIONS[language];

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetchSavedPlans().then((data) => {
        setPlans(data);
        setLoading(false);
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#121a15] border border-emerald-500/30 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative max-h-[85vh] flex flex-col"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full bg-[#090d0b]"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 border-b border-white/10 pb-3 shrink-0">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-2xl">
            <Folder size={22} />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">{t.savedPlans}</h3>
            <p className="text-xs text-gray-400">Firebase Firestore & Local Storage Records</p>
          </div>
        </div>

        <div className="overflow-y-auto flex-1 space-y-3 custom-scrollbar pr-1">
          {loading ? (
            <div className="py-12 text-center text-gray-400 text-xs animate-pulse">
              Fetching saved farm strategies from Firebase...
            </div>
          ) : plans.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-xs">
              No saved cultivation plans found. Generate a plan and click "Save Plan to Firebase" to store it.
            </div>
          ) : (
            plans.map((record) => (
              <div
                key={record.id}
                onClick={() => {
                  onSelectPlan(record.plan, record.cropId, record.locationName);
                  onClose();
                }}
                className="p-4 rounded-2xl bg-[#090d0b] hover:bg-[#090d0b]/80 border border-white/5 hover:border-emerald-500/30 transition-all cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div>
                  <h4 className="font-extrabold text-white text-sm capitalize">
                    {record.cropId} Cultivation Plan
                  </h4>
                  <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin size={11} className="text-emerald-400" />
                      {record.locationName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {new Date(record.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-[#121a15] text-gray-400 group-hover:text-emerald-400 transition-colors">
                  <ChevronRight size={16} />
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
