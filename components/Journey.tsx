'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useLang } from '@/lib/language-context'

/* ── Animated SVGs per experience ────────────────────────────── */

function WindTurbineSVG() {
  return (
    <svg viewBox="0 0 120 200" className="w-full h-full" aria-hidden>
      {/* Tower */}
      <polygon points="57,198 63,198 65,90 55,90" fill="rgba(240,78,35,0.4)" />
      <ellipse cx="60" cy="198" rx="14" ry="4" fill="rgba(240,78,35,0.3)" />
      {/* Nacelle */}
      <rect x="52" y="83" width="16" height="11" rx="4" fill="rgba(240,78,35,0.6)" />
      {/* Rotating blades */}
      <g style={{ transformBox: 'fill-box', transformOrigin: '60px 89px', animation: 'turbineSpin 3.5s linear infinite' }}>
        <ellipse cx="60" cy="56" rx="5.5" ry="33" fill="rgba(240,78,35,0.85)" />
        <ellipse cx="60" cy="56" rx="5.5" ry="33" fill="rgba(200,60,20,0.7)" transform="rotate(120 60 89)" />
        <ellipse cx="60" cy="56" rx="5.5" ry="33" fill="rgba(240,78,35,0.85)" transform="rotate(240 60 89)" />
        <circle cx="60" cy="89" r="7" fill="#F04E23" />
        <circle cx="60" cy="89" r="3.5" fill="rgba(255,220,200,0.9)" />
      </g>
      {/* Wind lines */}
      {[30, 50, 70].map((y, i) => (
        <line key={i} x1="0" y1={y} x2={18 + i * 4} y2={y} stroke="rgba(240,78,35,0.3)" strokeWidth="2" strokeLinecap="round"
          style={{ animation: `windLine 1.8s ease-in-out ${i * 0.3}s infinite` }} />
      ))}
    </svg>
  )
}

function HeartbeatSVG() {
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full" aria-hidden>
      {/* Grid lines */}
      {[25, 50, 75].map(y => (
        <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="rgba(1,33,105,0.08)" strokeWidth="1" />
      ))}
      {[50, 100, 150].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="100" stroke="rgba(1,33,105,0.08)" strokeWidth="1" />
      ))}
      {/* ECG line */}
      <polyline
        className="heartbeat-line"
        points="0,50 20,50 30,50 40,20 50,80 60,10 70,90 80,50 100,50 120,50 130,50 140,20 150,80 160,10 170,90 180,50 200,50"
        fill="none"
        stroke="#012169"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Moving dot */}
      <circle r="4" fill="#F2A900">
        <animateMotion dur="2.5s" repeatCount="indefinite"
          path="M0,50 L20,50 L30,50 L40,20 L50,80 L60,10 L70,90 L80,50 L100,50 L120,50 L130,50 L140,20 L150,80 L160,10 L170,90 L180,50 L200,50" />
      </circle>
    </svg>
  )
}

function SignalWaveSVG() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" aria-hidden>
      {/* Tower */}
      <line x1="60" y1="120" x2="60" y2="60" stroke="rgba(0,63,136,0.4)" strokeWidth="3" strokeLinecap="round" />
      <polygon points="60,60 54,75 66,75" fill="rgba(0,63,136,0.5)" />
      {/* Signal rings */}
      {[1, 2, 3].map(i => (
        <circle key={i} cx="60" cy="55" r={i * 14} fill="none" stroke="#003F88" strokeWidth="2"
          className="signal-ring" style={{ animationDelay: `${(i - 1) * 0.5}s` }} />
      ))}
      {/* Dot at center */}
      <circle cx="60" cy="55" r="5" fill="#00ABE9" style={{ animation: 'pulseSoft 1.5s ease-in-out infinite' }} />
    </svg>
  )
}

function ShieldCircuitSVG() {
  return (
    <svg viewBox="0 0 120 140" className="w-full h-full" aria-hidden>
      {/* Shield */}
      <path d="M60,8 L105,28 L105,68 Q105,105 60,128 Q15,105 15,68 L15,28 Z"
        fill="rgba(179,163,105,0.12)" stroke="#B3A369" strokeWidth="2.5" />
      {/* Circuit lines */}
      <g stroke="#B3A369" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <polyline points="40,55 40,45 55,45 55,55" style={{ animation: 'drawLine 2s ease-out 0.3s forwards', strokeDasharray: 100, strokeDashoffset: 100 }} />
        <polyline points="60,55 60,40 75,40 75,55" style={{ animation: 'drawLine 2s ease-out 0.6s forwards', strokeDasharray: 100, strokeDashoffset: 100 }} />
        <line x1="40" y1="70" x2="80" y2="70" style={{ animation: 'drawLine 2s ease-out 0.9s forwards', strokeDasharray: 100, strokeDashoffset: 100 }} />
        <polyline points="40,80 40,90 80,90 80,80" style={{ animation: 'drawLine 2s ease-out 1.2s forwards', strokeDasharray: 100, strokeDashoffset: 100 }} />
      </g>
      {/* Lock icon center */}
      <rect x="52" y="60" width="16" height="12" rx="2" fill="#B3A369" style={{ animation: 'pulseSoft 2s ease-in-out infinite' }} />
      <path d="M56,60 L56,56 Q60,52 64,56 L64,60" fill="none" stroke="#B3A369" strokeWidth="2" />
      <circle cx="60" cy="67" r="2.5" fill="#F8F5EE" />
    </svg>
  )
}


/* ── Experience data ─────────────────────────────────────────── */
const VH_PER_EXP = 100  // 1 viewport-height of scroll per experience

const experiences = [
  {
    id: 0, type: 'work',
    company: 'Suzlon Energy',
    companyFull: 'Suzlon Energy Limited',
    role: { en: 'AI Engineer — CEO Office', de: 'KI-Ingenieur — CEO-Büro' },
    sub: { en: 'Manufacturing AI, Data & Digitisation Strategy', de: 'Fertigungs-KI, Daten & Digitalisierungsstrategie' },
    period: 'Jun 2025 – Jun 2026', location: { en: 'Pune, India', de: 'Pune, Indien' },
    brand: '#F04E23', brandLight: 'rgba(240,78,35,0.08)',
    photo: '/journey/suzlon-team.jpg',
    tag: { en: 'Full-time · India\'s leading wind-energy company', de: 'Vollzeit · Indiens führender Windenergie-Konzern' },
    headline: {
      en: 'Owned the AI, BI, and data strategy for Suzlon\'s manufacturing organisation — 10 plants, 300+ users, $4.8M annualised impact.',
      de: 'Verantwortlich für die KI-, BI- und Datenstrategie der Fertigungsorganisation von Suzlon — 10 Werke, 300+ Nutzer, 4,8 Mio.$ jährlicher Impact.',
    },
    points: {
      en: [
        'Delivered 14 enterprise BI dashboards and shipped 7 production GenAI bots (RAG + SQL agents) across Quality, Safety, Production, Energy, and HR — serving 300+ daily users across 10 manufacturing plants in Asia and Europe.',
        'Led a 6-person engineering team to design and ship Suzlon\'s Manufacturing Control Tower — a unified executive cockpit consolidating 250+ KPIs across SQPDCME (Safety, Quality, Productivity, Delivery, Cost, Manpower, Environment) as a single source of truth for the Manufacturing CEO.',
        'Re-engineered Suzlon\'s monthly Manufacturing Business Review Committee end-to-end — sourced and modelled data from 15+ operational systems, then deployed agentic AI that answers live CXO questions with on-the-fly charts. Retired manual dashboards and Excel reporting entirely.',
        'Co-authored Suzlon\'s enterprise AI, Data & Digitisation strategy — defining the operating model, tooling stack, and roadmap that scaled across the organisation.',
      ],
      de: [
        'Lieferte 14 Enterprise-BI-Dashboards und brachte 7 produktive GenAI-Bots (RAG + SQL-Agenten) in Betrieb für Qualität, Sicherheit, Produktion, Energie und HR — täglich genutzt von 300+ Anwendern an 10 Fertigungswerken in Asien und Europa.',
        'Leitete ein 6-köpfiges Engineering-Team beim Aufbau von Suzlons Manufacturing Control Tower — einer einheitlichen Executive-Plattform, die 250+ KPIs in SQPDCME (Sicherheit, Qualität, Produktivität, Lieferung, Kosten, Personal, Umwelt) als zentrale Wahrheitsquelle für den Manufacturing CEO konsolidiert.',
        'Gestaltete Suzlons monatliches Manufacturing Business Review Committee end-to-end neu — Aggregation und Modellierung von Daten aus 15+ operativen Systemen sowie agentenbasierte KI, die Live-CXO-Fragen mit dynamischen Charts beantwortet. Manuelle Dashboards und Excel-Reports vollständig ersetzt.',
        'Mitverfasste Suzlons unternehmensweite Strategie für KI, Daten und Digitalisierung — Operating Model, Tooling-Stack und Roadmap, skaliert auf die gesamte Organisation.',
      ],
    },
    Anim: WindTurbineSVG,
    animLabel: { en: 'Wind Energy', de: 'Windenergie' },
  },
  {
    id: 1, type: 'internship',
    company: 'Georgia Tech',
    companyFull: 'Georgia Institute of Technology',
    role: { en: 'Cybersecurity Summer Intern', de: 'Cybersecurity-Praktikant' },
    sub: { en: 'Research Computing & Data — Healthcare Systems', de: 'Forschungsrechnen & Daten — Gesundheitssysteme' },
    period: 'May – Aug 2024', location: { en: 'Atlanta, USA', de: 'Atlanta, USA' },
    brand: '#B3A369', brandLight: 'rgba(179,163,105,0.08)',
    photo: '/journey/gt-buzzcard.jpg',
    tag: { en: '1 of 10 Selected Nationally · 10,000+ Applicants', de: '1 von 10 national ausgewählt · 10.000+ Bewerber' },
    headline: {
      en: 'Built cybersecurity middleware that solved 50+ critical interoperability failures across US healthcare systems.',
      de: 'Cybersecurity-Middleware entwickelt, die 50+ kritische Interoperabilitätsfehler in US-Gesundheitssystemen behob.',
    },
    points: {
      en: [
        'Selected as 1 of only 10 students from all of India out of 10,000+ applicants — among the country\'s most competitive research programmes',
        'Worked under Matt Sanders, Director of Research Computing and Data',
        'Bridged legacy hospital systems with modern cloud EHR platforms',
        'Developed core components of patient data pipeline security middleware',
        'Solved 50+ critical integration failures, enabling production-ready data exchange',
      ],
      de: [
        'Als einer von nur 10 Studierenden aus ganz Indien aus über 10.000 Bewerbern ausgewählt — eines der wettbewerbsstärksten Forschungsprogramme des Landes',
        'Unter Matt Sanders, Director of Research Computing and Data, gearbeitet',
        'Legacy-Krankenhaussysteme mit modernen Cloud-EHR-Plattformen verbunden',
        'Kernkomponenten der Sicherheits-Middleware für Patientendaten-Pipelines entwickelt',
        '50+ kritische Integrationsfehler behoben und produktionsreife Datenkommunikation ermöglicht',
      ],
    },
    Anim: ShieldCircuitSVG,
    animLabel: { en: 'Cybersecurity', de: 'Cybersicherheit' },
  },
  {
    id: 2, type: 'research',
    company: 'Coulter BME (GT × Emory)',
    companyFull: 'Wallace H. Coulter Department of Biomedical Engineering — Georgia Tech & Emory',
    role: { en: 'AI Research Intern — Medical Imaging', de: 'KI-Forschungspraktikant — Medizinische Bildgebung' },
    sub: { en: 'Automated Sarcopenia Assessment · Dr. Rakesh Shiradkar', de: 'Automatisierte Sarkopenie-Erkennung · Dr. Rakesh Shiradkar' },
    period: 'Jan – Sep 2024', location: { en: 'Atlanta, USA', de: 'Atlanta, USA' },
    brand: '#012169', brandLight: 'rgba(1,33,105,0.06)',
    photo: '/journey/coulter-team.jpg',
    tag: { en: 'Joint GT + Emory · Top-3 US BME Programme', de: 'GT + Emory Joint · Top-3 US BME-Programm' },
    headline: {
      en: 'Built a deep learning pipeline achieving 94% accuracy and <1 second inference on 1000+ CT scans at the joint Georgia Tech × Emory BME department.',
      de: 'Deep-Learning-Pipeline an der gemeinsamen BME-Fakultät von Georgia Tech und Emory entwickelt — 94% Genauigkeit, <1 Sekunde Inferenz auf 1000+ CT-Scans.',
    },
    points: {
      en: [
        'Joined the Wallace H. Coulter Department of Biomedical Engineering — a flagship joint programme between Georgia Tech\'s engineering school and Emory\'s medical school, consistently ranked Top-3 in the US.',
        'Automated sarcopenia detection from CT scans under Dr. Rakesh Shiradkar — built a full deep learning pipeline from data prep to production inference.',
        'Achieved 94% prediction accuracy with ~1mm human-level segmentation precision; reduced manual CT-scan analysis time from ~10 minutes to under 1 second.',
        'Processed 1000+ CT scans with a deployable, production-ready inference pipeline used by the research group.',
      ],
      de: [
        'Beitrat dem Wallace H. Coulter Department of Biomedical Engineering — einem führenden gemeinsamen Programm von Georgia Techs Ingenieurschule und Emorys medizinischer Fakultät, durchgängig in den US-Top-3.',
        'Automatisierte Sarkopenie-Erkennung aus CT-Scans unter Dr. Rakesh Shiradkar — komplette Deep-Learning-Pipeline von Datenaufbereitung bis Produktions-Inferenz.',
        '94% Vorhersagegenauigkeit mit ~1mm Segmentierungspräzision auf menschlichem Niveau; manuelle CT-Scan-Analysezeit von ~10 Minuten auf unter 1 Sekunde reduziert.',
        '1000+ CT-Scans mit produktionsreifer Inferenz-Pipeline für die Forschungsgruppe verarbeitet.',
      ],
    },
    Anim: HeartbeatSVG,
    animLabel: { en: 'Medical AI', de: 'Medizinische KI' },
  },
  {
    id: 3, type: 'research',
    company: 'IIT Jammu',
    companyFull: 'Indian Institute of Technology Jammu',
    role: { en: 'Research Intern — 5G & Network Security', de: 'Forschungspraktikant — 5G & Netzwerksicherheit' },
    sub: { en: 'Containerized IDS/IPS · Dr. Samaresh Bera', de: 'Containerisiertes IDS/IPS · Dr. Samaresh Bera' },
    period: 'Oct – Dec 2023', location: { en: 'Jammu, India', de: 'Jammu, Indien' },
    brand: '#003F88', brandLight: 'rgba(0,63,136,0.06)',
    photo: '/journey/iitj-view.jpg',
    tag: { en: 'Network Security Research', de: 'Netzwerksicherheitsforschung' },
    headline: {
      en: 'Improved 5G network throughput by 19% under peak loads via containerized IDS/IPS architecture.',
      de: '5G-Netzwerkdurchsatz durch containerisierte IDS/IPS-Architektur um 19% unter Spitzenlast verbessert.',
    },
    points: {
      en: [
        'Designed containerized IDS/IPS deployment for secure traffic routing in 5G networks',
        'Achieved 19% throughput improvement under peak load conditions',
        'Analyzed security system performance under varying network traffic conditions',
        'Worked on high-reliability, low-latency security constraints for telecom-grade systems',
        'Presented findings on 5G IDS/IPS performance benchmarking to research team',
      ],
      de: [
        'Containerisiertes IDS/IPS für sichere Verkehrsweiterleitung in 5G-Netzen entworfen',
        '19% Durchsatzsteigerung unter Spitzenlastbedingungen erzielt',
        'Sicherheitssystemleistung unter variierenden Netzwerkverkehrsbedingungen analysiert',
        'An Hochzuverlässigkeits- und Niedriglatenz-Sicherheitsanforderungen für Telekommunikationssysteme gearbeitet',
        'Ergebnisse zum 5G-IDS/IPS-Performance-Benchmarking dem Forschungsteam präsentiert',
      ],
    },
    Anim: SignalWaveSVG,
    animLabel: { en: '5G Security', de: '5G-Sicherheit' },
  },
]

const numExperiences = experiences.length

/* ── Main component ──────────────────────────────────────────── */
export default function Journey() {
  const containerRef  = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx]         = useState(0)
  const [innerProgress, setInnerProgress] = useState(0)
  const { lang } = useLang()
  const isDE = lang === 'de'

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return
    const rect     = containerRef.current.getBoundingClientRect()
    const total    = rect.height - window.innerHeight
    const scrolled = Math.max(0, -rect.top)
    const progress = Math.min(1, scrolled / total)
    const sectionF  = progress * numExperiences
    const newExpIdx = Math.min(Math.floor(sectionF), numExperiences - 1)
    const newInnerProgress = Math.max(0, Math.min(1, sectionF - newExpIdx))
    setActiveIdx(newExpIdx)
    setInnerProgress(newInnerProgress)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const exp = experiences[activeIdx]

  return (
    <section id="journey">
      {/* ── Sticky scroll experience ───────────────────────────── */}
      <div
        ref={containerRef}
        style={{ height: `${numExperiences * VH_PER_EXP}vh` }}
        className="relative"
      >
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* Background photo layers — one per experience, cross-fade on scroll */}
          {experiences.map((e, ei) => {
            const isActive = ei === activeIdx
            return (
              <div
                key={ei}
                className="journey-bg-image"
                style={{
                  backgroundImage: `url(${e.photo})`,
                  backgroundColor: e.brandLight,
                  opacity: isActive ? 1 : 0,
                  filter: isActive ? 'blur(0px) brightness(1.05)' : 'blur(12px)',
                  transform: isActive ? 'scale(1)' : 'scale(1.05)',
                  transition: 'opacity 0.7s ease, filter 0.7s ease, transform 0.7s ease',
                }}
              />
            )
          })}

          {/* Vignette: cream at left/right edges (where text lives), transparent in the center so the photo shows */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to right, rgba(248,245,238,0.94) 0%, rgba(248,245,238,0.75) 22%, rgba(248,245,238,0.12) 42%, rgba(248,245,238,0.12) 58%, rgba(248,245,238,0.75) 78%, rgba(248,245,238,0.94) 100%)'
          }} />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col">

            {/* Section label */}
            <div className="pt-16 lg:pt-24 px-4 lg:px-16 pb-4 flex items-center justify-between">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#1A3D2B] font-semibold">
                {isDE ? '02 / Beruflicher Werdegang' : '02 / Professional Journey'}
              </p>
              {/* Progress dots */}
              <div className="flex items-center gap-2">
                {experiences.map((_, i) => {
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        const target = containerRef.current
                        if (!target) return
                        const totalScroll = target.offsetHeight - window.innerHeight
                        const scrollTo = target.offsetTop + (i / numExperiences) * totalScroll
                        window.scrollTo({ top: scrollTo, behavior: 'smooth' })
                      }}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width:  i === activeIdx ? 24 : 8,
                        height: 8,
                        background: i === activeIdx ? exp.brand : '#D6D0C4',
                      }}
                    />
                  )
                })}
              </div>
            </div>

            {/* Main content grid */}
            <div className="flex-1 grid lg:grid-cols-2 gap-0 items-center px-4 lg:px-16 pb-4 lg:pb-16">

              {/* Left — company info + animated SVG */}
              <div className="flex flex-col justify-center pr-0 lg:pr-12">

                {/* Company brand badge */}
                <div
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-3 lg:mb-6 w-fit transition-all duration-500"
                  style={{ background: exp.brandLight, border: `1.5px solid ${exp.brand}30` }}
                >
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: exp.brand }} />
                  <span className="text-xs font-semibold font-mono" style={{ color: exp.brand }}>
                    {isDE ? exp.tag.de : exp.tag.en}
                  </span>
                </div>

                <h2 className="font-display text-[clamp(2rem,6vw,5rem)] font-black leading-[0.95] text-[#1A1A18] mb-3 transition-all duration-500">
                  {exp.company}
                </h2>
                <p className="font-display font-bold text-base lg:text-xl mb-1" style={{ color: exp.brand }}>{isDE ? exp.role.de : exp.role.en}</p>
                <p className="font-display text-[#4A4A47] text-base font-semibold mb-1">{isDE ? exp.sub.de : exp.sub.en}</p>
                <p className="font-mono text-xs text-[#8A9280] mb-5">
                  {exp.period} · {isDE ? exp.location.de : exp.location.en}
                </p>

                <p className="font-display text-[#1A1A18] text-sm lg:text-xl leading-snug font-bold max-w-md mb-4 lg:mb-8">
                  {isDE ? exp.headline.de : exp.headline.en}
                </p>

                {/* Animated illustration */}
                <div
                  className="w-28 h-28 sm:w-36 sm:h-36 transition-all duration-700"
                  style={{ filter: `drop-shadow(0 4px 24px ${exp.brand}30)` }}
                >
                  <exp.Anim />
                </div>
                <p className="text-[10px] font-display font-semibold text-[#C0B8B0] mt-2 uppercase tracking-widest">
                  {isDE ? exp.animLabel.de : exp.animLabel.en}
                </p>
              </div>{/* end left column */}

              {/* Right — achievement bullets (desktop only) */}
              <div className="hidden lg:flex flex-col justify-center pl-0 lg:pl-12 lg:border-l border-[#E4E0D6]/60 lg:bg-white/40 lg:backdrop-blur-[1px] lg:rounded-2xl lg:px-8 lg:py-6">
                <div
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl mb-6 w-fit"
                  style={{ background: exp.brand }}
                >
                  <span className="text-base font-display font-black tracking-wide text-white uppercase">
                    {isDE ? 'Hauptbeiträge' : 'Key Contributions'}
                  </span>
                </div>
                <ul className="space-y-4">
                  {(isDE ? exp.points.de : exp.points.en).map((pt, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[#1A1A18] text-base leading-relaxed font-semibold transition-all duration-500"
                      style={{ transitionDelay: `${i * 0.05}s` }}
                    >
                      <span
                        className="mt-2 w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: exp.brand }}
                      />
                      {pt}
                    </li>
                  ))}
                </ul>

                {/* Inner progress mini bar */}
                <div className="mt-8 flex items-center gap-3">
                  <div className="flex-1 h-0.5 bg-[#E4E0D6] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300 progress-bar-fill"
                      style={{ width: `${activeIdx === experiences.length - 1 ? 100 : innerProgress * 100}%`, background: exp.brand }}
                    />
                  </div>
                  <span className="text-xs font-display font-bold text-[#8A9280]">
                    {activeIdx + 1} / {experiences.length}
                  </span>
                </div>
              </div>{/* end right column */}
            </div>
          </div>

          {/* Scroll nudge */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#B0A898] mb-1">{isDE ? 'scrollen zum erkunden' : 'scroll to explore'}</p>
            <div className="w-px h-8 bg-gradient-to-b from-[#B0A898] to-transparent mx-auto" style={{ animation: 'scrollHint 2s ease-in-out infinite' }} />
          </div>
        </div>
      </div>

    </section>
  )
}
