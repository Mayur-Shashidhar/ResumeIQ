import React from 'react';
import { motion } from 'framer-motion';
import { Target, KeyRound, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

export const JobMatchCard = ({ jobMatch, missingKeywords = [], missingSkills = [], finalSuggestions = [] }) => {
  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl mb-8">
      <div className="flex items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200/60">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Keywords & Role Alignment</h3>
            <p className="text-xs text-slate-500">Critical ATS target terminology and high-yield adjustments</p>
          </div>
        </div>

        {jobMatch !== null && jobMatch !== undefined && (
          <div className="px-4 py-2 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 font-extrabold text-sm flex items-center gap-2">
            <span>Role Match:</span>
            <span className="text-xl text-indigo-600">{jobMatch}%</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Missing Keywords */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-purple-600" />
            <span>Missing High-Impact Keywords</span>
          </h4>
          {missingKeywords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {missingKeywords.map((kw, idx) => (
                <motion.span
                  key={idx}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="px-3 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200/60 text-xs font-semibold"
                >
                  + {kw}
                </motion.span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">No critical general keywords missing.</p>
          )}
        </div>

        {/* Missing Skills */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Recommended Missing Technical Skills</span>
          </h4>
          {missingSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {missingSkills.map((skill, idx) => (
                <motion.span
                  key={idx}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="px-3 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200/60 text-xs font-semibold"
                >
                  ⚡ {skill}
                </motion.span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">No missing technical skills identified.</p>
          )}
        </div>
      </div>

      {/* Final Priority Suggestions */}
      {finalSuggestions.length > 0 && (
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg">
          <h4 className="text-base font-bold mb-4 flex items-center gap-2 text-amber-400">
            <Lightbulb className="w-5 h-5" />
            <span>Recruiter Action Plan for Maximum Callback Rate</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {finalSuggestions.map((sug, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white/10 border border-white/10 text-xs text-slate-200 leading-relaxed">
                <span className="font-bold text-white block mb-1">Step {idx + 1}</span>
                {sug}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
