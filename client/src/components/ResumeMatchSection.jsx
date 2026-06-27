import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, KeyRound, CheckCircle2, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

export const ResumeMatchSection = ({
  resumeMatch = 87,
  potentialMatch = 94,
  matchedSkills = [],
  missingSkills = [],
  matchedKeywords = [],
  missingKeywords = [],
}) => {
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (resumeMatch / 100) * circumference;

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-indigo-100 shadow-xl mb-8 bg-gradient-to-br from-white via-indigo-50/20 to-white">
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-200/60">
        <div className="p-3 rounded-xl gradient-bg text-white shadow-md shadow-indigo-500/20">
          <Target className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Resume vs Target Job Description Match</h3>
          <p className="text-xs text-slate-500">Deep comparative alignment and keyword gap analysis</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Match Percentage & Potential Bump Card */}
        <div className="p-6 rounded-2xl bg-white border border-indigo-100 shadow-md flex flex-col items-center justify-center text-center">
          <span className="text-xs uppercase tracking-wider font-extrabold text-indigo-600 mb-4">Overall Target Match</span>
          
          {/* Circular Progress Gauge */}
          <div className="relative shrink-0 flex items-center justify-center mb-4">
            <svg className="w-36 h-36 transform -rotate-90">
              <circle cx="72" cy="72" r={radius} className="stroke-slate-100" strokeWidth="10" fill="transparent" />
              <motion.circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-indigo-600"
                strokeWidth="10"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-slate-900">
                <AnimatedCounter value={resumeMatch} duration={1.5} suffix="%" />
              </span>
            </div>
          </div>

          {/* Potential Score Boost pill */}
          <div className="w-full p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-between gap-2 shadow-md text-xs font-bold">
            <span className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-amber-300" />
              <span>Potential Boost:</span>
            </span>
            <div className="flex items-center gap-1.5 bg-white/20 px-2 py-0.5 rounded-lg">
              <span>{resumeMatch}%</span>
              <ArrowRight className="w-3 h-3" />
              <span className="text-amber-300 font-black">{potentialMatch}%</span>
            </div>
          </div>
        </div>

        {/* Matched & Missing Keywords */}
        <div className="lg:col-span-2 space-y-6">
          {/* Keywords */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-indigo-600" />
                <span>Keyword Coverage</span>
              </span>
              <span className="text-xs text-slate-500 font-normal">Add missing terms to boost ATS ranking</span>
            </h4>

            <div className="space-y-3">
              <div>
                <span className="text-xs font-bold text-emerald-700 block mb-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Matched Keywords:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {matchedKeywords.length > 0 ? (
                    matchedKeywords.map((kw, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                        ✓ {kw}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">No exact target keywords matched.</span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-rose-700 block mb-2 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> High-Yield Missing Keywords:
                </span>
                <div className="flex flex-wrap gap-2">
                  {missingKeywords.length > 0 ? (
                    missingKeywords.map((kw, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: idx * 0.06 }}
                        className="px-3 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold shadow-xs flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3 text-rose-500" />
                        + {kw}
                      </motion.span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">No critical keywords missing!</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Technical Skill Alignment</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-2">Validated Skills:</span>
                <div className="flex flex-wrap gap-1.5">
                  {matchedSkills.map((sk, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-semibold">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-amber-700 block mb-2">Recommended Additions:</span>
                <div className="flex flex-wrap gap-1.5">
                  {missingSkills.map((sk, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                      ⚡ {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
