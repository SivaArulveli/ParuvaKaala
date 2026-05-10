'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Droplets, Sun, Wind, Sprout, Wheat, CheckCircle2, Download, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CelestialGuide from './CelestialGuide';

interface PlanWeek {
  week: number;
  tamilMonth: string;
  gregorianDate: string;
  panchangam: {
    tithi: string;
    nakshatra: string;
    auspicious: boolean;
  };
  satellite: {
    ndvi: number;
    soilMoisture: string;
  };
  task: string;
  tamilTask: string;
}

interface DashboardProps {
  crop?: string;
  location?: string;
  startDate?: string;
}

export default function Dashboard({ crop = 'paddy', location = 'coimbatore', startDate = new Date().toISOString() }: DashboardProps) {
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<PlanWeek[]>([]);
  const [language, setLanguage] = useState<'en' | 'ta'>('en');

  useEffect(() => {
    async function fetchPlan() {
      try {
        setLoading(true);
        const res = await fetch('/api/plan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ crop, location, startDate })
        });
        const data = await res.json();
        if (data.success) {
          setPlan(data.plan);
        }
      } catch (err) {
        console.error("Failed to fetch plan:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPlan();
  }, [crop, location, startDate]);

  const chartData = plan.map((p) => ({
    name: `W${p.week}`,
    ndvi: p.satellite.ndvi.toFixed(2),
  }));

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-gradient-to-br from-background to-background/50">
        <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="text-xl font-bold text-primary animate-pulse text-center">
          Consulting the Skies & Satellites...
          <br/><span className="text-sm text-foreground/70 font-normal">பஞ்சாங்கம் மற்றும் செயற்கைக்கோள் தரவுகளை ஆய்வு செய்கிறது...</span>
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50 p-4 sm:p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white/10">
          <div>
            <h1 className="text-3xl font-extrabold text-primary capitalize tracking-tight">
              {location} {crop} Plan
            </h1>
            <p className="text-foreground/70 font-medium">16-Week Full Cycle Optimized via AI</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
              className="px-5 py-2.5 bg-secondary/20 text-secondary-foreground font-bold rounded-xl hover:bg-secondary/30 transition shadow-sm"
            >
              {language === 'en' ? 'தமிழ்' : 'English'}
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold rounded-xl shadow-lg hover:shadow-xl transition hover:-translate-y-0.5">
              <Download size={18} />
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Main Timeline */}
          <div className="xl:col-span-2 space-y-6">
            <h2 className="text-2xl font-extrabold flex items-center gap-3">
              <Calendar className="text-primary w-8 h-8" /> 
              {language === 'en' ? 'Weekly Action Plan' : 'வாராந்திர செயல் திட்டம்'}
            </h2>
            
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-primary/50 before:via-secondary/50 before:to-transparent">
              <AnimatePresence>
                {plan.map((p, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    key={i} 
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      {i === 0 ? <Sprout size={20} /> : i === plan.length - 1 ? <Wheat size={20} /> : <CheckCircle2 size={20} />}
                    </div>
                    
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-card/90 backdrop-blur-sm p-6 rounded-3xl shadow-md border border-white/5 hover:shadow-xl hover:-translate-y-1 transition duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-sm font-black text-accent bg-accent/15 px-3 py-1 rounded-lg">Week {p.week}</span>
                        <span className="text-sm font-semibold text-foreground/50">{p.gregorianDate} • {p.tamilMonth}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-3 leading-snug">
                        {language === 'en' ? p.task : p.tamilTask}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-sm mt-4 pt-4 border-t border-foreground/5">
                        <span className={`flex items-center gap-1.5 font-semibold ${p.panchangam.auspicious ? 'text-primary' : 'text-orange-500'}`}>
                          <Sun size={16} /> {p.panchangam.nakshatra} ({p.panchangam.tithi})
                        </span>
                        <span className="flex items-center gap-1.5 font-semibold text-blue-500">
                          <Droplets size={16} /> Moisture: {p.satellite.soilMoisture}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar / Visuals */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-card/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white/10"
            >
              <h3 className="text-xl font-extrabold mb-6 flex items-center gap-2">
                <Wind className="text-secondary w-6 h-6" /> 
                {language === 'en' ? 'Crop Health (NDVI)' : 'பயிர் ஆரோக்கியம் (NDVI)'}
              </h3>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--foreground)/0.05)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--foreground)/0.5)', fontSize: 12}} />
                    <YAxis domain={[0, 1]} axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--foreground)/0.5)', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--foreground)/0.1)', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                    />
                    <Line type="monotone" dataKey="ndvi" stroke="url(#colorNdvi)" strokeWidth={4} dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                    <defs>
                      <linearGradient id="colorNdvi" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={1}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={1}/>
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-center font-medium text-foreground/50 mt-4">Predicted Vegetation Index (0.6+ is optimal)</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 p-8 rounded-3xl shadow-xl text-primary-foreground border border-primary-foreground/20"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
              <h3 className="text-2xl font-extrabold mb-2 relative z-10">Ask ParuvaKaala AI</h3>
              <p className="text-sm font-medium text-primary-foreground/80 mb-6 relative z-10 leading-relaxed">
                Need specific advice? Voice input is supported in Tamil and English.
              </p>
              <button className="w-full bg-background/20 hover:bg-background/30 transition-all py-4 rounded-xl flex items-center justify-center gap-3 font-bold shadow-inner relative z-10 backdrop-blur-sm">
                <span className="text-xl">🎤</span> {language === 'en' ? 'Tap to Speak' : 'பேச அழுத்தவும்'}
              </button>
            </motion.div>
          </div>

        </div>

        {/* Celestial Guide Integration */}
        <CelestialGuide />

      </motion.div>
    </div>
  );
}
