import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

export const AnalysisConfidenceCard = ({ confidence = 96, reason }) => {
  const isHighConfidence = confidence >= 80;
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (confidence / 100) * circumference;

  const defaultReason = isHighConfidence
    ? 'This analysis has high confidence because the resume contained complete project, education and technical information.'
    : 'This analysis has moderate confidence because some project metrics or section details were sparse.';

  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-5">
      {/* Mini Circular Gauge */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg className="w-20 h-20 transform -rotate-90">
          <circle cx="40" cy="40" r={radius} className="stroke-slate-100" strokeWidth="6" fill="transparent" />
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            className={isHighConfidence ? 'stroke-emerald-500' : 'stroke-amber-500'}
            strokeWidth="6"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-base font-black text-slate-900 leading-none">
            <AnimatedCounter value={confidence} duration={1.2} suffix="%" />
          </span>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck className={`w-4 h-4 ${isHighConfidence ? 'text-emerald-500' : 'text-amber-500'}`} />
          <h4 className="text-sm font-bold text-slate-900">Analysis Confidence</h4>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          {reason || defaultReason}
        </p>
      </div>
    </div>
  );
};
