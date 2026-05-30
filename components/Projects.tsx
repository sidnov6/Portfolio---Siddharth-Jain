'use client'
import { useEffect, useRef, useState } from 'react'
import { Github, ExternalLink, Lock, X, Maximize2 } from 'lucide-react'
import { useLang } from '@/lib/language-context'

const projects = [
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
    shot: 'https://dam-rehabilitation-chatbot-75ykbjzaxmyugbchirtoxp.streamlit.app/',
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
    shot: 'https://sidnov6-recoupe.hf.space',
    live: true,
    private: true,
    demoUrl: 'https://sidnov6-recoupe.hf.space/#/dashboard',
    demoFallback: 'https://sidnov6-recoupe.hf.space/#/dashboard',
    demoPlatform: 'Hugging Face Spaces',
  },
  {
    id: 10, category: 'Gen AI',
    title: 'RegRadar — EU Regulatory-Impact Engine',
    org: 'Personal Project',
    desc_en: 'Agentic system that watches the EU regulatory firehose (EUR-Lex / CELLAR), extracts the concrete obligations from each act, maps them to a bank\'s systems, ranks them by deadline and risk, and drafts the gap-assessment memo in English and German. Every claim is citation-verified against the live EUR-Lex source — programmatically, with a human-approval gate.',
    desc_de: 'Agentenbasiertes System, das den EU-Regulierungsstrom (EUR-Lex / CELLAR) überwacht, konkrete Pflichten aus jedem Rechtsakt extrahiert, auf Banksysteme abbildet, nach Frist und Risiko priorisiert und das Gap-Assessment-Memo auf Englisch und Deutsch verfasst. Jede Aussage wird programmatisch gegen die Live-EUR-Lex-Quelle zitatgeprüft — mit menschlichem Freigabe-Gate.',
    impact_en: '100% citation integrity · F1 0.957 on DORA',
    impact_de: '100% Zitatintegrität · F1 0,957 auf DORA',
    tags: ['Multi-Agent', 'EU Regulation', 'RAG', 'FastAPI', 'Groq', 'EUR-Lex'],
    color: '#0A3B7A', bg: 'rgba(10,59,122,0.06)',
    shot: 'https://sidnov6-regradar.hf.space',
    live: true,
    github: 'https://github.com/sidnov6/regradar',
    demoUrl: 'https://sidnov6-regradar.hf.space',
    demoFallback: 'https://sidnov6-regradar.hf.space',
    demoPlatform: 'Hugging Face Spaces',
  },
  {
    id: 11, category: 'Data Science',
    title: 'CreditForge — Bank-Grade Credit Risk Platform',
    org: 'Personal Project',
    desc_en: 'End-to-end credit-risk stack built to Basel / IRB methodology on Freddie Mac mortgage data. WoE scorecard plus a LightGBM challenger for PD, joined with LGD and EAD into Expected Loss. Leakage-safe point-in-time targets, out-of-time validation, SHAP reason codes, fairness testing, and drift monitoring. A "Risk Copilot" agent team sits on top of the platform tools.',
    desc_de: 'End-to-End-Stack für Kreditrisikomodellierung nach Basel/IRB auf Freddie-Mac-Hypothekendaten. WoE-Scorecard plus LightGBM-Challenger für PD, kombiniert mit LGD und EAD zu Expected Loss. Leckagesicherer Point-in-Time-Target, Out-of-Time-Validierung, SHAP-Reason-Codes, Fairness-Tests und Drift-Monitoring. Darüber sitzt ein "Risk-Copilot"-Agententeam über den Plattform-Tools.',
    impact_en: 'PD · LGD · EAD → EL · Basel / IRB',
    impact_de: 'PD · LGD · EAD → EL · Basel / IRB',
    tags: ['LightGBM', 'PD / LGD / EAD', 'SHAP', 'Basel / IRB', 'FastAPI', 'Next.js'],
    color: '#0F4C5C', bg: 'rgba(15,76,92,0.06)',
    shot: 'https://sidnov6-creditforge.hf.space',
    live: true,
    github: 'https://github.com/sidnov6/CreditForge',
    demoUrl: 'https://sidnov6-creditforge.hf.space',
    demoFallback: 'https://sidnov6-creditforge.hf.space',
    demoPlatform: 'Hugging Face Spaces',
  },
  {
    id: 12, category: 'Gen AI',
    title: 'QUORUM — AI Investment Committee',
    org: 'Personal Project',
    desc_en: 'A simulated investment committee of specialized agents — bull, bear, macro strategist, quant/risk officer, PM, and critic — that argue from real market data across structured debate rounds and converge on a documented allocation, with a human holding the final gate. Every number is computed deterministically in Python (SEC EDGAR, prices, FRED); the LLM only narrates. Paper-only, point-in-time backtested vs SPY.',
    desc_de: 'Ein simuliertes Investmentkomitee spezialisierter Agenten — Bull, Bear, Makro-Stratege, Quant/Risk-Officer, PM und Kritiker — die anhand echter Marktdaten über strukturierte Debattenrunden argumentieren und sich auf eine dokumentierte Allokation einigen, mit menschlichem Freigabe-Gate. Jede Zahl wird deterministisch in Python berechnet (SEC EDGAR, Kurse, FRED); das LLM erzählt nur. Reines Paper-Portfolio, Point-in-Time gegen SPY backgetestet.',
    impact_en: '6 agents · deterministic numbers · backtested vs SPY',
    impact_de: '6 Agenten · deterministische Zahlen · gegen SPY getestet',
    tags: ['Multi-Agent', 'SEC EDGAR', 'Backtesting', 'FastAPI', 'Next.js', 'SSE'],
    color: '#1F3A5F', bg: 'rgba(31,58,95,0.06)',
    shot: 'https://frontend-nu-ecru-66.vercel.app/',
    live: true,
    github: 'https://github.com/sidnov6/quorum-investment-committee',
    demoUrl: 'https://frontend-nu-ecru-66.vercel.app/',
    demoFallback: 'https://frontend-nu-ecru-66.vercel.app/',
    demoPlatform: 'Vercel',
  },
]

// Live screenshot via thum.io. The `wait` lets client-rendered SPAs hydrate
// before capture, and the `?shot=1` token keeps the cache key off any blank
// snapshot thum.io may have cached for the bare URL.
const shotSrc = (url: string) =>
  `https://image.thum.io/get/width/1200/crop/720/wait/15/noanimate/${url}${url.includes('?') ? '&' : '?'}shot=1`

const filters: { id: string; en: string; de: string }[] = [
  { id: 'All',              en: 'All',              de: 'Alle' },
  { id: 'Gen AI',           en: 'Gen AI',           de: 'GenAI' },
  { id: 'Data Science',     en: 'Data Science',     de: 'Data Science' },
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
          {isDE ? '03 / Projekte' : '03 / Projects'}
        </p>
        <h2 className="reveal font-display text-[clamp(2.2rem,5vw,3.8rem)] font-black text-[#1A1A18] mb-3 leading-tight">
          {isDE
            ? <>Was ich <em className="text-[#1A3D2B]">gebaut habe</em></>
            : <>Things I&apos;ve <em className="text-[#1A3D2B]">Built</em></>}
        </h2>
        <p className="reveal text-[#6E7A70] text-lg max-w-2xl mb-10 leading-relaxed">
          {isDE
            ? 'Live-Systeme, die du selbst ausprobieren kannst — jedes mit einer laufenden Demo.'
            : 'Live systems you can try yourself — each with a running demo.'}
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
              {/* Top screenshot band */}
              <div className="relative h-44 overflow-hidden" style={{ background: p.bg }}>
                {/* Live screenshot of the project (auto-rendered via thum.io) */}
                <img
                  src={shotSrc(p.shot)}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0' }}
                />
                {/* Readability scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-black/25" />
                {/* Category pill */}
                <span className="absolute top-3 left-3 z-10 text-[11px] font-bold font-mono uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-sm shadow-sm"
                  style={{ background: `${p.color}E6`, color: '#fff' }}>
                  {p.category}
                </span>
                {p.live && (
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3DAA72] animate-pulse" />
                    <span className="text-[10px] font-mono text-[#1A3D2B] font-bold">LIVE</span>
                  </div>
                )}
                {/* Org label */}
                <span className="absolute bottom-3 left-3 z-10 text-[11px] text-white/95 font-mono drop-shadow-md">{p.org}</span>
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
