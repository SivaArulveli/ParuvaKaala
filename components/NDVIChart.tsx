'use client';

import { Activity, Satellite } from 'lucide-react';
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
    <Card className="bg-white shadow-lg border-gray-100">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Activity className="text-emerald-600" size={24} />
          {language === 'en' ? 'Vegetation Health Projection' : 'பயிர் ஆரோக்கிய மதிப்பீடு'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="ndviGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="week" stroke="#6b7280" style={{ fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="#6b7280" domain={[0, 1]} style={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '12px',
                    border: '1px solid #d1d5db',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                  itemStyle={{ color: '#065F46', fontWeight: 'bold' }}
                  cursor={{ stroke: '#10b981', strokeWidth: 1, strokeDasharray: '5 5' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="ndvi" 
                  stroke="#059669" 
                  strokeWidth={3}
                  fill="url(#ndviGradient)"
                  animationDuration={1500}
                />
                <ReferenceLine x="Wk 2" stroke="#f59e0b" strokeDasharray="3 3" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex flex-wrap items-center justify-between mt-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Satellite size={16} className="text-blue-500" />
              {language === 'en' ? 'Live Satellite Data (Sentinel-2)' : 'செயற்கைக்கோள் தரவு'}
            </span>
            <span className="text-xs bg-gray-100 px-3 py-1.5 rounded-lg font-medium">
              {language === 'en' ? 'Last updated:' : 'கடைசி புதுப்பிப்பு:'} {lastUpdate}
            </span>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
