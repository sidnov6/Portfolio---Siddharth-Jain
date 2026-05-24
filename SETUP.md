# Siddharth Jain Portfolio — Setup Guide

## Quick Start (3 steps)

### Step 1: Install Node.js
Download from https://nodejs.org/ (LTS version recommended)
Or via Homebrew: `brew install node`

### Step 2: Install dependencies
```bash
cd /Users/siddharthjain/Desktop/Portfolio
npm install
```

### Step 3: Set up the AI Chatbot (FREE)
1. Go to https://aistudio.google.com/app/apikey
2. Sign in with Google → Create API Key → Copy it
3. Create the env file:
   ```bash
   cp .env.local.example .env.local
   ```
4. Open `.env.local` and replace `your_gemini_api_key_here` with your key

### Step 4: Run locally
```bash
npm run dev
```
Visit http://localhost:3000 — your portfolio is live!

---

## Adding Your Photos

Drop photos into the `public/` folder using these exact filenames:

### About / Profile Photos
- `public/profile.jpg` — Your main profile photo (used in hero/about)
- `public/profile-bg.jpg` — Background/action photo

### Experience Photos
- `public/projects/chatbot-suite.jpg` — Suzlon GenAI chatbot screenshot
- `public/projects/ct-scan.jpg` — Emory medical AI work
- `public/projects/analytics-platform.jpg` — Suzlon dashboard screenshot
- `public/projects/healthcare-middleware.jpg` — Georgia Tech cybersecurity
- `public/projects/predictive-quality.jpg` — Predictive analytics charts
- `public/projects/5g-security.jpg` — IIT Jammu research
- `public/projects/llm-bi.jpg` — LLM BI assistant screenshot
- `public/projects/pipeline-framework.jpg` — Pipeline architecture diagram

### Education Photos
- `public/education/frankfurt-school.jpg` — Frankfurt School campus/you there
- `public/education/vit-vellore.jpg` — VIT campus/graduation/you there

### Beyond Code Photos
- `public/beyond/basketball-1.jpg` — Basketball action shot
- `public/beyond/basketball-2.jpg` — Team photo or game
- `public/beyond/basketball-3.jpg` — Court/training
- `public/beyond/manutd-1.jpg` — You in Man Utd gear
- `public/beyond/manutd-2.jpg` — Match or celebration photo
- `public/beyond/geo-1.jpg` — Conference/debate/travel photo
- `public/beyond/debate-1.jpg` — Debate or public speaking photo

### Resume
- `public/resume.pdf` — Your latest resume (the Download Resume button links here)

---

## Deploying to the Web (Vercel — FREE)

1. Push your code to GitHub
2. Go to https://vercel.com → Import project
3. Add environment variable: `GEMINI_API_KEY` = your key
4. Click Deploy — your portfolio will be live at `yourname.vercel.app`

### Custom domain
In Vercel settings, add your custom domain (e.g., siddharthjain.dev)

---

## Customizing Content

All content is in the component files:
- `components/Hero.tsx` — Main stats and headline
- `components/About.tsx` — Bio and quick facts
- `components/Skills.tsx` — Tech skills and levels
- `components/Experience.tsx` — Work experience timeline
- `components/Projects.tsx` — Project cards
- `components/Education.tsx` — Degrees
- `components/BeyondCode.tsx` — Basketball, Man Utd, etc.
- `components/Contact.tsx` — Contact section
- `app/api/chat/route.ts` — Chatbot knowledge base (update this when you want to add new info)

---

## Project Structure
```
Portfolio/
├── app/
│   ├── layout.tsx          # Root layout & metadata
│   ├── page.tsx            # Main page (assembles all sections)
│   ├── globals.css         # Global styles & animations
│   └── api/chat/route.ts   # Chatbot API (Gemini)
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   ├── Education.tsx
│   ├── BeyondCode.tsx
│   ├── Contact.tsx
│   ├── Chatbot.tsx
│   └── Footer.tsx
├── public/
│   ├── projects/           # Project screenshots
│   ├── education/          # Campus/institution photos
│   ├── beyond/             # Basketball, Man Utd, etc.
│   └── resume.pdf          # Your resume
├── .env.local              # API keys (DO NOT commit)
└── package.json
```
