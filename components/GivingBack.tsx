'use client'
import { useEffect, useRef } from 'react'
import { useLang } from '@/lib/language-context'
import { GraduationCap, BookOpen, Users, Sparkles } from 'lucide-react'
import { OpenBookSVG } from '@/components/Decorations'

/* ─────────────────────────────────────────────────────────
   GIVING BACK & LEARNING
   Combines volunteering / teaching / mentoring (giving back)
   with the active learning track (CFA + AI engineering depth).
   ───────────────────────────────────────────────────────── */

function AISynapsesSVG() {
  return (
    <svg viewBox="0 0 60 60" className="w-full h-full" aria-hidden>
      <circle cx="30" cy="30" r="6" fill="#F04E23" />
      {[
        { cx: 10, cy: 14 }, { cx: 50, cy: 14 }, { cx: 10, cy: 46 }, { cx: 50, cy: 46 },
        { cx: 30, cy: 5 }, { cx: 30, cy: 55 }, { cx: 5, cy: 30 }, { cx: 55, cy: 30 },
      ].map((p, i) => (
        <g key={i}>
          <line x1={p.cx} y1={p.cy} x2="30" y2="30" stroke="#F04E23" strokeWidth="1.2" opacity="0.55" />
          <circle cx={p.cx} cy={p.cy} r="3" fill="#F04E23" opacity="0.85">
            <animate attributeName="opacity" values="0.4;1;0.4" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
    </svg>
  )
}

function BookSmallSVG() {
  return (
    <svg viewBox="0 0 60 60" className="w-full h-full" aria-hidden>
      <rect x="14" y="14" width="32" height="36" rx="2" fill="#E87722" opacity="0.9" />
      <rect x="14" y="14" width="32" height="36" rx="2" fill="none" stroke="#C45F10" strokeWidth="1.5" />
      <line x1="20" y1="22" x2="40" y2="22" stroke="#fff" strokeWidth="1.2" />
      <line x1="20" y1="28" x2="40" y2="28" stroke="#fff" strokeWidth="1.2" />
      <line x1="20" y1="34" x2="34" y2="34" stroke="#fff" strokeWidth="1.2" />
    </svg>
  )
}

function MicSmallSVG() {
  return (
    <svg viewBox="0 0 60 60" className="w-full h-full" aria-hidden>
      <rect x="25" y="12" width="10" height="22" rx="5" fill="#1C6AC9" />
      <path d="M18 28 Q18 42 30 42 Q42 42 42 28" stroke="#1C6AC9" strokeWidth="2" fill="none" />
      <line x1="30" y1="42" x2="30" y2="50" stroke="#1C6AC9" strokeWidth="2" />
      <line x1="22" y1="50" x2="38" y2="50" stroke="#1C6AC9" strokeWidth="2" />
    </svg>
  )
}

const volunteering = [
  {
    id: 'becoming-i',
    org: 'Becoming I Foundation',
    role_en: 'Volunteer Educator',
    role_de: 'Ehrenamtlicher Lehrer',
    sub_en: 'Python & Mathematics — 4 Government Schools',
    sub_de: 'Python & Mathematik — 4 staatliche Schulen',
    period: 'Mar 2022 – Aug 2024',
    location_en: 'Vellore, India',
    location_de: 'Vellore, Indien',
    brand: '#E87722',
    Icon: BookSmallSVG,
    points_en: [
      'Taught Python programming and Mathematics to ~200 students across 4 government schools in Tamil Nadu.',
      'Designed a beginner-friendly curriculum for students with no prior computer exposure.',
      'Built long-term mentoring habits and public-speaking confidence through grassroots teaching.',
    ],
    points_de: [
      'Python-Programmierung und Mathematik für ~200 Schüler an 4 staatlichen Schulen in Tamil Nadu unterrichtet.',
      'Anfängerfreundlichen Lehrplan für Schüler ohne Vorerfahrung mit Computern entwickelt.',
      'Langfristige Mentoring-Gewohnheiten und Redekompetenz durch Basisunterricht aufgebaut.',
    ],
  },
  {
    id: 'suzlon-csr',
    org: 'Suzlon Energy CSR',
    role_en: 'Volunteer Educator',
    role_de: 'Ehrenamtlicher Lehrer',
    sub_en: 'AI Literacy & Digital Inclusion',
    sub_de: 'KI-Bildung & Digitale Inklusion',
    period: 'Jun 2025 – Jun 2026',
    location_en: 'Pune, India',
    location_de: 'Pune, Indien',
    brand: '#F04E23',
    Icon: AISynapsesSVG,
    points_en: [
      'Ran weekly AI literacy sessions for children of plant staff and underserved communities.',
      'Taught foundational AI, digital literacy, and logical problem-solving to 50+ students.',
      'Translated complex ML concepts into accessible, beginner-friendly modules.',
    ],
    points_de: [
      'Wöchentliche KI-Bildungssitzungen für Kinder von Werkmitarbeitern und benachteiligte Gemeinschaften durchgeführt.',
      'Grundlagen-KI, digitale Kompetenz und logisches Problemlösen für 50+ Schüler gelehrt.',
      'Komplexe ML-Konzepte in zugängliche, anfängerfreundliche Module übersetzt.',
    ],
  },
  {
    id: 'acm',
    org: 'ACM Student Chapter — VIT',
    role_en: 'Operations & Marketing Head',
    role_de: 'Leiter für Betrieb & Marketing',
    sub_en: 'Association for Computing Machinery',
    sub_de: 'Association for Computing Machinery',
    period: 'Mar 2022 – Aug 2024',
    location_en: 'VIT Vellore',
    location_de: 'VIT Vellore',
    brand: '#1C6AC9',
    Icon: MicSmallSVG,
    points_en: [
      'Raised ~$11,000 in sponsorships through 200+ cold calls and corporate outreach.',
      'Ran end-to-end ops for multi-day events with 500+ participants — hackathons, ideathons, talks.',
      'Led cross-functional student teams across operations, marketing, design, and tech.',
    ],
    points_de: [
      'Rund 11.000 $ Sponsoring durch 200+ Kaltakquise-Anrufe und Unternehmenskontakte eingeworben.',
      'End-to-End-Betrieb für mehrtägige Veranstaltungen mit 500+ Teilnehmern verwaltet — Hackathons, Ideathons, Vorträge.',
      'Funktionsübergreifende Studententeams in Betrieb, Marketing, Design und Technik geleitet.',
    ],
  },
]

const learning = [
  {
    id: 'cfa',
    title_en: 'CFA Level 1',
    title_de: 'CFA Level 1',
    sub_en: '2026 sitting · currently studying',
    sub_de: 'Prüfung 2026 · aktuell am Lernen',
    body_en: 'Pursuing the Chartered Financial Analyst Level 1 to pair AI engineering depth with finance fluency — the language I need to build AI for capital markets. Not yet cleared.',
    body_de: 'Verfolge den Chartered Financial Analyst Level 1, um KI-Engineering-Tiefe mit Finanz-Fluenz zu paaren — die Sprache, die ich brauche, um KI für Kapitalmärkte zu bauen. Noch nicht bestanden.',
    Icon: GraduationCap,
    color: '#003F88',
    bgRing: 'rgba(0,63,136,0.10)',
    progress: 35,
  },
  {
    id: 'ai',
    title_en: 'Agentic AI Systems',
    title_de: 'Agentenbasierte KI-Systeme',
    sub_en: 'Daily · always shipping',
    sub_de: 'Täglich · ständig im Einsatz',
    body_en: 'Building agentic finance projects in LangGraph, MCP servers, RAG pipelines over financial documents, and LLM evaluation harnesses. Treat learning as a build practice, not a course list.',
    body_de: 'Baue agentenbasierte Finance-Projekte in LangGraph, MCP-Server, RAG-Pipelines über Finanzdokumente und LLM-Evaluierungs-Frameworks. Lernen als Build-Praxis, nicht als Kursliste.',
    Icon: Sparkles,
    color: '#3DAA72',
    bgRing: 'rgba(61,170,114,0.12)',
    progress: 100,
  },
  {
    id: 'reading',
    title_en: 'Reading & Research',
    title_de: 'Lesen & Recherche',
    sub_en: 'Capital markets · geopolitics · AI papers',
    sub_de: 'Kapitalmärkte · Geopolitik · KI-Papers',
    body_en: 'Following the agentic finance shift across JPMorgan, Citi, Goldman, Two Sigma. Reading earnings letters, CEO letters, and frontier AI research weekly. I write the best of it up on the blog.',
    body_de: 'Verfolge die agentenbasierte Finance-Verschiebung bei JPMorgan, Citi, Goldman, Two Sigma. Lese wöchentlich Quartalsberichte, CEO-Briefe und KI-Forschung. Das Beste schreibe ich auf dem Blog auf.',
    Icon: BookOpen,
    color: '#C19A3D',
    bgRing: 'rgba(193,154,61,0.15)',
    progress: 100,
  },
]

export default function GivingBack() {
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
    <section
      id="giving-back"
      ref={ref}
      className="relative pt-10 pb-28 px-6 bg-white overflow-hidden"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute hidden lg:block opacity-[0.06] float-slow" style={{ left: '40px', top: '120px' }}>
        <OpenBookSVG size={160} color="#1A3D2B" />
      </div>
      <div className="pointer-events-none absolute hidden lg:block opacity-[0.06] float-slow-2" style={{ right: '60px', bottom: '180px' }}>
        <OpenBookSVG size={140} color="#003F88" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header (continued from Life) */}
        <p className="reveal text-xs font-mono uppercase tracking-[0.2em] text-[#1A3D2B] mb-4 flex items-center gap-2">
          <span className="inline-block w-6 h-px bg-[#1A3D2B]" />
          {isDE ? '07 → Zurückgeben & Lernen' : '07 → Giving Back & Learning'}
        </p>
        <h2 className="reveal font-display text-[clamp(2.2rem,5vw,3.8rem)] font-black text-[#1A1A18] mb-3 leading-tight">
          {isDE
            ? <>Lehren, was ich weiß. <em className="text-[#1A3D2B]">Lernen, was ich brauche.</em></>
            : <>Teach what I know. <em className="text-[#1A3D2B]">Learn what I need.</em></>}
        </h2>
        <p className="reveal text-[#6E7A70] text-lg max-w-2xl mb-12 leading-relaxed">
          {isDE
            ? '250+ Schüler unterrichtet, 11.000 $ als Studenten-Operations-Lead aufgebracht — und jeden Tag der nächste Skill, der gebraucht wird.'
            : 'Taught 250+ students, raised $11,000 as a student ops lead — and every day, the next skill I need.'}
        </p>

        {/* ── GIVING BACK ──────────────────────────────────────── */}
        <div className="mb-16">
          <div className="reveal flex items-center gap-3 mb-6">
            <div className="w-1 h-6 rounded-full bg-[#1A3D2B]" />
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#1A3D2B]">
              {isDE ? 'Zurückgeben' : 'Giving Back'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {volunteering.map((v, i) => {
              const Icon = v.Icon
              return (
                <div
                  key={v.id}
                  className={`reveal reveal-d${i + 1} bg-[#F8F5EE] border border-[#E4E0D6] rounded-2xl p-6 hover:border-[#3DAA72]/40 hover:shadow-lg transition-all duration-300`}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex-shrink-0 p-2"
                      style={{ background: `${v.brand}12`, border: `1.5px solid ${v.brand}25` }}
                    >
                      <Icon />
                    </div>
                    <div>
                      <p className="font-bold text-[#1A1A18] text-sm leading-tight">{isDE ? v.role_de : v.role_en}</p>
                      <p className="text-xs font-semibold mt-0.5" style={{ color: v.brand }}>{v.org}</p>
                      <p className="text-[10px] text-[#8A9280] font-mono mt-0.5">
                        {v.period} · {isDE ? v.location_de : v.location_en}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-[#8A9280] font-mono mb-3 italic">{isDE ? v.sub_de : v.sub_en}</p>
                  <ul className="space-y-2">
                    {(isDE ? v.points_de : v.points_en).map((p, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-[#6E7A70] leading-relaxed">
                        <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: v.brand }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          {/* Quick stat strip */}
          <div className="reveal mt-6 flex flex-wrap items-center gap-x-8 gap-y-2 text-xs font-mono text-[#6E7A70]">
            <span><strong className="text-[#1A3D2B] font-bold text-base">250+</strong> {isDE ? 'Schüler unterrichtet' : 'students taught'}</span>
            <span><strong className="text-[#1A3D2B] font-bold text-base">$11K</strong> {isDE ? 'Sponsoring eingeworben' : 'in sponsorships raised'}</span>
            <span><strong className="text-[#1A3D2B] font-bold text-base">4</strong> {isDE ? 'staatliche Schulen erreicht' : 'government schools reached'}</span>
            <span><strong className="text-[#1A3D2B] font-bold text-base">3+ {isDE ? 'Jahre' : 'years'}</strong> {isDE ? 'ehrenamtlich' : 'volunteering'}</span>
          </div>
        </div>

        {/* ── ALWAYS LEARNING ──────────────────────────────────── */}
        <div>
          <div className="reveal flex items-center gap-3 mb-6">
            <div className="w-1 h-6 rounded-full bg-[#003F88]" />
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#003F88]">
              {isDE ? 'Immer am Lernen' : 'Always Learning'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {learning.map((l, i) => {
              const Icon = l.Icon
              return (
                <div
                  key={l.id}
                  className={`reveal reveal-d${i + 1} bg-white border border-[#E4E0D6] rounded-2xl p-6 hover:border-[#003F88]/30 hover:shadow-lg transition-all duration-300`}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: l.bgRing }}
                    >
                      <Icon size={20} style={{ color: l.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#1A1A18] text-sm leading-tight">{isDE ? l.title_de : l.title_en}</p>
                      <p className="text-[10px] text-[#8A9280] font-mono mt-0.5">{isDE ? l.sub_de : l.sub_en}</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#6E7A70] leading-relaxed mb-4">{isDE ? l.body_de : l.body_en}</p>
                  <div className="h-1 bg-[#F0EDE4] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${l.progress}%`, background: l.color, opacity: 0.75 }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Closing line */}
        <p className="reveal mt-10 text-center text-[#6E7A70] text-base italic font-display max-w-2xl mx-auto">
          {isDE
            ? '„Wenn ich nicht lerne, baue ich nicht. Wenn ich nicht lehre, lerne ich nicht."'
            : '"If I am not learning, I am not building. If I am not teaching, I am not learning."'}
        </p>
        <p className="text-center text-[10px] font-mono text-[#B0A898] tracking-widest mt-2">
          — {isDE ? 'persönliches Mantra' : 'personal mantra'}
        </p>
      </div>
    </section>
  )
}

/* keep Users import to avoid tree-shaking issues if reused elsewhere */
void Users
