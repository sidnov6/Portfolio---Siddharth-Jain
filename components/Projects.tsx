'use client'
import { useEffect, useRef, useState } from 'react'
import { Github, ExternalLink, Lock } from 'lucide-react'
import { useLang } from '@/lib/language-context'

const projects = [
  {
    id: 0, category: 'Gen AI',
    title: 'Manufacturing GenAI Suite',
    org: 'Suzlon Energy',
    desc: '7 production GenAI chatbots covering KPI Q&A, production insights, safety alerts, and shift-handover automation. Deployed for 300+ users across 10 plants.',
    impact: '300+ daily users · 10 plants',
    tags: ['LangChain', 'RAG', 'OpenAI', 'Azure', 'FastAPI'],
    color: '#F04E23', bg: 'rgba(240,78,35,0.06)',
    live: false, private: true,
  },
  {
    id: 1, category: 'Data Science',
    title: 'CT Scan Sarcopenia Detector',
    org: 'Emory / Georgia Tech',
    desc: 'Deep learning pipeline for automated sarcopenia detection from CT scans. 94% accuracy at ~1mm precision. Analysis time slashed from 10 minutes → <1 second.',
    impact: '94% accuracy · 1000+ CT scans',
    tags: ['PyTorch', 'Computer Vision', 'DICOM', 'Medical AI'],
    color: '#012169', bg: 'rgba(1,33,105,0.05)',
    live: false, private: true,
  },
  {
    id: 2, category: 'Data Engineering',
    title: 'Manufacturing Analytics Platform',
    org: 'Suzlon Energy',
    desc: 'Enterprise data platform unifying 50+ operational sources across 10 plants into 14 dashboards covering 250+ KPIs — Safety, Quality, Productivity, Cost, Energy.',
    impact: '$4.8M savings · 50+ data sources',
    tags: ['Spark', 'dbt', 'Snowflake', 'Airflow', 'Power BI'],
    color: '#F04E23', bg: 'rgba(240,78,35,0.06)',
    live: false, private: true,
  },
  {
    id: 3, category: 'Data Engineering',
    title: 'Healthcare Cybersecurity Middleware',
    org: 'Georgia Institute of Technology',
    desc: 'Middleware platform enabling secure data exchange between legacy hospital systems and cloud EHR platforms. Resolved 50+ critical interoperability failures.',
    impact: '50+ critical failures fixed',
    tags: ['Python', 'FHIR', 'Cybersecurity', 'Healthcare', 'Cloud'],
    color: '#B3A369', bg: 'rgba(179,163,105,0.07)',
    live: false, private: true,
  },
  {
    id: 4, category: 'Data Science',
    title: 'Predictive Quality Analytics',
    org: 'Suzlon Energy',
    desc: 'ML system for quality control across 40 production lines — anomaly detection, automated alerting, and yield optimization contributing directly to plant efficiency.',
    impact: '40 production lines · Real-time',
    tags: ['XGBoost', 'Time Series', 'MLflow', 'Anomaly Detection'],
    color: '#2D7A52', bg: 'rgba(45,122,82,0.06)',
    live: false, private: true,
  },
  {
    id: 5, category: 'Data Engineering',
    title: '5G Network Security Analyzer',
    org: 'IIT Jammu',
    desc: 'Containerized IDS/IPS for 5G traffic analysis and anomaly detection under Dr. Samaresh Bera. Improved network throughput by 19% under peak load.',
    impact: '+19% throughput under peak load',
    tags: ['Docker', '5G', 'IDS/IPS', 'Network Security'],
    color: '#003F88', bg: 'rgba(0,63,136,0.06)',
    live: false, private: true,
  },
  {
    id: 6, category: 'Gen AI',
    title: 'LLM-Powered BI Assistant',
    org: 'Personal Project',
    desc: 'Natural language interface for business intelligence. Translates plain-English queries to SQL, executes against live DB, and returns insight summaries with charts.',
    impact: 'Democratises data access',
    tags: ['LangChain', 'Text-to-SQL', 'Streamlit', 'PostgreSQL'],
    color: '#1A3D2B', bg: 'rgba(26,61,43,0.06)',
    live: true, github: 'https://github.com/sidnov6',
  },
  {
    id: 7, category: 'Data Engineering',
    title: 'Real-Time Pipeline Framework',
    org: 'Personal Project',
    desc: 'Scalable streaming pipeline with Kafka + Spark Streaming. Supports real-time analytics, event processing, and ML feature generation with a Grafana monitoring dashboard.',
    impact: 'Millions of events / minute',
    tags: ['Kafka', 'Spark Streaming', 'Docker', 'Grafana', 'Redis'],
    color: '#2D7A52', bg: 'rgba(45,122,82,0.06)',
    live: true, github: 'https://github.com/sidnov6',
  },
]

const filters = ['All', 'Gen AI', 'Data Science', 'Data Engineering']

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const [cat, setCat] = useState('All')
  const { lang } = useLang()
  const isDE = lang === 'de'

  useEffect(() => {
    const io = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  const shown = cat === 'All' ? projects : projects.filter(p => p.category === cat)

  return (
    <section id="projects" ref={ref} className="py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <p className="reveal text-xs font-mono uppercase tracking-[0.2em] text-[#3DAA72] mb-4">04 / Projects</p>
        <h2 className="reveal font-display text-[clamp(2.2rem,5vw,3.8rem)] font-black text-[#1A1A18] mb-3 leading-tight">
          Things I've <em className="text-[#1A3D2B]">Built</em>
        </h2>
        <p className="reveal text-[#6E7A70] text-lg max-w-2xl mb-10 leading-relaxed">
          Production systems at Fortune 500 scale, not just demos. Most are enterprise and private — the impact is the proof.
        </p>

        {/* Filter */}
        <div className="reveal flex flex-wrap gap-2 mb-10">
          {filters.map(f => (
            <button key={f} onClick={() => setCat(f)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={cat === f
                ? { background: '#1A3D2B', color: '#fff', boxShadow: '0 4px 16px rgba(26,61,43,0.25)' }
                : { background: '#F8F5EE', color: '#4A4A47', border: '1.5px solid #E4E0D6' }
              }
            >
              {f}
            </button>
          ))}
        </div>

        <div className="reveal grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {shown.map(p => (
            <div key={p.id} className="group bg-[#F8F5EE] border border-[#E4E0D6] rounded-2xl overflow-hidden card-lift flex flex-col">
              {/* Top color band + photo slot */}
              <div className="relative h-36 flex items-center justify-center overflow-hidden" style={{ background: p.bg }}>
                {/* Photo (when added) */}
                <img src={`/projects/project-${p.id}.jpg`} alt="" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  onError={() => {}} />
                {/* Category pill */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <span className="text-xs font-bold font-mono uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ background: `${p.color}15`, color: p.color }}>
                    {p.category}
                  </span>
                  <span className="text-[10px] text-[#8A9280] font-mono">{p.org}</span>
                </div>
                {p.live && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/80 backdrop-blur-sm rounded-full px-2.5 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3DAA72] animate-pulse" />
                    <span className="text-[10px] font-mono text-[#1A3D2B] font-bold">LIVE</span>
                  </div>
                )}
                {/* Photo hint */}
                <span className="absolute bottom-2 left-2 text-[9px] font-mono text-[#C0B8B0] opacity-0 group-hover:opacity-100 transition-opacity">📷 drop photo here</span>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-[#1A1A18] text-base mb-1.5 leading-snug group-hover:text-[#1A3D2B] transition-colors">
                  {p.title}
                </h3>
                <p className="text-[#6E7A70] text-sm leading-relaxed mb-3 flex-1">{p.desc}</p>

                {/* Impact */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg mb-3"
                  style={{ background: `${p.color}08`, border: `1px solid ${p.color}20` }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
                  <span className="text-xs font-semibold" style={{ color: p.color }}>{p.impact}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.map(t => (
                    <span key={t} className="text-[11px] px-2 py-0.5 bg-white border border-[#E4E0D6] rounded-full text-[#6E7A70]">{t}</span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-3 border-t border-[#E4E0D6]">
                  {p.github ? (
                    <a href={p.github} target="_blank" className="flex items-center gap-1.5 text-[#4A4A47] hover:text-[#1A1A18] text-xs font-medium transition-colors">
                      <Github size={14} /> Code
                    </a>
                  ) : (
                    <span className="flex items-center gap-1.5 text-[#C0B8B0] text-xs">
                      <Lock size={13} /> Enterprise
                    </span>
                  )}
                  {p.live ? (
                    <a href="#" className="ml-auto flex items-center gap-1.5 text-xs font-semibold transition-colors" style={{ color: p.color }}>
                      <ExternalLink size={13} /> Live Demo
                    </a>
                  ) : (
                    <span className="ml-auto text-[10px] font-mono text-[#C0B8B0]">Private / NDA</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="reveal mt-8 text-center text-sm text-[#8A9280] font-mono">
          More on <a href="https://github.com/sidnov6" target="_blank" className="text-[#1A3D2B] hover:underline">github.com/sidnov6</a>
        </p>
      </div>
    </section>
  )
}
