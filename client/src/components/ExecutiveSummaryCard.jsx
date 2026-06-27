import React from 'react';
import { Award, ShieldCheck, Clock, AlertTriangle, Sparkles, UserCheck, TrendingUp } from 'lucide-react';

export const ExecutiveSummaryCard = ({ executiveSummary }) => {
  const {
    candidateLevel = 'Senior Engineer',
    hiringRecommendation = 'Strong Candidate for technical interview rounds',
    topStrength = 'Solid technical architecture & framework mastery',
    biggestRisk = 'Quantifiable metrics in recent bullets could be higher',
    estimatedReadTime = '45 seconds',
    atsRanking = 'Top 10%',
    interviewProbability = 86,
  } = executiveSummary || {};

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-indigo-100 shadow-xl mb-8 bg-gradient-to-br from-white via-indigo-50/10 to-white relative overflow-hidden">
      {/* Top Banner Ribbon */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200/60">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl gradient-bg text-white shadow-md shadow-indigo-500/20">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider font-extrabold text-indigo-600 block mb-0.5">
              Enterprise Recruiting Intelligence
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Executive Hiring Summary</h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80 text-xs font-extrabold flex items-center gap-1.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Predicted ATS Rank: <strong className="text-indigo-900">{atsRanking}</strong></span>
          </span>
        </div>
      </div>

      {/* Grid Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Candidate Level */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Candidate Level</span>
          <div className="mt-2">
            <span className="text-xl font-black text-slate-900 block">{candidateLevel}</span>
            <span className="text-[11px] text-indigo-600 font-semibold">Evaluated Seniority</span>
          </div>
        </div>

        {/* Interview Probability */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Interview Call Rate</span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-black text-emerald-600">{interviewProbability}%</span>
            <span className="text-xs text-slate-500 font-medium">Probability</span>
          </div>
        </div>

        {/* Recruiter Read Time */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Recruiter Scan Time</span>
          <div className="mt-2 flex items-center gap-2 text-slate-900">
            <Clock className="w-5 h-5 text-amber-500" />
            <span className="text-lg font-bold">{estimatedReadTime}</span>
          </div>
        </div>

        {/* Hiring Recommendation */}
        <div className="p-4 rounded-2xl bg-indigo-600 text-white shadow-md flex flex-col justify-between">
          <span className="text-xs font-extrabold text-indigo-200 uppercase tracking-wider flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5" /> Verdict Recommendation
          </span>
          <p className="text-xs font-semibold mt-2 leading-snug text-white">
            "{hiringRecommendation}"
          </p>
        </div>
      </div>

      {/* Key Highlights: Top Strength vs Biggest Risk */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/70 flex items-start gap-3 text-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-emerald-900 font-bold block mb-0.5">Top Competitive Advantage:</strong>
            <span className="text-slate-700 leading-relaxed text-xs">{topStrength}</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/70 flex items-start gap-3 text-sm">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-900 font-bold block mb-0.5">Primary Hiring Risk / Flag:</strong>
            <span className="text-slate-700 leading-relaxed text-xs">{biggestRisk}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
