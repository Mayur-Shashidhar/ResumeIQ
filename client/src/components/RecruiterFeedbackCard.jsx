import React from 'react';
import { ThumbsUp, ThumbsDown, MessageSquareCode, CheckCircle2, AlertCircle } from 'lucide-react';

export const RecruiterFeedbackCard = ({ strengths = [], weaknesses = [], recruiterFeedback }) => {
  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
          <MessageSquareCode className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">Comprehensive Recruiter Feedback</h3>
          <p className="text-xs text-slate-500">FAANG evaluation on positioning, strengths, and red flags</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Strengths Card */}
        <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/60">
          <div className="flex items-center gap-2 mb-4 text-emerald-800 font-bold text-base">
            <ThumbsUp className="w-5 h-5 text-emerald-600" />
            <span>Key Candidate Strengths</span>
          </div>
          <ul className="space-y-3">
            {strengths.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses Card */}
        <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200/60">
          <div className="flex items-center gap-2 mb-4 text-rose-800 font-bold text-base">
            <ThumbsDown className="w-5 h-5 text-rose-600" />
            <span>Areas needing Urgent Attention</span>
          </div>
          <ul className="space-y-3">
            {weaknesses.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
