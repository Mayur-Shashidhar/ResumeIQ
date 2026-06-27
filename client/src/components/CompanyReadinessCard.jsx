import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Sparkles, TrendingUp } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

const companyLogos = {
  Google: '🌐',
  Amazon: '📦',
  Microsoft: '🪟',
  Meta: '♾️',
  Apple: '🍎',
  Netflix: '🎬',
  NVIDIA: '🟢',
  Uber: '🚗',
  Stripe: '💳',
  Palantir: '🛡️',
};

export const CompanyReadinessCard = ({ companyReadiness = [] }) => {
  if (!companyReadiness || companyReadiness.length === 0) return null;

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl mb-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Tier-1 Tech Giant Hiring Readiness</h3>
            <p className="text-xs text-slate-500">Benchmark readiness matching specific company engineering cultures</p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          10 Target Benchmarks
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {companyReadiness.map((item, idx) => {
          const readiness = item.readiness ?? 85;
          const logo = companyLogos[item.company] || '🏢';
          const isTopMatch = readiness >= 90;

          return (
            <div
              key={item.company}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{logo}</span>
                  <span className="text-base font-bold text-slate-900">{item.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-black ${isTopMatch ? 'text-emerald-600' : 'text-indigo-600'}`}>
                    <AnimatedCounter value={readiness} duration={1.5} suffix="%" />
                  </span>
                  {isTopMatch && (
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-extrabold uppercase">
                      Top Match
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${readiness}%` }}
                  transition={{ duration: 1.2, delay: idx * 0.05, ease: 'easeOut' }}
                  className={`h-full rounded-full ${isTopMatch ? 'gradient-bg' : 'bg-indigo-500'}`}
                />
              </div>

              <p className="text-xs text-slate-600 leading-relaxed italic">
                "{item.reason}"
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
