import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import analyzeRouter from './routes/analyze.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', analyzeRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'ResumeIQ API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 ResumeIQ Backend running on http://localhost:${PORT}`);
});
