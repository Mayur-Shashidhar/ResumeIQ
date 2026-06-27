import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Copy, Check, Sparkles, BrainCircuit } from 'lucide-react';

export const InterviewQuestionsCard = ({ interviewQuestions = [] }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [openIndex, setOpenIndex] = useState(0); // First expanded by default

  const handleCopy = (q, idx) => {
    const textToCopy = `Question: ${q.question}\nWhy Asked: ${q.whyRecruiterAsks}\nExpected Outline:\n${q.expectedAnswerOutline.map(b => `- ${b}`).join('\n')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!interviewQuestions || interviewQuestions.length === 0) return null;

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl mb-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">FAANG Senior Interviewer Question Bank</h3>
            <p className="text-xs text-slate-500">Predicted technical & behavioral questions extracted directly from candidate stack</p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          Google Interview Lens
        </span>
      </div>

      <div className="space-y-4">
        {interviewQuestions.map((item, idx) => {
          const isOpen = openIndex === idx;
          const difficultyColor =
            item.difficulty === 'Hard'
              ? 'bg-rose-50 text-rose-700 border-rose-200'
              : item.difficulty === 'Medium'
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200';

          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all"
            >
              {/* Question Header Bar */}
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 flex items-start justify-between gap-4 text-left hover:bg-slate-50/80 transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 shrink-0 mt-0.5">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${difficultyColor}`}>
                        {item.difficulty}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 leading-snug">
                      {item.question}
                    </h4>
                  </div>
                </div>

                <div className="shrink-0 pt-1">
                  {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </div>
              </button>

              {/* Expanded Answer Guide */}
              {isOpen && (
                <div className="px-6 pb-6 pt-3 border-t border-slate-100 bg-slate-50/60 text-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-600">
                      <strong className="text-slate-900">Why Recruiter Asks This:</strong> {item.whyRecruiterAsks}
                    </div>
                    <button
                      onClick={() => handleCopy(item, idx)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-indigo-300 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Outline</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200/80">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 block mb-2">
                      Expected Answer Outline Points:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {item.expectedAnswerOutline.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <span className="text-indigo-500 font-bold">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
