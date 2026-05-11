'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Calendar, Droplets, Sun, Wind, Sprout, Wheat, CheckCircle2, Download, Leaf, CloudRain, Star } from 'lucide-react';
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
    ndvi: p.satellite.ndvi,
  }));

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-8 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="relative">
          <div className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin shadow-[0_0_30px_rgba(var(--primary),0.3)]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Star className="text-secondary w-8 h-8 animate-pulse" />
          </div>
        </div>
        <div className="text-center z-10 space-y-2">
          <p className="text-2xl font-black text-foreground tracking-tight">
            Consulting the Stars & Satellites
          </p>
          <p className="text-foreground/50 font-medium">பஞ்சாங்கம் மற்றும் தரவுகளை ஆய்வு செய்கிறது...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8 relative">
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-[1400px] mx-auto space-y-8 relative z-10"
      >
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 mt-8">
          <div>
            <motion.h2 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-5xl font-black tracking-tighter text-foreground capitalize"
            >
              {location} <span className="text-primary">{crop}</span>
            </motion.h2>
            <motion.p 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-foreground/60 font-medium text-lg mt-2 flex items-center gap-2"
            >
              <Calendar size={18} className="text-secondary" /> 16-Week AI-Optimized Cycle
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-4 bg-card/50 p-2 rounded-2xl border border-white/5 backdrop-blur-xl shadow-glass"
          >
            <button 
              onClick={() => setLanguage('en')}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all ${language === 'en' ? 'bg-primary text-primary-foreground shadow-md' : 'text-foreground/70 hover:text-foreground hover:bg-white/5'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('ta')}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all ${language === 'ta' ? 'bg-primary text-primary-foreground shadow-md' : 'text-foreground/70 hover:text-foreground hover:bg-white/5'}`}
            >
              தமிழ்
            </button>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          
          {/* NDVI Chart Card (Spans 2 columns) */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="xl:col-span-2 xl:row-span-2 bg-card border border-white/5 rounded-[2rem] p-8 shadow-glass relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 transition-all group-hover:bg-primary/20" />
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-extrabold flex items-center gap-3">
                    <Leaf className="text-primary w-6 h-6" /> 
                    {language === 'en' ? 'Vegetation Health (NDVI)' : 'பயிர் ஆரோக்கியம்'}
                  </h3>
                  <p className="text-foreground/50 text-sm mt-1 font-medium">Satellite predictive modeling</p>
                </div>
                <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl font-bold text-sm border border-primary/20">
                  Peak: {(Math.max(...chartData.map(d => d.ndvi))).toFixed(2)}
                </div>
              </div>
              
              <div className="flex-1 min-h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorNdvi" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--foreground)/0.05)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--foreground)/0.5)', fontSize: 12, fontWeight: 600}} dy={10} />
                    <YAxis domain={[0, 1]} axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--foreground)/0.5)', fontSize: 12, fontWeight: 600}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '1rem', border: '1px solid hsl(var(--border))', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)' }}
                      itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                      cursor={{ stroke: 'hsl(var(--primary)/0.2)', strokeWidth: 2 }}
                    />
                    <Area type="monotone" dataKey="ndvi" stroke="hsl(var(--primary))" strokeWidth={4} fillOpacity={1} fill="url(#colorNdvi)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats Cards */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-white/5 rounded-[2rem] p-8 shadow-glass flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl transition-all group-hover:bg-blue-500/20" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-500/20 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
                <CloudRain size={24} />
              </div>
              <h4 className="text-foreground/60 font-semibold mb-2 uppercase tracking-wider text-sm">Avg Soil Moisture</h4>
              <p className="text-4xl font-black text-foreground">Optimal</p>
              <p className="text-blue-500 font-medium mt-2 text-sm">Based on Sentinel-1 SAR</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-white/5 rounded-[2rem] p-8 shadow-glass flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl transition-all group-hover:bg-secondary/20" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-secondary/20 text-secondary rounded-2xl flex items-center justify-center mb-6">
                <Sun size={24} />
              </div>
              <h4 className="text-foreground/60 font-semibold mb-2 uppercase tracking-wider text-sm">Next Auspicious Day</h4>
              <p className="text-4xl font-black text-foreground">Week 2</p>
              <p className="text-secondary font-medium mt-2 text-sm">Rohini Nakshatra Alignment</p>
            </div>
          </motion.div>

          {/* Action Card */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="md:col-span-2 bg-gradient-to-br from-primary to-primary/80 border border-primary-foreground/10 rounded-[2rem] p-8 shadow-[0_20px_40px_-15px_hsl(var(--primary))] text-primary-foreground relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('/glass-noise.png')] opacity-20 mix-blend-overlay" />
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
            
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between h-full gap-6">
              <div>
                <h3 className="text-3xl font-black mb-2">Ready for Action?</h3>
                <p className="text-primary-foreground/80 font-medium text-lg">Export your personalized plan to PDF or sync with your calendar.</p>
              </div>
              <button className="shrink-0 bg-background text-foreground hover:bg-background/90 px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all shadow-xl hover:-translate-y-1">
                <Download size={20} /> Export Plan
              </button>
            </div>
          </motion.div>

        </div>

        {/* Timeline Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-card border border-white/5 rounded-[2.5rem] p-6 sm:p-12 shadow-glass mt-12"
        >
          <div className="flex items-center gap-4 mb-12">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center text-accent-foreground shadow-lg">
              <Calendar size={28} />
            </div>
            <div>
              <h3 className="text-3xl font-black tracking-tight">Timeline Execution</h3>
              <p className="text-foreground/60 font-medium">Step-by-step guidance</p>
            </div>
          </div>

          <div className="relative before:absolute before:inset-0 before:ml-[1.75rem] md:before:ml-[50%] md:before:-translate-x-px before:h-full before:w-1 before:bg-gradient-to-b before:from-primary before:via-secondary before:to-transparent">
            <AnimatePresence>
              {plan.map((p, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.05 }}
                  key={i} 
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-8 last:mb-0"
                >
                  {/* Timeline Node */}
                  <div className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-background bg-card shadow-[0_0_20px_rgba(0,0,0,0.2)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 relative overflow-hidden">
                    <div className={`absolute inset-0 opacity-20 ${p.panchangam.auspicious ? 'bg-primary' : 'bg-foreground'}`} />
                    {i === 0 ? <Sprout size={24} className="text-primary" /> : i === plan.length - 1 ? <Wheat size={24} className="text-accent" /> : <CheckCircle2 size={24} className="text-foreground/50 group-hover:text-primary transition-colors" />}
                  </div>
                  
                  {/* Content Card */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-4rem)] bg-background/50 backdrop-blur-md p-6 rounded-3xl border border-white/5 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_10px_40px_-15px_rgba(var(--primary),0.3)] group-hover:-translate-y-1">
                    <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                      <span className="text-xs font-black text-primary bg-primary/10 px-3 py-1.5 rounded-xl uppercase tracking-widest border border-primary/20">Week {p.week}</span>
                      <span className="text-sm font-bold text-foreground/50 bg-foreground/5 px-3 py-1.5 rounded-xl">{p.gregorianDate}</span>
                    </div>
                    
                    <h4 className="text-xl font-bold mb-4 text-foreground leading-snug">
                      {language === 'en' ? p.task : p.tamilTask}
                    </h4>
                    
                    <div className="flex flex-wrap gap-3">
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold border ${p.panchangam.auspicious ? 'bg-secondary/10 text-secondary border-secondary/20' : 'bg-foreground/5 text-foreground/60 border-white/5'}`}>
                        <Star size={14} /> {p.panchangam.nakshatra}
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                        <Droplets size={14} /> {p.satellite.soilMoisture}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Celestial Guide Integration */}
        <CelestialGuide />

      </motion.div>
    </div>
  );
}
