'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import useSWR from 'swr';
import dynamic from 'next/dynamic';
import { Languages, Sprout, Satellite, Compass, HelpCircle, ArrowRight, RefreshCw, Moon, Sparkles, MapPin } from 'lucide-react';
import Timeline from '@/components/Timeline';
import KeyMetrics from '@/components/KeyMetrics';
import CelestialGuide from '@/components/CelestialGuide';
import FixedFooter from '@/components/FixedFooter';
import { Button } from '@/components/ui/button';

// Lazy load the chart
const NDVIChart = dynamic(() => import('@/components/NDVIChart'), {
  loading: () => (
    <div className="animate-pulse space-y-4 bg-white/40 p-6 rounded-3xl border border-black/5 shadow-2xl">
      <div className="h-8 bg-gray-50 rounded w-1/3 mb-6"></div>
      <div className="h-64 bg-zinc-850 rounded-2xl"></div>
    </div>
  ),
  ssr: false
});

import { generateCropPlan } from '@/lib/agent';

const localFetcher = async ([crop, location, startDate]: [string, string, string]) => {
  const plan = await generateCropPlan(crop, location, new Date(startDate));
  return { success: true, plan };
};

const CROPS = [
  {
    id: 'paddy',
    name: 'Paddy',
    tamilName: 'நெல்',
    description: 'Optimal water retention, highly sensitive to lunar sap flow phases.',
    tamilDescription: 'சரியான நீர் தேக்கம், சந்திர திரவ ஓட்டக் கட்டங்களுக்கு அதிக உணர்திறன் கொண்டது.',
    icon: '🌾',
  },
  {
    id: 'sugarcane',
    name: 'Sugarcane',
    tamilName: 'கரும்பு',
    description: 'Long-duration crop. Benefits from precise solar transit scheduling.',
    tamilDescription: 'நீண்ட கால பயிர். துல்லியமான சூரிய சஞ்சார திட்டமிடல் மூலம் பலன் பெறுகிறது.',
    icon: '🎋',
  },
  {
    id: 'cotton',
    name: 'Cotton',
    tamilName: 'பருத்தி',
    description: 'Requires balanced soil moisture levels and clean weeding cycles.',
    tamilDescription: 'சமநிலையான மண் ஈரப்பதம் மற்றும் களை எடுத்தல் சுழற்சிகள் தேவை.',
    icon: '🌱',
  }
];

const LOCATIONS = [
  { id: 'coimbatore', name: 'Coimbatore', tamilName: 'கோயம்புத்தூர்', region: 'Western Zone' },
  { id: 'thanjavur', name: 'Thanjavur', tamilName: 'தஞ்சாவூர்', region: 'Delta Zone' },
  { id: 'madurai', name: 'Madurai', tamilName: 'மதுரை', region: 'Southern Zone' }
];

export default function ParuvaKaala() {
  const [language, setLanguage] = useState<'en' | 'ta'>('en');
  const [crop, setCrop] = useState('paddy');
  const [location, setLocation] = useState('coimbatore');
  const [isGenerated, setIsGenerated] = useState(false);
  const [fetchKey, setFetchKey] = useState<[string, string, string] | null>(null);

  const { data, error, isLoading } = useSWR(
    fetchKey,
    localFetcher,
    { 
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 3600000 // 1 hour cache
    }
  );

  const handleGenerate = () => {
    const stableDate = new Date().toISOString();
    setFetchKey([crop, location, stableDate]);
    setIsGenerated(true);
    setTimeout(() => {
      const el = document.getElementById('dashboard-start');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  const selectedCropDetails = CROPS.find(c => c.id === crop);
  const selectedLocationDetails = LOCATIONS.find(l => l.id === location);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text pb-32 overflow-x-hidden selection:bg-emerald-500/20 selection:text-emerald-400">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-950/20 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-amber-950/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Bilingual Toggle */}
      <button 
        onClick={() => setLanguage(l => l === 'en' ? 'ta' : 'en')}
        className="fixed top-4 right-4 z-50 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full shadow-xl border border-black/10 hover:bg-gray-50 hover:border-emerald-500/30 transition-all flex items-center gap-2 font-semibold text-sm text-gray-800"
      >
        <Languages size={16} className="text-emerald-400" />
        {language === 'en' ? 'தமிழ்' : 'English'}
      </button>

      {/* Header Banner Image */}
      <div className="w-full h-48 md:h-72 relative border-b border-black/5">
        <Image
          src="/farm_banner.png"
          alt="ParuvaKaala Farm Banner"
          fill
          priority
          quality={90}
          className="object-cover opacity-40 filter brightness-75"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
      </div>
      
      {/* Hero Titles & Content */}
      <section className="px-4 pt-10 pb-8 max-w-5xl mx-auto flex flex-col items-center text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2"
        >
          <Sparkles size={12} className="animate-pulse" />
          {language === 'en' ? 'Ancient Wisdom × Modern Radar' : 'விண்மீன் அறிவு × செயற்கைக்கோள் தரவு'}
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-4xl md:text-6xl font-black tracking-tight"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-200 to-lime-300">
            {language === 'en' ? 'ParuvaKaala' : 'பருவகாலம்'}
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-medium"
        >
          {language === 'en' 
            ? 'Synchronizing Surya Siddhanta lunar algorithms with live Sentinel satellite readings to draft your optimal 16-week cultivation strategy.' 
            : 'சூர்ய சித்தாந்த பஞ்சாங்க கணக்கீடுகள் மற்றும் சென்டினல் செயற்கைக்கோள் தரவுகளை ஒன்றிணைத்து உங்களுக்கான 16 வார கால அட்டவணை.'}
        </motion.p>
      </section>

      {/* Input / Form Section */}
      <section className="px-4 max-w-5xl mx-auto mt-2">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="glass rounded-3xl p-6 md:p-8 border border-black/10 shadow-2xl relative overflow-hidden"
        >
          {/* Card subtle pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-8">
            {/* 1. Location Selection */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <MapPin size={14} />
                {language === 'en' ? '1. Select Location' : '1. இடத்தை தேர்வு செய்க'}
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setLocation(loc.id)}
                    className={`p-4 rounded-2xl text-left border transition-all duration-300 ${
                      location === loc.id 
                        ? 'bg-emerald-950/30 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.15)]' 
                        : 'bg-white/40 border-black/5 text-gray-600 hover:border-black/10 hover:bg-white/60'
                    }`}
                  >
                    <p className="font-bold text-base text-gray-900">
                      {language === 'en' ? loc.name : loc.tamilName}
                    </p>
                    <p className="text-xs text-brand-text0 mt-1">{loc.region}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Crop Selection */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Sprout size={14} />
                {language === 'en' ? '2. Select Crop Type' : '2. பயிர் வகையை தேர்வு செய்க'}
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {CROPS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCrop(c.id)}
                    className={`p-5 rounded-2xl text-left border relative overflow-hidden transition-all duration-300 flex flex-col justify-between min-h-[140px] ${
                      crop === c.id 
                        ? 'bg-emerald-950/30 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
                        : 'bg-white/40 border-black/5 text-gray-600 hover:border-black/10 hover:bg-white/60'
                    }`}
                  >
                    <div className="flex justify-between items-start w-full">
                      <span className="text-3xl filter saturate-100">{c.icon}</span>
                      {crop === c.id && (
                        <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">
                          Selected
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-extrabold text-lg text-zinc-150 mt-4">
                        {language === 'en' ? c.name : c.tamilName}
                      </p>
                      <p className="text-xs text-brand-text0 mt-1 line-clamp-2">
                        {language === 'en' ? c.description : c.tamilDescription}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-black/5">
              <p className="text-xs text-brand-text0 font-medium max-w-md">
                {language === 'en' 
                  ? `Drafting timeline for ${selectedCropDetails?.name} in ${selectedLocationDetails?.name}. Ready to query Sentinel satellites.`
                  : `${selectedLocationDetails?.tamilName} பகுதியில் ${selectedCropDetails?.tamilName} பயிர் செய்வதற்கான திட்டமிடல் தயார்.`}
              </p>
              
              <Button
                onClick={handleGenerate}
                size="lg"
                className="w-full sm:w-auto px-8 py-6 bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-600 hover:to-emerald-500 text-white font-black rounded-2xl shadow-xl shadow-emerald-950/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                asChild={false}
              >
                <span>{language === 'en' ? 'Generate Cultivation Plan' : 'பயிர் திட்டத்தை உருவாக்கு'}</span>
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Interactive Science & Panchangam Methodology Section */}
      <AnimatePresence>
        {!isGenerated && (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 max-w-5xl mx-auto mt-16 space-y-6"
          >
            <div className="flex items-center gap-2 border-b border-black/5 pb-4">
              <HelpCircle className="text-emerald-400" size={22} />
              <h2 className="text-xl font-bold tracking-tight text-gray-900">
                {language === 'en' ? 'How ParuvaKaala Works' : 'பருவகாலம் எவ்வாறு செயல்படுகிறது?'}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="p-6 rounded-3xl bg-white/35 border border-black/5 space-y-4 hover:border-emerald-500/10 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-emerald-950/50 border border-emerald-500/20 flex items-center justify-center">
                  <Moon className="text-emerald-400" size={22} />
                </div>
                <h3 className="font-extrabold text-base text-gray-900">
                  {language === 'en' ? 'Surya Siddhanta Astronomy' : 'சூர்ய சித்தாந்த விண்மீன் கணிதம்'}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {language === 'en' 
                    ? 'Calculates the relative angle of the Moon and Sun (Tithi) and solar transits to identify periods of high sap flow (optimal for sowing and grafting) and low sap flow (optimal for pruning and harvesting).'
                    : 'விதைப்பதற்கும் ஒட்டு கட்டுவதற்கும் உகந்த காலம் (அதிக சாறு ஓட்டம்) மற்றும் அறுவடைக்கு உகந்த காலத்தை அறிய சூரிய-சந்திர கோணங்களைக் கணக்கிடுகிறது.'}
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-6 rounded-3xl bg-white/35 border border-black/5 space-y-4 hover:border-emerald-500/10 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-blue-950/50 border border-blue-500/20 flex items-center justify-center">
                  <Satellite className="text-blue-400" size={22} />
                </div>
                <h3 className="font-extrabold text-base text-gray-900">
                  {language === 'en' ? 'Sentinel-2 Remote Sensing' : 'சென்டினல் செயற்கைக்கோள் தரவு'}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {language === 'en' 
                    ? 'Monitors Normalized Difference Vegetation Index (NDVI) and SAR-derived surface soil moisture. This prevents dry-sowing errors and tracks live chlorophyll concentration on your fields.'
                    : 'தாவரங்களின் ஆரோக்கியக் குறியீடு (NDVI) மற்றும் மண்ணின் ஈரப்பதத்தை தொடர்ந்து கண்காணிக்கிறது. இது வறண்ட விதைப்பு பிழைகளை தவிர்க்க உதவுகிறது.'}
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-6 rounded-3xl bg-white/35 border border-black/5 space-y-4 hover:border-emerald-500/10 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-amber-950/50 border border-amber-500/20 flex items-center justify-center">
                  <Compass className="text-amber-400" size={22} />
                </div>
                <h3 className="font-extrabold text-base text-gray-900">
                  {language === 'en' ? 'Localized Rules Engine' : 'உள்ளூர் விவசாய விதிகள்'}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {language === 'en' 
                    ? 'Cross-references crop-specific thresholds (Paddy vs Sugarcane) with regional rainfall/temperature averages to recommend precise weekly watering, weeding, fertilizing, and harvesting intervals.'
                    : 'வட்டார காலநிலை சராசரிகள் மற்றும் பயிர் சார்ந்த தேவைகளை ஒருங்கிணைத்து வாராந்திர நீர் மேலாண்மை மற்றும் உரமிடும் அட்டவணையை வழங்குகிறது.'}
                </p>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Dashboard Section */}
      <div id="dashboard-start" className="scroll-mt-6" />
      {isGenerated && (
        <section className="p-4 md:p-6 max-w-7xl mx-auto mt-6 relative z-20">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 bg-white/40 rounded-3xl border border-black/5 shadow-2xl">
              <RefreshCw className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
              <p className="text-gray-600 font-bold tracking-wide">
                {language === 'en' ? 'Synchronizing Earth Radar & Lunar Almanacs...' : 'செயற்கைக்கோள் மற்றும் பஞ்சாங்க விபரங்களை சேகரிக்கிறது...'}
              </p>
              <p className="text-xs text-zinc-600 mt-2">
                {language === 'en' ? 'Fetching live Sentinel data feeds' : 'லைவ் சென்டினல் தரவுகளைப் பெறுகிறது'}
              </p>
            </div>
          ) : data?.plan ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left: Timeline - 4 columns on desktop */}
              <aside className="lg:col-span-4">
                <Timeline plan={data.plan} language={language} />
              </aside>
              
              {/* Right: Data Cards - 8 columns on desktop */}
              <main className="lg:col-span-8 space-y-6">
                {/* Header card representing selected crop and location */}
                <div className="p-6 rounded-3xl bg-gradient-to-r from-zinc-900/80 to-zinc-900/40 border border-black/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-white flex items-center gap-2">
                      <span className="text-3xl">{selectedCropDetails?.icon}</span>
                      {language === 'en' 
                        ? `${selectedCropDetails?.name} Cultivation Timeline` 
                        : `${selectedCropDetails?.tamilName} சாகுபடி காலவரிசை`}
                    </h2>
                    <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                      <MapPin size={12} className="text-emerald-400" />
                      {language === 'en' 
                        ? `Configured for ${selectedLocationDetails?.name} (${selectedLocationDetails?.region})` 
                        : `${selectedLocationDetails?.tamilName} பகுதிக்கு தயார் செய்யப்பட்டது`}
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      setIsGenerated(false);
                      setFetchKey(null);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-2 rounded-xl bg-gray-50 text-xs font-bold hover:bg-gray-100 transition-colors self-start sm:self-center border border-black/5 hover:border-emerald-500/20"
                  >
                    {language === 'en' ? 'Change Configurations' : 'விபரங்களை மாற்றுக'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  {/* Card 1: Key Metrics - spans 2 columns */}
                  <div className="md:col-span-2">
                    <KeyMetrics plan={data.plan} language={language} />
                  </div>
                  
                  {/* Card 2: NDVI Chart - spans 2 columns */}
                  <div className="md:col-span-2">
                    <NDVIChart plan={data.plan} language={language} />
                  </div>
                  
                  {/* Card 3: Celestial Guide - spans 2 columns */}
                  <div className="md:col-span-2">
                    <CelestialGuide plan={data.plan} language={language} />
                  </div>
                </div>
              </main>

            </div>
          ) : (
            <div className="text-center py-20 bg-white/40 rounded-3xl border border-red-500/20 shadow-2xl">
              <p className="text-4xl mb-4">⚠️</p>
              <p className="text-red-400 font-bold text-lg mb-2">
                {language === 'en' ? 'Failed to synchronize agricultural telemetry.' : 'விவசாய விபரங்களைப் பெற முடியவில்லை.'}
              </p>
              <p className="text-brand-text0 text-sm max-w-md mx-auto mb-6">
                {error?.message || 'Please check your connection and configuration inputs, and try again.'}
              </p>
              <Button 
                onClick={() => { setIsGenerated(false); setTimeout(() => setIsGenerated(true), 100); }} 
                className="px-6 py-3 bg-emerald-500 text-white hover:bg-emerald-400 rounded-xl font-bold transition-all"
              >
                {language === 'en' ? 'Retry Synchronization' : 'மீண்டும் முயற்சிக்கவும்'}
              </Button>
            </div>
          )}
        </section>
      )}

      {/* Fixed Footer */}
      {isGenerated && data?.plan && <FixedFooter plan={data.plan} language={language} />}
    </div>
  );
}
