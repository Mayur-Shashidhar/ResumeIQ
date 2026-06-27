import React, { useState } from 'react';
import { Download, Printer, FileCheck } from 'lucide-react';
import html2pdf from 'html2pdf.js';

export const ReportDownloadButton = ({ data, filename = "ResumeIQ_Executive_Report.pdf" }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = () => {
    setIsGenerating(true);
    const element = document.getElementById('resumeiq-results-report');

    if (!element) {
      alert('Could not generate report container.');
      setIsGenerating(false);
      return;
    }

    const opt = {
      margin: [10, 10, 10, 10],
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        setIsGenerating(false);
      })
      .catch((err) => {
        console.error('PDF Generation error:', err);
        // Fallback to standard print dialog if script fails
        window.print();
        setIsGenerating(false);
      });
  };

  return (
    <div className="flex items-center justify-end gap-3 no-print mb-6">
      <button
        onClick={handleDownloadPDF}
        disabled={isGenerating}
        className="px-5 py-2.5 rounded-xl gradient-button text-white text-sm font-bold shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition-all active:scale-95"
      >
        {isGenerating ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Compiling PDF Report...</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            <span>Download Full Executive PDF Report</span>
          </>
        )}
      </button>
    </div>
  );
};
