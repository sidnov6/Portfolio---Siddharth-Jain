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
  start: string
  end:   string
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
export type SkillGroup          = { category: string; items: string[] }

export type AdditionalInfo = {
  languages: string[]   // e.g. ["English (Native)", "Hindi (Native)", "French (Elementary)"]
  hobbies:   string[]
}

export type Resume = {
  header: ResumeHeader
  /** Used in the on-site embed (Harvard PDF omits a summary). */
  summary: string
  skills: SkillGroup[]
  experience: ResumeExperience[]
  extracurriculars: ResumeExperience[]
  education: ResumeEducation[]
  certifications: ResumeCertification[]
  projects: ResumeProject[]
  additionalInfo: AdditionalInfo
  updatedAt: string
}

/** Accept legacy `string[]` payloads coming back from Redis and convert them
    into a single "Skills" group so the renderer never crashes. */
function normaliseSkills(raw: unknown): SkillGroup[] {
  if (Array.isArray(raw) && raw.length > 0 && typeof raw[0] === 'string') {
    return [{ category: 'Skills', items: raw as string[] }]
  }
  if (Array.isArray(raw)) return raw as SkillGroup[]
  return []
}

/** Fill in any newly-added fields that older stored resumes won't have. */
function backfill(r: Resume): Resume {
  return {
    ...r,
    skills: normaliseSkills(r.skills),
    extracurriculars: r.extracurriculars ?? [],
    additionalInfo: r.additionalInfo ?? { languages: [], hobbies: [] },
  }
}

export async function getResume(): Promise<Resume | null> {
  const raw = await redis.get(RESUME_KEY)
  if (!raw) return null
  let parsed: Resume | null = null
  if (typeof raw === 'string') {
    try { parsed = JSON.parse(raw) as Resume } catch { return null }
  } else {
    parsed = raw as Resume
  }
  if (!parsed) return null
  return backfill(parsed)
}

export async function saveResume(r: Resume): Promise<void> {
  const next: Resume = { ...r, updatedAt: new Date().toISOString() }
  await redis.set(RESUME_KEY, JSON.stringify(next))
}

export const defaultResume: Resume = {
  header: {
    name: 'Siddharth Jain',
    location: 'Frankfurt, Germany',
    phone: '+91 70422 20207',
    email: 'sidnov6@gmail.com',
    linkedin: 'linkedin.com/in/siddharth-jain-b33394219',
    github: 'github.com/sidnov6',
    portfolio: 'portfolio-siddharth-jain.vercel.app',
  },
  summary:
    'Full Stack AI Engineer with production experience shipping enterprise GenAI and BI systems at CEO-office scale. Delivered 14 BI dashboards and 7 production GenAI chatbots serving 300+ daily users across 10 manufacturing plants. Now pivoting into Finance AI — MSc at Frankfurt School of Finance & Management, CFA Level 1 in progress, building agentic systems in LangChain/LangGraph for fintech and banking.',
  skills: [
    { category: 'Languages / Data',  items: ['Python', 'SQL', 'Apache Spark', 'Kafka', 'Airflow', 'dbt', 'Snowflake', 'Databricks', 'Delta Lake'] },
    { category: 'GenAI / ML',        items: ['LangChain', 'LangGraph', 'RAG', 'MCP', 'PyTorch', 'TensorFlow', 'scikit-learn', 'XGBoost', 'vector DBs (Pinecone, Chroma, Weaviate, Qdrant)'] },
    { category: 'Cloud / DevOps',    items: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'] },
    { category: 'BI / Apps',         items: ['Power BI', 'Tableau', 'Looker', 'FastAPI', 'Streamlit'] },
  ],
  education: [
    {
      degree: 'MSc Artificial Intelligence & Data Science',
      school: 'Frankfurt School of Finance & Management',
      location: 'Frankfurt, Germany',
      graduation: '2026 - 2028',
      extra: 'In progress. Ranked #32 worldwide (FT Global Rankings). Coursework includes Agentic AI for Finance, Quantitative Methods, and Financial Modelling.',
    },
    {
      degree: 'B.Tech Information Technology',
      school: 'Vellore Institute of Technology',
      location: 'Vellore, India',
      graduation: '2021 - 2025',
      extra: 'CGPA 8.36/10. Ranked #12 in India (NIRF + QS). Capstone: e-commerce chatbot automating 78% of queries (5 min → 3 s) across 45,000 product entries.',
    },
  ],
  experience: [
    {
      title: 'AI Engineer, CEO Office',
      company: 'Suzlon Energy',
      location: 'Pune, India',
      start: 'Jun 2025',
      end: 'Jun 2026',
      bullets: [
        'Shipped 14 enterprise BI dashboards consolidating 250+ KPIs across Safety, Quality, Production, Delivery, Cost, Manpower, Environment (SQPDCME), serving 300+ daily users across 10 manufacturing plants in Asia and Europe.',
        'Built 7 production GenAI chatbots using LangChain, RAG, OpenAI APIs, and Azure across Safety, Quality, Production, Energy, and HR domains.',
        'Led a 6-person team to deliver the Manufacturing Control Tower, integrating Snowflake, Spark, dbt, and Airflow into a unified analytics layer.',
        'Co-authored the enterprise AI, Data & Digitisation strategy adopted at CEO-office level, contributing to $4.8M in cost savings.',
      ],
    },
    {
      title: 'AI Research Intern (Medical Imaging)',
      company: 'Coulter BME, Georgia Tech × Emory',
      location: 'Atlanta, GA',
      start: 'Jan 2024',
      end: 'Sep 2024',
      bullets: [
        'Built a deep-learning CT-scan sarcopenia detector reaching 94% accuracy on 1,000+ scans under Dr. Rakesh Shiradkar.',
        'Reduced per-scan analysis time from ~10 minutes to under 1 second using a PyTorch + DICOM preprocessing pipeline.',
      ],
    },
    {
      title: 'Cybersecurity Summer Intern',
      company: 'Georgia Tech Research Institute',
      location: 'Atlanta, GA',
      start: 'May 2024',
      end: 'Aug 2024',
      bullets: [
        'Selected as 1 of 10 from India out of 10,000+ applicants; worked with Matt Sanders on healthcare interoperability.',
        'Owned components of a security middleware for patient-data pipelines, resolving 50+ critical integration failures between legacy hospital systems and cloud EHR.',
      ],
    },
    {
      title: 'Research Intern (5G & Network Security)',
      company: 'IIT Jammu',
      location: 'Jammu, India',
      start: 'Oct 2023',
      end: 'Dec 2023',
      bullets: [
        'Designed containerised IDS/IPS for 5G traffic analysis under Dr. Samaresh Bera, improving throughput by 19% under peak load.',
      ],
    },
  ],
  extracurriculars: [
    {
      title: 'Volunteer Educator (CSR)',
      company: 'Suzlon Energy',
      location: 'Pune, India',
      start: 'Jun 2025',
      end: 'Jun 2026',
      bullets: [
        'Led weekly AI literacy sessions for 50+ children of plant staff, expanding access to tech education for underserved groups.',
      ],
    },
    {
      title: 'Operations & Marketing Head, ACM Student Chapter',
      company: 'Vellore Institute of Technology',
      location: 'Vellore, India',
      start: 'Mar 2022',
      end: 'Aug 2024',
      bullets: [
        'Raised $11,000 via 200+ cold calls to corporate partners, securing sponsorships for hackathons and ideathons.',
        'Led operations for multi-day events with 500+ participants, managing logistics, vendors, and cross-team execution.',
      ],
    },
    {
      title: 'Volunteer Educator',
      company: 'Becoming I Foundation',
      location: 'Vellore, India',
      start: 'Mar 2022',
      end: 'Aug 2024',
      bullets: [
        'Taught Python and Mathematics to 200 students across 4 government schools, designing a curriculum for first-time computer users.',
      ],
    },
  ],
  certifications: [
    { name: 'CFA Level 1', issuer: 'CFA Institute', year: '2026 (in progress)' },
  ],
  projects: [
    { name: 'Recoupe',                    description: 'Autonomous multi-agent insurance-subrogation recovery system. LangGraph + RAG over policy and claims documents.' },
    { name: 'Dam Rehabilitation Chatbot', description: 'Live Streamlit + LLM tool for engineering teams. github.com/sidnov6/Dam-Rehabilitation-Chatbot' },
    { name: 'LLM-Powered BI Assistant',   description: 'Natural-language analytics layer over enterprise warehouses. In progress.' },
  ],
  additionalInfo: {
    languages: ['English (Native)', 'Hindi (Native)', 'French (Elementary Proficiency)'],
    hobbies:   ['National-level basketball (point guard)', 'Manchester United supporter', 'Geopolitics (Indo-Pacific, EU economic policy)', 'Competitive debate / Model UN'],
  },
  updatedAt: new Date().toISOString(),
}
