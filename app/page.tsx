'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [formData, setFormData] = useState({
    crop: 'paddy',
    location: 'coimbatore',
    startDate: new Date().toISOString()
  });

  if (started) {
    return <Dashboard {...formData} />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-24 relative overflow-hidden bg-gradient-to-br from-background to-background/50">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-secondary/20 blur-[150px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 max-w-5xl w-full flex flex-col items-center gap-8 text-center"
      >
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-primary drop-shadow-md">
          ParuvaKaala <br/>
          <span className="text-4xl sm:text-6xl text-secondary">பருவகாலம்</span>
        </h1>
        
        <p className="text-xl text-foreground/80 max-w-2xl font-medium leading-relaxed">
          Predict seeding, harvesting, and your full crop cycle using ancient Panchangam mathematics combined with the latest satellite data.
        </p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full max-w-md space-y-5 bg-card/80 p-8 rounded-3xl shadow-2xl border border-white/10 backdrop-blur-xl mt-8"
        >
          <div className="space-y-2 text-left">
            <label className="text-sm font-bold text-foreground/90 ml-1 tracking-wide uppercase">Crop Type (பயிர்)</label>
            <select 
              value={formData.crop}
              onChange={(e) => setFormData({...formData, crop: e.target.value})}
              className="w-full p-4 rounded-xl border border-primary/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all hover:border-primary/50 shadow-inner"
            >
              <option value="paddy">Paddy (நெல்)</option>
              <option value="sugarcane">Sugarcane (கரும்பு)</option>
              <option value="coconut">Coconut (தேங்காய்)</option>
              <option value="banana">Banana (வாழை)</option>
              <option value="millets">Millets (தினை)</option>
              <option value="vegetables">Vegetables (காய்கறிகள்)</option>
            </select>
          </div>

          <div className="space-y-2 text-left">
            <label className="text-sm font-bold text-foreground/90 ml-1 tracking-wide uppercase">Location (இடம்)</label>
            <select 
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full p-4 rounded-xl border border-primary/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all hover:border-primary/50 shadow-inner"
            >
              <option value="coimbatore">Coimbatore (கோயம்புத்தூர்)</option>
              <option value="madurai">Madurai (மதுரை)</option>
              <option value="trichy">Trichy (திருச்சி)</option>
              <option value="salem">Salem (சேலம்)</option>
              <option value="tirunelveli">Tirunelveli (திருநெல்வேலி)</option>
              <option value="gps">Use GPS Location (ஜி.பி.எஸ்)</option>
            </select>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setStarted(true)}
            className="w-full mt-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary text-primary-foreground font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-primary/30 text-lg border border-primary/50"
          >
            Generate AI Plan <br/><span className="text-sm font-normal opacity-90">திட்டத்தை உருவாக்கு</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </main>
  );
}
