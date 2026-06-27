import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Tooltip = ({ content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        className="p-1 rounded-full text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition-colors focus:outline-none"
        aria-label="More info"
      >
        <Info className="w-3.5 h-3.5" />
      </button>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-xl bg-slate-900 text-white text-xs leading-relaxed shadow-xl border border-slate-800 z-50 pointer-events-none text-center"
          >
            {content}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
