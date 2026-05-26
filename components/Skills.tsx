'use client'
import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/lib/language-context'
import { CodeBracketsSVG } from '@/components/Decorations'
import { Database, BarChart3, Brain, Bot } from 'lucide-react'

/* ─────────────────────────────────────────────────────────
   4 DOMAINS  +  full skill atlas
   ───────────────────────────────────────────────────────── */

type Domain = {
  id: 'de' | 'ds' | 'da' | 'ga'
  Icon: typeof Database
  label_en: string
  label_de: string
  tagline_en: string
  tagline_de: string
  color: string
  bgRing: string
  /** Skills that ONLY live in this domain */
  unique: string[]
  /** Tools/frameworks I use daily here */
  tools: string[]
}

const DOMAINS: Domain[] = [
  {
    id: 'de',
    Icon: Database,
    label_en: 'Data Engineer',
    label_de: 'Data Engineer',
    tagline_en: 'Pipelines, lakehouses, real-time ingestion at scale.',
    tagline_de: 'Pipelines, Lakehouses und Echtzeit-Ingest im Großmaßstab.',
    color: '#003F88',
    bgRing: 'rgba(0,63,136,0.16)',
    unique: ['Apache Spark', 'Kafka', 'Airflow', 'dbt', 'Snowflake', 'Databricks', 'Delta Lake', 'Iceberg', 'Hadoop'],
    tools: ['PySpark', 'AWS Glue', 'Azure Data Factory', 'BigQuery', 'Redshift', 'Fivetran', 'Apache Beam'],
  },
  {
    id: 'ds',
    Icon: Brain,
    label_en: 'Data Scientist',
    label_de: 'Data Scientist',
    tagline_en: 'ML, deep learning, statistical modelling, experimentation.',
    tagline_de: 'ML, Deep Learning, statistische Modellierung, Experimente.',
    color: '#7A2B8B',
    bgRing: 'rgba(122,43,139,0.16)',
    unique: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'XGBoost', 'LightGBM', 'Keras', 'Statsmodels', 'CV / NLP'],
    tools: ['NumPy', 'Pandas', 'Jupyter', 'MLflow', 'Weights & Biases', 'Optuna', 'Hugging Face'],
  },
  {
    id: 'da',
    Icon: BarChart3,
    label_en: 'Data Analyst',
    label_de: 'Datenanalyst',
    tagline_en: 'Dashboards, storytelling, executive insight at scale.',
    tagline_de: 'Dashboards, Storytelling, Insights für Führungskräfte.',
    color: '#1A3D2B',
    bgRing: 'rgba(26,61,43,0.16)',
    unique: ['Power BI', 'Tableau', 'Looker', 'Excel', 'DAX', 'Storytelling', 'Stakeholder Mgmt'],
    tools: ['Google Sheets', 'Data Studio', 'Mode', 'Sigma', 'Metabase', 'Plotly'],
  },
  {
    id: 'ga',
    Icon: Bot,
    label_en: 'GenAI Engineer',
    label_de: 'GenAI Engineer',
    tagline_en: 'LLMs, RAG, agents, evaluation — production-grade.',
    tagline_de: 'LLMs, RAG, Agenten, Evaluierung — produktionstauglich.',
    color: '#C19A3D',
    bgRing: 'rgba(193,154,61,0.20)',
    unique: ['LangChain', 'LangGraph', 'RAG', 'Vector DBs', 'MCP', 'Prompt Eng.', 'Agentic AI', 'LLM Eval'],
    tools: ['ChromaDB', 'Pinecone', 'Weaviate', 'Qdrant', 'OpenAI', 'Anthropic Claude', 'Groq', 'Gemini', 'LlamaIndex', 'LangSmith'],
  },
]

/** Skills used in every domain — the foundation layer */
const CORE_SKILLS = ['Python', 'SQL', 'AWS', 'Azure', 'Git · CI/CD', 'Docker', 'Linux']

/** Pairwise overlaps (where two domains share specific skills) */
type Pair = { id: string; a: Domain['id']; b: Domain['id']; skills: string[] }
const PAIR_OVERLAPS: Pair[] = [
  { id: 'de-ds', a: 'de', b: 'ds', skills: ['MLOps', 'Feature Stores', 'PySpark MLlib'] },
  { id: 'ds-ga', a: 'ds', b: 'ga', skills: ['NLP', 'Embeddings', 'Fine-tuning'] },
  { id: 'ga-da', a: 'ga', b: 'da', skills: ['Chat-on-Data', 'NL → SQL', 'Insight Agents'] },
  { id: 'da-de', a: 'da', b: 'de', skills: ['Data Modelling', 'Semantic Layers', 'Reverse ETL'] },
  { id: 'de-ga', a: 'de', b: 'ga', skills: ['Vector Pipelines', 'RAG Ingestion'] },
  { id: 'da-ds', a: 'da', b: 'ds', skills: ['EDA', 'A/B Testing', 'Statistical Viz'] },
]

const FRAMEWORKS_TOOLS = [
  'LangChain', 'LangGraph', 'ChromaDB', 'Pinecone', 'Streamlit', 'FastAPI', 'OpenAI', 'Anthropic Claude', 'Groq', 'Gemini',
  'PySpark', 'Hadoop', 'Hugging Face', 'MLflow', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'AWS Glue', 'Snowflake',
  'Databricks', 'dbt', 'Airflow', 'Kafka', 'Power BI', 'Tableau', 'Looker', 'PyTorch', 'TensorFlow', 'Scikit-learn',
]

/* ─────────────────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────────────────── */
export default function Skills() {
  const ref = useRef<HTMLElement>(null)
  const [hovered, setHovered] = useState<Domain['id'] | null>(null)
  const { lang } = useLang()
  const isDE = lang === 'de'

  useEffect(() => {
    const io = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    )
    ref.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  const isDimmed = (id: Domain['id']) => hovered !== null && hovered !== id

  return (
    <section id="skills" ref={ref} className="relative py-28 px-6 bg-[#F8F5EE] section-grain overflow-hidden">
      {/* Background code brackets */}
      <div className="pointer-events-none absolute hidden lg:block opacity-[0.07] float-slow" style={{ right: '60px', top: '120px' }}>
        <CodeBracketsSVG size={130} color="#1A3D2B" />
      </div>
      <div className="pointer-events-none absolute hidden lg:block opacity-[0.06] float-slow-2" style={{ left: '40px', bottom: '160px' }}>
        <CodeBracketsSVG size={110} color="#1A3D2B" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <p className="reveal text-xs font-mono uppercase tracking-[0.2em] text-[#3DAA72] mb-4">
          {isDE ? '03 / Fähigkeiten' : '03 / Skills'}
        </p>
        <h2 className="reveal font-display text-[clamp(2.2rem,5vw,3.8rem)] font-black text-[#1A1A18] mb-3 leading-tight">
          {isDE ? <>Vier Domänen. <em className="text-[#1A3D2B]">Ein Stack.</em></> : <>Four domains. <em className="text-[#1A3D2B]">One stack.</em></>}
        </h2>
        <p className="reveal text-[#6E7A70] text-lg max-w-2xl mb-12 leading-relaxed">
          {isDE
            ? 'Ich arbeite über alle vier Datendisziplinen hinweg — als Data Engineer, Data Scientist, Datenanalyst und GenAI Engineer. Unten siehst du, wo sich die Domänen überschneiden und wo jede einzigartig ist.'
            : 'I work across all four data disciplines — Data Engineer, Data Scientist, Data Analyst, and GenAI Engineer. Below: where the domains overlap and what is unique to each.'}
        </p>

        {/* ── VENN DIAGRAM ─────────────────────────────────── */}
        <div className="reveal mb-12">
          <VennDiagramFull domains={DOMAINS} hovered={hovered} setHovered={setHovered} />
        </div>

        {/* ── 4 DOMAIN DETAIL CARDS ───────────────────────── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {DOMAINS.map(d => {
            const Icon = d.Icon
            return (
              <div
                key={d.id}
                onMouseEnter={() => setHovered(d.id)}
                onMouseLeave={() => setHovered(null)}
                className={`reveal bg-white border-2 rounded-2xl p-5 transition-all duration-300 cursor-default ${isDimmed(d.id) ? 'opacity-40' : 'opacity-100'}`}
                style={{
                  borderColor: hovered === d.id ? d.color : '#E4E0D6',
                  boxShadow: hovered === d.id ? `0 12px 28px -8px ${d.color}33` : undefined,
                }}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: d.bgRing }}>
                    <Icon size={20} style={{ color: d.color }} />
                  </div>
                  <p className="font-bold text-sm text-[#1A1A18] leading-tight">{isDE ? d.label_de : d.label_en}</p>
                </div>
                <p className="text-[11px] text-[#6E7A70] leading-relaxed mb-3 italic">{isDE ? d.tagline_de : d.tagline_en}</p>

                <p className="text-[9px] font-mono uppercase tracking-wider text-[#8A9280] mb-1.5">
                  {isDE ? 'Kern-Skills' : 'Core skills'}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {d.unique.map(s => (
                    <span
                      key={s}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                      style={{ background: d.bgRing, color: d.color }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <p className="text-[9px] font-mono uppercase tracking-wider text-[#8A9280] mb-1.5">
                  {isDE ? 'Tools & Frameworks' : 'Tools & frameworks'}
                </p>
                <div className="flex flex-wrap gap-1">
                  {d.tools.map(s => (
                    <span
                      key={s}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#F0EDE4] text-[#4A4A47]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* ── CORE + PAIRWISE OVERLAPS ────────────────────── */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {/* Core (all 4) */}
          <div className="reveal bg-gradient-to-br from-[#1A3D2B] to-[#0F2A1C] text-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#3DAA72] animate-pulse" />
              <p className="text-[10px] font-mono tracking-[0.25em] text-[#3DAA72]">
                {isDE ? 'KERN · ALLE 4 DOMÄNEN' : 'CORE · ALL 4 DOMAINS'}
              </p>
            </div>
            <h3 className="font-display text-xl font-black mb-4">
              {isDE ? 'Das Fundament' : 'The foundation'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {CORE_SKILLS.map(s => (
                <span key={s} className="text-xs font-mono font-semibold px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15">
                  {s}
                </span>
              ))}
            </div>
            <p className="text-xs text-white/60 mt-4 leading-relaxed">
              {isDE
                ? 'Diese Skills nutze ich in jedem Projekt — egal in welcher Rolle.'
                : 'These show up in every project — every role, every domain.'}
            </p>
          </div>

          {/* Pairwise overlaps */}
          <div className="reveal bg-white border border-[#E4E0D6] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#3DAA72]" />
              <p className="text-[10px] font-mono tracking-[0.25em] text-[#3DAA72]">
                {isDE ? 'PAARWEISE ÜBERSCHNEIDUNGEN' : 'PAIRWISE OVERLAPS'}
              </p>
            </div>
            <h3 className="font-display text-xl font-black text-[#1A1A18] mb-4">
              {isDE ? 'Wo Domänen sich treffen' : 'Where domains meet'}
            </h3>
            <div className="space-y-2.5">
              {PAIR_OVERLAPS.map(po => {
                const a = DOMAINS.find(d => d.id === po.a)!
                const b = DOMAINS.find(d => d.id === po.b)!
                return (
                  <div key={po.id} className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1 flex-shrink-0 w-36">
                      <span className="w-2 h-2 rounded-full" style={{ background: a.color }} />
                      <span className="w-2 h-2 rounded-full -ml-0.5" style={{ background: b.color }} />
                      <span className="text-[#6E7A70] font-mono text-[10px] ml-1 truncate">
                        {(isDE ? a.label_de : a.label_en).split(' ')[0]} × {(isDE ? b.label_de : b.label_en).split(' ')[0]}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 flex-1">
                      {po.skills.map(s => (
                        <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-[#F0EDE4] text-[#1A1A18] font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── FRAMEWORKS MARQUEE ──────────────────────────── */}
        <div className="reveal overflow-hidden">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8A9280] mb-3 text-center">
            {isDE ? 'Frameworks & Tools im täglichen Einsatz' : 'Frameworks & tools in daily use'}
          </p>
          <div className="marquee-track gap-3">
            {[...FRAMEWORKS_TOOLS, ...FRAMEWORKS_TOOLS].map((t, i) => (
              <span
                key={i}
                className="flex-shrink-0 px-3 py-1.5 bg-white border border-[#E4E0D6] rounded-full text-xs text-[#6E7A70] font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────
   VENN DIAGRAM  — SVG backdrop + HTML skill chips placed
   in each region so we get text wrapping + many skills.
   ───────────────────────────────────────────────────────── */
function VennDiagramFull({
  domains,
  hovered,
  setHovered,
}: {
  domains: Domain[]
  hovered: Domain['id'] | null
  setHovered: (id: Domain['id'] | null) => void
}) {
  const { lang } = useLang()
  const isDE = lang === 'de'
  // Clover layout: Top DE, Right DS, Bottom GA, Left DA
  // SVG positions:
  const positions: Record<Domain['id'], { cx: number; cy: number }> = {
    de: { cx: 400, cy: 260 },
    ds: { cx: 530, cy: 400 },
    ga: { cx: 400, cy: 540 },
    da: { cx: 270, cy: 400 },
  }
  const R = 200

  // HTML zones (% of container) where each region's skill chips live
  // Each "wedge" sits outside the dense center
  const ZONES: Record<Domain['id'] | 'core', { label_en: string; label_de: string; color: string; chips: string[]; style: React.CSSProperties }> = {
    de: {
      label_en: 'Data Engineer', label_de: 'Data Engineer', color: '#003F88',
      chips: ['Apache Spark', 'Kafka', 'Airflow', 'dbt', 'Snowflake', 'Databricks', 'Delta Lake', 'Iceberg'],
      style: { top: '4%', left: '50%', transform: 'translateX(-50%)', width: '46%', textAlign: 'center' as const },
    },
    ds: {
      label_en: 'Data Scientist', label_de: 'Data Scientist', color: '#7A2B8B',
      chips: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'XGBoost', 'Keras', 'MLflow', 'Statsmodels'],
      style: { top: '50%', right: '0%', transform: 'translateY(-50%)', width: '24%', textAlign: 'right' as const },
    },
    ga: {
      label_en: 'GenAI Engineer', label_de: 'GenAI Engineer', color: '#C19A3D',
      chips: ['LangChain', 'LangGraph', 'RAG', 'MCP', 'ChromaDB', 'Pinecone', 'LLM Eval', 'Agents', 'Prompt Eng.'],
      style: { bottom: '4%', left: '50%', transform: 'translateX(-50%)', width: '46%', textAlign: 'center' as const },
    },
    da: {
      label_en: 'Data Analyst', label_de: 'Datenanalyst', color: '#1A3D2B',
      chips: ['Power BI', 'Tableau', 'Looker', 'Excel', 'DAX', 'Storytelling', 'Stakeholders'],
      style: { top: '50%', left: '0%', transform: 'translateY(-50%)', width: '24%', textAlign: 'left' as const },
    },
    core: {
      label_en: 'CORE', label_de: 'KERN', color: '#1A3D2B',
      chips: ['Python', 'SQL'],
      style: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'auto' },
    },
  }

  const isHoveredOrAll = (id: Domain['id']) => hovered === null || hovered === id

  return (
    <div className="relative w-full mx-auto" style={{ maxWidth: '880px', aspectRatio: '1/1' }}>
      <svg viewBox="0 0 800 800" className="absolute inset-0 w-full h-full">
        <defs>
          {domains.map(d => (
            <radialGradient key={d.id} id={`grad-${d.id}`}>
              <stop offset="0%" stopColor={d.color} stopOpacity="0.32" />
              <stop offset="100%" stopColor={d.color} stopOpacity="0.05" />
            </radialGradient>
          ))}
        </defs>

        {/* Outer dashed ring */}
        <circle cx="400" cy="400" r="370" fill="none" stroke="#E4E0D6" strokeWidth="1" strokeDasharray="2 5" />

        {/* 4 circles */}
        {domains.map(d => {
          const pos = positions[d.id]
          const active = isHoveredOrAll(d.id)
          return (
            <g
              key={d.id}
              style={{ cursor: 'pointer', transition: 'opacity 0.3s' }}
              opacity={active ? 1 : 0.2}
              onMouseEnter={() => setHovered(d.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <circle
                cx={pos.cx}
                cy={pos.cy}
                r={R}
                fill={`url(#grad-${d.id})`}
                stroke={d.color}
                strokeWidth={hovered === d.id ? 3 : 1.5}
                strokeOpacity={0.7}
                style={{ transition: 'stroke-width 0.3s' }}
              />
            </g>
          )
        })}
      </svg>

      {/* HTML skill zones layered on top */}
      <div className="absolute inset-0 pointer-events-none">
        {(['de', 'ds', 'ga', 'da'] as const).map(id => {
          const zone = ZONES[id]
          const active = isHoveredOrAll(id)
          return (
            <div
              key={id}
              className="absolute transition-opacity duration-300"
              style={{ ...zone.style, opacity: active ? 1 : 0.25 }}
            >
              <p
                className="font-display font-black italic text-base sm:text-lg lg:text-xl mb-2"
                style={{ color: zone.color }}
              >
                {isDE ? ZONES[id].label_de : ZONES[id].label_en}
              </p>
              <div className={`flex flex-wrap gap-1 ${zone.style.textAlign === 'center' ? 'justify-center' : zone.style.textAlign === 'right' ? 'justify-end' : 'justify-start'}`}>
                {zone.chips.map(s => (
                  <span
                    key={s}
                    className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full font-mono font-semibold whitespace-nowrap"
                    style={{ background: 'white', color: zone.color, border: `1px solid ${zone.color}30` }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )
        })}

        {/* CORE hub at the center */}
        <div
          className="absolute flex flex-col items-center justify-center rounded-full text-white shadow-[0_8px_28px_-4px_rgba(26,61,43,0.45)]"
          style={{
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '110px', height: '110px',
            background: 'linear-gradient(135deg, #1A3D2B 0%, #0F2A1C 100%)',
          }}
        >
          <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-[#3DAA72]">CORE</span>
          <div className="mt-1 text-center leading-tight">
            <p className="font-display text-[13px] italic font-black">Python</p>
            <p className="font-display text-[13px] italic font-black">SQL</p>
          </div>
        </div>
      </div>

      {/* Hint */}
      <HoverHint />
    </div>
  )
}

function HoverHint() {
  const { lang } = useLang()
  return (
    <p className="absolute -bottom-6 left-0 right-0 text-center text-[10px] font-mono text-[#B0A898] tracking-wider">
      {lang === 'de' ? 'Bewege den Cursor auf eine Domäne' : 'Hover a domain to focus'}
    </p>
  )
}
