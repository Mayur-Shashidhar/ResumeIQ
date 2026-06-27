import React from 'react';

/**
 * Cleanly renders AI-generated text with markdown emphasis (*word* or **word**)
 * converted into bold highlighted chips instead of raw asterisks.
 */
export const FormattedText = ({ text = '', className = '' }) => {
  if (!text) return null;

  // Split string by markdown bold/italic patterns: **word** or *word*
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if ((part.startsWith('**') && part.endsWith('**')) || (part.startsWith('*') && part.endsWith('*'))) {
          const cleanWord = part.replace(/\*/g, '');
          if (!cleanWord) return null;
          return (
            <strong
              key={i}
              className="font-extrabold text-indigo-950 bg-indigo-50 px-1.5 py-0.5 rounded-md border border-indigo-200/60 inline-block mx-0.5"
            >
              {cleanWord}
            </strong>
          );
        }
        return part;
      })}
    </span>
  );
};
