import React, { useState } from 'react';
import { Sparkles, Copy, Check, ArrowDown, TrendingUp } from 'lucide-react';

export const BulletImprovementsCard = ({ bulletImprovements = [] }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!bulletImprovements || bulletImprovements.length === 0) return null;

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-pink-50 text-pink-600 border border-pink-100">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">High-Impact Bullet Point Rewrites</h3>
          <p className="text-xs text-slate-500">Transform passive work descriptions into quantified FAANG achievements</p>
        </div>
      </div>

      <div className="space-y-6">
        {bulletImprovements.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
              {/* Original Bullet */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  <span>Original Bullet Point</span>
                  <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-600">Passive / Weak</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  "{item.original}"
                </p>
              </div>

              {/* Arrow Indicator on mobile/desktop */}
              <div className="hidden lg:flex justify-center -mx-4 z-10 pointer-events-none">
                <div className="w-8 h-8 rounded-full gradient-bg text-white flex items-center justify-center shadow-md">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              {/* Improved Bullet */}
              <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 relative group">
                <div className="flex items-center justify-between text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    Recruiter-Optimized Bullet
                  </span>
                  <button
                    onClick={() => handleCopy(item.improved, idx)}
                    className="px-2.5 py-1 rounded-lg bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-600 hover:text-white text-xs font-semibold flex items-center gap-1 transition-all shadow-sm"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-sm font-medium text-slate-900 leading-relaxed">
                  "{item.improved}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
