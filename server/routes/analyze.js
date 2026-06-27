import express from 'express';
import multer from 'multer';
import { extractTextFromPDF } from '../services/pdfService.js';
import { analyzeResumeWithGemini } from '../services/geminiService.js';

const router = express.Router();

// Multer memory storage configuration (Max 5MB)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file format. Only PDF files (.pdf) are supported.'));
    }
  },
});

router.post('/analyze', (req, res) => {
  upload.single('resume')(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File size exceeds the 5 MB limit. Please upload a smaller PDF.' });
      }
      return res.status(400).json({ error: `File upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No resume PDF file was provided.' });
      }

      const jobDescription = req.body.jobDescription || '';

      // 1. Extract text from PDF
      const resumeText = await extractTextFromPDF(req.file.buffer);

      // 2. Analyze with Gemini 2.5 Flash
      const analysisResult = await analyzeResumeWithGemini(resumeText, jobDescription);

      // 3. Return JSON response
      return res.json({
        success: true,
        data: analysisResult,
      });
    } catch (error) {
      console.error('API Error /api/analyze:', error);
      return res.status(500).json({
        error: error.message || 'An unexpected server error occurred while processing your resume.',
      });
    }
  });
});

export default router;
