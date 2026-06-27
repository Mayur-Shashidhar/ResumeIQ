import React from 'react';
import { UserCheck, CheckCircle2, AlertTriangle, XCircle, Sparkles, Award } from 'lucide-react';

export const RecruiterPersonaCard = ({ recruiterPersona = {} }) => {
  const {
    name = 'Sarah Chen',
    title = 'Senior Software Engineering Recruiter (Former Google)',
    experience = '14 Years Experience',
    decision = 'YES',
    decisionReason = 'As a former Google recruiter, I look for clear system impact and engineering ownership. This candidate demonstrates strong backend architectures and solid execution depth.',
  } = recruiterPersona;

  const getVerdictBadge = () => {
    switch (decision?.toUpperCase()) {
      case 'YES':
        return {
          label: 'YES — Move to Interview',
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          icon: CheckCircle2,
          iconColor: 'text-emerald-600',
        };
      case 'MAYBE':
        return {
          label: 'MAYBE — Needs Phone Screen Clarification',
          bg: 'bg-amber-50 text-amber-800 border-amber-300',
          icon: AlertTriangle,
          iconColor: 'text-amber-600',
        };
      case 'NO':
      default:
        return {
          label: 'NO — Pass for current role',
          bg: 'bg-rose-50 text-rose-800 border-rose-300',
          icon: XCircle,
          iconColor: 'text-rose-600',
        };
    }
  };

  const badge = getVerdictBadge();
  const VerdictIcon = badge.icon;

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl mb-8 relative overflow-hidden">
      {/* Top Profile Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 mb-6 border-b border-slate-200/60">
        <div className="flex items-center gap-4">
          {/* Recruiter Avatar */}
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl gradient-bg p-0.5 shadow-md">
              <div className="w-full h-full rounded-[14px] bg-slate-900 flex items-center justify-center text-2xl">
                👩‍💼
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-emerald-500 text-white border-2 border-white text-[10px]">
              <Sparkles className="w-3 h-3" />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-slate-900">{name}</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold border border-indigo-100">
                AI Lead Screener
              </span>
            </div>
            <p className="text-xs font-bold text-indigo-600 mt-0.5">{title}</p>
            <p className="text-[11px] text-slate-500 font-medium">{experience} • FAANG hiring bar expert</p>
          </div>
        </div>

        {/* Specialization Tags */}
        <div className="flex flex-wrap gap-1.5 max-w-xs">
          {['AI Systems', 'Backend Arch', 'Distributed Scale'].map((spec) => (
            <span key={spec} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-semibold">
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Narrative Commentary in Sarah's Voice */}
      <div className="mb-6 p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70 text-slate-800 text-sm leading-relaxed relative">
        <span className="text-3xl text-indigo-300 font-serif leading-none absolute top-3 left-4">“</span>
        <p className="pl-6 italic text-slate-700 font-medium">
          {decisionReason}
        </p>
      </div>

      {/* Recruiter Verdict Badge */}
      <div className={`p-4 rounded-2xl border ${badge.bg} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm`}>
        <div className="flex items-center gap-3">
          <VerdictIcon className={`w-6 h-6 ${badge.iconColor} shrink-0`} />
          <div>
            <span className="text-xs uppercase tracking-wider font-extrabold block text-slate-500">
              Sarah Chen's Screen Verdict
            </span>
            <strong className="text-base font-black">Would I Interview This Candidate?</strong>
          </div>
        </div>

        <div className="px-5 py-2 rounded-xl bg-white shadow-sm border border-slate-200 font-black text-sm text-slate-900 shrink-0">
          {badge.label}
        </div>
      </div>
    </div>
  );
};
