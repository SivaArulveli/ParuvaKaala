'use client';

import { motion } from 'framer-motion';
import { Moon, Sun, Star, ArrowRight, BookOpen } from 'lucide-react';

export default function CelestialGuide() {
  return (
    <div className="bg-card/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl mt-8">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="text-secondary w-8 h-8" />
        <h2 className="text-2xl font-bold text-foreground">Celestial Observatory Guide</h2>
      </div>
      
      <p className="text-foreground/80 mb-8 leading-relaxed">
        Understand the traditional methods (Surya Siddhanta) behind ParuvaKaala's predictions. 
        Ancient agriculture relies on the precise observation of lunar phases and solar transits.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lunar Movements */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-background/50 rounded-2xl p-6 border border-primary/10 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <Moon className="text-blue-400 w-6 h-6" />
            <h3 className="text-xl font-bold">Lunar Movements (திதி & நட்சத்திரம்)</h3>
          </div>
          <ul className="space-y-4 text-sm text-foreground/80">
            <li className="flex gap-2">
              <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span><strong>Tithi (Phase):</strong> One Tithi equals 12 degrees of angular distance between the Sun and Moon. Watch the moon's shape nightly; planting seeds during waxing phases (Shukla Paksha) is generally preferred for above-ground crops.</span>
            </li>
            <li className="flex gap-2">
              <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span><strong>Nakshatra (Constellation):</strong> The Moon travels through 27 mansions (13°20' each). Locate key stars like Rohini (Aldebaran) to know the current Nakshatra, which guides sowing and harvesting times.</span>
            </li>
          </ul>
        </motion.div>

        {/* Solar Movements */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-background/50 rounded-2xl p-6 border border-secondary/10 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <Sun className="text-secondary w-6 h-6" />
            <h3 className="text-xl font-bold">Solar Movements (சூரிய சித்தாந்தம்)</h3>
          </div>
          <ul className="space-y-4 text-sm text-foreground/80">
            <li className="flex gap-2">
              <ArrowRight className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <span><strong>Ayanamsa & Solstices:</strong> Track the Sun's daily shadow using a vertical stick (Sanku/Gnomon) at noon. The shortest shadow of the year marks the Summer Solstice (Dakshinayana begins).</span>
            </li>
            <li className="flex gap-2">
              <ArrowRight className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <span><strong>Seasons (Ritus):</strong> The sun's transit into specific zodiacs (Rasis) defines the six seasons. Noting the sunrise position on the eastern horizon helps track the transition from Chithirai to Panguni.</span>
            </li>
          </ul>
        </motion.div>
      </div>

      <div className="mt-8 p-4 bg-primary/10 rounded-xl border border-primary/20 flex gap-4 items-start">
        <Star className="text-primary w-6 h-6 shrink-0 mt-1" />
        <p className="text-sm font-medium text-primary">
          <strong>Daily Practice:</strong> Dedicate 5 minutes at sunrise and sunset to observe the horizon. Record the shadow length at noon and the moon's proximity to visible star clusters at night. ParuvaKaala digitizes this exact mathematics for you.
        </p>
      </div>
    </div>
  );
}
