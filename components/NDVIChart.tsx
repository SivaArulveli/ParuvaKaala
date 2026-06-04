'use client';

import { Activity, Satellite, Info } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { motion } from 'framer-motion';
import { PlanWeek } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface NDVIChartProps {
  plan: PlanWeek[];
  language: 'en' | 'ta';
}

export default function NDVIChart({ plan, language }: NDVIChartProps) {
  if (!plan.length) return null;

  const chartData = plan.map(p => ({
    week: `Wk ${p.week}`,
    ndvi: p.satellite.ndvi,
  }));

  const lastUpdate = new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'ta-IN', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <Card className="bg-white/40 backdrop-blur-md border-black/5 shadow-2xl rounded-3xl overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-black text-brand-text flex items-center gap-2">
          <Activity className="text-emerald-400" size={20} />
          {language === 'en' ? 'Vegetation Canopy Index (NDVI)' : 'பயிர் பசுமை குறியீடு (NDVI)'}
        </CardTitle>
        <p className="text-xs text-brand-text0 font-medium">
          {language === 'en' ? '16-week live vegetation density forecasting model.' : '16 வார கால பசுமை அடர்த்தி கணிப்பு வரைபடம்.'}
        </p>
      </CardHeader>
      
      <CardContent className="pt-2 space-y-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative"
        >
          {/* Chart Wrapper */}
          <div className="w-full h-[280px] bg-brand-bg/20 rounded-2xl border border-black/5 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="ndviGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="week" stroke="#9ca3af" style={{ fontSize: 10, fontWeight: 'bold' }} axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="#9ca3af" domain={[0.4, 1.0]} style={{ fontSize: 10, fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                  labelStyle={{ color: '#4b5563', fontWeight: 'bold', fontSize: '11px' }}
                  itemStyle={{ color: '#10b981', fontWeight: 'black', fontSize: '13px' }}
                  cursor={{ stroke: '#10b981', strokeWidth: 1.5, strokeDasharray: '3 3' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="ndvi" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fill="url(#ndviGradient)"
                  animationDuration={1500}
                />
                {/* Horizontal reference line for optimal threshold */}
                <ReferenceLine y={0.6} stroke="#f59e0b" strokeDasharray="3 3" strokeWidth={1} label={{ value: 'Optimal Threshold (0.6)', fill: '#f59e0b', fontSize: 9, position: 'top' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          {/* Scientific Info Box */}
          <div className="p-3.5 bg-brand-bg/40 rounded-2xl border border-black/5 text-xs text-gray-600 flex gap-2 items-start leading-relaxed">
            <Info size={14} className="text-emerald-400 shrink-0 mt-0.5" />
            <p>
              {language === 'en' 
                ? 'NDVI measures live green vegetation. The baseline is established using optical red and near-infrared reflectance. Values above 0.6 (marked in yellow) indicate high crop vigor and dense canopy coverage.' 
                : 'NDVI என்பது பயிர்களின் பச்சைய அளவீடாகும். 0.6-க்கு மேல் உள்ள அளவீடுகள் பயிர்கள் ஆரோக்கியமாக மற்றும் அடர்த்தியாக வளர்வதைக் குறிக்கிறது.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-brand-text0 font-bold pt-2">
            <span className="flex items-center gap-1.5">
              <Satellite size={14} className="text-emerald-400" />
              {language === 'en' ? 'Sentinel-2 Multispectral Instrument' : 'சென்டினல்-2 செயற்கைக்கோள் தரவு'}
            </span>
            <span className="bg-white border border-black/5 px-2.5 py-1 rounded-lg">
              {language === 'en' ? 'Update: Live feed sync' : 'புதுப்பிப்பு: லைவ் சிங்க்'} ({lastUpdate})
            </span>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
