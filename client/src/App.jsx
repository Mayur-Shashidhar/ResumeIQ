import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeatureGrid } from './components/FeatureGrid';
import { UploadSection } from './components/UploadSection';
import { LoadingState } from './components/LoadingState';
import { ScreeningSimulation } from './components/ScreeningSimulation';
import { ResultsDashboard } from './components/ResultsDashboard';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isScreeningSimulating, setIsScreeningSimulating] = useState(false);
  const [error, setError] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [analysisTime, setAnalysisTime] = useState(null);

  const handleAnalyze = async (file, jobDescription) => {
    setIsLoading(true);
    setIsScreeningSimulating(false);
    setError(null);
    setAnalysisData(null);
    setAnalysisTime(null);

    const startTime = performance.now();

    const formData = new FormData();
    formData.append('resume', file);
    if (jobDescription && jobDescription.trim()) {
      formData.append('jobDescription', jobDescription.trim());
    }

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        throw new Error(resData.error || 'Failed to analyze resume. Please check server status or file format.');
      }

      const endTime = performance.now();
      const elapsedSeconds = ((endTime - startTime) / 1000).toFixed(1);
      setAnalysisTime(elapsedSeconds);

      setAnalysisData(resData.data);
      setIsLoading(false);
      setIsScreeningSimulating(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Analysis Request Error:', err);
      setError(err.message || 'An unexpected error occurred during resume analysis.');
      setIsLoading(false);
    }
  };

  const handleSimulationComplete = () => {
    setIsScreeningSimulating(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setAnalysisData(null);
    setError(null);
    setIsLoading(false);
    setIsScreeningSimulating(false);
    setAnalysisTime(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      <Navbar onReset={handleReset} />

      <main className="flex-1">
        <ErrorBoundary onReset={handleReset}>
          {isLoading ? (
            <LoadingState />
          ) : isScreeningSimulating ? (
            <ScreeningSimulation onComplete={handleSimulationComplete} />
          ) : analysisData ? (
            <ResultsDashboard data={analysisData} onReset={handleReset} analysisTime={analysisTime} />
          ) : (
            <>
              <HeroSection onGetStarted={() => {}} />
              <FeatureGrid />
              <UploadSection
                onAnalyze={handleAnalyze}
                isLoading={isLoading}
                error={error}
              />
            </>
          )}
        </ErrorBoundary>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white tracking-tight text-base">ResumeIQ</span>
            <span>— Hackathon-Winning FAANG Recruiter AI</span>
          </div>
          <p className="text-slate-500 text-xs text-center md:text-right">
            Powered by Google Gemini 2.5 Flash • Built for Engineers, Product Managers & Tech Talent
          </p>
        </div>
      </footer>
    </div>
  );
}
