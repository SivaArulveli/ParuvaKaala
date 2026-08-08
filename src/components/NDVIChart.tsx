import { Activity, Satellite, Info } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { PlanWeek, Language } from '../lib/types';
import { TRANSLATIONS } from '../lib/i18n';

interface NDVIChartProps {
  plan: PlanWeek[];
  language: Language;
}

export default function NDVIChart({ plan, language }: NDVIChartProps) {
  const t = TRANSLATIONS[language];

  if (!plan.length) return null;

  const chartData = plan.map(p => ({
    week: `Wk ${p.week}`,
    ndvi: p.satellite.ndvi,
  }));

  const lastUpdate = new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'ta-IN', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <div className="p-6 rounded-3xl bg-[#121a15]/80 backdrop-blur-xl border border-emerald-500/20 shadow-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <Activity className="text-emerald-400" size={20} />
            {t.chartTitle}
          </h3>
          <p className="text-xs text-gray-400 font-medium mt-0.5">
            {language === 'en' ? '16-week live vegetation canopy forecasting model.' : '16 வார கால பசுமை அடர்த்தி கணிப்பு வரைபடம்.'}
          </p>
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="w-full h-64 bg-[#090d0b]/70 rounded-2xl border border-white/5 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="ndviGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2923" vertical={false} />
            <XAxis dataKey="week" stroke="#6b7280" style={{ fontSize: 10, fontWeight: 'bold' }} axisLine={false} tickLine={false} dy={10} />
            <YAxis stroke="#6b7280" domain={[0.2, 1.0]} style={{ fontSize: 10, fontWeight: 'bold' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#090d0b',
                borderRadius: '16px',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
              }}
              labelStyle={{ color: '#9ca3af', fontWeight: 'bold', fontSize: '11px' }}
              itemStyle={{ color: '#10b981', fontWeight: 'bold', fontSize: '13px' }}
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
            <ReferenceLine y={0.65} stroke="#f59e0b" strokeDasharray="3 3" strokeWidth={1} label={{ value: 'Optimal Canopy Threshold (0.65)', fill: '#f59e0b', fontSize: 9, position: 'top' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="p-3.5 bg-[#090d0b]/50 rounded-2xl border border-white/5 text-xs text-gray-300 flex gap-2 items-start leading-relaxed">
        <Info size={14} className="text-emerald-400 shrink-0 mt-0.5" />
        <p>
          {language === 'en'
            ? 'NDVI measures live green vegetation density. Optical red & near-infrared telemetry values above 0.65 (marked in amber) confirm peak photosynthesis and health.'
            : 'NDVI என்பது பயிர்களின் பச்சைய அளவீடாகும். 0.65-க்கு மேல் உள்ள அளவீடுகள் பயிர்கள் ஆரோக்கியமாக வளர்வதைக் குறிக்கிறது.'}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400 font-bold pt-1">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <Satellite size={14} />
          {language === 'en' ? 'Sentinel-2 Multispectral Model' : 'சென்டினல்-2 தரவு மாதிரி'}
        </span>
        <span className="bg-[#090d0b] border border-white/10 px-2.5 py-1 rounded-lg">
          Updated: {lastUpdate}
        </span>
      </div>
    </div>
  );
}
