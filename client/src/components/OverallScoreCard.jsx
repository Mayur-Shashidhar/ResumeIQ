import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, Award, Zap } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { AnalysisConfidenceCard } from './AnalysisConfidenceCard';

export const OverallScoreCard = ({ overallScore, decision, recruiterFeedback, confidence, analysisConfidenceReason, analysisTime }) => {
  const getDecisionBadge = () => {
    switch (decision) {
      case 'Likely Interview':
        return {
          label: 'Likely Interview',
          color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          icon: CheckCircle2,
          iconColor: 'text-emerald-500',
          dot: 'bg-emerald-500',
        };
      case 'Maybe':
        return {
          label: 'Maybe',
          color: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: AlertTriangle,
          iconColor: 'text-amber-500',
          dot: 'bg-amber-500',
        };
      case 'Reject':
      default:
        return {
          label: 'Reject',
          color: 'bg-rose-50 text-rose-700 border-rose-200',
          icon: XCircle,
          iconColor: 'text-rose-500',
          dot: 'bg-rose-500',
        };
    }
  };

  const decisionInfo = getDecisionBadge();
  const DecisionIcon = decisionInfo.icon;

  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl mb-8">
      <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
        {/* Animated Circular Score Gauge */}
        <div className="relative shrink-0 flex items-center justify-center">
          <svg className="w-44 h-44 transform -rotate-90">
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="50%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <circle cx="88" cy="88" r={radius} className="stroke-slate-100" strokeWidth="10" fill="transparent" />
            <motion.circle
              cx="88"
              cy="88"
              r={radius}
              stroke="url(#scoreGradient)"
              strokeWidth="10"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 pointer-events-none">
            <span className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-1">
              <AnimatedCounter value={overallScore} duration={1.5} />
            </span>
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-slate-400 bg-slate-100/80 px-2 py-0.5 rounded-full border border-slate-200/60">
              / 100 Score
            </span>
          </div>
        </div>

        {/* Decision & Recruiter Summary Content */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center md:items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <span className="text-xs uppercase tracking-wider font-extrabold text-indigo-600">
                  Screening Verdict
                </span>
                {analysisTime && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60 text-[11px] font-bold">
                    <Zap className="w-3 h-3 text-amber-500 animate-pulse" />
                    <span>Completed in <AnimatedCounter value={analysisTime} decimals={1} duration={1} suffix="s" /></span>
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-black text-slate-900">Candidate Readiness</h3>
            </div>

            {/* Decision Card Badge */}
            <div className={`px-4 py-2 rounded-2xl border ${decisionInfo.color} flex items-center gap-2.5 shadow-sm font-bold text-sm shrink-0`}>
              <span className={`w-2.5 h-2.5 rounded-full ${decisionInfo.dot} animate-pulse`} />
              <DecisionIcon className={`w-5 h-5 ${decisionInfo.iconColor}`} />
              <span>{decisionInfo.label}</span>
            </div>
          </div>

          {/* Recruiter Commentary block */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 text-slate-700 text-sm leading-relaxed">
            <p className="font-semibold text-slate-900 mb-1 flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" />
              <span>FAANG Recruiter Verdict:</span>
            </p>
            <p className="italic">{recruiterFeedback}</p>
          </div>
        </div>
      </div>

      {/* Analysis Confidence Card Integration */}
      <AnalysisConfidenceCard confidence={confidence} reason={analysisConfidenceReason} />
    </div>
  );
};
