'use client'
import { useEffect, useRef, useState } from 'react'
import { Github, ExternalLink, Lock, X, Maximize2 } from 'lucide-react'
import { useLang } from '@/lib/language-context'

const projects = [
  {
    id: 0, category: 'Gen AI',
    title: 'Manufacturing GenAI Suite',
    org: 'Suzlon Energy',
    desc_en: '7 production GenAI chatbots covering KPI Q&A, production insights, safety alerts, and shift-handover automation. Deployed for 300+ users across 10 plants.',
    desc_de: '7 produktive GenAI-Chatbots für KPI-Q&A, Produktions-Insights, Sicherheitswarnungen und Schichtübergabe-Automatisierung. Im Einsatz für 300+ Nutzer in 10 Werken.',
    impact_en: '300+ daily users · 10 plants',
    impact_de: '300+ tägliche Nutzer · 10 Werke',
    tags: ['LangChain', 'RAG', 'OpenAI', 'Azure', 'FastAPI'],
    color: '#F04E23', bg: 'rgba(240,78,35,0.06)',
    live: false, private: true,
  },
  {
    id: 1, category: 'Data Science',
    title: 'CT Scan Sarcopenia Detector',
    org: 'Coulter BME (GT × Emory)',
    desc_en: 'Deep learning pipeline for automated sarcopenia detection from CT scans. 94% accuracy at ~1mm precision. Analysis time slashed from 10 minutes → <1 second.',
    desc_de: 'Deep-Learning-Pipeline zur automatisierten Sarkopenie-Erkennung aus CT-Scans. 94% Genauigkeit bei ~1mm Präzision. Analysezeit von 10 Minuten auf <1 Sekunde reduziert.',
    impact_en: '94% accuracy · 1000+ CT scans',
    impact_de: '94% Genauigkeit · 1000+ CT-Scans',
    tags: ['PyTorch', 'Computer Vision', 'DICOM', 'Medical AI'],
    color: '#012169', bg: 'rgba(1,33,105,0.05)',
    live: false, private: true,
  },
  {
    id: 2, category: 'Data Engineering',
    title: 'Manufacturing Analytics Platform',
    org: 'Suzlon Energy',
    desc_en: 'Enterprise data platform unifying 50+ operational sources across 10 plants into 14 dashboards covering 250+ KPIs — Safety, Quality, Productivity, Cost, Energy.',
    desc_de: 'Enterprise-Datenplattform, die 50+ operative Quellen über 10 Werke in 14 Dashboards mit 250+ KPIs vereint — Sicherheit, Qualität, Produktivität, Kosten, Energie.',
    impact_en: '14 dashboards · 50+ data sources',
    impact_de: '14 Dashboards · 50+ Datenquellen',
    tags: ['Spark', 'dbt', 'Snowflake', 'Airflow', 'Power BI'],
    color: '#F04E23', bg: 'rgba(240,78,35,0.06)',
    live: false, private: true,
  },
  {
    id: 3, category: 'Data Engineering',
    title: 'Healthcare Cybersecurity Middleware',
    org: 'Georgia Institute of Technology',
    desc_en: 'Middleware platform enabling secure data exchange between legacy hospital systems and cloud EHR platforms. Resolved 50+ critical interoperability failures.',
    desc_de: 'Middleware-Plattform für sicheren Datenaustausch zwischen Legacy-Krankenhaussystemen und Cloud-EHR-Plattformen. 50+ kritische Interoperabilitätsfehler behoben.',
    impact_en: '50+ critical failures fixed',
    impact_de: '50+ kritische Fehler behoben',
    tags: ['Python', 'FHIR', 'Cybersecurity', 'Healthcare', 'Cloud'],
    color: '#B3A369', bg: 'rgba(179,163,105,0.07)',
    live: false, private: true,
  },
  {
    id: 4, category: 'Data Science',
    title: 'Predictive Quality Analytics',
    org: 'Suzlon Energy',
    desc_en: 'ML system for quality control across 40 production lines — anomaly detection, automated alerting, and yield optimization contributing directly to plant efficiency.',
    desc_de: 'ML-System zur Qualitätskontrolle über 40 Produktionslinien — Anomalieerkennung, automatisierte Alarmierung und Ertragsoptimierung mit direkter Wirkung auf die Werkseffizienz.',
    impact_en: '40 production lines · Real-time',
    impact_de: '40 Produktionslinien · Echtzeit',
    tags: ['XGBoost', 'Time Series', 'MLflow', 'Anomaly Detection'],
    color: '#2D7A52', bg: 'rgba(45,122,82,0.06)',
    live: false, private: true,
  },
  {
    id: 5, category: 'Data Engineering',
    title: '5G Network Security Analyzer',
    org: 'IIT Jammu',
    desc_en: 'Containerized IDS/IPS for 5G traffic analysis and anomaly detection under Dr. Samaresh Bera. Improved network throughput by 19% under peak load.',
    desc_de: 'Containerisiertes IDS/IPS zur 5G-Verkehrsanalyse und Anomalieerkennung unter Dr. Samaresh Bera. 19% höherer Netzwerkdurchsatz unter Spitzenlast.',
    impact_en: '+19% throughput under peak load',
    impact_de: '+19% Durchsatz unter Spitzenlast',
    tags: ['Docker', '5G', 'IDS/IPS', 'Network Security'],
    color: '#003F88', bg: 'rgba(0,63,136,0.06)',
    live: false, private: true,
  },
  {
    id: 6, category: 'Gen AI',
    title: 'Dam Rehabilitation Chatbot',
    org: 'Personal Project',
    desc_en: 'AI-powered chatbot for dam condition assessment and rehabilitation planning. Guides engineers through structural inspection, interprets damage data, and recommends maintenance strategies.',
    desc_de: 'KI-Chatbot zur Bewertung von Dammzuständen und Sanierungsplanung. Führt Ingenieure durch die strukturelle Inspektion, interpretiert Schadensdaten und empfiehlt Wartungsstrategien.',
    impact_en: 'Civil Infrastructure AI · Live',
    impact_de: 'KI für Infrastruktur · Live',
    tags: ['Streamlit', 'Python', 'LLM', 'AI Chatbot', 'Civil AI'],
    color: '#1A6B8A', bg: 'rgba(26,107,138,0.06)',
    live: true,
    github: 'https://github.com/sidnov6/Dam-Rehabilitation-Chatbot',
    demoUrl: 'https://dam-rehabilitation-chatbot-75ykbjzaxmyugbchirtoxp.streamlit.app/?embed=true',
    demoFallback: 'https://dam-rehabilitation-chatbot-75ykbjzaxmyugbchirtoxp.streamlit.app/',
    demoPlatform: 'Streamlit',
  },
  {
    id: 9, category: 'Gen AI',
    title: 'Recoupe — Autonomous Subrogation',
    org: 'Personal Project',
    desc_en: 'Multi-agent platform that reads closed insurance claims, assigns fault by jurisdiction, computes the recoverable amount, drafts demand letters, and works counter-offers. Seven specialized agents over a RAG layer of US negligence law + carrier behaviour. Every decision citation-grounded and auditable.',
    desc_de: 'Multi-Agent-Plattform, die abgeschlossene Versicherungsfälle liest, die Haftung pro Jurisdiktion zuordnet, den erstattungsfähigen Betrag berechnet, Forderungsschreiben verfasst und Gegenangebote bearbeitet. Sieben Agenten über einer RAG-Schicht aus US-Fahrlässigkeitsrecht + Carrier-Verhalten. Jede Entscheidung ist zitatgestützt und prüfungsfest.',
    impact_en: '7 agents · citation-grounded',
    impact_de: '7 Agenten · zitatgestützt',
    tags: ['Multi-Agent', 'RAG', 'Groq', 'FastAPI', 'Insurance AI'],
    color: '#4A1E3F', bg: 'rgba(74,30,63,0.06)',
    live: true,
    private: true,
    demoUrl: 'https://recoupe.onrender.com/#/dashboard',
    demoFallback: 'https://recoupe.onrender.com/#/dashboard',
    demoPlatform: 'Render',
  },
  {
    id: 7, category: 'Gen AI',
    title: 'LLM-Powered BI Assistant',
    org: 'Personal Project',
    desc_en: 'Natural language interface for business intelligence. Translates plain-English queries to SQL, executes against live DB, and returns insight summaries with charts.',
    desc_de: 'Natürlichsprachliche Schnittstelle für Business Intelligence. Übersetzt Klartext-Anfragen in SQL, führt sie gegen die Live-DB aus und liefert Insight-Zusammenfassungen mit Charts.',
    impact_en: 'Democratises data access',
    impact_de: 'Demokratisiert Datenzugang',
    tags: ['LangChain', 'Text-to-SQL', 'Streamlit', 'PostgreSQL'],
    color: '#1A3D2B', bg: 'rgba(26,61,43,0.06)',
    live: true, github: 'https://github.com/sidnov6',
  },
  {
    id: 8, category: 'Data Engineering',
    title: 'Real-Time Pipeline Framework',
    org: 'Personal Project',
    desc_en: 'Scalable streaming pipeline with Kafka + Spark Streaming. Supports real-time analytics, event processing, and ML feature generation with a Grafana monitoring dashboard.',
    desc_de: 'Skalierbare Streaming-Pipeline mit Kafka + Spark Streaming. Unterstützt Echtzeit-Analytics, Event-Verarbeitung und ML-Feature-Generierung mit Grafana-Monitoring.',
    impact_en: 'Millions of events / minute',
    impact_de: 'Millionen Events / Minute',
    tags: ['Kafka', 'Spark Streaming', 'Docker', 'Grafana', 'Redis'],
    color: '#2D7A52', bg: 'rgba(45,122,82,0.06)',
    live: true, github: 'https://github.com/sidnov6',
  },
]

const filters: { id: string; en: string; de: string }[] = [
  { id: 'All',              en: 'All',              de: 'Alle' },
  { id: 'Gen AI',           en: 'Gen AI',           de: 'GenAI' },
  { id: 'Data Science',     en: 'Data Science',     de: 'Data Science' },
  { id: 'Data Engineering', en: 'Data Engineering', de: 'Data Engineering' },
]

function LiveDemoModal({ title, demoUrl, fallbackUrl, color, platform, onClose }: {
  title: string
  demoUrl: string
  fallbackUrl: string
  color: string
  platform?: string
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full sm:max-w-5xl h-[92vh] sm:h-[85vh] bg-white sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#E4E0D6] bg-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: color }} />
            <div>
              <p className="font-bold text-[#1A1A18] text-sm">{title}</p>
              <p className="text-[10px] text-[#8A9280] font-mono">{platform ? `Live Demo · ${platform}` : 'Live Demo'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={fallbackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-[#1A3D2B] hover:underline px-3 py-1.5 rounded-lg hover:bg-[#E8F5EE] transition-colors"
            >
              <Maximize2 size={12} />
              Full screen
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8A9280] hover:text-[#1A1A18] hover:bg-[#F8F5EE] transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* iframe */}
        <iframe
          src={demoUrl}
          className="flex-1 w-full border-0"
          title={title}
          allow="microphone; camera"
        />
      </div>
    </div>
  )
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const [cat, setCat] = useState('All')
  const [demo, setDemo] = useState<typeof projects[0] | null>(null)
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

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setDemo(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const shown = cat === 'All' ? projects : projects.filter(p => p.category === cat)

  return (
    <section id="projects" ref={ref} className="py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <p className="reveal text-xs font-mono uppercase tracking-[0.2em] text-[#3DAA72] mb-4">
          {isDE ? '02 / Projekte' : '02 / Projects'}
        </p>
        <h2 className="reveal font-display text-[clamp(2.2rem,5vw,3.8rem)] font-black text-[#1A1A18] mb-3 leading-tight">
          {isDE
            ? <>Was ich <em className="text-[#1A3D2B]">gebaut habe</em></>
            : <>Things I&apos;ve <em className="text-[#1A3D2B]">Built</em></>}
        </h2>
        <p className="reveal text-[#6E7A70] text-lg max-w-2xl mb-10 leading-relaxed">
          {isDE
            ? 'Produktionssysteme im Unternehmensmaßstab — keine Demos. Die meisten sind privat — der Impact ist der Beweis.'
            : 'Production systems at enterprise scale, not just demos. Most are private — the impact is the proof.'}
        </p>

        {/* Filter */}
        <div className="reveal flex flex-wrap gap-2 mb-10">
          {filters.map(f => (
            <button key={f.id} onClick={() => setCat(f.id)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={cat === f.id
                ? { background: '#1A3D2B', color: '#fff', boxShadow: '0 4px 16px rgba(26,61,43,0.25)' }
                : { background: '#F8F5EE', color: '#4A4A47', border: '1.5px solid #E4E0D6' }
              }
            >
              {isDE ? f.de : f.en}
            </button>
          ))}
        </div>

        <div className="reveal grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {shown.map(p => (
            <div key={p.id} className="group bg-[#F8F5EE] border border-[#E4E0D6] rounded-2xl overflow-hidden card-lift flex flex-col">
              {/* Top color band */}
              <div className="relative h-36 flex items-center justify-center overflow-hidden" style={{ background: p.bg }}>
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
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-[#1A1A18] text-base mb-1.5 leading-snug group-hover:text-[#1A3D2B] transition-colors">
                  {p.title}
                </h3>
                <p className="text-[#6E7A70] text-sm leading-relaxed mb-3 flex-1">{isDE ? p.desc_de : p.desc_en}</p>

                {/* Impact */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg mb-3"
                  style={{ background: `${p.color}08`, border: `1px solid ${p.color}20` }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
                  <span className="text-xs font-semibold" style={{ color: p.color }}>{isDE ? p.impact_de : p.impact_en}</span>
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
                  ) : p.live ? (
                    <span className="flex items-center gap-1.5 text-[#C0B8B0] text-xs">
                      <Lock size={13} /> Source private
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-[#C0B8B0] text-xs">
                      <Lock size={13} /> Enterprise
                    </span>
                  )}
                  {'demoUrl' in p && p.demoUrl ? (
                    <button
                      onClick={() => setDemo(p)}
                      className="ml-auto flex items-center gap-1.5 text-xs font-semibold transition-colors hover:opacity-80"
                      style={{ color: p.color }}
                    >
                      <ExternalLink size={13} /> Live Demo
                    </button>
                  ) : p.live && !('demoUrl' in p) ? (
                    <span className="ml-auto text-[10px] font-mono text-[#C0B8B0]">
                      {isDE ? 'Demnächst' : 'Coming soon'}
                    </span>
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

      {/* Live Demo Modal */}
      {demo && 'demoUrl' in demo && demo.demoUrl && (
        <LiveDemoModal
          title={demo.title}
          demoUrl={demo.demoUrl}
          fallbackUrl={'demoFallback' in demo && demo.demoFallback ? demo.demoFallback : demo.demoUrl}
          color={demo.color}
          platform={'demoPlatform' in demo ? demo.demoPlatform : undefined}
          onClose={() => setDemo(null)}
        />
      )}
    </section>
  )
}
