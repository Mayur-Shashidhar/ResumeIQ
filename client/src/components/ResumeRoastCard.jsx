import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Laugh, Sparkles, Share2, Copy, Check, X } from 'lucide-react';

const generateRoastsByLevel = (roastData = {}, fullData = {}, level = 'Medium') => {
  const strengths = fullData.strengths || [];
  const matchedSkills = fullData.matchedSkills || ['React', 'Node.js', 'JavaScript'];
  const topSkill = matchedSkills[0] || 'software engineering';

  if (level === 'Mild') {
    return {
      roastLevel: 'Mild',
      opening: `As a former Google recruiter, I see real potential in your ${topSkill} background, but your resume is currently flexing a little too quietly.`,
      roasts: [
        `Your technical projects are legitimately solid, but your bullet points read like you were trying not to brag. Go ahead and take credit for what you built!`,
        `You listed ${matchedSkills.slice(0, 3).join(', ')} in your skills section, but your experience bullets forgot to mention how you orchestrated them together.`,
        `Your resume formatting is super clean, though adding concrete numbers like latency reductions or user counts would make it pop instantly.`,
        strengths[0] ? `I wanted to roast your ${strengths[0].toLowerCase()}... but honestly, it's one of the strongest parts of your application.` : `Your GitHub projects are impressive, they just need clearer business metric headlines.`
      ],
      closing: "You're on the right track! A few quick metric tweaks and recruiters will be sliding into your DMs."
    };
  } else if (level === 'Savage') {
    return {
      roastLevel: 'Savage',
      opening: `I've reviewed over 50,000 resumes at Google and Meta. If I had a dollar for every bullet point on your resume that skipped quantifiable metrics, I'd be retired in St. Tropez.`,
      roasts: [
        `I've seen TODO comments in production code with stronger action verbs than your project bullet points.`,
        `Your skills section lists enough frameworks to start an entire dev agency, but your experience section reads like you just watched YouTube tutorials on half of them.`,
        `'Responsible for software development tasks'—this bullet point is so generic it could belong to half of LinkedIn. Recruiters literally gloss over this in 0.4 seconds.`,
        `You built an impressive ${topSkill} system, but described it like a high school homework assignment. Where is the scale? Where are the benchmarks?`,
        `This resume has enough whitespace in the project section to host a peaceful meditation class.`
      ],
      closing: "I'd roast your resume even harder... but after you apply these fixes, I'll probably just end up interviewing you."
    };
  } else {
    return {
      roastLevel: 'Medium',
      opening: roastData.opening || `I've reviewed over 50,000 engineering resumes, and yours immediately caught my recruiter eye—partly for your ${topSkill} stack, and partly because your achievements are playing hide and seek.`,
      roasts: roastData.roasts && roastData.roasts.length > 0 ? roastData.roasts : [
        `I've seen TODO comments with stronger action verbs than some of your project bullet points.`,
        `Your technical skills section lists an impressive toolkit, but your experience section forgot to mention what business outcomes you actually achieved with them.`,
        `This bullet point is so generic it could belong to half of LinkedIn: 'Worked on feature implementation.' If recruiters got paid for every generic bullet, I'd own a yacht in Malibu.`,
        `Your projects are awesome. Unfortunately, your descriptions clearly skipped marketing class and left out all quantifiable metrics.`
      ],
      closing: roastData.closing || "Fix these bullet points with concrete percentages and recruiters won't ghost you anymore. You're closer to FAANG than this roast makes it sound!"
    };
  }
};

export const ResumeRoastCard = ({ roastData = {}, fullData = {} }) => {
  const [currentLevel, setCurrentLevel] = useState('Medium');
  const [activeRoastContent, setActiveRoastContent] = useState(() => generateRoastsByLevel(roastData, fullData, 'Medium'));
  const [visibleRoastCount, setVisibleRoastCount] = useState(1);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleLevelChange = (level) => {
    setCurrentLevel(level);
    setActiveRoastContent(generateRoastsByLevel(roastData, fullData, level));
    setVisibleRoastCount(1);
  };

  useEffect(() => {
    if (visibleRoastCount < activeRoastContent.roasts.length) {
      const timer = setTimeout(() => {
        setVisibleRoastCount((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [visibleRoastCount, activeRoastContent]);

  const handleRoastMeAgain = () => {
    setVisibleRoastCount(1);
    setActiveRoastContent(generateRoastsByLevel(roastData, fullData, currentLevel));
  };

  const handleFixEverything = () => {
    const el = document.getElementById('improvement-simulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 1200, behavior: 'smooth' });
    }
  };

  const handleCopyShareText = () => {
    const shareText = `🔥 My ResumeIQ AI Roast by Sarah Chen (Former Google Recruiter):\n\n"${activeRoastContent.roasts[0]}"\n\nResult: ${fullData.overallScore || 95}/100 Points (${fullData.decision || 'Fast Track'})\nGet your resume roasted at ResumeIQ!`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-3xl p-6 sm:p-10 border border-purple-200/80 shadow-2xl mb-12 relative overflow-hidden bg-white text-slate-900"
    >
      {/* Ambient Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-600 text-white shadow-lg shadow-orange-500/25">
            <Flame className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[11px] font-black uppercase tracking-widest text-orange-600">Signature Feature</span>
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              <span className="text-[11px] text-slate-500 font-extrabold">Constructive Criticism</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2">
              🔥 AI Resume Roast
            </h2>
          </div>
        </div>

        {/* Segmented Control */}
        <div className="flex items-center p-1.5 rounded-2xl bg-slate-100 border border-slate-200/80 self-stretch md:self-auto justify-between sm:justify-start">
          <button
            onClick={() => handleLevelChange('Mild')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              currentLevel === 'Mild'
                ? 'bg-emerald-500 text-white shadow-sm scale-105'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🟢 Mild</span>
          </button>
          <button
            onClick={() => handleLevelChange('Medium')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              currentLevel === 'Medium'
                ? 'bg-amber-400 text-slate-950 shadow-sm scale-105'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🟡 Medium</span>
          </button>
          <button
            onClick={() => handleLevelChange('Savage')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              currentLevel === 'Savage'
                ? 'bg-gradient-to-r from-rose-600 to-orange-600 text-white shadow-md scale-105'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🔴 Savage</span>
          </button>
        </div>
      </div>

      {/* Dynamic Recruiter Persona Voice Box */}
      {(() => {
        const recruiter = fullData.recruiterPersona || {
          name: 'Sarah Chen',
          title: 'Senior Staff Technical Recruiter (Former Google)',
          experience: '15+ Years Experience'
        };
        const initials = recruiter.name.split(' ').map(n => n[0]).join('');
        const companyTag = recruiter.title.includes('Microsoft') ? 'Former Microsoft Recruiter' : recruiter.title.includes('Amazon') ? 'Former Amazon Recruiter' : recruiter.title.includes('Meta') ? 'Former Meta Recruiter' : recruiter.title.includes('Apple') ? 'Former Apple Recruiter' : 'Former Google Recruiter';

        return (
          <div className="mb-8 p-6 rounded-2xl bg-purple-50/70 border border-purple-100 text-left">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-black text-sm shadow-md ring-2 ring-purple-400/30">
                {initials}
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <span>{recruiter.name}</span>
                  <span className="text-[10px] bg-purple-100 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full font-extrabold uppercase">
                    {companyTag}
                  </span>
                </h4>
                <p className="text-xs text-slate-500 font-medium">{recruiter.title}</p>
              </div>
            </div>

            <p className="text-sm text-slate-800 font-semibold italic leading-relaxed pl-3 border-l-3 border-purple-500">
              "{activeRoastContent.opening}"
            </p>
          </div>
        );
      })()}

      {/* Staggered Roast Points */}
      <div className="space-y-3.5 mb-8">
        {activeRoastContent.roasts.map((roast, idx) => {
          if (idx >= visibleRoastCount) return null;
          return (
            <motion.div
              key={`${currentLevel}-${idx}`}
              initial={{ opacity: 0, x: -15, scale: 0.99 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md flex items-start gap-4 text-left"
            >
              <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 mt-0.5 font-black text-xs border border-orange-500/30">
                #{idx + 1}
              </div>
              <p className="text-sm font-medium leading-relaxed text-slate-100">
                {roast}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Encouraging Closing Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visibleRoastCount >= activeRoastContent.roasts.length ? 1 : 0.6 }}
        className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-extrabold flex items-center gap-2 mb-8 text-left"
      >
        <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>{activeRoastContent.closing}</span>
      </motion.div>

      {/* Toolbar Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200/80">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleRoastMeAgain}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold text-xs flex items-center gap-1.5 transition-colors border border-slate-200"
          >
            <Laugh className="w-4 h-4 text-amber-500" />
            <span>😂 Roast Me Again</span>
          </button>

          {currentLevel !== 'Savage' && (
            <button
              onClick={() => handleLevelChange('Savage')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md"
            >
              <Flame className="w-4 h-4" />
              <span>🔥 Roast Harder</span>
            </button>
          )}

          <button
            onClick={() => setIsShareModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-purple-500/20"
          >
            <Share2 className="w-4 h-4 text-purple-100" />
            <span>📸 Share My Roast</span>
          </button>
        </div>

        <button
          onClick={handleFixEverything}
          className="px-5 py-2.5 rounded-xl gradient-bg hover:opacity-95 text-white font-black text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-indigo-500/25"
        >
          <Sparkles className="w-4 h-4" />
          <span>✨ Fix Everything</span>
        </button>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {isShareModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md no-print">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md rounded-3xl bg-white p-6 border border-purple-200 shadow-2xl relative text-left"
            >
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-[10px] font-black uppercase tracking-wider mb-4 border border-purple-200">
                <Flame className="w-3 h-3 text-orange-500" />
                <span>ResumeIQ Social Share Card</span>
              </div>

              {/* Share Card Visual */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 mb-6 relative shadow-xl">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-black">
                      IQ
                    </div>
                    <span className="font-black text-white text-xs tracking-tight">ResumeIQ Recruiter Roast</span>
                  </div>
                  <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Score: {fullData.overallScore || 95}/100
                  </span>
                </div>

                <p className="text-xs text-slate-200 italic mb-4 font-medium">
                  "{activeRoastContent.roasts[0]}"
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800">
                  <span>— Sarah Chen, Former Google Recruiter</span>
                  <span className="text-indigo-400 font-bold">resumeiq.ai</span>
                </div>
              </div>

              <button
                onClick={handleCopyShareText}
                className="w-full py-2.5 rounded-xl gradient-bg text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Roast Text'}</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
