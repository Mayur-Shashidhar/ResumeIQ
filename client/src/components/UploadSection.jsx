import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, X, AlertCircle, Sparkles, Briefcase, ChevronDown, ChevronUp } from 'lucide-react';

export const UploadSection = ({ onAnalyze, isLoading, error }) => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [showJdInput, setShowJdInput] = useState(false);
  const fileInputRef = useRef(null);

  const validateAndSetFile = (selectedFile) => {
    setValidationError('');
    if (!selectedFile) return;

    // Validate type
    const isPdf = selectedFile.type === 'application/pdf' || selectedFile.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      setValidationError('Invalid file format. Please upload a valid PDF document (.pdf).');
      return;
    }

    // Validate size (5 MB)
    const maxSize = 5 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setValidationError('File size exceeds 5 MB limit. Please select a smaller PDF file.');
      return;
    }

    setFile(selectedFile);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setValidationError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setValidationError('Please select or drag a resume PDF file to analyze.');
      return;
    }
    onAnalyze(file, jobDescription);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <section id="upload-section" className="py-16 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Upload Your Resume for AI Screening
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Supports PDF documents up to 5MB. Optionally include a target job description for customized match scoring.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80">
          <form onSubmit={handleSubmit}>
            {/* Validation / API Error Alert */}
            <AnimatePresence>
              {(validationError || error) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-start gap-3 text-sm font-medium"
                >
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" />
                  <div className="flex-1">
                    <span>{validationError || error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* File Upload Zone / Preview */}
            {!file ? (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
                  dragActive
                    ? 'border-indigo-500 bg-indigo-50/50 scale-[0.99]'
                    : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50/80'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleChange}
                  className="hidden"
                />

                <div className="w-16 h-16 rounded-full gradient-bg/10 flex items-center justify-center mx-auto mb-4 text-indigo-600">
                  <UploadCloud className="w-8 h-8" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  Drag and drop your PDF resume here
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                  or <span className="text-indigo-600 font-semibold underline">browse file from device</span>
                </p>
                <span className="inline-block px-3 py-1 rounded-full bg-slate-200/60 text-slate-600 text-xs font-medium">
                  PDF format only (Max 5MB)
                </span>
              </div>
            ) : (
              /* File Loaded Preview Card */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl bg-white border border-indigo-100 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 mb-6"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="truncate">
                    <h4 className="text-base font-bold text-slate-900 truncate max-w-xs sm:max-w-md">
                      {file.name}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {formatFileSize(file.size)} • PDF Document
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Replace Resume</span>
                </button>
              </motion.div>
            )}

            {/* Optional Job Description Toggle / Input */}
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShowJdInput(!showJdInput)}
                className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors py-2"
              >
                <Briefcase className="w-4 h-4" />
                <span>{showJdInput ? 'Hide Job Description' : '+ Add Target Job Description (Optional)'}</span>
                {showJdInput ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              <AnimatePresence>
                {showJdInput && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 overflow-hidden"
                  >
                    <textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste the target Job Description (JD) here to calculate exact match % and pinpoint missing required role keywords..."
                      rows={4}
                      className="w-full p-4 rounded-xl bg-white border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-slate-800 text-sm placeholder:text-slate-400 transition-all outline-none resize-y"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Submit Action Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={!file || isLoading}
                className={`w-full py-4 px-6 rounded-xl font-bold text-base shadow-lg flex items-center justify-center gap-3 transition-all ${
                  !file || isLoading
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                    : 'gradient-button text-white shadow-indigo-500/25 active:scale-[0.99]'
                }`}
              >
                <Sparkles className="w-5 h-5" />
                <span>Run AI Recruiter & ATS Analysis</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
