import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, GitCommit } from 'lucide-react';

const timelineSteps = [
  'Resume Uploaded',
  'ATS Parsing',
  'Grammar Review',
  'Keyword Matching',
  'Recruiter Evaluation',
  'Resume Optimization',
  'Interview Prediction',
];

export const RecruiterTimeline = () => {
  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl mb-8 overflow-x-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
          <GitCommit className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">Recruitment Execution Timeline</h3>
          <p className="text-xs text-slate-500">Completed 7-stage automated platform pipeline verification</p>
        </div>
      </div>

      {/* Horizontal Stepper Trajectory */}
      <div className="min-w-[700px] flex items-center justify-between relative px-4 py-6">
        {/* Connecting Background Line */}
        <div className="absolute top-1/2 left-8 right-8 h-1 bg-indigo-100 -translate-y-1/2 z-0" />
        
        {/* Animated Active Fill Line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '92%' }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="absolute top-1/2 left-8 h-1 gradient-bg -translate-y-1/2 z-0 rounded-full"
        />

        {timelineSteps.map((step, idx) => (
          <motion.div
            key={step}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.15 }}
            className="relative z-10 flex flex-col items-center text-center group"
          >
            <div className="w-9 h-9 rounded-full gradient-bg text-white flex items-center justify-center shadow-md border-2 border-white group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="mt-3 text-xs font-bold text-slate-900 max-w-[90px] leading-tight">
              {step}
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold mt-0.5">Verified</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
