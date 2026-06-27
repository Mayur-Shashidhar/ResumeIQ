import React from 'react';
import { motion } from 'framer-motion';
import { StickyNote, Pin } from 'lucide-react';
import { FormattedText } from './FormattedText';

export const RecruiterNotesCard = ({ recruiterNotes = [] }) => {
  if (!recruiterNotes || recruiterNotes.length === 0) return null;

  const getNoteStyle = (type) => {
    switch (type) {
      case 'positive':
        return {
          bg: 'bg-amber-100/90 text-amber-950 border-amber-300',
          badge: '🟢 Positive Signal',
          dot: 'bg-emerald-500',
          rotate: 'rotate-1',
        };
      case 'neutral':
        return {
          bg: 'bg-sky-100/90 text-sky-950 border-sky-300',
          badge: '🟡 Recommendation',
          dot: 'bg-amber-500',
          rotate: '-rotate-1',
        };
      case 'critical':
      default:
        return {
          bg: 'bg-rose-100/90 text-rose-950 border-rose-300',
          badge: '🔴 Red Flag / Fix',
          dot: 'bg-rose-500',
          rotate: 'rotate-2',
        };
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
          <StickyNote className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">Recruiter Desk Sticky Notes</h3>
          <p className="text-xs text-slate-500">Raw initial screening observations & instant impressions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recruiterNotes.map((note, idx) => {
          const style = getNoteStyle(note.type);
          return (
            <motion.div
              key={idx}
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className={`p-5 rounded-2xl border ${style.bg} ${style.rotate} shadow-md hover:scale-105 transition-transform relative`}
            >
              {/* Pin icon top right */}
              <div className="absolute -top-2 right-4 text-slate-400 opacity-60">
                <Pin className="w-4 h-4 transform rotate-45" />
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider mb-2 opacity-80">
                <span className={`w-2 h-2 rounded-full ${style.dot}`} />
                <span>{style.badge}</span>
              </div>

              <p className="text-sm font-semibold leading-relaxed">
                "<FormattedText text={note.text} />"
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
