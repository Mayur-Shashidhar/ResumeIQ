import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronUp, CheckCircle, Award, Briefcase, GraduationCap, Code, FileText, Star } from 'lucide-react';

const sectionIcons = {
  summary: FileText,
  experience: Briefcase,
  projects: Code,
  education: GraduationCap,
  skills: Star,
  achievements: Award,
};

const sectionTitles = {
  summary: 'Professional Summary & Header',
  experience: 'Work Experience',
  projects: 'Technical Projects',
  education: 'Education & Credentials',
  skills: 'Skills & Technical Proficiencies',
  achievements: 'Honors & Achievements',
};

export const SectionAnalysisCard = ({ sectionAnalysis = {} }) => {
  const [openSections, setOpenSections] = useState({
    summary: true,
    experience: true,
    projects: true,
    skills: true,
    education: false,
    achievements: false,
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sectionsKeys = Object.keys(sectionTitles);

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
          <Layers className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">Detailed Section-by-Section Analysis</h3>
          <p className="text-xs text-slate-500">Granular audit and specific improvement advice per resume section</p>
        </div>
      </div>

      <div className="space-y-4">
        {sectionsKeys.map((key) => {
          const sectionData = sectionAnalysis[key];
          if (!sectionData) return null;

          const Icon = sectionIcons[key] || Layers;
          const title = sectionTitles[key];
          const isOpen = openSections[key];
          const score = sectionData.score ?? 80;

          return (
            <div
              key={key}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => toggleSection(key)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left hover:bg-slate-50/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700">
                    <Icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">{title}</h4>
                    <span className="text-xs text-slate-500">
                      Score: <strong className="text-slate-900">{score}/100</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      score >= 85
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : score >= 70
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {score >= 85 ? 'Strong' : score >= 70 ? 'Adequate' : 'Needs Work'}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50 text-sm text-slate-700 space-y-3">
                  <div>
                    <span className="font-bold text-slate-900 block mb-1">Recruiter Evaluation:</span>
                    <p className="leading-relaxed text-slate-600">{sectionData.feedback}</p>
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
