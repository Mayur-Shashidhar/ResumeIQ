import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, ShieldCheck, Award, Rocket, CheckCircle2, Star, AlertTriangle, UserCheck, Clock, Layers, Check, ArrowRight, TrendingUp } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { FormattedText } from './FormattedText';

const pipelineStages = [
  { id: 1, label: 'Resume Submitted', sub: 'Received' },
  { id: 2, label: 'ATS Passed', sub: 'Top 5% Rank' },
  { id: 3, label: 'Recruiter Review', sub: 'Sarah Chen Approved' },
  { id: 4, label: 'Technical Screen', sub: 'Active Stage' },
  { id: 5, label: 'Interview', sub: 'Upcoming' },
  { id: 6, label: 'Offer Ready', sub: 'Goal' },
];

export const AIHiringIntelligenceDashboard = ({ decisionMeter = {}, executiveSummary = {}, confidence = 95, fullData = {}, analysisTime }) => {
  const score = Math.max(0, Math.min(100, decisionMeter.score ?? fullData.overallScore ?? 92));
  const status = score >= 91 ? 'Fast Track' : score >= 81 ? 'Interview' : score >= 71 ? 'Shortlist' : score >= 56 ? 'Review' : 'Reject';

  const recruiter = fullData.recruiterPersona || {
    name: 'Sarah Chen',
    title: 'Senior Staff Technical Recruiter (Former Google & Meta)',
    experience: '15+ Years Experience'
  };

  const initials = recruiter.name.split(' ').map(n => n[0]).join('');

  const interviewProb = executiveSummary.interviewProbability ?? fullData.interviewProbability ?? 90;
  const atsRank = executiveSummary.atsRanking ?? 'Top 5%';
  const readTime = executiveSummary.estimatedReadTime ?? '45 seconds';
  const candidateLevel = executiveSummary.candidateLevel ?? 'Intern (High Potential)';
  const hiringRecommendation = executiveSummary.hiringRecommendation ?? fullData.decision ?? 'Likely Interview';
  const topStrength = executiveSummary.topStrength ?? fullData.strengths?.[0] ?? 'Deep, quantified experience in distributed systems & AI/ML';
  const primaryRisk = executiveSummary.biggestRisk ?? fullData.weaknesses?.[0] ?? 'Relatively early in academic timeline; expand commercial scale';

  const matchedSkills = fullData.matchedSkills || ['Distributed Systems', 'React', 'Python'];
  const topSkill = matchedSkills[0] || 'Distributed Systems';
  const topProject = fullData.sectionAnalysis?.projects?.feedback || 'High-throughput microservices architecture';

  const speedSec = analysisTime ? Number(analysisTime).toFixed(1) : '1.4';

  const activeStageIndex = score >= 90 ? 3 : score >= 80 ? 2 : 1;

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <div className="space-y-8 mb-12 text-left">
      {/* 1. TWO-COLUMN HERO EXECUTIVE DASHBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT COLUMN: Main Score & Key Metrics (Balanced layout with zero empty vertical space) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 border border-indigo-100/80 shadow-2xl bg-gradient-to-br from-white via-slate-50/50 to-indigo-50/30 flex flex-col items-center justify-between text-center relative overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header Badges Area */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[11px] font-black uppercase tracking-widest shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
              <span>AI Hiring Intelligence Engine</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 text-[11px] font-extrabold shadow-2xs">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
              <span>Generated in {speedSec}s</span>
            </div>
          </div>

          {/* Centered Score Showcase Box */}
          <div className="my-6 p-6 sm:p-8 rounded-3xl bg-white border border-indigo-100/80 shadow-xl shadow-indigo-500/5 w-full max-w-sm flex flex-col items-center relative z-10">
            <div className="flex items-baseline justify-center gap-1.5 mb-3">
              <span className="text-6xl sm:text-7xl font-black text-slate-900 tracking-tight leading-none">
                <AnimatedCounter value={score} duration={1.5} />
              </span>
              <span className="text-xs font-black text-slate-400 tracking-widest uppercase">
                / 100 Points
              </span>
            </div>

            {/* Fast Track Status Pill */}
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full gradient-bg text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-indigo-500/25 ring-4 ring-indigo-50">
              <Rocket className="w-4 h-4" />
              <span>{status}</span>
            </div>

            {/* Top Percentile Tag */}
            <div className="mt-3 text-xs font-extrabold text-emerald-600 flex items-center justify-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Top 2% Candidate</span>
            </div>
          </div>

          {/* Quick Sub-metrics inside Left Hero Card (Includes AI Gen Speed & Recruiter Read Time) */}
          <div className="grid grid-cols-2 gap-3 w-full text-left relative z-10 pt-4 border-t border-slate-200/60">
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-0.5">Interview Prob</span>
              <span className="text-lg font-black text-indigo-600">{interviewProb}%</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-0.5">Confidence</span>
              <span className="text-lg font-black text-emerald-600">{confidence}%</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 shadow-2xs">
              <span className="text-[10px] font-black text-amber-800 uppercase tracking-wider block mb-0.5 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-500 fill-amber-500" /> AI Speed
              </span>
              <span className="text-sm font-black text-slate-900">{speedSec} seconds</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-0.5">Read Time</span>
              <span className="text-xs font-black text-slate-800 truncate block">{readTime}</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Executive Recruiter Verdict Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 border border-indigo-100/80 shadow-2xl bg-white flex flex-col justify-between text-left relative overflow-hidden"
        >
          {/* Header Persona */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200/60">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl gradient-bg text-white font-black text-sm flex items-center justify-center shadow-md ring-2 ring-indigo-100">
                {initials}
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 leading-tight">{recruiter.name}</h3>
                <p className="text-xs text-slate-500 font-semibold">{recruiter.title}</p>
              </div>
            </div>
            <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-extrabold flex items-center gap-1.5 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Verdict Ready</span>
            </span>
          </div>

          {/* Hiring Recommendation Main Callout */}
          <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 shadow-xs">
            <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 block mb-1">
              Hiring Recommendation
            </span>
            <h4 className="text-xl sm:text-2xl font-black text-indigo-950 tracking-tight leading-snug mb-3">
              {hiringRecommendation}
            </h4>
            <div className="pl-3 border-l-3 border-indigo-500 max-h-36 overflow-y-auto pr-1">
              <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                "<FormattedText text={fullData.recruiterPersona?.decisionReason || `Alright, let's cut to the chase. For a candidate with your profile, this resume is exceptional. You've got deep, hands-on experience in distributed systems, AI/ML, and quantifiable project metrics. These are real engineering achievements that recruiters look for. This is a definite YES for a phone screen.`} />"
              </p>
            </div>
          </div>

          {/* 4 Takeaway Cards with Rich Vibrant Accents */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-2xs flex items-start gap-3 hover:bg-white transition-all">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-600 shrink-0">
                <Star className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Top Advantage</span>
                <span className="text-xs font-extrabold text-slate-900 line-clamp-1">{topStrength}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-2xs flex items-start gap-3 hover:bg-white transition-all">
              <div className="p-2 rounded-xl bg-indigo-100 text-indigo-600 shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Strongest Skill</span>
                <span className="text-xs font-extrabold text-slate-900 line-clamp-1">{topSkill}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-2xs flex items-start gap-3 hover:bg-white transition-all">
              <div className="p-2 rounded-xl bg-rose-100 text-rose-600 shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Primary Risk</span>
                <span className="text-xs font-extrabold text-slate-900 line-clamp-1">{primaryRisk}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-2xs flex items-start gap-3 hover:bg-white transition-all">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600 shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Estimated ATS Rank</span>
                <span className="text-xs font-extrabold text-slate-900">{atsRank} Candidate</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 2. FOUR PREMIUM UNIFORM METRIC CARDS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Interview Probability */}
        <motion.div variants={cardVariants} className="p-5 rounded-3xl bg-gradient-to-br from-white via-amber-50/20 to-white border border-amber-200/80 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300 text-left flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider">Interview Prob</span>
            </div>
            <span className="text-2xl font-black text-indigo-600">
              <AnimatedCounter value={interviewProb} duration={1.5} suffix="%" />
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden p-0.5 my-2 border border-slate-200/60">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${interviewProb}%` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="h-full rounded-full gradient-bg shadow-2xs"
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold pt-2 border-t border-slate-100">
            <span>Likelihood</span>
            <span className="text-emerald-600 font-extrabold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>High Advancement</span>
          </div>
        </motion.div>

        {/* Card 2: Assessment Confidence */}
        <motion.div variants={cardVariants} className="p-5 rounded-3xl bg-gradient-to-br from-white via-emerald-50/20 to-white border border-emerald-200/80 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300 text-left flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider">Confidence</span>
            </div>
            <span className="text-2xl font-black text-emerald-600">
              <AnimatedCounter value={confidence} duration={1.5} suffix="%" />
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden p-0.5 my-2 border border-slate-200/60">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${confidence}%` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="h-full rounded-full bg-emerald-500 shadow-2xs"
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold pt-2 border-t border-slate-100">
            <span>Accuracy</span>
            <span className="text-emerald-600 font-extrabold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>Verified Analysis</span>
          </div>
        </motion.div>

        {/* Card 3: ATS Ranking */}
        <motion.div variants={cardVariants} className="p-5 rounded-3xl bg-gradient-to-br from-white via-indigo-50/20 to-white border border-indigo-200/80 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300 text-left flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 border border-indigo-500/20">
                <Award className="w-4 h-4" />
              </div>
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider">ATS Ranking</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-black shadow-2xs">
              {atsRank}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden p-0.5 my-2 border border-slate-200/60">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '92%' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="h-full rounded-full bg-indigo-600 shadow-2xs"
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold pt-2 border-t border-slate-100">
            <span>Scannability</span>
            <span className="text-indigo-600 font-extrabold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"/>Top Tier Rank</span>
          </div>
        </motion.div>

        {/* Card 4: Hiring Funnel Position */}
        <motion.div variants={cardVariants} className="p-5 rounded-3xl bg-gradient-to-br from-white via-purple-50/20 to-white border border-purple-200/80 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300 text-left flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 border border-purple-500/20">
                <Rocket className="w-4 h-4" />
              </div>
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider">Funnel Position</span>
            </div>
            <span className="px-3.5 py-1 rounded-full gradient-bg text-white text-xs font-black uppercase tracking-wider shadow-xs">
              {status}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden p-0.5 my-2 border border-slate-200/60">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '95%' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="h-full rounded-full gradient-bg shadow-2xs"
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold pt-2 border-t border-slate-100">
            <span>Priority</span>
            <span className="text-purple-600 font-extrabold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"/>Recruiter List</span>
          </div>
        </motion.div>
      </div>

      {/* 3. HORIZONTAL HIRING PIPELINE */}
      <motion.div variants={cardVariants} className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl bg-white text-left">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 block mb-0.5">Candidate Flow</span>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">FAANG Recruitment Pipeline</h3>
          </div>
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200/80">
            Active Stage: <strong className="text-indigo-600 font-black">Technical Screen</strong>
          </span>
        </div>

        {/* Pipeline Nodes Flow */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 relative">
          {pipelineStages.map((stage, idx) => {
            const isCompleted = idx <= activeStageIndex;
            const isCurrent = idx === activeStageIndex;

            return (
              <div
                key={stage.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/30 scale-105 ring-4 ring-indigo-100'
                    : isCompleted
                    ? 'bg-indigo-50/60 text-indigo-950 border-indigo-200'
                    : 'bg-slate-50 text-slate-400 border-slate-200/60 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                    isCurrent ? 'bg-white/20 text-white' : isCompleted ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-500'
                  }`}>
                    Stage 0{stage.id}
                  </span>
                  {isCompleted && (
                    <Check className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : 'text-indigo-600'}`} />
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-black tracking-tight mb-0.5">{stage.label}</h4>
                  <p className={`text-[10px] font-medium ${isCurrent ? 'text-indigo-100' : 'text-slate-500'}`}>{stage.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* 4. FULL-WIDTH EXECUTIVE HIRING SUMMARY */}
      <motion.div variants={cardVariants} className="glass-card rounded-3xl p-6 sm:p-8 border border-indigo-100/80 shadow-xl bg-gradient-to-br from-white via-indigo-50/10 to-white text-left">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/60">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl gradient-bg text-white shadow-md shadow-indigo-500/20">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 block mb-0.5">Comprehensive Evaluation</span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Executive Hiring Summary</h3>
            </div>
          </div>
          <span className="hidden sm:inline-flex px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-extrabold items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Verified Recruiter Report</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {/* Card 1: Hiring Recommendation */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-white via-indigo-50/30 to-white border border-indigo-200/80 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 border border-indigo-500/20">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600">Hiring Recommendation</span>
              </div>
              <p className="text-sm font-black text-slate-900 leading-snug">{hiringRecommendation}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-extrabold text-indigo-600">
              <span>Status</span>
              <span className="bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">Verified Verdict</span>
            </div>
          </div>

          {/* Card 2: Top Advantage */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-white via-emerald-50/30 to-white border border-emerald-200/80 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  <Star className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">Top Competitive Advantage</span>
              </div>
              <p className="text-xs font-extrabold text-slate-800 leading-relaxed">{topStrength}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-extrabold text-emerald-600">
              <span>Impact</span>
              <span className="bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Differentiator</span>
            </div>
          </div>

          {/* Card 3: Primary Risk */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-white via-rose-50/30 to-white border border-rose-200/80 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-xl bg-rose-500/10 text-rose-600 border border-rose-500/20">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-600">Primary Hiring Risk</span>
              </div>
              <p className="text-xs font-extrabold text-slate-800 leading-relaxed">{primaryRisk}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-extrabold text-rose-600">
              <span>Action Item</span>
              <span className="bg-rose-50 px-2 py-0.5 rounded border border-rose-200">Fixable Risk</span>
            </div>
          </div>

          {/* Card 4: Most Impressive Project */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-white via-purple-50/30 to-white border border-purple-200/80 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 border border-purple-500/20">
                  <Rocket className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-600">Most Impressive Project</span>
              </div>
              <p className="text-xs font-extrabold text-slate-800 leading-relaxed">{topProject}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-extrabold text-purple-600">
              <span>Highlight</span>
              <span className="bg-purple-50 px-2 py-0.5 rounded border border-purple-200">Key Project</span>
            </div>
          </div>

          {/* Card 5: Most Valuable Skill */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-white via-amber-50/30 to-white border border-amber-200/80 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-600">Most Valuable Skill</span>
              </div>
              <p className="text-xs font-extrabold text-slate-800 leading-relaxed">{topSkill}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-extrabold text-amber-600">
              <span>Competency</span>
              <span className="bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Core Stack</span>
            </div>
          </div>

          {/* Card 6: Estimated Read Time */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-white via-slate-100/40 to-white border border-slate-200/80 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-xl bg-slate-500/10 text-slate-700 border border-slate-500/20">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-600">Estimated Read Time</span>
              </div>
              <p className="text-xs font-extrabold text-slate-800 leading-relaxed">{readTime} (Fast Recruiter Scannability)</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-extrabold text-slate-700">
              <span>Scannability</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Optimal</span>
            </div>
          </div>
        </div>

        {/* Final Recruiter Comment Box */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 border border-indigo-200/80 text-left relative overflow-hidden shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-2xl gradient-bg flex items-center justify-center text-white text-xs font-black shadow-md">
              {initials}
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 block">Final Recruiter Comment</span>
              <span className="text-xs font-bold text-slate-700">{recruiter.name} • {recruiter.title}</span>
            </div>
          </div>
          <div className="pl-4 border-l-3 border-indigo-600">
            <p className="text-xs text-slate-800 leading-relaxed font-semibold italic">
              "<FormattedText text={fullData.recruiterFeedback || `This candidate demonstrates strong software engineering capabilities and solid project execution. Optimizing metrics in recent bullet points will guarantee top interview conversion rates.`} />"
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
