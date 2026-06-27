import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Hexagon, Sparkles } from 'lucide-react';

export const RadarChartCard = ({ radarScores = {} }) => {
  // Transform radarScores object into Recharts data array
  const data = [
    { subject: 'ATS', score: radarScores.ATS ?? 75, fullMark: 100 },
    { subject: 'Grammar', score: radarScores.Grammar ?? 90, fullMark: 100 },
    { subject: 'Projects', score: radarScores.Projects ?? 85, fullMark: 100 },
    { subject: 'Experience', score: radarScores.Experience ?? 82, fullMark: 100 },
    { subject: 'Tech Skills', score: radarScores['Technical Skills'] ?? radarScores.TechSkills ?? 92, fullMark: 100 },
    { subject: 'Impact', score: radarScores.Impact ?? 78, fullMark: 100 },
    { subject: 'Leadership', score: radarScores.Leadership ?? 80, fullMark: 100 },
    { subject: 'Formatting', score: radarScores.Formatting ?? 88, fullMark: 100 },
    { subject: 'Readability', score: radarScores.Readability ?? 89, fullMark: 100 },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-800 text-xs font-semibold">
          <p className="text-indigo-400 font-bold mb-1">{payload[0].payload.subject}</p>
          <p>Score: <span className="text-white font-black">{payload[0].value} / 100</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl mb-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Hexagon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Holistic Candidate Profile Radar</h3>
            <p className="text-xs text-slate-500">9-axis multi-dimensional evaluation of technical & presentation strength</p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          360° Assessment
        </span>
      </div>

      <div className="w-full h-80 sm:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: '#475569', fontSize: 12, fontWeight: 700 }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" tick={{ fontSize: 10 }} />
            <Tooltip content={<CustomTooltip />} />
            <Radar
              name="Candidate Score"
              dataKey="score"
              stroke="#4f46e5"
              fill="#6366f1"
              fillOpacity={0.45}
              isAnimationActive={true}
              animationDuration={1500}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
