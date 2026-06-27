import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Cpu, Search, CheckCircle } from 'lucide-react';

const loadingMessages = [
  "Reading your resume...",
  "Checking ATS compatibility...",
  "Reviewing projects...",
  "Evaluating technical skills...",
  "Generating recruiter feedback...",
];

export const LoadingState = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-20 px-4 flex flex-col items-center justify-center min-h-[450px] text-center">
      <div className="relative mb-8">
        {/* Glowing pulsing aura */}
        <div className="absolute inset-0 rounded-full bg-indigo-500/30 blur-xl animate-pulse" />
        
        {/* Center Animated Radar Scanner Ring */}
        <div className="relative w-24 h-24 rounded-full gradient-bg flex items-center justify-center shadow-2xl shadow-indigo-500/40 border-4 border-white/80">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-white/60"
          />
          <Cpu className="w-10 h-10 text-white animate-pulse" />
        </div>
      </div>

      <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-3">
        Analyzing Your Resume
      </h3>

      <div className="h-10 flex items-center justify-center overflow-hidden max-w-md w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={messageIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-base font-semibold text-indigo-600 bg-indigo-50/80 px-4 py-2 rounded-full border border-indigo-100"
          >
            <Sparkles className="w-4 h-4 text-indigo-500 animate-spin" />
            <span>{loadingMessages[messageIndex]}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="mt-6 text-xs font-medium text-slate-500 max-w-xs">
        Simulating 15+ years of FAANG hiring algorithms. Please hold tight...
      </p>
    </div>
  );
};
