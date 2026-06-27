import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, ShieldCheck, Star, Rocket } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

const legendItems = [
  { label: 'Reject (0-55)', color: '#EF4444', min: 0, max: 55 },
  { label: 'Review (56-70)', color: '#F97316', min: 56, max: 70 },
  { label: 'Shortlist (71-80)', color: '#FACC15', min: 71, max: 80 },
  { label: 'Interview (81-90)', color: '#22C55E', min: 81, max: 90 },
  { label: 'Fast Track (91-100)', color: '#6366F1', min: 91, max: 100 },
];

const cx = 200;
const cy = 200;

function getPoint(radius, scoreVal) {
  const rad = (scoreVal / 100) * Math.PI;
  const x = cx - radius * Math.cos(rad);
  const y = cy - radius * Math.sin(rad);
  return { x, y };
}

export const HiringDecisionMeter = ({ decisionMeter = {}, executiveSummary = {}, confidence = 98 }) => {
  const targetScore = Math.max(0, Math.min(100, decisionMeter.score ?? 95));
  const status = targetScore >= 91 ? 'Fast Track' : targetScore >= 81 ? 'Interview' : targetScore >= 71 ? 'Shortlist' : targetScore >= 56 ? 'Review' : 'Reject';
  const interviewProb = executiveSummary.interviewProbability ?? 95;

  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 1500;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 2);
      setAnimatedScore(easeOut * targetScore);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setAnimatedScore(targetScore);
      }
    };

    window.requestAnimationFrame(step);
  }, [targetScore]);

  const needleTip = getPoint(108, animatedScore);

  const ticks = [];
  for (let s = 0; s <= 100; s += 5) {
    const isMajor = s % 25 === 0;
    const pInner = getPoint(126, s);
    const pOuter = getPoint(isMajor ? 116 : 122, s);
    const pLabel = isMajor ? getPoint(102, s) : null;
    ticks.push({ s, isMajor, pInner, pOuter, pLabel });
  }

  const recruiterInsightText = executiveSummary.hiringRecommendation
    ? `${executiveSummary.hiringRecommendation} ${executiveSummary.topStrength ? `Key advantage: ${executiveSummary.topStrength}.` : ''}`
    : 'This candidate demonstrates exceptional technical depth, strong project impact, and outstanding alignment with role requirements. They would likely bypass standard screening and proceed directly to recruiter review.';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-2xl mb-12 text-center relative overflow-hidden bg-white"
    >
      {/* Subtle Ambient Glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Pill & Title */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[11px] font-black uppercase tracking-widest mb-3 shadow-2xs">
        <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
        <span>FAANG Recruitment Intelligence Engine</span>
      </div>

      <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-1">
        Hiring Decision Meter
      </h2>
      <p className="text-xs text-slate-500 max-w-md mx-auto mb-6">
        Calibrated real-time recruitment funnel probability and instant hiring verdict
      </p>

      {/* Main Centered Gauge Canvas */}
      <div className="w-full max-w-[560px] mx-auto flex flex-col items-center justify-center relative">
        <div className="w-full h-56 sm:h-64 relative flex items-center justify-center">
          <svg viewBox="0 0 400 220" className="w-full h-full overflow-visible filter drop-shadow-md">
            <defs>
              {/* Mathematically Calibrated Blended Gradient Matching Score Ranges (0-55 Red, 56-70 Orange, 71-80 Yellow, 81-90 Green, 91-100 Purple) */}
              <linearGradient id="rainbowGauge" x1="0%" y1="0%" x2="100%" y2="0%">
                {/* 0-55%: Reject Red (covers ticks 0, 25, 50) */}
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="52%" stopColor="#EF4444" />
                <stop offset="57%" stopColor="#F97316" />

                {/* 56-70%: Review Orange */}
                <stop offset="67%" stopColor="#F97316" />
                <stop offset="71%" stopColor="#FACC15" />

                {/* 71-80%: Shortlist Yellow (covers tick 75) */}
                <stop offset="78%" stopColor="#FACC15" />
                <stop offset="81%" stopColor="#22C55E" />

                {/* 81-90%: Interview Green */}
                <stop offset="88%" stopColor="#22C55E" />
                <stop offset="91%" stopColor="#6366F1" />

                {/* 91-100%: Fast Track Purple (covers tick 95) */}
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>

              <filter id="gaugeShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#6366F1" floodOpacity="0.2" />
              </filter>
            </defs>

            {/* Background Arc Track */}
            <path
              d="M 60 200 A 140 140 0 0 1 340 200"
              fill="none"
              stroke="#F1F5F9"
              strokeWidth="22"
              strokeLinecap="round"
            />

            {/* Continuous Smooth Gradient Semicircle */}
            <path
              d="M 60 200 A 140 140 0 0 1 340 200"
              fill="none"
              stroke="url(#rainbowGauge)"
              strokeWidth="20"
              strokeLinecap="round"
              filter="url(#gaugeShadow)"
            />

            {/* Trigonometric Tick Marks & Numbers INSIDE the Arc */}
            {ticks.map((t, idx) => (
              <g key={idx}>
                <line
                  x1={t.pInner.x}
                  y1={t.pInner.y}
                  x2={t.pOuter.x}
                  y2={t.pOuter.y}
                  stroke={t.isMajor ? "#64748B" : "#CBD5E1"}
                  strokeWidth={t.isMajor ? "2" : "1"}
                />
                {t.isMajor && t.pLabel && (
                  <text
                    x={t.pLabel.x}
                    y={t.pLabel.y + 4}
                    textAnchor="middle"
                    className="text-[12px] font-extrabold fill-slate-500 font-sans select-none"
                  >
                    {t.s}
                  </text>
                )}
              </g>
            ))}

            {/* Thin Premium Metallic Needle */}
            <line
              x1="200"
              y1="200"
              x2={needleTip.x}
              y2={needleTip.y}
              stroke="#0F172A"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Glowing Tip Dot */}
            <circle cx={needleTip.x} cy={needleTip.y} r="4.5" fill="#6366F1" stroke="#FFFFFF" strokeWidth="1.5" />

            {/* Sleek Pivot Hub at Center */}
            <circle cx="200" cy="200" r="5" fill="#0F172A" stroke="#FFFFFF" strokeWidth="2" className="filter drop-shadow-sm" />
          </svg>
        </div>

        {/* SCORE DISPLAY & BADGE BELOW GAUGE */}
        <div className="flex flex-col items-center text-center mt-2 mb-8">
          <span className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight leading-none">
            <AnimatedCounter value={animatedScore} duration={1.5} />
          </span>
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mt-1">
            / 100 Points
          </span>

          <div className="mt-4 inline-flex items-center gap-1.5 px-6 py-2 rounded-full gradient-bg text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-indigo-500/25 ring-4 ring-indigo-50">
            <Rocket className="w-4 h-4" />
            <span>{status}</span>
          </div>

          <span className="mt-2 text-xs font-extrabold text-emerald-600 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Top 2% Candidate
          </span>
        </div>
      </div>

      {/* High-Contrast Sleek Legend (Dark crisp text matching arc colors exactly) */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 mb-10 text-xs max-w-2xl mx-auto">
        {legendItems.map((item) => {
          const isActive = status.toLowerCase() === item.label.split(' ')[0].toLowerCase();
          return (
            <div
              key={item.label}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                isActive
                  ? 'bg-slate-900 text-white font-black shadow-md scale-105'
                  : 'bg-slate-100 text-slate-800 font-bold border border-slate-200/80 hover:bg-slate-200'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Two-Column Probability & Confidence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto mb-10 text-left">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              Interview Probability
            </span>
            <span className="text-lg font-black text-indigo-600">
              <AnimatedCounter value={interviewProb} duration={1.5} suffix="%" />
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden p-0.5 mb-2 border border-slate-200/60">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${interviewProb}%` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="h-full rounded-full gradient-bg shadow-2xs"
            />
          </div>
          <span className="text-[11px] text-slate-500 font-medium block">Strong likelihood of interview advancement</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Assessment Confidence
            </span>
            <span className="text-lg font-black text-emerald-600">
              <AnimatedCounter value={confidence} duration={1.5} suffix="%" />
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden p-0.5 mb-2 border border-slate-200/60">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${confidence}%` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="h-full rounded-full bg-emerald-500 shadow-2xs"
            />
          </div>
          <span className="text-[11px] text-slate-500 font-medium block">High confidence in evaluation accuracy</span>
        </div>
      </div>

      {/* Recruiter Insight & Hiring Verdict Card */}
      <div className="p-6 rounded-3xl bg-indigo-50/50 border border-indigo-100 text-left max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full gradient-bg text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
            <Star className="w-5 h-5 fill-white" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 block mb-1">
              Recruiter Insight
            </span>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              "{recruiterInsightText}"
            </p>
          </div>
        </div>

        <div className="md:col-span-1 border-t md:border-t-0 md:border-l border-indigo-100/80 pt-4 md:pt-0 md:pl-6 text-left">
          <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 block mb-1">
            Hiring Verdict
          </span>
          <span className="text-xl font-black text-indigo-600 tracking-tight block mb-0.5">
            {status}
          </span>
          <span className="text-xs text-slate-500 font-medium block">
            Proceed directly to recruiter review
          </span>
        </div>
      </div>
    </motion.div>
  );
};
