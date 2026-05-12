'use client';

import { Gauge, TrendingUp, Droplets, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { PlanWeek } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface KeyMetricsProps {
  plan: PlanWeek[];
  language: 'en' | 'ta';
}

export default function KeyMetrics({ plan, language }: KeyMetricsProps) {
  if (!plan.length) return null;

  // Calculate some aggregate metrics
  const avgNdvi = (plan.reduce((acc, p) => acc + p.satellite.ndvi, 0) / plan.length).toFixed(2);
  const nextAuspicious = plan.find(p => p.panchangam.auspicious)?.week || 1;

  const metrics = [
    {
      icon: <TrendingUp className="text-white" size={28} />,
      value: avgNdvi,
      label: language === 'en' ? 'Avg NDVI' : 'சராசரி NDVI',
    },
    {
      icon: <Droplets className="text-white" size={28} />,
      value: 'Optimal',
      label: language === 'en' ? 'Soil Moisture' : 'மண் ஈரம்',
    },
    {
      icon: <Sun className="text-white" size={28} />,
      value: `Wk ${nextAuspicious}`,
      label: language === 'en' ? 'Next Auspicious' : 'அடுத்த நல்ல நாள்',
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-white to-emerald-50 shadow-lg border-emerald-100">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Gauge className="text-emerald-600" size={24} />
          {language === 'en' ? 'Field Health Snapshot' : 'வயல் சுகாதார சுருக்கம்'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {metrics.map((metric, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.05 }} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-emerald-400 to-lime-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                {metric.icon}
              </div>
              <p className="text-2xl font-black text-gray-800">{metric.value}</p>
              <p className="text-xs font-medium text-gray-600 mt-1 uppercase tracking-wider">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
