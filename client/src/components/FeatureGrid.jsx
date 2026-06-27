import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, UserCheck, CheckSquare, KeyRound, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'ATS Analysis',
    description: 'Scans parser readability, section structuring, and standard headings to guarantee pass-through across Taleo, Workday, and Greenhouse.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-100',
  },
  {
    icon: UserCheck,
    title: 'Recruiter Feedback',
    description: 'Brutally honest, FAANG-level feedback on candidate positioning, narrative flow, senior leadership signals, and technical impact.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-100',
  },
  {
    icon: CheckSquare,
    title: 'Grammar Analysis',
    description: 'Pinpoints awkward phrasing, tense mismatches, passive voice, and subtle grammatical flaws that reduce recruiter confidence.',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-100',
  },
  {
    icon: KeyRound,
    title: 'Keyword Matching',
    description: 'Detects missing high-value technical keywords and framework proficiencies required for modern software engineering roles.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-100',
  },
  {
    icon: TrendingUp,
    title: 'Resume Improvement',
    description: 'Transforms weak bullet points into high-octane action statements backed by quantified business impact and engineering metrics.',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-100',
  },
];

export const FeatureGrid = () => {
  return (
    <section className="py-16 bg-white border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Everything Recruiter & ATS Scanners Check
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Engineered to simulate real hiring manager screeners and top automated filtering software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`p-6 rounded-2xl bg-slate-50/50 border ${feature.borderColor} hover:shadow-lg hover:bg-white transition-all group`}
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
