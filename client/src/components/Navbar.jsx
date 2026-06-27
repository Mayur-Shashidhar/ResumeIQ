import React from 'react';
import { Sparkles, FileText, ShieldCheck } from 'lucide-react';

export const Navbar = ({ onReset }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div 
          onClick={onReset} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 font-sans">
              Resume<span className="gradient-text">IQ</span>
            </span>
            <span className="block text-[10px] uppercase tracking-wider font-semibold text-indigo-600">
              FAANG Recruiter Engine
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Gemini 2.5 Flash Powered</span>
          </div>

          <a
            href="#upload-section"
            className="px-4 py-2 text-sm font-semibold rounded-lg gradient-button text-white shadow-sm flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Analyze Resume</span>
          </a>
        </div>
      </div>
    </header>
  );
};
