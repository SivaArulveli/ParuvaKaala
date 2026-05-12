'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import useSWR from 'swr';
import dynamic from 'next/dynamic';
import { Languages } from 'lucide-react';
import Timeline from '@/components/Timeline';
import KeyMetrics from '@/components/KeyMetrics';
import CelestialGuide from '@/components/CelestialGuide';
import FixedFooter from '@/components/FixedFooter';
import { Button } from '@/components/ui/button';

// Lazy load the chart
const NDVIChart = dynamic(() => import('@/components/NDVIChart'), {
  loading: () => (
    <div className="animate-pulse space-y-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
      <div className="h-64 bg-gray-100 rounded-xl"></div>
    </div>
  ),
  ssr: false
});

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ParuvaKaala() {
  const [language, setLanguage] = useState<'en' | 'ta'>('en');
  const [crop, setCrop] = useState('paddy');
  const [location, setLocation] = useState('coimbatore');
  const [isGenerated, setIsGenerated] = useState(false);

  const { data, error, isLoading } = useSWR(
    isGenerated ? `/api/plan?crop=${encodeURIComponent(crop)}&location=${encodeURIComponent(location)}&startDate=${encodeURIComponent(new Date().toISOString())}` : null,
    fetcher,
    { 
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 3600000 // 1 hour cache
    }
  );

  const handleGenerate = () => {
    setIsGenerated(true);
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight * 0.4, behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Bilingual Toggle */}
      <button 
        onClick={() => setLanguage(l => l === 'en' ? 'ta' : 'en')}
        className="fixed top-4 right-4 z-50 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-200 hover:bg-white transition-colors flex items-center gap-2 font-bold text-gray-700"
      >
        <Languages size={18} className="text-emerald-600" />
        {language === 'en' ? 'தமிழ்' : 'English'}
      </button>

      {/* Hero Section (Compact 40vh) */}
      <section className="relative h-[45vh] min-h-[400px] flex flex-col items-center justify-center overflow-hidden">
        <Image
          src="/farm_banner.png"
          alt="ParuvaKaala Farm"
          fill
          priority
          quality={85}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center text-center mt-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-8 w-full shadow-2xl"
          >
            <h1 className="text-4xl md:text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-lime-200 drop-shadow-sm">
              {language === 'en' ? 'ParuvaKaala' : 'பருவகாலம்'}
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8 font-medium">
              {language === 'en' 
                ? 'Precision agriculture powered by Surya Siddhanta and Sentinel Satellites.' 
                : 'சூர்ய சித்தாந்தம் மற்றும் செயற்கைக்கோள் தரவுகள் மூலம் துல்லியமான விவசாயம்.'}
            </p>

            {/* Input Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <select 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full md:w-auto px-6 py-4 bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all text-white font-bold rounded-xl border border-white/30 outline-none appearance-none"
              >
                <option value="coimbatore" className="text-gray-900">Coimbatore</option>
                <option value="thanjavur" className="text-gray-900">Thanjavur</option>
                <option value="madurai" className="text-gray-900">Madurai</option>
              </select>

              <select 
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full md:w-auto px-6 py-4 bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all text-white font-bold rounded-xl border border-white/30 outline-none appearance-none"
              >
                <option value="paddy" className="text-gray-900">{language === 'en' ? 'Paddy' : 'நெல்'}</option>
                <option value="sugarcane" className="text-gray-900">{language === 'en' ? 'Sugarcane' : 'கரும்பு'}</option>
                <option value="cotton" className="text-gray-900">{language === 'en' ? 'Cotton' : 'பருத்தி'}</option>
              </select>

              <Button
                onClick={handleGenerate}
                size="lg"
                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-lime-500 text-white font-black rounded-xl shadow-lg hover:shadow-emerald-500/50 transition-all border border-emerald-500 hover:from-emerald-600 hover:to-lime-600"
                asChild={false}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {language === 'en' ? 'Generate Plan' : 'திட்டத்தை உருவாக்கு'}
                </motion.div>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Layout (Bento Grid) */}
      {isGenerated && (
        <section className="p-4 md:p-6 max-w-7xl mx-auto -mt-10 relative z-20">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-xl border border-gray-100">
              <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500 font-medium">
                {language === 'en' ? 'Analyzing Satellite & Astrological Data...' : 'தரவுகளை பகுப்பாய்வு செய்கிறது...'}
              </p>
            </div>
          ) : data?.plan ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left: Timeline - 4 columns on desktop */}
              <aside className="lg:col-span-4">
                <Timeline plan={data.plan} language={language} />
              </aside>
              
              {/* Right: Data Cards - 8 columns on desktop */}
              <main className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
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
              </main>

            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl shadow-xl border border-red-100">
              <p className="text-4xl mb-4">⚠️</p>
              <p className="text-red-500 font-bold text-lg mb-2">{language === 'en' ? 'Failed to generate plan.' : 'திட்டத்தை உருவாக்க முடியவில்லை.'}</p>
              <p className="text-gray-400 text-sm">{error?.message || 'Please check the server and try again.'}</p>
              <Button 
                onClick={() => { setIsGenerated(false); setTimeout(() => setIsGenerated(true), 100); }} 
                className="mt-6 px-6 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors"
              >
                {language === 'en' ? 'Retry' : 'மீண்டும் முயற்சி'}
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
