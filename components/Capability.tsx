'use client'
import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/lib/language-context'
import { BarChart3, MessageSquare, Brain, TrendingUp, Database, Workflow, Layers, ArrowDown } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/* ─────────────────────────────────────────────────────────
   DATA DEFINITIONS
   ───────────────────────────────────────────────────────── */

const sources = [
  { initials: 'SAP', name: 'SAP ERP',     sub_en: 'Enterprise Resource Planning', sub_de: 'Enterprise Resource Planning', color: '#0073B6', bg: '#E8F2FB' },
  { initials: 'SQL', name: 'SQL Server',  sub_en: '.NET Portals & Internal Apps', sub_de: '.NET-Portale & interne Apps',  color: '#CC2927', bg: '#FBECEB' },
  { initials: 'SF',  name: 'Salesforce',  sub_en: 'CRM & Sales Pipeline',          sub_de: 'CRM & Vertriebs-Pipeline',     color: '#00A1E0', bg: '#E5F6FC' },
  { initials: 'SP',  name: 'SharePoint',  sub_en: 'Documents & Files',             sub_de: 'Dokumente & Dateien',          color: '#036C70', bg: '#E3F0F1' },
  { initials: 'WD',  name: 'Workday',     sub_en: 'HR & Payroll Records',          sub_de: 'HR & Gehaltsdaten',            color: '#F38B00', bg: '#FDEEDC' },
]

const outputs = [
  { icon: BarChart3,    name_en: 'BI Dashboards',  name_de: 'BI-Dashboards',  sub_en: 'Power BI · Tableau',     sub_de: 'Power BI · Tableau',     color: '#1A3D2B', bg: '#E8F5EE' },
  { icon: MessageSquare, name_en: 'GenAI Chatbots', name_de: 'GenAI-Chatbots', sub_en: 'LangChain · RAG · LLMs', sub_de: 'LangChain · RAG · LLMs', color: '#3DAA72', bg: '#EAFBF1' },
  { icon: Brain,        name_en: 'ML Models',      name_de: 'ML-Modelle',     sub_en: 'PyTorch · Scikit-learn', sub_de: 'PyTorch · Scikit-learn', color: '#F04E23', bg: '#FEF1ED' },
  { icon: TrendingUp,   name_en: 'Predictions',    name_de: 'Vorhersagen',    sub_en: 'Forecasting · Anomaly',  sub_de: 'Prognose · Anomalien',   color: '#003F88', bg: '#E8EFF8' },
]

/* ─────────────────────────────────────────────────────────
   COORDINATE PLAN (viewBox: 0 0 1200 540)
   Sources    column-x = 40-240
   Transform  column-x = 330-510
   Lakehouse  column-x = 600-820
   Outputs    column-x = 910-1160
   ───────────────────────────────────────────────────────── */

const sourceY      = [90, 170, 250, 330, 410]   // Card centers (5)
const sourceRightX = 240
const transformLeftX  = 330
const transformRightX = 510
const transformCY     = 250
const lakehouseLeftX  = 600
const lakehouseRightX = 820
const lakehouseCY     = 250
const outputY      = [115, 200, 285, 370]       // 4 outputs
const outputLeftX  = 910

/* paths: smooth S-curves */
const pathSourceToTransform = (sy: number) =>
  `M ${sourceRightX} ${sy} C ${sourceRightX + 50} ${sy}, ${transformLeftX - 50} ${transformCY}, ${transformLeftX} ${transformCY}`

const pathTransformToLake =
  `M ${transformRightX} ${transformCY} L ${lakehouseLeftX} ${lakehouseCY}`

const pathLakeToOutput = (oy: number) =>
  `M ${lakehouseRightX} ${lakehouseCY} C ${lakehouseRightX + 50} ${lakehouseCY}, ${outputLeftX - 50} ${oy}, ${outputLeftX} ${oy}`

/* ─────────────────────────────────────────────────────────
   PARTICLE COMPONENT — A flowing dot along an SVG path
   ───────────────────────────────────────────────────────── */

function Particle({ path, duration, delay, color, size = 3.5 }: {
  path: string; duration: number; delay: number; color: string; size?: number;
}) {
  return (
    <circle r={size} fill={color} filter="url(#particleGlow)" opacity="0">
      <animate
        attributeName="opacity"
        values="0;1;1;0"
        keyTimes="0;0.1;0.9;1"
        dur={`${duration}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
      />
      <animateMotion
        dur={`${duration}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
        path={path}
      />
    </circle>
  )
}

/* ─────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────── */

export default function Capability() {
  const ref = useRef<HTMLElement>(null)
  const { lang } = useLang()
  const isDE = lang === 'de'
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null)

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    )
    ref.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  const layerCards = [
    {
      num: '01',
      icon: Database,
      title_en: 'Source Integration',
      title_de: 'Quellintegration',
      body_en: 'Direct connectors to enterprise systems — SAP ERP, SQL Server, Salesforce, SharePoint, Workday. Real-time CDC streams or scheduled batch pulls, whatever the system demands.',
      body_de: 'Direkte Konnektoren zu Unternehmenssystemen — SAP ERP, SQL Server, Salesforce, SharePoint, Workday. Echtzeit-CDC-Streams oder geplante Batch-Abrufe, je nach Anforderung.',
      key: 'sources',
    },
    {
      num: '02',
      icon: Workflow,
      title_en: 'Transformation & Modeling',
      title_de: 'Transformation & Modellierung',
      body_en: 'ETL/ELT pipelines built with Airflow, dbt, and Apache Spark. Data quality, lineage, and orchestration baked in. Refresh cadence configurable from real-time streaming to nightly batches.',
      body_de: 'ETL/ELT-Pipelines mit Airflow, dbt und Apache Spark. Datenqualität, Lineage und Orchestrierung integriert. Aktualisierungsrhythmus von Echtzeit bis nachts.',
      key: 'transform',
    },
    {
      num: '03',
      icon: Layers,
      title_en: 'Lakehouse Architecture',
      title_de: 'Lakehouse-Architektur',
      body_en: 'Medallion design on Snowflake or Databricks. Bronze (raw) → Silver (cleaned) → Gold (business-ready). One governed source of truth for the entire organization.',
      body_de: 'Medaillon-Design auf Snowflake oder Databricks. Bronze (roh) → Silber (bereinigt) → Gold (geschäftsbereit). Eine zentrale Wahrheitsquelle für die gesamte Organisation.',
      key: 'lakehouse',
    },
    {
      num: '04',
      icon: Brain,
      title_en: 'AI & BI Layer',
      title_de: 'KI- & BI-Schicht',
      body_en: 'Power BI dashboards, GenAI chatbots, ML models, and predictive analytics — all consuming from the same governed gold layer. End users get answers, not pipelines.',
      body_de: 'Power BI-Dashboards, GenAI-Chatbots, ML-Modelle und prädiktive Analysen — alle aus derselben Gold-Schicht. Endnutzer erhalten Antworten, keine Pipelines.',
      key: 'output',
    },
  ]

  const stats = [
    { n: '50+', en: 'Data sources integrated', de: 'Integrierte Datenquellen' },
    { n: '14',  en: 'Enterprise dashboards',   de: 'Enterprise-Dashboards' },
    { n: '7',   en: 'GenAI chatbots shipped',  de: 'GenAI-Chatbots ausgeliefert' },
    { n: '$4.8M', en: 'Annualized savings',    de: 'Jährliche Einsparungen' },
  ]

  return (
    <section
      id="capability"
      ref={ref}
      className="relative py-28 px-6 bg-white overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, #1A3D2B 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 80% 60% at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at center, black 30%, transparent 80%)',
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <p className="reveal text-xs font-mono uppercase tracking-[0.2em] text-[#3DAA72] mb-4">
          {isDE ? '04 / End-to-End-Fähigkeit' : '04 / End-to-End Capability'}
        </p>
        <h2 className="reveal font-display text-[clamp(2.2rem,5vw,3.8rem)] font-black text-[#1A1A18] mb-5 leading-[1.05] max-w-3xl">
          {isDE ? (
            <>Von Quellsystemen zu <em className="text-[#1A3D2B]">intelligentem Handeln.</em></>
          ) : (
            <>From source systems to <em className="text-[#1A3D2B]">intelligent action.</em></>
          )}
        </h2>
        <p className="reveal text-[#6E7A70] text-lg max-w-2xl leading-relaxed mb-12">
          {isDE
            ? 'Die meisten Data Engineers hören am Warehouse auf. Die meisten ML Engineers fangen dort an. Ich besitze die gesamte Reise — von der Anbindung an Unternehmenssysteme bis hin zu den KI-Produkten, die darauf laufen.'
            : 'Most data engineers stop at the warehouse. Most ML engineers start there. I own the entire journey — from connecting to enterprise systems to the AI products built on top.'}
        </p>

        {/* THE DIAGRAM */}
        <div className="reveal mb-16">
          <div
            className="relative w-full mx-auto rounded-3xl border border-[#E4E0D6] bg-gradient-to-b from-[#FBFAF6] to-white shadow-[0_30px_80px_-30px_rgba(26,61,43,0.18)] p-6 md:p-10"
          >
            {/* Column header labels */}
            <div className="hidden md:grid grid-cols-4 gap-3 mb-6 px-2">
              {[
                { en: 'SOURCES',    de: 'QUELLEN',     hint_en: '5 systems',           hint_de: '5 Systeme' },
                { en: 'TRANSFORM',  de: 'TRANSFORM',   hint_en: 'Spark · dbt · Airflow', hint_de: 'Spark · dbt · Airflow' },
                { en: 'LAKEHOUSE',  de: 'LAKEHOUSE',   hint_en: 'Bronze · Silver · Gold', hint_de: 'Bronze · Silber · Gold' },
                { en: 'AI / BI',    de: 'KI / BI',     hint_en: 'Dashboards · GenAI · ML', hint_de: 'Dashboards · GenAI · ML' },
              ].map((col, i) => (
                <div key={i} className="text-center">
                  <p className="text-[10px] font-mono tracking-[0.25em] text-[#3DAA72] mb-1">{isDE ? col.de : col.en}</p>
                  <p className="text-[10px] font-mono text-[#B0A898]">{isDE ? col.hint_de : col.hint_en}</p>
                </div>
              ))}
            </div>

            {/* Diagram canvas: keeps a strict 1200x540 viewbox — DESKTOP ONLY */}
            <div className="relative w-full hidden md:block" style={{ aspectRatio: '1200/540' }}>
              {/* SVG layer for flow lines + particles */}
              <svg
                viewBox="0 0 1200 540"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <defs>
                  {/* Glow filter for particles */}
                  <filter id="particleGlow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Soft glow for lakehouse */}
                  <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" />
                  </filter>

                  {/* Gradients */}
                  <linearGradient id="lineGrad" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%"  stopColor="#3DAA72" stopOpacity="0.15" />
                    <stop offset="50%" stopColor="#3DAA72" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#3DAA72" stopOpacity="0.15" />
                  </linearGradient>

                  <linearGradient id="transformGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%"  stopColor="#3DAA72" />
                    <stop offset="100%" stopColor="#1A3D2B" />
                  </linearGradient>
                </defs>

                {/* CONNECTING PATHS (static) */}
                {sourceY.map((y, i) => (
                  <path
                    key={`s-${i}`}
                    d={pathSourceToTransform(y)}
                    stroke="url(#lineGrad)"
                    strokeWidth="1.5"
                    fill="none"
                  />
                ))}
                <path
                  d={pathTransformToLake}
                  stroke="#3DAA72"
                  strokeOpacity="0.5"
                  strokeWidth="2.5"
                  fill="none"
                />
                {outputY.map((y, i) => (
                  <path
                    key={`o-${i}`}
                    d={pathLakeToOutput(y)}
                    stroke="url(#lineGrad)"
                    strokeWidth="1.5"
                    fill="none"
                  />
                ))}

                {/* TRANSFORM ENGINE — pulsing core */}
                <g>
                  <circle
                    cx={(transformLeftX + transformRightX) / 2}
                    cy={transformCY}
                    r="58"
                    fill="#3DAA72"
                    opacity="0.12"
                    filter="url(#softGlow)"
                  >
                    <animate attributeName="r" values="58;72;58" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.12;0.06;0.12" dur="3s" repeatCount="indefinite" />
                  </circle>
                </g>

                {/* LAKEHOUSE GLOW */}
                <g>
                  <ellipse
                    cx={(lakehouseLeftX + lakehouseRightX) / 2}
                    cy={lakehouseCY}
                    rx="130"
                    ry="170"
                    fill="#1A3D2B"
                    opacity="0.06"
                    filter="url(#softGlow)"
                  >
                    <animate attributeName="opacity" values="0.06;0.12;0.06" dur="4s" repeatCount="indefinite" />
                  </ellipse>
                </g>

                {/* ANIMATED PARTICLES — flow stage 1: sources → transform */}
                {sourceY.map((y, i) => (
                  <g key={`p1-${i}`}>
                    <Particle path={pathSourceToTransform(y)} duration={3.2} delay={i * 0.35} color={sources[i].color} />
                    <Particle path={pathSourceToTransform(y)} duration={3.2} delay={i * 0.35 + 1.6} color={sources[i].color} size={2.5} />
                  </g>
                ))}

                {/* ANIMATED PARTICLES — flow stage 2: transform → lakehouse (denser, the merged stream) */}
                {[0, 0.6, 1.2, 1.8].map((delay, i) => (
                  <Particle key={`p2-${i}`} path={pathTransformToLake} duration={2} delay={delay} color="#3DAA72" size={4} />
                ))}

                {/* ANIMATED PARTICLES — flow stage 3: lakehouse → outputs */}
                {outputY.map((y, i) => (
                  <g key={`p3-${i}`}>
                    <Particle path={pathLakeToOutput(y)} duration={3} delay={i * 0.45} color={outputs[i].color} />
                    <Particle path={pathLakeToOutput(y)} duration={3} delay={i * 0.45 + 1.5} color={outputs[i].color} size={2.5} />
                  </g>
                ))}
              </svg>

              {/* HTML node layer */}
              <div className="absolute inset-0">
                {/* ── SOURCES column ── */}
                {sources.map((s, i) => {
                  const topPct = ((sourceY[i] - 26) / 540) * 100
                  return (
                    <div
                      key={s.name}
                      className="absolute group transition-all duration-300"
                      style={{
                        left: '3.3%',
                        top: `${topPct}%`,
                        width: '17%',
                        transform: hoveredLayer === 'sources' ? 'scale(1.04)' : 'scale(1)',
                      }}
                      onMouseEnter={() => setHoveredLayer('sources')}
                      onMouseLeave={() => setHoveredLayer(null)}
                    >
                      <div
                        className="flex items-center gap-2 rounded-xl bg-white border border-[#E4E0D6] py-2 px-2.5 shadow-sm hover:shadow-md hover:border-[#3DAA72]/40 transition-all"
                      >
                        <div
                          className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-[11px]"
                          style={{ background: s.bg, color: s.color }}
                        >
                          {s.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-bold text-[#1A1A18] leading-tight truncate">{s.name}</p>
                          <p className="text-[9px] text-[#8A9280] leading-tight truncate font-mono">{isDE ? s.sub_de : s.sub_en}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}

                {/* ── TRANSFORM block ── */}
                <div
                  className="absolute group transition-all duration-300"
                  style={{
                    left: `${(transformLeftX / 1200) * 100}%`,
                    top: `${((transformCY - 90) / 540) * 100}%`,
                    width: `${((transformRightX - transformLeftX) / 1200) * 100}%`,
                    height: '180px',
                    transform: hoveredLayer === 'transform' ? 'scale(1.03)' : 'scale(1)',
                  }}
                  onMouseEnter={() => setHoveredLayer('transform')}
                  onMouseLeave={() => setHoveredLayer(null)}
                >
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#1A3D2B] to-[#0F2A1C] text-white p-4 flex flex-col items-center justify-center shadow-[0_18px_50px_-12px_rgba(26,61,43,0.4)] border border-[#3DAA72]/30">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center mb-3 ring-1 ring-white/20">
                      <Workflow size={22} className="text-[#3DAA72]" />
                    </div>
                    <p className="text-[13px] font-bold tracking-tight">{isDE ? 'Pipeline' : 'Pipeline'}</p>
                    <p className="text-[10px] text-white/60 font-mono mt-1 text-center leading-tight">ETL · ELT<br/>Real-time + Batch</p>
                  </div>
                </div>

                {/* ── LAKEHOUSE column (3 medallion layers) ── */}
                <div
                  className="absolute group transition-all duration-300"
                  style={{
                    left: `${(lakehouseLeftX / 1200) * 100}%`,
                    top: `${((lakehouseCY - 130) / 540) * 100}%`,
                    width: `${((lakehouseRightX - lakehouseLeftX) / 1200) * 100}%`,
                    height: '260px',
                    transform: hoveredLayer === 'lakehouse' ? 'scale(1.03)' : 'scale(1)',
                  }}
                  onMouseEnter={() => setHoveredLayer('lakehouse')}
                  onMouseLeave={() => setHoveredLayer(null)}
                >
                  <div className="w-full h-full rounded-2xl bg-white border border-[#E4E0D6] shadow-[0_20px_50px_-12px_rgba(26,61,43,0.18)] overflow-hidden flex flex-col">
                    {/* Title bar */}
                    <div className="bg-[#1A1A18] px-3 py-2 flex items-center gap-2">
                      <Layers size={11} className="text-[#3DAA72]" />
                      <span className="text-[10px] font-mono text-white/80 tracking-wider">LAKEHOUSE</span>
                    </div>
                    {/* Medallion stack */}
                    <div className="flex-1 p-3 flex flex-col gap-2 bg-gradient-to-b from-[#FBFAF6] to-white">
                      <MedallionLayer
                        tier="BRONZE"
                        label={isDE ? 'Roh' : 'Raw'}
                        gradient="linear-gradient(135deg, #B87333 0%, #8C5421 100%)"
                      />
                      <MedallionLayer
                        tier="SILVER"
                        label={isDE ? 'Bereinigt' : 'Cleaned'}
                        gradient="linear-gradient(135deg, #C0C0C0 0%, #8A8A8A 100%)"
                      />
                      <MedallionLayer
                        tier="GOLD"
                        label={isDE ? 'Business' : 'Business-ready'}
                        gradient="linear-gradient(135deg, #E3B341 0%, #B8860B 100%)"
                        highlight
                      />
                    </div>
                    {/* Engine indicator */}
                    <div className="px-3 py-2 border-t border-[#E4E0D6] bg-white">
                      <p className="text-[9px] font-mono text-[#8A9280] text-center">Snowflake · Databricks</p>
                    </div>
                  </div>
                </div>

                {/* ── OUTPUTS column ── */}
                {outputs.map((o, i) => {
                  const Icon = o.icon
                  const topPct = ((outputY[i] - 32) / 540) * 100
                  return (
                    <div
                      key={o.name_en}
                      className="absolute group transition-all duration-300"
                      style={{
                        left: '76.5%',
                        top: `${topPct}%`,
                        width: '20.5%',
                        transform: hoveredLayer === 'output' ? 'scale(1.04)' : 'scale(1)',
                      }}
                      onMouseEnter={() => setHoveredLayer('output')}
                      onMouseLeave={() => setHoveredLayer(null)}
                    >
                      <div className="flex items-center gap-2.5 rounded-xl bg-white border border-[#E4E0D6] py-2.5 px-3 shadow-sm hover:shadow-md hover:border-[#3DAA72]/40 transition-all">
                        <div
                          className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ background: o.bg }}
                        >
                          <Icon size={16} style={{ color: o.color }} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[12px] font-bold text-[#1A1A18] leading-tight truncate">{isDE ? o.name_de : o.name_en}</p>
                          <p className="text-[9px] text-[#8A9280] leading-tight truncate font-mono">{isDE ? o.sub_de : o.sub_en}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* MOBILE ALTERNATIVE — vertical stack with arrows */}
            <div className="md:hidden">
              <MobileStack isDE={isDE} sources={sources} outputs={outputs} />
            </div>

            {/* Footer caption */}
            <div className="mt-6 pt-5 border-t border-[#E4E0D6] flex items-center justify-between flex-wrap gap-3">
              <p className="text-[11px] font-mono text-[#8A9280] tracking-wider">
                {isDE ? 'EINE PERSON · GANZER STACK · ENDE-ZU-ENDE EIGENTUM' : 'ONE PERSON · FULL STACK · END-TO-END OWNERSHIP'}
              </p>
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#3DAA72]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3DAA72] opacity-60"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3DAA72]"></span>
                </span>
                {isDE ? 'LIVE-DATENFLUSS' : 'LIVE DATA FLOW'}
              </div>
            </div>
          </div>
        </div>

        {/* LAYER EXPLAINER CARDS */}
        <div className="grid md:grid-cols-2 gap-4 mb-14">
          {layerCards.map((card, i) => {
            const Icon = card.icon
            return (
              <div
                key={card.num}
                className="reveal bg-white border border-[#E4E0D6] rounded-2xl p-6 hover:border-[#3DAA72]/40 hover:shadow-lg transition-all duration-300"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#E8F5EE] flex items-center justify-center">
                    <Icon size={20} className="text-[#1A3D2B]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1.5">
                      <span className="text-[10px] font-mono text-[#3DAA72] tracking-widest">{card.num}</span>
                      <h3 className="font-display text-lg font-bold text-[#1A1A18]">{isDE ? card.title_de : card.title_en}</h3>
                    </div>
                    <p className="text-sm text-[#6E7A70] leading-relaxed">{isDE ? card.body_de : card.body_en}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* IMPACT STATS */}
        <div className="reveal bg-[#1A3D2B] rounded-2xl p-8 md:p-10 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #3DAA72 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#3DAA72] mb-5 relative">
            {isDE ? 'Realer Impact bei Suzlon Energy' : 'Real Impact at Suzlon Energy'}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="font-display text-4xl md:text-5xl font-black text-white mb-1">{s.n}</div>
                <p className="text-xs text-white/60 font-medium leading-tight">{isDE ? s.de : s.en}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────
   MOBILE STACK — Vertical, scrollable alternative to the
   horizontal diagram (shown only on screens < md)
   ───────────────────────────────────────────────────────── */
type SourceItem = { initials: string; name: string; sub_en: string; sub_de: string; color: string; bg: string }
type OutputItem = { icon: LucideIcon; name_en: string; name_de: string; sub_en: string; sub_de: string; color: string; bg: string }

function MobileStack({ isDE, sources, outputs }: { isDE: boolean; sources: SourceItem[]; outputs: OutputItem[] }) {
  return (
    <div className="space-y-4">
      {/* SOURCES */}
      <div>
        <p className="text-[10px] font-mono tracking-[0.25em] text-[#3DAA72] mb-2 text-center">
          {isDE ? 'QUELLEN' : 'SOURCES'}
        </p>
        <div className="grid grid-cols-1 gap-2">
          {sources.map(s => (
            <div key={s.name} className="flex items-center gap-3 rounded-xl bg-white border border-[#E4E0D6] py-2.5 px-3 shadow-sm">
              <div
                className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-[12px]"
                style={{ background: s.bg, color: s.color }}
              >
                {s.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-bold text-[#1A1A18] leading-tight">{s.name}</p>
                <p className="text-[10px] text-[#8A9280] leading-tight font-mono">{isDE ? s.sub_de : s.sub_en}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ArrowConnector />

      {/* TRANSFORM */}
      <div>
        <p className="text-[10px] font-mono tracking-[0.25em] text-[#3DAA72] mb-2 text-center">
          {isDE ? 'TRANSFORM' : 'TRANSFORM'}
        </p>
        <div className="rounded-2xl bg-gradient-to-br from-[#1A3D2B] to-[#0F2A1C] text-white p-5 flex items-center gap-4 shadow-lg border border-[#3DAA72]/20">
          <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center flex-shrink-0">
            <Workflow size={22} className="text-[#3DAA72]" />
          </div>
          <div>
            <p className="text-sm font-bold">Pipeline</p>
            <p className="text-[11px] text-white/65 font-mono">ETL · ELT · Real-time + Batch</p>
            <p className="text-[10px] text-white/45 font-mono mt-1">Spark · dbt · Airflow</p>
          </div>
        </div>
      </div>

      <ArrowConnector />

      {/* LAKEHOUSE */}
      <div>
        <p className="text-[10px] font-mono tracking-[0.25em] text-[#3DAA72] mb-2 text-center">
          {isDE ? 'LAKEHOUSE' : 'LAKEHOUSE'}
        </p>
        <div className="rounded-2xl bg-white border border-[#E4E0D6] overflow-hidden shadow-sm">
          <div className="bg-[#1A1A18] px-3 py-2 flex items-center gap-2">
            <Layers size={11} className="text-[#3DAA72]" />
            <span className="text-[10px] font-mono text-white/80 tracking-wider">LAKEHOUSE</span>
          </div>
          <div className="p-3 space-y-2 bg-gradient-to-b from-[#FBFAF6] to-white">
            <MedallionLayer tier="BRONZE" label={isDE ? 'Roh' : 'Raw'} gradient="linear-gradient(135deg, #B87333 0%, #8C5421 100%)" />
            <MedallionLayer tier="SILVER" label={isDE ? 'Bereinigt' : 'Cleaned'} gradient="linear-gradient(135deg, #C0C0C0 0%, #8A8A8A 100%)" />
            <MedallionLayer tier="GOLD" label={isDE ? 'Business' : 'Business-ready'} gradient="linear-gradient(135deg, #E3B341 0%, #B8860B 100%)" highlight />
          </div>
          <p className="text-[10px] font-mono text-[#8A9280] text-center py-2 border-t border-[#E4E0D6]">Snowflake · Databricks</p>
        </div>
      </div>

      <ArrowConnector />

      {/* OUTPUTS */}
      <div>
        <p className="text-[10px] font-mono tracking-[0.25em] text-[#3DAA72] mb-2 text-center">
          {isDE ? 'KI / BI' : 'AI / BI'}
        </p>
        <div className="grid grid-cols-1 gap-2">
          {outputs.map(o => {
            const Icon = o.icon
            return (
              <div key={o.name_en} className="flex items-center gap-3 rounded-xl bg-white border border-[#E4E0D6] py-2.5 px-3 shadow-sm">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: o.bg }}>
                  <Icon size={18} style={{ color: o.color }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-bold text-[#1A1A18] leading-tight">{isDE ? o.name_de : o.name_en}</p>
                  <p className="text-[10px] text-[#8A9280] leading-tight font-mono">{isDE ? o.sub_de : o.sub_en}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function ArrowConnector() {
  return (
    <div className="flex justify-center py-1">
      <div className="w-9 h-9 rounded-full bg-[#E8F5EE] flex items-center justify-center">
        <ArrowDown size={16} className="text-[#1A3D2B]" />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Medallion layer sub-component
   ───────────────────────────────────────────────────────── */
function MedallionLayer({ tier, label, gradient, highlight }: {
  tier: string; label: string; gradient: string; highlight?: boolean;
}) {
  return (
    <div
      className="relative flex items-center justify-between rounded-md px-3 py-2.5 text-white shadow-sm overflow-hidden"
      style={{ background: gradient }}
    >
      <span className="text-[10px] font-mono font-bold tracking-wider">{tier}</span>
      <span className="text-[10px] font-medium text-white/85">{label}</span>
      {highlight && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
            animation: 'shimmerGold 3s ease-in-out infinite',
          }}
        />
      )}
    </div>
  )
}
