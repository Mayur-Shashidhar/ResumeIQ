import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, ArrowRight, CheckCircle2, Award, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AnimatedCounter } from './AnimatedCounter';

export const ImprovementSimulator = ({ data = {}, onSimulate }) => {
  const [isSimulated, setIsSimulated] = useState(false);

  const currentScores = {
    overall: data.overallScore ?? 85,
    ats: data.atsScore ?? 78,
    grammar: data.grammarScore ?? 90,
    technical: data.technicalScore ?? 88,
    impact: data.impactScore ?? 74,
    interview: data.executiveSummary?.interviewProbability ?? 84,
    match: data.resumeMatch ?? data.jobMatch ?? 85,
  };

  const predicted = data.predictedScores || {
    overallScore: Math.min(99, currentScores.overall + 5),
    atsScore: Math.min(99, currentScores.ats + 8),
    grammarScore: 98,
    technicalScore: Math.min(99, currentScores.technical + 5),
    impactScore: Math.min(99, currentScores.impact + 11),
    interviewProbability: Math.min(99, currentScores.interview + 9),
    jobMatch: Math.min(99, currentScores.match + 7),
  };

  const diffs = {
    overall: predicted.overallScore - currentScores.overall,
    ats: predicted.atsScore - currentScores.ats,
    grammar: (predicted.grammarScore || 98) - currentScores.grammar,
    technical: predicted.technicalScore - currentScores.technical,
    impact: predicted.impactScore - currentScores.impact,
    interview: (predicted.interviewProbability || 92) - currentScores.interview,
    match: (predicted.jobMatch || 92) - currentScores.match,
  };

  const handleRunSimulation = () => {
    setIsSimulated(true);
    
    // Fire festive celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#7c3aed', '#10b981', '#f59e0b'],
      });
    } catch (e) {
      console.log('Confetti trigger');
    }

    if (onSimulate) {
      onSimulate(predicted);
    }
  };

  const metricsList = [
    { label: 'Overall Score', current: currentScores.overall, optimized: predicted.overallScore, diff: diffs.overall },
    { label: 'ATS Compatibility', current: currentScores.ats, optimized: predicted.atsScore, diff: diffs.ats },
    { label: 'Grammar & Tone', current: currentScores.grammar, optimized: predicted.grammarScore || 98, diff: diffs.grammar },
    { label: 'Technical Depth', current: currentScores.technical, optimized: predicted.technicalScore, diff: diffs.technical },
    { label: 'Impact & Metrics', current: currentScores.impact, optimized: predicted.impactScore, diff: diffs.impact },
    { label: 'Interview Call Rate', current: currentScores.interview, optimized: predicted.interviewProbability || 92, diff: diffs.interview, suffix: '%' },
    { label: 'Job Description Match', current: currentScores.match, optimized: predicted.jobMatch || 92, diff: diffs.match, suffix: '%' },
  ];

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-200 shadow-2xl mb-8 bg-gradient-to-br from-white via-purple-50/20 to-white relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200/60">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-extrabold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
            <span>AI Optimization Predictive Engine</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">What If You Improved Your Resume?</h3>
          <p className="text-xs text-slate-500 mt-0.5">Predict how your resume would perform after applying AI bullet & metric recommendations</p>
        </div>

        {!isSimulated && (
          <button
            onClick={handleRunSimulation}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl gradient-button text-white font-black text-sm shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2.5 active:scale-95 transition-all"
          >
            <Sparkles className="w-5 h-5" />
            <span>Simulate Resume Improvements</span>
          </button>
        )}
      </div>

      {/* Success Celebration Banner when simulated */}
      <AnimatePresence>
        {isSimulated && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 text-white shadow-xl flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md text-white shrink-0">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-lg font-black tracking-tight">Congratulations! Your resume is now highly competitive.</h4>
                <p className="text-xs text-emerald-100 font-medium">All technical profiles, impact metrics, and ATS keywords upgraded to FAANG standards.</p>
              </div>
            </div>
            <span className="px-3 py-1.5 rounded-xl bg-white/20 text-xs font-extrabold uppercase shrink-0">
              ⚡ 99th Percentile Ready
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side-by-side comparison table */}
      <div className="space-y-3">
        <div className="grid grid-cols-12 gap-2 text-xs font-extrabold text-slate-400 uppercase tracking-wider px-4 py-2 border-b border-slate-100">
          <div className="col-span-5 sm:col-span-6">Performance Dimension</div>
          <div className="col-span-3 sm:col-span-3 text-center">Current</div>
          <div className="col-span-4 sm:col-span-3 text-right">After Improvements</div>
        </div>

        {metricsList.map((item) => (
          <div
            key={item.label}
            className={`grid grid-cols-12 gap-2 items-center p-3.5 rounded-2xl border transition-all ${
              isSimulated
                ? 'bg-emerald-50/40 border-emerald-200/80 shadow-sm'
                : 'bg-white border-slate-200/80'
            }`}
          >
            <div className="col-span-5 sm:col-span-6 flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900">{item.label}</span>
            </div>

            <div className="col-span-3 sm:col-span-3 text-center">
              <span className="text-sm font-black text-slate-500">
                {item.current}{item.suffix || ''}
              </span>
            </div>

            <div className="col-span-4 sm:col-span-3 flex items-center justify-end gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              <span className={`text-base font-black ${isSimulated ? 'text-emerald-600' : 'text-indigo-600'}`}>
                <AnimatedCounter value={isSimulated ? item.optimized : item.current} duration={1.2} suffix={item.suffix || ''} />
              </span>
              {item.diff > 0 && (
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
                  +{item.diff}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
