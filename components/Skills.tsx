'use client'
import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/lib/language-context'
import { CodeBracketsSVG } from '@/components/Decorations'
import {
  Database, BarChart3, Brain, Bot,
  Code2, Cloud, GitBranch, Container, Terminal,
  Sparkles, ArrowUpRight,
} from 'lucide-react'

/* ─────────────────────────────────────────────────────────
   Interactive Capability Spotlight
   - Tab through 4 domains (or click an overlap to cross-jump)
   - One elegant stage that morphs in place
   ───────────────────────────────────────────────────────── */

type Domain = {
  id: 'de' | 'ds' | 'da' | 'ga'
  Icon: typeof Database
  num: string
  label_en: string
  label_de: string
  short_en: string
  short_de: string
  tagline_en: string
  tagline_de: string
  color: string
  colorDark: string
  bgRing: string
  ships_en: string[]
  ships_de: string[]
  stack: string[]
  stat_en: string
  stat_de: string
}

const DOMAINS: Domain[] = [
  {
    id: 'de',
    Icon: Database,
    num: '01',
    label_en: 'Data Engineer',
    label_de: 'Data Engineer',
    short_en: 'Data Eng',
    short_de: 'Data Eng',
    tagline_en: 'Pipelines & lakehouses at scale.',
    tagline_de: 'Pipelines & Lakehouses im Großmaßstab.',
    color: '#003F88',
    colorDark: '#002A5C',
    bgRing: 'rgba(0,63,136,0.08)',
    ships_en: [
      'Production pipelines moving TB-scale data daily',
      'Bronze → Silver → Gold lakehouse layers',
      'Real-time ingestion with Kafka + Spark Streaming',
    ],
    ships_de: [
      'Produktionspipelines mit TB-Daten täglich',
      'Bronze → Silver → Gold Lakehouse-Schichten',
      'Echtzeit-Ingest mit Kafka + Spark Streaming',
    ],
    stack: ['Spark', 'Kafka', 'Airflow', 'dbt', 'Snowflake', 'Databricks', 'AWS Glue'],
    stat_en: '50+ tables fed downstream',
    stat_de: '50+ Tabellen versorgt',
  },
  {
    id: 'ds',
    Icon: Brain,
    num: '02',
    label_en: 'Data Scientist',
    label_de: 'Data Scientist',
    short_en: 'Data Sci',
    short_de: 'Data Sci',
    tagline_en: 'Models that change decisions.',
    tagline_de: 'Modelle, die Entscheidungen verändern.',
    color: '#7A2B8B',
    colorDark: '#54195E',
    bgRing: 'rgba(122,43,139,0.08)',
    ships_en: [
      'Forecast & risk models in production',
      'Deep learning across tabular, vision, NLP',
      'Rigorous A/B tests and causal analysis',
    ],
    ships_de: [
      'Prognose- & Risikomodelle in Produktion',
      'Deep Learning für Tabellen, Vision, NLP',
      'A/B-Tests und kausale Analyse',
    ],
    stack: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'XGBoost', 'MLflow', 'Statsmodels', 'Optuna'],
    stat_en: 'Decision latency cut 40%+',
    stat_de: 'Entscheidungslatenz −40 %',
  },
  {
    id: 'da',
    Icon: BarChart3,
    num: '03',
    label_en: 'Data Analyst',
    label_de: 'Data Analyst',
    short_en: 'Analyst',
    short_de: 'Analyst',
    tagline_en: 'Insight that lands with the C-suite.',
    tagline_de: 'Insights, die im Vorstand ankommen.',
    color: '#1A3D2B',
    colorDark: '#0F2A1C',
    bgRing: 'rgba(26,61,43,0.08)',
    ships_en: [
      'Executive dashboards driving daily ops',
      'Stakeholder-facing storytelling decks',
      'Self-serve BI for non-technical teams',
    ],
    ships_de: [
      'Executive-Dashboards für den Tagesbetrieb',
      'Storytelling-Decks für Stakeholder',
      'Self-Service-BI für nicht-technische Teams',
    ],
    stack: ['Power BI', 'Tableau', 'Looker', 'DAX', 'Excel', 'Metabase', 'Plotly'],
    stat_en: '14 dashboards live at Suzlon',
    stat_de: '14 Dashboards live bei Suzlon',
  },
  {
    id: 'ga',
    Icon: Bot,
    num: '04',
    label_en: 'GenAI Engineer',
    label_de: 'GenAI Engineer',
    short_en: 'GenAI',
    short_de: 'GenAI',
    tagline_en: 'LLMs, agents & RAG — production-grade.',
    tagline_de: 'LLMs, Agenten & RAG — produktionsreif.',
    color: '#C19A3D',
    colorDark: '#8A6E26',
    bgRing: 'rgba(193,154,61,0.10)',
    ships_en: [
      'RAG systems answering real user queries',
      'Multi-agent LangGraph workflows in prod',
      'Eval frameworks for LLM quality & drift',
    ],
    ships_de: [
      'RAG-Systeme für echte Nutzeranfragen',
      'Multi-Agent LangGraph-Workflows in Prod',
      'Eval-Frameworks für LLM-Qualität & Drift',
    ],
    stack: ['LangChain', 'LangGraph', 'RAG', 'Pinecone', 'ChromaDB', 'OpenAI', 'Claude'],
    stat_en: '7 GenAI bots in production',
    stat_de: '7 GenAI-Bots in Produktion',
  },
]

const CORE = [
  { name: 'Python', Icon: Code2 },
  { name: 'SQL', Icon: Database },
  { name: 'AWS', Icon: Cloud },
  { name: 'Azure', Icon: Cloud },
  { name: 'Docker', Icon: Container },
  { name: 'Git · CI/CD', Icon: GitBranch },
  { name: 'Linux', Icon: Terminal },
]

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
   MAIN
   ───────────────────────────────────────────────────────── */
export default function Skills() {
  const ref = useRef<HTMLElement>(null)
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

  return (
    <section id="skills" ref={ref} className="relative py-28 px-6 bg-[#F8F5EE] section-grain overflow-hidden">
      <div className="pointer-events-none absolute hidden lg:block opacity-[0.07] float-slow" style={{ right: '60px', top: '120px' }}>
        <CodeBracketsSVG size={130} color="#1A3D2B" />
      </div>
      <div className="pointer-events-none absolute hidden lg:block opacity-[0.06] float-slow-2" style={{ left: '40px', bottom: '160px' }}>
        <CodeBracketsSVG size={110} color="#1A3D2B" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <p className="reveal text-xs font-mono uppercase tracking-[0.2em] text-[#3DAA72] mb-4">
          {isDE ? '02 / Fähigkeiten' : '02 / Skills'}
        </p>
        <h2 className="reveal font-display text-[clamp(2.2rem,5vw,3.8rem)] font-black text-[#1A1A18] mb-3 leading-tight">
          {isDE
            ? <>Vier Domänen. <em className="text-[#1A3D2B]">Ein Stack.</em></>
            : <>Four domains. <em className="text-[#1A3D2B]">One stack.</em></>}
        </h2>
        <p className="reveal text-[#6E7A70] text-lg max-w-2xl mb-12 leading-relaxed">
          {isDE
            ? 'Wähle eine Rolle — sieh, was ich liefere, womit ich es liefere und wo sie sich mit den anderen überschneidet.'
            : 'Pick a role — see what I ship, what I ship it with, and where it overlaps with the others.'}
        </p>

        {/* ── INTERACTIVE SPOTLIGHT ───────────────────────── */}
        <div className="reveal mb-16">
          <Spotlight />
        </div>

        {/* ── FOUNDATION STRIP ────────────────────────────── */}
        <div className="reveal mb-14">
          <FoundationStrip />
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
   SPOTLIGHT — the interactive heart of the section
   ───────────────────────────────────────────────────────── */
function Spotlight() {
  const { lang } = useLang()
  const isDE = lang === 'de'
  const [active, setActive] = useState<Domain['id']>('de')
  const d = DOMAINS.find(x => x.id === active)!
  const Icon = d.Icon
  const overlaps = PAIR_OVERLAPS.filter(p => p.a === active || p.b === active)

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {DOMAINS.map(t => {
          const isActive = active === t.id
          const TabIcon = t.Icon
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#F8F5EE]"
              style={{
                background: isActive ? t.color : 'white',
                borderColor: isActive ? t.color : '#E4E0D6',
                color: isActive ? 'white' : '#3A3A35',
                boxShadow: isActive
                  ? `0 12px 28px -12px ${t.color}80`
                  : '0 1px 2px rgba(0,0,0,0.03)',
                transform: isActive ? 'translateY(-1px)' : 'translateY(0)',
                transition: 'background 0.35s, border-color 0.35s, color 0.35s, box-shadow 0.35s, transform 0.35s',
                ['--tw-ring-color' as any]: t.color,
              }}
            >
              <TabIcon size={14} className={isActive ? 'opacity-90' : 'opacity-70'} />
              <span className="font-mono text-[10px] opacity-50">{t.num}</span>
              <span className="font-semibold text-[13px]">{isDE ? t.label_de : t.label_en}</span>
            </button>
          )
        })}
      </div>

      {/* Progress indicator */}
      <div className="flex gap-1.5 justify-center mb-8">
        {DOMAINS.map(t => (
          <div
            key={t.id}
            className="h-[3px] rounded-full"
            style={{
              width: active === t.id ? '36px' : '8px',
              background: active === t.id ? t.color : '#E4E0D6',
              transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1), background 0.5s',
            }}
          />
        ))}
      </div>

      {/* Stage */}
      <div
        className="bg-white rounded-3xl border border-[#E4E0D6] overflow-hidden"
        style={{
          boxShadow: `0 32px 64px -28px ${d.color}40, 0 1px 2px rgba(0,0,0,0.04)`,
          transition: 'box-shadow 0.6s ease',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[440px_1fr]">
          {/* LEFT — gradient hero */}
          <div
            className="relative p-9 md:p-11 overflow-hidden flex flex-col min-h-[420px] lg:min-h-[520px]"
            style={{
              background: `linear-gradient(155deg, ${d.color} 0%, ${d.colorDark} 100%)`,
              transition: 'background 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* dot pattern */}
            <div className="absolute inset-0 opacity-[0.10] pointer-events-none">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id={`dots-${d.id}`} width="22" height="22" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#dots-${d.id})`} />
              </svg>
            </div>

            {/* soft glow */}
            <div
              className="absolute -right-16 -top-16 w-56 h-56 rounded-full opacity-20 blur-3xl pointer-events-none"
              style={{ background: 'white' }}
            />

            {/* Signature animation per domain */}
            <div
              key={`anim-${d.id}`}
              className="absolute top-6 right-6 w-[220px] h-[150px] pointer-events-none spot-fade"
              style={{ opacity: 0.42 }}
            >
              <DomainAnim id={d.id} />
            </div>

            {/* Content (re-keyed for fade) */}
            <div key={d.id} className="relative flex flex-col h-full spot-fade">
              <p className="font-mono text-[10px] tracking-[0.3em] text-white/55 mb-4">
                {d.num} / 04
              </p>
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-white/25"
                style={{ background: 'rgba(255,255,255,0.14)' }}
              >
                <Icon size={26} className="text-white" />
              </div>

              <h3 className="font-display italic font-black text-white leading-[0.95] mb-3 text-[clamp(2rem,4.5vw,2.75rem)]">
                {isDE ? d.label_de : d.label_en}
              </h3>
              <p className="text-white/75 text-[15px] leading-relaxed font-medium max-w-[300px]">
                {isDE ? d.tagline_de : d.tagline_en}
              </p>

              {/* signature stat */}
              <div className="mt-auto pt-6 flex items-center gap-2 border-t border-white/15">
                <Sparkles size={14} className="text-white/80 flex-shrink-0" />
                <p className="text-[13px] text-white font-semibold tracking-tight">
                  {isDE ? d.stat_de : d.stat_en}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — content */}
          <div className="p-8 md:p-11 flex flex-col">
            <div key={`r-${d.id}`} className="spot-fade flex flex-col h-full">
              {/* What I ship */}
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8A9280] mb-4">
                {isDE ? 'Was ich liefere' : 'What I ship'}
              </p>
              <ul className="space-y-3 mb-7">
                {(isDE ? d.ships_de : d.ships_en).map((s, i) => (
                  <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-[#1A1A18]">
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-[1px] text-[9.5px] font-mono font-bold"
                      style={{ background: d.bgRing, color: d.colorDark }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="pt-[2px]">{s}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-dashed border-[#E4E0D6] mb-6" />

              {/* Stack */}
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8A9280] mb-3">
                {isDE ? 'Stack' : 'Stack'}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-7">
                {d.stack.map(s => (
                  <span
                    key={s}
                    className="text-[11.5px] font-semibold font-mono px-2.5 py-1 rounded-full"
                    style={{
                      background: d.bgRing,
                      color: d.colorDark,
                      border: `1px solid ${d.color}25`,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="border-t border-dashed border-[#E4E0D6] mb-6" />

              {/* Overlaps (clickable cross-links) */}
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8A9280] mb-3">
                {isDE ? 'Überschneidet sich mit' : 'Overlaps with'}
              </p>
              <div className="space-y-2 mt-auto">
                {overlaps.map(p => {
                  const other = (p.a === active ? DOMAINS.find(x => x.id === p.b) : DOMAINS.find(x => x.id === p.a))!
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActive(other.id)}
                      className="w-full text-left flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-[#E4E0D6] bg-[#FAF8F2] hover:bg-white hover:border-[#3DAA72]/50 hover:shadow-sm transition-all group"
                    >
                      <div className="flex -space-x-1.5 flex-shrink-0">
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-white" style={{ background: d.color }} />
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-white" style={{ background: other.color }} />
                      </div>
                      <p className="text-[11px] font-mono uppercase tracking-wider text-[#3A3A35] font-semibold flex-shrink-0 w-16">
                        {isDE ? other.short_de : other.short_en}
                      </p>
                      <div className="flex flex-wrap gap-1 flex-1 justify-end">
                        {p.skills.map(s => (
                          <span
                            key={s}
                            className="text-[10.5px] px-2 py-0.5 rounded-full bg-white text-[#1A1A18] font-medium border border-[#E4E0D6] whitespace-nowrap"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <ArrowUpRight
                        size={14}
                        className="text-[#B0A898] group-hover:text-[#3DAA72] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0"
                      />
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hint */}
      <p className="text-center text-[10px] font-mono text-[#B0A898] tracking-wider mt-5">
        {isDE
          ? 'Tippe auf eine Rolle oder klicke einen Schnittpunkt'
          : 'Tap a role above — or click an overlap to jump'}
      </p>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   DOMAIN ANIMATIONS — signature looped SVG per role
   ───────────────────────────────────────────────────────── */
function DomainAnim({ id }: { id: Domain['id'] }) {
  if (id === 'de') return <PipelineAnim />
  if (id === 'ds') return <NeuralAnim />
  if (id === 'da') return <ChartAnim />
  return <OrbitAnim />
}

/* Data Engineer — pipeline with flowing dots */
function PipelineAnim() {
  return (
    <svg viewBox="0 0 220 150" className="w-full h-full" aria-hidden>
      {/* nodes */}
      <g fill="white" fillOpacity="0.92">
        <rect x="6" y="65" width="22" height="22" rx="4" />
        <rect x="98" y="22" width="22" height="22" rx="4" />
        <rect x="98" y="108" width="22" height="22" rx="4" />
        <rect x="190" y="65" width="22" height="22" rx="4" />
      </g>
      {/* lines */}
      <g stroke="white" strokeOpacity="0.45" strokeWidth="1.2" fill="none">
        <path d="M 28 76 Q 60 76 98 33" />
        <path d="M 28 76 Q 60 76 98 119" />
        <path d="M 120 33 Q 158 33 190 76" />
        <path d="M 120 119 Q 158 119 190 76" />
      </g>
      {/* flowing data packets */}
      <g fill="white">
        <circle r="2.8">
          <animateMotion dur="2.6s" repeatCount="indefinite" path="M 28 76 Q 60 76 98 33 Q 158 33 190 76" />
        </circle>
        <circle r="2.4" opacity="0.85">
          <animateMotion dur="3.2s" begin="0.7s" repeatCount="indefinite" path="M 28 76 Q 60 76 98 119 Q 158 119 190 76" />
        </circle>
        <circle r="2.2" opacity="0.75">
          <animateMotion dur="3s" begin="1.5s" repeatCount="indefinite" path="M 28 76 Q 60 76 98 33 Q 158 33 190 76" />
        </circle>
      </g>
    </svg>
  )
}

/* Data Scientist — neural net with firing connections */
function NeuralAnim() {
  const L1 = [38, 76, 112]
  const L2 = [22, 56, 92, 126]
  const L3 = [56, 92]
  const x1 = 28, x2 = 110, x3 = 192
  return (
    <svg viewBox="0 0 220 150" className="w-full h-full" aria-hidden>
      {/* all connections (faint) */}
      <g stroke="white" strokeOpacity="0.18" strokeWidth="0.7" fill="none">
        {L1.flatMap(y1 => L2.map(y2 => <line key={`a-${y1}-${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} />))}
        {L2.flatMap(y2 => L3.map(y3 => <line key={`b-${y2}-${y3}`} x1={x2} y1={y2} x2={x3} y2={y3} />))}
      </g>
      {/* firing connections */}
      <g stroke="white" strokeWidth="1.6" fill="none">
        <line x1={x1} y1={76} x2={x2} y2={56}>
          <animate attributeName="stroke-opacity" values="0;1;0" dur="2.4s" repeatCount="indefinite" />
        </line>
        <line x1={x2} y1={56} x2={x3} y2={56}>
          <animate attributeName="stroke-opacity" values="0;1;0" dur="2.4s" begin="0.5s" repeatCount="indefinite" />
        </line>
        <line x1={x1} y1={38} x2={x2} y2={92}>
          <animate attributeName="stroke-opacity" values="0;1;0" dur="2.6s" begin="1s" repeatCount="indefinite" />
        </line>
        <line x1={x2} y1={92} x2={x3} y2={92}>
          <animate attributeName="stroke-opacity" values="0;1;0" dur="2.6s" begin="1.5s" repeatCount="indefinite" />
        </line>
        <line x1={x1} y1={112} x2={x2} y2={126}>
          <animate attributeName="stroke-opacity" values="0;1;0" dur="2.2s" begin="0.8s" repeatCount="indefinite" />
        </line>
      </g>
      {/* nodes */}
      <g fill="white">
        {L1.map(y => <circle key={`n1-${y}`} cx={x1} cy={y} r="5" />)}
        {L2.map(y => <circle key={`n2-${y}`} cx={x2} cy={y} r="5" />)}
        {L3.map(y => <circle key={`n3-${y}`} cx={x3} cy={y} r="6" />)}
      </g>
    </svg>
  )
}

/* Data Analyst — bars growing in sequence */
function ChartAnim() {
  const heights = [48, 78, 60, 100, 72, 110]
  return (
    <svg viewBox="0 0 220 150" className="w-full h-full" aria-hidden>
      <g fill="white">
        {heights.map((h, i) => {
          const x = 14 + i * 33
          return (
            <rect key={i} x={x} y={140 - h} width="22" height={h} rx="2.5">
              <animate
                attributeName="height"
                values={`4;${h};${h};4`}
                keyTimes="0;0.35;0.7;1"
                dur="3.6s"
                begin={`${i * 0.18}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                values={`136;${140 - h};${140 - h};136`}
                keyTimes="0;0.35;0.7;1"
                dur="3.6s"
                begin={`${i * 0.18}s`}
                repeatCount="indefinite"
              />
            </rect>
          )
        })}
      </g>
      <line x1="0" y1="143" x2="220" y2="143" stroke="white" strokeOpacity="0.55" strokeWidth="1" />
    </svg>
  )
}

/* GenAI Engineer — orbiting tokens around a glowing core */
function OrbitAnim() {
  return (
    <svg viewBox="0 0 220 150" className="w-full h-full" aria-hidden>
      {/* orbit rings */}
      <g stroke="white" strokeOpacity="0.22" fill="none">
        <circle cx="110" cy="75" r="32" strokeDasharray="2 4" />
        <circle cx="110" cy="75" r="52" strokeDasharray="2 4" />
        <circle cx="110" cy="75" r="68" strokeDasharray="2 4" />
      </g>
      {/* core glow */}
      <circle cx="110" cy="75" r="15" fill="white" fillOpacity="0.22">
        <animate attributeName="r" values="15;22;15" dur="2.2s" repeatCount="indefinite" />
        <animate attributeName="fill-opacity" values="0.22;0.10;0.22" dur="2.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="110" cy="75" r="9" fill="white">
        <animate attributeName="r" values="9;11;9" dur="2.2s" repeatCount="indefinite" />
      </circle>
      {/* orbit 1 — clockwise */}
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 110 75" to="360 110 75" dur="6s" repeatCount="indefinite" />
        <circle cx="142" cy="75" r="3.5" fill="white" />
      </g>
      {/* orbit 2 — counter-clockwise, 2 tokens */}
      <g>
        <animateTransform attributeName="transform" type="rotate" from="360 110 75" to="0 110 75" dur="9s" repeatCount="indefinite" />
        <circle cx="162" cy="75" r="3" fill="white" />
        <circle cx="58" cy="75" r="2.5" fill="white" opacity="0.85" />
      </g>
      {/* orbit 3 — slow */}
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 110 75" to="360 110 75" dur="13s" repeatCount="indefinite" />
        <circle cx="178" cy="75" r="2.5" fill="white" />
        <circle cx="42" cy="75" r="2" fill="white" opacity="0.8" />
      </g>
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────
   FOUNDATION STRIP — dark band, shared across all domains
   ───────────────────────────────────────────────────────── */
function FoundationStrip() {
  const { lang } = useLang()
  const isDE = lang === 'de'

  return (
    <div className="relative bg-gradient-to-br from-[#1A3D2B] via-[#143222] to-[#0B1F14] rounded-3xl overflow-hidden shadow-[0_24px_56px_-20px_rgba(15,42,28,0.55)]">
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="foundation-grid" width="44" height="44" patternUnits="userSpaceOnUse">
              <path d="M 44 0 L 0 0 0 44" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#foundation-grid)" />
        </svg>
      </div>

      <div className="absolute -left-20 -top-20 w-72 h-72 rounded-full opacity-30 blur-3xl pointer-events-none" style={{ background: '#3DAA72' }} />
      <div className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: '#3DAA72' }} />

      <div className="relative p-8 md:p-10">
        <div className="grid md:grid-cols-[280px_1fr] gap-8 md:gap-10 items-center">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-[#3DAA72] animate-pulse" />
              <p className="text-[10px] font-mono tracking-[0.3em] text-[#3DAA72]">
                {isDE ? 'FUNDAMENT' : 'FOUNDATION'}
              </p>
            </div>
            <h3 className="font-display italic text-2xl md:text-[1.9rem] font-black text-white leading-tight mb-3">
              {isDE
                ? <>In jedem <em className="text-[#3DAA72] not-italic">einzelnen</em> Projekt.</>
                : <>In every <em className="text-[#3DAA72] not-italic">single</em> project.</>}
            </h3>
            <p className="text-white/65 text-sm leading-relaxed">
              {isDE
                ? 'Diese sieben Skills tragen alles oben drüber — egal welche Rolle, egal welches Team.'
                : 'These seven carry everything above — whichever role I step into, whichever team I join.'}
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
            {CORE.map(({ name, Icon }) => (
              <div
                key={name}
                className="flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-2xl border"
                style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.10)' }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(61,170,114,0.14)' }}>
                  <Icon size={18} className="text-[#3DAA72]" />
                </div>
                <p className="text-[10px] font-mono font-semibold text-white/90 text-center leading-tight">
                  {name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
