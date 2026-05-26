'use client'
import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/lib/language-context'
import { CodeBracketsSVG } from '@/components/Decorations'
import { Database, BarChart3, Brain, Bot } from 'lucide-react'

/* ─────────────────────────────────────────────────────────
   4 DOMAINS — Data Engineer · Data Scientist ·
                Data Analyst · GenAI Engineer
   ───────────────────────────────────────────────────────── */

type Domain = {
  id: 'de' | 'ds' | 'da' | 'ga'
  Icon: typeof Database
  label_en: string
  label_de: string
  color: string
  bgRing: string
  unique: string[]   // skills only in this domain
}

const DOMAINS: Domain[] = [
  {
    id: 'de',
    Icon: Database,
    label_en: 'Data Engineer',
    label_de: 'Data Engineer',
    color: '#003F88',
    bgRing: 'rgba(0,63,136,0.18)',
    unique: ['Apache Spark', 'Kafka', 'Airflow', 'dbt', 'Snowflake', 'Databricks', 'ETL · ELT'],
  },
  {
    id: 'ds',
    Icon: Brain,
    label_en: 'Data Scientist',
    label_de: 'Data Scientist',
    color: '#7A2B8B',
    bgRing: 'rgba(122,43,139,0.18)',
    unique: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Deep Learning', 'Statistical Modelling', 'Feature Engineering'],
  },
  {
    id: 'da',
    Icon: BarChart3,
    label_en: 'Data Analyst',
    label_de: 'Datenanalyst',
    color: '#1A3D2B',
    bgRing: 'rgba(26,61,43,0.18)',
    unique: ['Power BI', 'Tableau', 'Excel', 'Storytelling with Data', 'Stakeholder Mgmt'],
  },
  {
    id: 'ga',
    Icon: Bot,
    label_en: 'GenAI Engineer',
    label_de: 'GenAI Engineer',
    color: '#C19A3D',
    bgRing: 'rgba(193,154,61,0.20)',
    unique: ['LangChain', 'LangGraph', 'RAG', 'Vector DBs', 'MCP', 'LLM Eval', 'Agentic AI', 'Prompt Eng.'],
  },
]

const CORE_SKILLS = ['Python', 'SQL', 'Cloud · AWS/Azure', 'Git · CI/CD']

const PAIR_OVERLAPS: { id: string; a: Domain['id']; b: Domain['id']; skills: string[] }[] = [
  { id: 'de-ds', a: 'de', b: 'ds', skills: ['PySpark', 'MLOps', 'Feature Stores'] },
  { id: 'ds-ga', a: 'ds', b: 'ga', skills: ['NLP', 'Embeddings', 'Fine-tuning'] },
  { id: 'ga-da', a: 'ga', b: 'da', skills: ['Chat-on-Data', 'Insight Agents'] },
  { id: 'da-de', a: 'da', b: 'de', skills: ['Data Modelling', 'Semantic Layers'] },
  { id: 'de-ga', a: 'de', b: 'ga', skills: ['Vector DBs', 'Orchestration'] },
  { id: 'da-ds', a: 'da', b: 'ds', skills: ['EDA', 'A/B Testing', 'Viz'] },
]

const FRAMEWORKS_TOOLS = [
  'LangChain', 'LangGraph', 'ChromaDB', 'Pinecone', 'Streamlit', 'OpenAI', 'Anthropic Claude', 'Groq', 'Gemini',
  'PySpark', 'Hadoop', 'Hugging Face', 'MLflow', 'FastAPI', 'Docker', 'Kubernetes', 'Terraform',
]

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
          {isDE ? <>Vier Domains. <em className="text-[#1A3D2B]">Ein Stack.</em></> : <>Four domains. <em className="text-[#1A3D2B]">One stack.</em></>}
        </h2>
        <p className="reveal text-[#6E7A70] text-lg max-w-2xl mb-12 leading-relaxed">
          {isDE
            ? 'Ich arbeite über die vier Datendisziplinen hinweg — als Data Engineer, Data Scientist, Datenanalyst und GenAI Engineer. Hier ist, wie sich diese Domänen überschneiden und wo jede einzigartig ist.'
            : 'I work across all four data disciplines — Data Engineer, Data Scientist, Data Analyst, and GenAI Engineer. Here is how they overlap, and what is unique to each.'}
        </p>

        {/* ── VENN DIAGRAM ─────────────────────────────────────── */}
        <div className="reveal relative mx-auto mb-10" style={{ maxWidth: '720px' }}>
          <VennDiagram domains={DOMAINS} hovered={hovered} setHovered={setHovered} />
        </div>

        {/* ── LEGEND: Domain cards ─────────────────────────────── */}
        <div className="reveal grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {DOMAINS.map(d => {
            const Icon = d.Icon
            return (
              <div
                key={d.id}
                onMouseEnter={() => setHovered(d.id)}
                onMouseLeave={() => setHovered(null)}
                className={`bg-white border-2 rounded-2xl p-5 transition-all duration-300 cursor-default ${isDimmed(d.id) ? 'opacity-40' : 'opacity-100'}`}
                style={{
                  borderColor: hovered === d.id ? d.color : '#E4E0D6',
                  boxShadow: hovered === d.id ? `0 12px 28px -8px ${d.color}33` : undefined,
                }}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: d.bgRing }}>
                    <Icon size={18} style={{ color: d.color }} />
                  </div>
                  <p className="font-bold text-sm text-[#1A1A18] leading-tight">{isDE ? d.label_de : d.label_en}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
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
              </div>
            )
          })}
        </div>

        {/* ── CORE + PAIRWISE OVERLAPS ─────────────────────────── */}
        <div className="reveal grid md:grid-cols-2 gap-5 mb-10">
          {/* Core (all 4) */}
          <div className="bg-gradient-to-br from-[#1A3D2B] to-[#0F2A1C] text-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#3DAA72] animate-pulse" />
              <p className="text-[10px] font-mono tracking-[0.25em] text-[#3DAA72]">
                {isDE ? 'KERN · ALLE 4 DOMÄNEN' : 'CORE · ALL 4 DOMAINS'}
              </p>
            </div>
            <h3 className="font-display text-xl font-black mb-4">
              {isDE ? 'Die Grundlage' : 'The foundation'}
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
                ? 'Diese Skills nutze ich in jedem Projekt — in jeder Rolle, jeder Domäne.'
                : 'These show up in every project — every role, every domain.'}
            </p>
          </div>

          {/* Pairwise overlaps */}
          <div className="bg-white border border-[#E4E0D6] rounded-2xl p-6">
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
                    <div className="flex items-center gap-1 flex-shrink-0 w-32">
                      <span className="w-2 h-2 rounded-full" style={{ background: a.color }} />
                      <span className="w-2 h-2 rounded-full -ml-0.5" style={{ background: b.color }} />
                      <span className="text-[#6E7A70] font-mono text-[10px] ml-1">
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

        {/* ── FRAMEWORKS & TOOLS MARQUEE ───────────────────────── */}
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
   VENN DIAGRAM — 4 circles in clover arrangement
   Center = all 4 overlap (core skills)
   Each lobe = one domain's identity
   ───────────────────────────────────────────────────────── */
function VennDiagram({
  domains,
  hovered,
  setHovered,
}: {
  domains: Domain[]
  hovered: Domain['id'] | null
  setHovered: (id: Domain['id'] | null) => void
}) {
  // Diamond/clover layout in 600x600 viewBox
  // Top (DE), Right (DS), Bottom (GA), Left (DA)
  const positions: Record<Domain['id'], { cx: number; cy: number }> = {
    de: { cx: 300, cy: 200 },
    ds: { cx: 400, cy: 300 },
    ga: { cx: 300, cy: 400 },
    da: { cx: 200, cy: 300 },
  }
  const R = 150  // circle radius

  // Label positions (outside the circle, on the appropriate cardinal side)
  const labelPos: Record<Domain['id'], { x: number; y: number; anchor: 'middle' | 'start' | 'end' }> = {
    de: { x: 300, y: 55, anchor: 'middle' },     // top
    ds: { x: 555, y: 305, anchor: 'end' },        // right
    ga: { x: 300, y: 555, anchor: 'middle' },     // bottom
    da: { x: 45, y: 305, anchor: 'start' },       // left
  }

  return (
    <div className="relative w-full" style={{ aspectRatio: '1/1' }}>
      <svg viewBox="0 0 600 600" className="w-full h-full">
        <defs>
          {domains.map(d => (
            <radialGradient key={d.id} id={`grad-${d.id}`}>
              <stop offset="0%" stopColor={d.color} stopOpacity="0.28" />
              <stop offset="100%" stopColor={d.color} stopOpacity="0.08" />
            </radialGradient>
          ))}
        </defs>

        {/* Soft outer ring backdrop */}
        <circle cx="300" cy="300" r="270" fill="none" stroke="#E4E0D6" strokeWidth="1" strokeDasharray="2 4" />

        {/* 4 circles */}
        {domains.map(d => {
          const pos = positions[d.id]
          const isHovered = hovered === d.id
          const isDimmed = hovered !== null && !isHovered
          return (
            <g
              key={d.id}
              style={{ cursor: 'pointer', transition: 'opacity 0.3s' }}
              opacity={isDimmed ? 0.25 : 1}
              onMouseEnter={() => setHovered(d.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <circle
                cx={pos.cx}
                cy={pos.cy}
                r={R}
                fill={`url(#grad-${d.id})`}
                stroke={d.color}
                strokeWidth={isHovered ? 3 : 1.5}
                strokeOpacity={0.75}
                style={{ transition: 'stroke-width 0.3s' }}
              />
            </g>
          )
        })}

        {/* Center label — CORE skills hub */}
        <g pointerEvents="none">
          <circle cx="300" cy="300" r="42" fill="#1A3D2B" />
          <text x="300" y="295" textAnchor="middle" fill="#3DAA72" fontFamily="monospace" fontSize="9" fontWeight="700" letterSpacing="1.5">
            CORE
          </text>
          <text x="300" y="310" textAnchor="middle" fill="white" fontFamily="serif" fontSize="11" fontStyle="italic">
            Python · SQL
          </text>
        </g>

        {/* Domain labels (outside circles) */}
        {domains.map(d => {
          const lp = labelPos[d.id]
          const isHovered = hovered === d.id
          const isDimmed = hovered !== null && !isHovered
          return (
            <g key={`label-${d.id}`} opacity={isDimmed ? 0.35 : 1} style={{ transition: 'opacity 0.3s' }}>
              <text
                x={lp.x}
                y={lp.y}
                textAnchor={lp.anchor}
                fill={d.color}
                fontFamily="serif"
                fontSize="22"
                fontWeight="900"
                fontStyle="italic"
              >
                {d.label_en}
              </text>
            </g>
          )
        })}

        {/* Lobe accent dots — show 2-3 representative skills near each lobe's outer edge */}
        {/* DE (top): place skill chips above the top circle */}
        <g pointerEvents="none" opacity={hovered && hovered !== 'de' ? 0.3 : 1} style={{ transition: 'opacity 0.3s' }}>
          <text x="180" y="135" fontFamily="monospace" fontSize="10" fill="#003F88">Spark</text>
          <text x="350" y="135" fontFamily="monospace" fontSize="10" fill="#003F88">Airflow</text>
          <text x="270" y="105" fontFamily="monospace" fontSize="10" fill="#003F88">dbt</text>
        </g>
        {/* DS (right) */}
        <g pointerEvents="none" opacity={hovered && hovered !== 'ds' ? 0.3 : 1} style={{ transition: 'opacity 0.3s' }}>
          <text x="475" y="225" fontFamily="monospace" fontSize="10" fill="#7A2B8B">PyTorch</text>
          <text x="475" y="385" fontFamily="monospace" fontSize="10" fill="#7A2B8B">ML</text>
          <text x="490" y="305" fontFamily="monospace" fontSize="10" fill="#7A2B8B">DL</text>
        </g>
        {/* GA (bottom) */}
        <g pointerEvents="none" opacity={hovered && hovered !== 'ga' ? 0.3 : 1} style={{ transition: 'opacity 0.3s' }}>
          <text x="200" y="495" fontFamily="monospace" fontSize="10" fill="#C19A3D">LangChain</text>
          <text x="370" y="495" fontFamily="monospace" fontSize="10" fill="#C19A3D">RAG</text>
          <text x="270" y="520" fontFamily="monospace" fontSize="10" fill="#C19A3D">Agents</text>
        </g>
        {/* DA (left) */}
        <g pointerEvents="none" opacity={hovered && hovered !== 'da' ? 0.3 : 1} style={{ transition: 'opacity 0.3s' }}>
          <text x="55" y="225" fontFamily="monospace" fontSize="10" fill="#1A3D2B">Power BI</text>
          <text x="55" y="385" fontFamily="monospace" fontSize="10" fill="#1A3D2B">Tableau</text>
          <text x="40" y="305" fontFamily="monospace" fontSize="10" fill="#1A3D2B">Excel</text>
        </g>
      </svg>

      {/* Hint */}
      <p className="text-center text-[10px] font-mono text-[#B0A898] tracking-wider mt-3">
        Hover a domain to focus
      </p>
    </div>
  )
}
