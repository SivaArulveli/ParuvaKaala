import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, Sprout, Satellite, Compass, HelpCircle, ArrowRight, RefreshCw, Moon, Sparkles, MapPin, User, Folder, BookmarkCheck } from 'lucide-react';
import MapPicker from './components/MapPicker';
import Timeline from './components/Timeline';
import KeyMetrics from './components/KeyMetrics';
import NDVIChart from './components/NDVIChart';
import WeatherWidget from './components/WeatherWidget';
import CelestialGuide from './components/CelestialGuide';
import FixedFooter from './components/FixedFooter';
import AuthModal from './components/AuthModal';
import SavedPlans from './components/SavedPlans';

import { CROPS, PRESET_LOCATIONS } from './lib/crops';
import { LocationInfo, PlanWeek, Language } from './lib/types';
import { generateCropPlan } from './lib/agent';
import { TRANSLATIONS } from './lib/i18n';
import { ensureAnonymousAuth } from './lib/firebase';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [selectedCrop, setSelectedCrop] = useState<string>('paddy');
  const [selectedLocation, setSelectedLocation] = useState<LocationInfo>(PRESET_LOCATIONS[0]);
  const [plan, setPlan] = useState<PlanWeek[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);

  // Modals
  const [authOpen, setAuthOpen] = useState(false);
  const [savedPlansOpen, setSavedPlansOpen] = useState(false);

  const t = TRANSLATIONS[language];

  // Auto initialize guest authentication
  useEffect(() => {
    ensureAnonymousAuth();
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    setIsGenerated(true);

    try {
      const generatedPlan = await generateCropPlan(selectedCrop, selectedLocation.lat, selectedLocation.lon);
      setPlan(generatedPlan);
    } catch (err) {
      console.error('Plan generation failed:', err);
    } finally {
      setLoading(false);
      setTimeout(() => {
        const el = document.getElementById('dashboard-start');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  };

  const handleSelectSavedPlan = (savedPlan: PlanWeek[], cropId: string, locationName: string) => {
    setPlan(savedPlan);
    setSelectedCrop(cropId);
    setIsGenerated(true);
    setTimeout(() => {
      const el = document.getElementById('dashboard-start');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  const selectedCropDetails = CROPS.find(c => c.id === selectedCrop);

  return (
    <div className="min-h-screen bg-[#090d0b] text-gray-100 pb-32 overflow-x-hidden selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Background Decorative Radial Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-950/20 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-amber-950/15 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#090d0b]/80 backdrop-blur-md border-b border-white/5 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-lime-300">
              ParuvaKaala
            </span>
            <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-950 border border-emerald-500/30 text-emerald-400 font-bold hidden sm:inline-block">
              பருவகாலம்
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Saved Plans Button */}
            <button
              onClick={() => setSavedPlansOpen(true)}
              className="px-3.5 py-1.5 bg-[#121a15] hover:bg-emerald-950/60 border border-white/10 hover:border-emerald-500/30 rounded-full text-xs font-bold text-gray-300 hover:text-white transition-all flex items-center gap-1.5"
            >
              <Folder size={14} className="text-emerald-400" />
              <span className="hidden sm:inline">{t.savedPlans}</span>
            </button>

            {/* Account Button */}
            <button
              onClick={() => setAuthOpen(true)}
              className="p-2 bg-[#121a15] hover:bg-emerald-950/60 border border-white/10 rounded-full text-emerald-400 transition-all"
              title="Firebase Account"
            >
              <User size={16} />
            </button>

            {/* Bilingual Toggle */}
            <button
              onClick={() => setLanguage(l => l === 'en' ? 'ta' : 'en')}
              className="px-3.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-full text-xs font-bold text-emerald-300 transition-all flex items-center gap-1.5"
            >
              <Languages size={14} />
              {language === 'en' ? 'தமிழ்' : 'English'}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Header Banner */}
      <div className="w-full h-56 md:h-80 relative border-b border-white/5 pt-16">
        <img
          src="/farm_banner.png"
          alt="ParuvaKaala Banner"
          className="w-full h-full object-cover opacity-30 filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d0b] via-[#090d0b]/40 to-transparent" />
      </div>

      {/* Hero Content */}
      <section className="px-4 pt-4 pb-8 max-w-5xl mx-auto flex flex-col items-center text-center space-y-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1 shadow-lg"
        >
          <Sparkles size={13} className="animate-pulse" />
          {t.tagline}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-4xl md:text-6xl font-black tracking-tight"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-200 to-lime-300">
            {t.title}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed"
        >
          {t.subTitle}
        </motion.p>
      </section>

      {/* Form / Configuration Controls */}
      <section className="px-4 max-w-5xl mx-auto mt-2 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-[#121a15]/90 backdrop-blur-2xl rounded-3xl p-6 md:p-8 border border-emerald-500/20 shadow-2xl space-y-8"
        >
          {/* 1. Location Selection (Interactive Map + Presets) */}
          <MapPicker
            selectedLocation={selectedLocation}
            onSelectLocation={setSelectedLocation}
            language={language}
          />

          {/* 2. Crop Selection */}
          <div className="space-y-3 pt-4 border-t border-white/5">
            <label className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Sprout size={14} />
              {t.selectCrop}
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CROPS.map((c) => {
                const isSelected = selectedCrop === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCrop(c.id)}
                    className={`p-4 rounded-2xl text-left border relative overflow-hidden transition-all duration-300 flex flex-col justify-between min-h-[120px] ${
                      isSelected
                        ? 'bg-emerald-950/70 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                        : 'bg-[#090d0b]/60 border-white/5 text-gray-400 hover:border-white/20 hover:bg-[#090d0b]'
                    }`}
                  >
                    <div className="flex justify-between items-start w-full">
                      <span className="text-3xl">{c.icon}</span>
                      {isSelected && (
                        <span className="bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Selected
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-extrabold text-base text-gray-100 mt-2">
                        {language === 'en' ? c.name : c.tamilName}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5">
            <p className="text-xs text-gray-400 font-medium max-w-md">
              {language === 'en'
                ? `Ready to generate strategy for ${selectedCropDetails?.name} in ${selectedLocation.name}.`
                : `${selectedLocation.tamilName} பகுதியில் ${selectedCropDetails?.tamilName} பயிர் செய்வதற்கான திட்டம் தயார்.`}
            </p>

            <button
              onClick={handleGenerate}
              className="w-full sm:w-auto px-8 py-5 bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-600 hover:to-emerald-500 text-white font-black rounded-2xl shadow-xl shadow-emerald-950/40 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 text-sm"
            >
              <span>{isGenerated ? t.reGenerate : t.generatePlan}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Methodology Cards (Shown when not generated yet) */}
      <AnimatePresence>
        {!isGenerated && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 max-w-5xl mx-auto mt-16 space-y-6"
          >
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
              <HelpCircle className="text-emerald-400" size={22} />
              <h2 className="text-xl font-bold tracking-tight text-white">
                {t.howItWorks}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="p-6 rounded-3xl bg-[#121a15]/60 border border-white/5 space-y-3 hover:border-emerald-500/20 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center">
                  <Moon className="text-amber-400" size={22} />
                </div>
                <h3 className="font-extrabold text-base text-white">{t.suryaTitle}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-medium">
                  {t.suryaDesc}
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-6 rounded-3xl bg-[#121a15]/60 border border-white/5 space-y-3 hover:border-emerald-500/20 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center">
                  <Satellite className="text-blue-400" size={22} />
                </div>
                <h3 className="font-extrabold text-base text-white">{t.sentinelTitle}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-medium">
                  {t.sentinelDesc}
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-6 rounded-3xl bg-[#121a15]/60 border border-white/5 space-y-3 hover:border-emerald-500/20 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center">
                  <Compass className="text-emerald-400" size={22} />
                </div>
                <h3 className="font-extrabold text-base text-white">{t.rulesTitle}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-medium">
                  {t.rulesDesc}
                </p>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Dashboard Section */}
      <div id="dashboard-start" className="scroll-mt-20" />
      {isGenerated && (
        <section className="p-4 md:p-6 max-w-7xl mx-auto mt-6 relative z-20 space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 bg-[#121a15]/80 rounded-3xl border border-white/5 shadow-2xl">
              <RefreshCw className="w-12 h-12 text-emerald-400 animate-spin mb-4" />
              <p className="text-gray-200 font-bold tracking-wide text-sm">
                Synchronizing Astronomy Engine & Open-Meteo Telemetry...
              </p>
            </div>
          ) : plan.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Timeline */}
              <aside className="lg:col-span-5">
                <Timeline plan={plan} language={language} />
              </aside>

              {/* Right Column: Telemetry & Astronomy */}
              <main className="lg:col-span-7 space-y-6">
                <WeatherWidget
                  soil={plan[0].soil}
                  locationName={selectedLocation.name}
                  language={language}
                />
                <CelestialGuide plan={plan} language={language} />
                <KeyMetrics plan={plan} language={language} />
                <NDVIChart plan={plan} language={language} />
              </main>
            </div>
          ) : null}
        </section>
      )}

      {/* Modals & Fixed Footer */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        language={language}
      />

      <SavedPlans
        isOpen={savedPlansOpen}
        onClose={() => setSavedPlansOpen(false)}
        onSelectPlan={handleSelectSavedPlan}
        language={language}
      />

      {isGenerated && plan.length > 0 && (
        <FixedFooter
          plan={plan}
          cropId={selectedCrop}
          locationName={selectedLocation.name}
          lat={selectedLocation.lat}
          lon={selectedLocation.lon}
          language={language}
        />
      )}
    </div>
  );
}
