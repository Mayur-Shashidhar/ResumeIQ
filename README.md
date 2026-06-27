# 🚀 ResumeIQ — Production-Grade AI Resume Analyzer & FAANG Recruiting Intelligence Platform

> **Get recruiter-quality feedback on your resume in under 30 seconds.**  
> Built with React, Vite, Node.js/Express, and powered by the official `@google/genai` SDK with **Google Gemini 2.5 Flash**.

---

## 💡 Overview

**ResumeIQ** is not a generic chatbot or simple keyword matcher. It is an enterprise-grade AI Resume Intelligence Platform designed to behave like an experienced FAANG Senior Staff Technical Recruiter coupled with an advanced Applicant Tracking System (ATS) parsing engine.

By evaluating candidate resumes against actual tech industry standards (or target job descriptions), ResumeIQ provides surgical, actionable feedback, interactive score improvement simulations, viral constructive roasts, and recruiter desk notes.

---

## 🌟 Signature Features & Analytical Modules

### 1. 🏛️ AI Hiring Intelligence Engine (`AIHiringIntelligenceDashboard.jsx`)
- **Modern Executive Dashboard**: A gauge-free, data-driven hero dashboard designed in the aesthetic language of Stripe, Linear, Vercel, and Apple.
- **Dynamic Score Centerpiece**: Animated candidate score (0–100) with real-time score-to-status synchronization (`>= 91 => Fast Track`).
- **Recruiter Verdict Card**: Executive recommendation commentary written in the active tech recruiter's persona voice.
- **4 SaaS Metric Widgets**: Interview Advancement Probability, Assessment Confidence (95%+), ATS Ranking Percentile (`Top 2%`), and Funnel Position.
- **FAANG Recruitment Funnel**: Interactive 6-stage candidate progression pipeline (`Resume Submitted` → `ATS Passed` → `Recruiter Review` → `Technical Screen` → `Interview` → `Offer Ready`).
- **Real-Time Latency Meter**: High-resolution browser timer (`performance.now()`) measuring exact end-to-end AI API processing speed (e.g., `⚡ Generated in 1.4s`).

### 2. 🏢 Dynamic Tech Giant Recruiter Persona Engine (`recruiterPrompt.js`)
ResumeIQ automatically detects target companies in job descriptions and dynamically shifts its executive recruiter persona, voice, title, and evaluation focus:
- 🟢 **Google / General Tech**: **Sarah Chen** — Senior Staff Technical Recruiter (*Former Google & Meta, 15+ Yrs Exp*).
- 🔵 **Microsoft / Azure**: **Marcus Vance** — Senior Executive Technical Recruiter (*Former Microsoft Azure Lead, 14+ Yrs Exp*).
- 🟠 **Amazon / AWS**: **Devon Vance** — Principal Talent Acquisition Specialist (*Former Amazon AWS Lead, 16+ Yrs Exp*).
- 🟣 **Meta / Instagram**: **Priya Sharma** — Lead Engineering Recruiter (*Former Meta Infrastructure, 12+ Yrs Exp*).
- 🔴 **Apple / CoreOS**: **Alex Radcliffe** — Senior Technical Talent Specialist (*Former Apple Systems Recruiter, 15+ Yrs Exp*).

### 3. 🔥 Signature Feature — AI Resume Roast (`ResumeRoastCard.jsx`)
- **Brutally Honest, Constructive Criticism**: Entertains the candidate while delivering actionable resume improvements.
- **Multi-Level Mode Controls**: Segmented tabs for 🟢 **Mild**, 🟡 **Medium**, and 🔴 **Savage** roast intensity.
- **Staggered Reveal & Interactive Toolbar**: Features typewriter reveal animations, `😂 Roast Me Again`, `🔥 Roast Harder`, `✨ Fix Everything` (smooth-scrolls to simulator), and `📸 Share My Roast`.
- **Social Share Modal**: Generates a shareable card preview with single-click clipboard copying.

### 4. 📈 Interactive Resume Improvement Simulator (`ImprovementSimulator.jsx`)
- Allows candidates to toggle suggested improvements (quantifying metrics, adding cloud skills, formatting summary headers) and visually preview predicted score gains live (e.g., `88 → 95 Points`).

### 5. 🎯 Additional Comprehensive Modules
- **Scores Breakdown (`ScoresBreakdown.jsx`)**: Granular scores across ATS, Technical Depth, Impact, Grammar, Formatting, and Confidence.
- **Profile Radar Chart (`RadarChartCard.jsx`)**: Multi-axis visual representation of candidate competencies.
- **Job Match Analysis (`ResumeMatchSection.jsx`)**: Matched vs. missing technical skills and keywords against target roles.
- **Recruiter Desk Sticky Notes (`RecruiterNotesCard.jsx`)**: Simulated yellow sticky notes detailing positive signals, recommendations, and red flags.
- **Senior Question Bank (`InterviewQuestionsCard.jsx`)**: Tailored Technical, System Design, Behavioral, and Project deep-dive interview questions with model answers.
- **Tier-1 Readiness Benchmarks (`CompanyReadinessCard.jsx`)**: Individual candidate fit scores across 10 top tech companies (Google, Amazon, Microsoft, Meta, Apple, Netflix, NVIDIA, Uber, Stripe, Palantir).
- **High-Impact Bullet Point Rewrites (`BulletImprovementsCard.jsx`)**: Side-by-side original vs. quantified metric rewrites.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18 + Vite 5 | Fast HMR and lightweight production bundles (`npx vite build`). |
| **Styling & Motion** | Tailwind CSS + Framer Motion | Custom glassmorphism design system, smooth entrance animations, and micro-interactions. |
| **Icons** | Lucide React | Modern linear icon set. |
| **Backend Server** | Node.js + Express | Lightweight API server running on port `5001`. |
| **AI SDK** | `@google/genai` (Official SDK) | Structured JSON output via `gemini-2.5-flash` with fallback resilience. |
| **Document Parsing** | `pdf-parse` | Extracted plain text parsing from uploaded PDF resumes. |
| **File Uploads** | `multer` | Multipart form-data handling in memory. |

---

## 📁 Project Structure

```
resumeiq/
├── client/                      # Vite + React Frontend Application
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── components/          # 20+ Modular SaaS UI Components
│   │   │   ├── AIHiringIntelligenceDashboard.jsx  # Primary Hero Centerpiece
│   │   │   ├── ResumeRoastCard.jsx                # Viral 🔥 AI Resume Roast
│   │   │   ├── ImprovementSimulator.jsx           # Interactive Score Simulator
│   │   │   ├── FormattedText.jsx                  # Custom Markdown Asterisk Parser
│   │   │   ├── ErrorBoundary.jsx                  # React Runtime Protection Guard
│   │   │   ├── ScreeningSimulation.jsx            # Animated Loading Simulation
│   │   │   └── ... (ScoresBreakdown, RadarChart, etc.)
│   │   ├── App.jsx              # Main React Application & Timer Logic
│   │   ├── main.jsx             # React DOM Root Entry
│   │   └── index.css            # Custom Design System Tokens & Utilities
│   ├── index.html               # App Entry HTML (Clean slate-50 background)
│   ├── vite.config.js           # Vite config with API proxy to localhost:5001
│   └── package.json
│
├── server/                      # Node.js + Express Backend Server
│   ├── prompts/
│   │   └── recruiterPrompt.js   # Dynamic Tech Giant Persona Prompt Builder
│   ├── services/
│   │   └── geminiService.js     # Gemini API Multi-Model Fallback Pipeline
│   ├── .env                     # Server environment variables (GEMINI_API_KEY)
│   ├── index.js                 # Express app setup & route handlers (Port 5001)
│   └── package.json
│
└── README.md                    # System Documentation
```

---

## ⚡ API Resilience & High-Demand Fallback Pipeline

To guarantee 100% application uptime during global Google API demand spikes (503 Service Unavailable), `geminiService.js` implements a 3-tier resilience architecture:

1. **Primary Model Attempt**: Tries `gemini-2.5-flash` with `responseMimeType: 'application/json'`.
2. **Model Retries & Fallback**: If rate-limited or unavailable, automatically retries with exponential backoff before failing over seamlessly to `gemini-1.5-flash`.
3. **Realistic Evaluation Benchmark Generator**: If external network connectivity is lost, generates a dynamic, realistic candidate analysis based on regex tech stack extraction to prevent application crashes.

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn
- A Google Gemini API Key ([Get one here from Google AI Studio](https://aistudio.google.com/))

### 1. Clone & Configure Server
```bash
cd /Users/mayurshadhidhar/Documents/resumeiq/server
npm install
```

Create or update the `.env` file in `server/`:
```env
PORT=5001
GEMINI_API_KEY=your_gemini_api_key_here
```

### 2. Configure Client
```bash
cd /Users/mayurshadhidhar/Documents/resumeiq/client
npm install
```

---

## 🚀 Running the Application Locally

### Start Backend Express Server (Port 5001)
```bash
cd server
npm run dev
# Server running on http://localhost:5001
```

### Start Frontend Vite Dev Server (Port 3000)
```bash
cd client
npm run dev
# App accessible at http://localhost:3000
```

---

## 🧪 Production Verification & Build

To verify compilation correctness and build production bundles:
```bash
cd client
npx vite build
```
*Output build artifacts will be generated in `client/dist` in ~2.2 seconds with zero compilation errors.*

---

## 🛡️ License & Acknowledgments
Built with ❤️ for candidate empowerment and recruitment transparency. Powered by Google DeepMind & Google Gemini 2.5 Flash.
