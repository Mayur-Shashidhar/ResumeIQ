import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckSquare, Code2, Layout, Zap } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { Tooltip } from './Tooltip';

export const ScoresBreakdown = ({ scores }) => {
  const categories = [
    {
      label: 'ATS Compatibility',
      score: scores.atsScore || 0,
      icon: ShieldCheck,
      color: 'bg-blue-500',
      textColor: 'text-blue-700',
      badgeBg: 'bg-blue-50',
      tooltip: 'Measures compatibility with Applicant Tracking Systems including formatting, keywords and structure.',
    },
    {
      label: 'Grammar & Tone',
      score: scores.grammarScore || 0,
      icon: CheckSquare,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-700',
      badgeBg: 'bg-emerald-50',
      tooltip: 'Evaluates grammar, spelling, readability and sentence clarity.',
    },
    {
      label: 'Technical Depth',
      score: scores.technicalScore || 0,
      icon: Code2,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-700',
      badgeBg: 'bg-indigo-50',
      tooltip: 'Evaluates depth, relevance and diversity of technical skills.',
    },
    {
      label: 'Resume Formatting',
      score: scores.formattingScore || 0,
      icon: Layout,
      color: 'bg-purple-500',
      textColor: 'text-purple-700',
      badgeBg: 'bg-purple-50',
      tooltip: 'Checks spacing, consistency, ATS friendliness and layout.',
    },
    {
      label: 'Impact & Metrics',
      score: scores.impactScore || 0,
      icon: Zap,
      color: 'bg-amber-500',
      textColor: 'text-amber-700',
      badgeBg: 'bg-amber-50',
      tooltip: 'Measures quantified achievements and measurable outcomes.',
    },
  ];

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl mb-8">
      <h3 className="text-xl font-extrabold text-slate-900 mb-6">
        Analytical Performance Breakdown
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div key={cat.label} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${cat.badgeBg}`}>
                    <Icon className={`w-4 h-4 ${cat.textColor}`} />
                  </div>
                  <span className="text-sm font-bold text-slate-900">{cat.label}</span>
                  <Tooltip content={cat.tooltip} />
                </div>
                <span className={`text-sm font-black ${cat.textColor}`}>
                  <AnimatedCounter value={cat.score} duration={1.5} /> / 100
                </span>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${cat.score}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className={`h-full rounded-full ${cat.color}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
