import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, Award, Sparkles, ArrowRight } from 'lucide-react';

const steps = [
  'Reading Resume',
  'Parsing PDF',
  'ATS Compatibility Scan',
  'Checking Keywords',
  'Evaluating Projects',
  'Evaluating Experience',
  'Grammar Analysis',
  'Leadership Detection',
  'Matching Technical Skills',
  'Simulating Senior Recruiter Review',
  'Calculating Final Decision',
];

export const ScreeningSimulation = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsReady(true);
          if (!hasCompletedRef.current) {
            hasCompletedRef.current = true;
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 600);
          }
          return prev;
        }
      });
    }, 320);

    return () => clearInterval(interval);
  }, []);

  const handleSkip = () => {
    if (!hasCompletedRef.current) {
      hasCompletedRef.current = true;
      if (onComplete) onComplete();
    }
  };

  const progressPercent = Math.round(((currentStepIndex + 1) / steps.length) * 100);

  return (
    <div className="py-16 px-4 flex flex-col items-center justify-center min-h-[550px] max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full glass-card rounded-3xl p-8 sm:p-10 shadow-2xl border border-indigo-100/80 relative overflow-hidden"
      >
        {/* Background Ambient Aura */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-600 animate-spin" />
            <span>FAANG Screening Simulator Active</span>
          </div>

          <button
            onClick={handleSkip}
            className="px-3 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-indigo-600 text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
          >
            <span>View Dashboard Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
          {isReady ? 'Recruiter Decision Ready!' : 'Simulating Recruiter Audit'}
        </h3>
        <p className="text-sm text-slate-500 mb-8">
          Running 11-stage automated screening algorithms & technical hiring heuristics...
        </p>

        {/* Global Progress Bar */}
        <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden mb-8 border border-slate-200/60 p-0.5">
          <motion.div
            animate={{ width: `${progressPercent}%` }}
            transition={{ ease: 'easeOut', duration: 0.2 }}
            className="h-full rounded-full gradient-bg shadow-sm"
          />
        </div>

        {/* Checklist steps */}
        <div className="space-y-2.5 text-left max-w-md mx-auto mb-8 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/50 max-h-64 overflow-y-auto">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex || isReady;
            const isCurrent = idx === currentStepIndex && !isReady;

            return (
              <div
                key={step}
                className={`flex items-center justify-between p-2 rounded-xl transition-all ${
                  isCurrent
                    ? 'bg-white border border-indigo-200 shadow-sm font-bold text-indigo-900'
                    : isCompleted
                    ? 'text-slate-700 font-medium'
                    : 'text-slate-400 opacity-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isCompleted ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    </motion.div>
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300" />
                  )}
                  <span className="text-xs sm:text-sm">{step}</span>
                </div>

                {isCompleted && (
                  <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Passed
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {isReady && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
            onClick={handleSkip}
          >
            <Award className="w-5 h-5 text-emerald-600" />
            <span>Audit Complete! Click to view Recruiter Dashboard...</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
