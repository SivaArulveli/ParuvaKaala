'use client';

import { motion } from 'framer-motion';
import { Moon, Sun, Sparkles, Navigation, BookOpen } from 'lucide-react';
import Image from 'next/image';

export default function CelestialGuide() {
  return (
    <div className="relative rounded-[2.5rem] overflow-hidden mt-12 group border border-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
      {/* Immersive Celestial Background */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/celestial_banner.png" 
          alt="Celestial Guide" 
          fill 
          className="object-cover scale-105 transition-transform duration-[20s] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent mix-blend-overlay" />
      </div>
      
      <div className="relative z-10 p-8 sm:p-14">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary font-medium text-sm mb-6 backdrop-blur-md">
            <Sparkles size={16} /> Surya Siddhanta
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight mb-4 drop-shadow-lg">
            Celestial Observatory Guide
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed font-light">
            ParuvaKaala translates the profound mathematics of ancient observational astronomy into actionable agricultural intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Lunar Movements */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-card/40 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/10 shadow-glass group/card relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl transition-all group-hover/card:bg-blue-500/20" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                  <Moon className="text-blue-400 w-7 h-7" />
                </div>
                <span className="text-xs font-bold text-foreground/50 uppercase tracking-widest">Lunar Phase</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">திதி & நட்சத்திரம்</h3>
              <div className="space-y-4 text-foreground/70 font-medium">
                <p>
                  <strong className="text-foreground">Tithi (Phase):</strong> One Tithi equals 12° angular distance between Sun and Moon. Waxing phases (Shukla Paksha) are mathematically optimal for above-ground crops due to gravitational sap flow.
                </p>
                <p>
                  <strong className="text-foreground">Nakshatra (Mansion):</strong> The 27 constellations guide precise sowing windows, ensuring seeds germinate under historically proven macro-environmental conditions.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Solar Movements */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-card/40 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/10 shadow-glass group/card relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl transition-all group-hover/card:bg-secondary/20" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center border border-secondary/20">
                  <Sun className="text-secondary w-7 h-7" />
                </div>
                <span className="text-xs font-bold text-foreground/50 uppercase tracking-widest">Solar Transit</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">சூரிய சித்தாந்தம்</h3>
              <div className="space-y-4 text-foreground/70 font-medium">
                <p>
                  <strong className="text-foreground">Solstices & Seasons:</strong> The Sun's transit (Rasi) defines the six Ritus (Seasons). The exact degree of the sun on the horizon dictates localized weather patterns.
                </p>
                <p>
                  <strong className="text-foreground">Precision Agriculture:</strong> ParuvaKaala's AI correlates these ancient geometric alignments directly with real-time Sentinel-1 & 2 satellite data for your specific district.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
