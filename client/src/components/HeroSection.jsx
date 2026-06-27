import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2, Zap, Award } from 'lucide-react';

export const HeroSection = ({ onGetStarted }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-slate-50 via-indigo-50/30 to-slate-50">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-300/30 via-purple-300/20 to-pink-300/30 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs sm:text-sm font-semibold mb-6 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
          <span>NOT A CHATBOT • FAANG ATS SCREENING ENGINE</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6"
        >
          Resume<span className="gradient-text">IQ</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-700 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Get recruiter-quality feedback on your resume in <span className="text-indigo-600 font-bold underline decoration-indigo-300 decoration-wavy">under 30 seconds</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a
            href="#upload-section"
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-4 text-base font-bold rounded-xl gradient-button text-white shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-3 group"
          >
            <span>Analyze Resume Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Feature Highlights Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-slate-200/60 grid grid-cols-2 md:grid-cols-4 gap-4 text-left"
        >
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-slate-200/50 shadow-sm">
            <Zap className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-900">30-Second Audit</p>
              <p className="text-[11px] text-slate-500">Instant AI response</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-slate-200/50 shadow-sm">
            <Award className="w-5 h-5 text-indigo-500 shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-900">15+ Yrs Recruiting</p>
              <p className="text-[11px] text-slate-500">FAANG standard lens</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-slate-200/50 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-900">Strict ATS Parsing</p>
              <p className="text-[11px] text-slate-500">Keyword & formatting</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-slate-200/50 shadow-sm">
            <Sparkles className="w-5 h-5 text-purple-500 shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-900">Bullet Rewriting</p>
              <p className="text-[11px] text-slate-500">Quantified metrics</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
