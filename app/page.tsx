'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { State, City } from 'country-state-city';
import Dashboard from '@/components/Dashboard';
import Image from 'next/image';
import { Leaf, MapPin, Navigation } from 'lucide-react';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    crop: 'paddy',
    stateCode: '',
    location: '',
    startDate: new Date().toISOString()
  });

  useEffect(() => {
    const indianStates = State.getStatesOfCountry('IN');
    setStates(indianStates);
    const tn = indianStates.find(s => s.isoCode === 'TN');
    if (tn) {
      setFormData(prev => ({ ...prev, stateCode: tn.isoCode }));
    }
  }, []);

  useEffect(() => {
    if (formData.stateCode) {
      const stateCities = City.getCitiesOfState('IN', formData.stateCode);
      setCities(stateCities);
      if (stateCities.length > 0) {
        setFormData(prev => ({ ...prev, location: stateCities[0].name }));
      }
    }
  }, [formData.stateCode]);

  return (
    <main className="flex min-h-screen flex-col relative overflow-x-hidden bg-background">
      {/* Immersive Hero Section */}
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/farm_banner.png" 
            alt="ParuvaKaala Farm Background" 
            fill 
            className="object-cover scale-105 animate-[slow-pan_20s_ease-in-out_infinite_alternate]"
            priority
          />
          {/* Advanced Gradient Overlays for Depth */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 z-20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent z-30" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="z-40 w-full max-w-7xl px-6 flex flex-col xl:flex-row items-center justify-between gap-16"
        >
          {/* Left: Typography Focus */}
          <div className="flex-1 space-y-8 text-center xl:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              AI-Powered Agriculture
            </motion.div>
            
            <h1 className="text-6xl sm:text-8xl font-black tracking-tighter text-foreground drop-shadow-2xl leading-[1.1]">
              Paruva<span className="text-primary">Kaala</span> <br/>
              <span className="text-4xl sm:text-6xl text-secondary font-serif italic font-medium tracking-normal mt-2 block">பருவகாலம்</span>
            </h1>
            
            <p className="text-lg sm:text-2xl text-foreground/80 max-w-2xl mx-auto xl:mx-0 font-light leading-relaxed">
              Synchronizing ancient <span className="font-semibold text-foreground">Surya Siddhanta</span> mathematics with live <span className="font-semibold text-foreground">Satellite Data</span> to orchestrate your perfect harvest.
            </p>
          </div>

          {/* Right: Glassmorphic Interactive Card */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-full max-w-md xl:max-w-lg"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-card/40 backdrop-blur-2xl p-8 sm:p-10 rounded-[2rem] border border-white/10 shadow-glass space-y-8">
                
                <div className="space-y-6">
                  {/* Crop Select */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-bold text-foreground/70 uppercase tracking-widest">
                      <Leaf size={16} className="text-primary" /> Crop <span className="text-xs normal-case opacity-70">(பயிர்)</span>
                    </label>
                    <div className="relative">
                      <select 
                        value={formData.crop}
                        onChange={(e) => setFormData({...formData, crop: e.target.value})}
                        className="w-full appearance-none p-4 pl-5 rounded-2xl bg-background/50 border border-white/5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-semibold cursor-pointer backdrop-blur-md shadow-inner"
                      >
                        <option value="paddy" className="bg-card text-foreground">Paddy (நெல்)</option>
                        <option value="sugarcane" className="bg-card text-foreground">Sugarcane (கரும்பு)</option>
                        <option value="coconut" className="bg-card text-foreground">Coconut (தேங்காய்)</option>
                        <option value="banana" className="bg-card text-foreground">Banana (வாழை)</option>
                        <option value="millets" className="bg-card text-foreground">Millets (தினை)</option>
                        <option value="vegetables" className="bg-card text-foreground">Vegetables (காய்கறிகள்)</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-foreground/50">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </div>

                  {/* State Select */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-bold text-foreground/70 uppercase tracking-widest">
                      <MapPin size={16} className="text-secondary" /> State <span className="text-xs normal-case opacity-70">(மாநிலம்)</span>
                    </label>
                    <div className="relative">
                      <select 
                        value={formData.stateCode}
                        onChange={(e) => setFormData({...formData, stateCode: e.target.value})}
                        className="w-full appearance-none p-4 pl-5 rounded-2xl bg-background/50 border border-white/5 text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all font-semibold cursor-pointer backdrop-blur-md shadow-inner"
                      >
                        {states.map(s => (
                          <option key={s.isoCode} value={s.isoCode} className="bg-card text-foreground">{s.name}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-foreground/50">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </div>

                  {/* City Select */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-bold text-foreground/70 uppercase tracking-widest">
                      <Navigation size={16} className="text-accent" /> District <span className="text-xs normal-case opacity-70">(மாவட்டம்)</span>
                    </label>
                    <div className="relative">
                      <select 
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="w-full appearance-none p-4 pl-5 rounded-2xl bg-background/50 border border-white/5 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-semibold cursor-pointer backdrop-blur-md shadow-inner disabled:opacity-50"
                        disabled={cities.length === 0}
                      >
                        {cities.length > 0 ? cities.map(c => (
                          <option key={c.name} value={c.name} className="bg-card text-foreground">{c.name}</option>
                        )) : (
                          <option value="" className="bg-card text-foreground">Loading...</option>
                        )}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-foreground/50">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setStarted(true);
                    setTimeout(() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' }), 100);
                  }}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-5 px-6 rounded-2xl transition-all shadow-[0_0_40px_-10px_hsl(var(--primary))] text-lg border border-primary/50 flex flex-col items-center justify-center relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 tracking-wide">{started ? 'Recalculate Path' : 'Generate Intelligence'}</span>
                  <span className="relative z-10 text-sm font-normal opacity-80 mt-1">திட்டத்தை உருவாக்கு</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/50 z-40"
        >
          <span className="text-xs uppercase tracking-widest font-bold">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-foreground/50 to-transparent" />
        </motion.div>
      </div>

      <AnimatePresence>
        {started && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative z-30 bg-background"
          >
            <Dashboard {...formData} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
