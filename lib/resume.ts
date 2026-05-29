import { Redis } from '@upstash/redis'

const redis = new Redis({
  url:   process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const RESUME_KEY = 'resume:latest'

export type ResumeHeader = {
  name: string
  location: string
  phone?: string
  email: string
  linkedin?: string
  github?: string
  portfolio?: string
}

export type ResumeExperience = {
  title: string
  company: string
  location: string
  start: string   // "Jun 2025"
  end:   string   // "Jun 2026" or "Present"
  bullets: string[]
}

export type ResumeEducation = {
  degree: string
  school: string
  location: string
  graduation: string
  extra?: string
}

export type ResumeCertification = { name: string; issuer: string; year: string }
export type ResumeProject       = { name: string; description: string }

export type Resume = {
  header: ResumeHeader
  summary: string
  skills: string[]
  experience: ResumeExperience[]
  education: ResumeEducation[]
  certifications: ResumeCertification[]
  projects: ResumeProject[]
  updatedAt: string
}

export async function getResume(): Promise<Resume | null> {
  const raw = await redis.get(RESUME_KEY)
  if (!raw) return null
  if (typeof raw === 'string') {
    try { return JSON.parse(raw) as Resume } catch { return null }
  }
  return raw as Resume
}

export async function saveResume(r: Resume): Promise<void> {
  const next: Resume = { ...r, updatedAt: new Date().toISOString() }
  await redis.set(RESUME_KEY, JSON.stringify(next))
}

export const defaultResume: Resume = {
  header: {
    name: 'Siddharth Jain',
    location: 'Frankfurt, Germany',
    email: 'sidnov6@gmail.com',
    linkedin: 'linkedin.com/in/siddharth-jain-b33394219',
    github: 'github.com/sidnov6',
    portfolio: 'portfolio-siddharth-jain.vercel.app',
  },
  summary:
    'Full Stack AI Engineer with production experience shipping enterprise GenAI and BI systems at CEO-office scale. Delivered 14 BI dashboards and 7 production GenAI chatbots serving 300+ daily users across 10 manufacturing plants. Now pivoting into Finance AI — MSc at Frankfurt School of Finance & Management, CFA Level 1 in progress, building agentic systems in LangChain/LangGraph for fintech and banking.',
  skills: [
    'Python', 'SQL', 'LangChain', 'LangGraph', 'RAG', 'MCP',
    'Vector DBs (Pinecone, ChromaDB, Weaviate, Qdrant)',
    'PyTorch', 'TensorFlow', 'scikit-learn', 'XGBoost',
    'Apache Spark', 'Kafka', 'Airflow', 'dbt', 'Snowflake', 'Databricks', 'Delta Lake',
    'AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions',
    'Power BI', 'Tableau', 'Looker', 'FastAPI', 'Streamlit',
    'OpenAI / Anthropic / Gemini / Groq APIs',
  ],
  experience: [
    {
      title: 'AI Engineer, CEO Office',
      company: 'Suzlon Energy',
      location: 'Pune, India',
      start: 'Jun 2025',
      end: 'Jun 2026',
      bullets: [
        'Shipped 14 enterprise BI dashboards consolidating 250+ KPIs across SQPDCME, serving 300+ daily users across 10 manufacturing plants in Asia and Europe.',
        'Built 7 production GenAI chatbots using LangChain, RAG, OpenAI APIs, and Azure — covering Safety, Quality, Production, Energy, and HR domains.',
        'Led a 6-person team to deliver the Manufacturing Control Tower, integrating Snowflake, Apache Spark, dbt, and Airflow into a unified analytics layer.',
        'Re-engineered the monthly Manufacturing Business Review using agentic AI, enabling live CXO Q&A across the full manufacturing dataset.',
        'Co-authored the enterprise AI, Data & Digitisation strategy adopted at CEO-office level.',
      ],
    },
    {
      title: 'Research Intern (Medical Imaging)',
      company: 'Coulter Department of Biomedical Engineering, Georgia Tech × Emory',
      location: 'Atlanta, GA',
      start: 'Jan 2024',
      end: 'Sep 2024',
      bullets: [
        'Built a deep-learning CT-scan sarcopenia detector reaching 94% accuracy on 1000+ scans, under Dr. Rakesh Shiradkar.',
        'Reduced per-scan analysis time from ~10 minutes to under 1 second using a PyTorch + DICOM preprocessing pipeline.',
        'Co-authored research outputs feeding into the lab\'s downstream oncology imaging studies.',
      ],
    },
    {
      title: 'Cybersecurity Intern',
      company: 'Georgia Tech',
      location: 'Atlanta, GA',
      start: 'May 2024',
      end: 'Aug 2024',
      bullets: [
        'Selected as 1 of 10 students from India out of 10,000+ applicants for the Georgia Tech summer program (under Matt Sanders).',
        'Built a healthcare cybersecurity middleware enabling secure data exchange between legacy hospital systems and cloud EHR.',
        'Resolved 50+ critical interoperability failures using Python, FHIR, and cloud security tooling.',
      ],
    },
    {
      title: 'Research Intern (5G Network Security)',
      company: 'IIT Jammu',
      location: 'Jammu, India',
      start: 'Oct 2023',
      end: 'Dec 2023',
      bullets: [
        'Designed a containerised IDS/IPS for 5G traffic analysis under Dr. Samaresh Bera.',
        'Improved throughput by 19% under peak load using Docker-isolated detection pipelines.',
      ],
    },
  ],
  education: [
    {
      degree: 'MSc Artificial Intelligence & Data Science',
      school: 'Frankfurt School of Finance & Management',
      location: 'Frankfurt, Germany',
      graduation: '2028',
      extra: 'In progress · #32 worldwide (FT Global Rankings)',
    },
    {
      degree: 'B.Tech Information Technology',
      school: 'VIT Vellore',
      location: 'Vellore, India',
      graduation: '2025',
      extra: 'Completed · #12 in India (NIRF + QS)',
    },
  ],
  certifications: [
    { name: 'CFA Level 1', issuer: 'CFA Institute', year: '2026 (in progress)' },
  ],
  projects: [
    { name: 'Recoupe',                      description: 'Autonomous multi-agent insurance-subrogation recovery system. LangGraph + RAG over policy and claims documents.' },
    { name: 'Dam Rehabilitation Chatbot',   description: 'Live Streamlit + LLM tool for engineering teams. github.com/sidnov6/Dam-Rehabilitation-Chatbot' },
    { name: 'LLM-Powered BI Assistant',     description: 'Natural-language analytics layer over enterprise warehouses. In progress.' },
    { name: 'Real-Time Pipeline Framework', description: 'Streaming-first data pipeline orchestrator. In progress.' },
  ],
  updatedAt: new Date().toISOString(),
}
