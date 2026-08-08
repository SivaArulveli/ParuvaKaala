import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Key, X, Check, ShieldCheck } from 'lucide-react';
import { ensureAnonymousAuth } from '../lib/firebase';
import { Language } from '../lib/types';
import { TRANSLATIONS } from '../lib/i18n';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export default function AuthModal({ isOpen, onClose, language }: AuthModalProps) {
  const [loading, setLoading] = useState(false);
  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  const handleGuestLogin = async () => {
    setLoading(true);
    await ensureAnonymousAuth();
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#121a15] border border-emerald-500/30 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full bg-[#090d0b]"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl">
            <User size={24} />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">{t.authTitle}</h3>
            <p className="text-xs text-gray-400">Firebase Firestore Cloud Sync</p>
          </div>
        </div>

        <div className="space-y-3 text-xs text-gray-300">
          <div className="p-4 bg-[#090d0b] rounded-2xl border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <ShieldCheck size={16} /> Anonymous & Secure Setup
            </div>
            <p className="text-gray-400 leading-relaxed">
              Sign in with 1-click anonymous authentication to save your 16-week cultivation strategy securely to Firebase Firestore without requiring passwords.
            </p>
          </div>

          <button
            onClick={handleGuestLogin}
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-600 hover:to-emerald-500 text-white font-black text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Connecting Firebase...' : t.guestMode}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
