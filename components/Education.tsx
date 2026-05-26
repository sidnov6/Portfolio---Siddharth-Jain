'use client'
import { useEffect, useRef } from 'react'
import { useLang } from '@/lib/language-context'
import { GraduationCapSVG, OpenBookSVG } from '@/components/Decorations'

const schools = [
  {
    name: 'Frankfurt School of Finance & Management',
    short: 'Frankfurt School',
    degree: { en: 'MSc Artificial Intelligence & Data Science', de: 'MSc Künstliche Intelligenz & Data Science' },
    period: '2026 – 2028',
    location: { en: 'Frankfurt, Germany 🇩🇪', de: 'Frankfurt, Deutschland 🇩🇪' },
    status: { en: 'In Progress', de: 'Laufend' },
    brand: '#006B38',
    brandLight: 'rgba(0,107,56,0.07)',
    photo: '/education/frankfurt-school.jpg',
    description: {
      en: "Pursuing an MSc in AI & Data Science at one of Europe's leading finance and management schools, located in the heart of Frankfurt — Germany's financial capital.",
      de: 'Studium des MSc in KI & Data Science an einer der führenden Finanz- und Managementhochschulen Europas, im Herzen von Frankfurt — Deutschlands Finanzhauptstadt.',
    },
    courses: ['Machine Learning', 'Deep Learning', 'NLP & LLMs', 'Data Engineering', 'AI Ethics', 'Cloud Computing', 'Research Methods'],
    highlights: {
      en: [
        'Ranked #32 worldwide — among the strongest global positions in Finance & Management (FT Global Rankings)',
        'Specialising in applied AI for financial and industrial systems',
        'Located in Frankfurt — the financial capital of continental Europe',
        'Research focus: enterprise LLMs, agentic finance, and data-intensive AI systems',
      ],
      de: [
        'Weltweit auf Platz 32 — eine der stärksten globalen Positionen in Finance & Management (FT Global Rankings)',
        'Schwerpunkt auf angewandter KI für Finanz- und Industriesysteme',
        'Frankfurt — die Finanzhauptstadt Kontinentaleuropas',
        'Forschungsschwerpunkt: Enterprise-LLMs, agentenbasierte Finance-Systeme und datenintensive KI',
      ],
    },
    accentText: { en: '#32 Worldwide · Frankfurt, Germany', de: 'Weltweit #32 · Frankfurt, Deutschland' },
  },
  {
    name: 'VIT Vellore',
    short: 'Vellore Institute of Technology',
    degree: { en: 'B.Tech — Information Technology', de: 'B.Tech — Informationstechnologie' },
    period: '2021 – 2025',
    location: { en: 'Vellore, Tamil Nadu, India 🇮🇳', de: 'Vellore, Tamil Nadu, Indien 🇮🇳' },
    status: { en: 'Completed', de: 'Abgeschlossen' },
    brand: '#2E3191',
    brandLight: 'rgba(46,49,145,0.06)',
    photo: '/education/vit-vellore.jpg',
    description: {
      en: "Completed B.Tech in IT from one of India's top-ranked private engineering universities, while completing 3 international research internships across the USA and India.",
      de: 'B.Tech in IT an einer der bestplatzierten privaten Ingenieursuniversitäten Indiens abgeschlossen, mit 3 internationalen Forschungspraktika in den USA und Indien.',
    },
    courses: ['Data Structures & Algorithms', 'Database Systems', 'Machine Learning', 'Computer Networks', 'OS', 'Software Engineering', 'Linear Algebra & Probability'],
    highlights: {
      en: [
        'Ranked #12 in India among top universities (NIRF + QS rankings)',
        'Completed 3 international research internships during undergrad — Georgia Tech, Coulter BME (GT × Emory), IIT Jammu',
        'National-level basketball player throughout all 4 years',
        'Led the ACM Student Chapter as Operations & Marketing Head — raised $11K in sponsorships',
      ],
      de: [
        'In Indien auf Platz 12 unter den Top-Universitäten (NIRF + QS-Ranking)',
        'Während des Studiums 3 internationale Forschungspraktika absolviert — Georgia Tech, Coulter BME (GT × Emory), IIT Jammu',
        'Nationaler Basketballspieler in allen 4 Studienjahren',
        'ACM Student Chapter als Operations- und Marketing-Lead geführt — 11.000 $ Sponsoring eingeworben',
      ],
    },
    accentText: { en: '#12 India · Vellore', de: 'Indien #12 · Vellore' },
  },
]

export default function Education() {
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
    <section id="education" ref={ref} className="relative py-28 px-6 bg-[#F8F5EE] section-grain overflow-hidden">
      {/* Background decorations */}
      <div className="pointer-events-none absolute hidden lg:block opacity-[0.08] float-slow" style={{ right: '60px', top: '100px' }}>
        <GraduationCapSVG size={130} color="#1A3D2B" />
      </div>
      <div className="pointer-events-none absolute hidden lg:block opacity-[0.07] float-slow-2" style={{ left: '50px', top: '350px' }}>
        <OpenBookSVG size={160} color="#1A3D2B" />
      </div>
      <div className="pointer-events-none absolute hidden lg:block opacity-[0.08]" style={{ right: '80px', bottom: '120px' }}>
        <GraduationCapSVG size={100} color="#1A3D2B" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <p className="reveal text-xs font-mono uppercase tracking-[0.2em] text-[#3DAA72] mb-4">
          {isDE ? '06 / Ausbildung' : '06 / Education'}
        </p>
        <h2 className="reveal font-display text-[clamp(2.2rem,5vw,3.8rem)] font-black text-[#1A1A18] mb-3 leading-tight">
          {isDE ? <>Akademische <em className="text-[#1A3D2B]">Grundlagen</em></> : <>Academic <em className="text-[#1A3D2B]">Foundations</em></>}
        </h2>
        <p className="reveal text-[#6E7A70] text-lg max-w-2xl mb-16 leading-relaxed">
          {isDE
            ? 'Von VIT Vellore zur Frankfurt School — die Grundlagen für praxisnahe Unternehmens-KI.'
            : 'From VIT Vellore to Frankfurt School — building the foundations that power real-world enterprise AI.'}
        </p>

        <div className="space-y-8">
          {schools.map((s, idx) => (
            <div
              key={s.name}
              className={`reveal reveal-d${idx + 1} bg-white border border-[#E4E0D6] rounded-3xl overflow-hidden shadow-sm card-lift`}
            >
              <div className="grid lg:grid-cols-5">
                {/* Photo panel */}
                <div
                  className="lg:col-span-2 relative min-h-[220px] lg:min-h-0 overflow-hidden flex items-center justify-center"
                  style={{ background: s.brandLight }}
                >
                  {/* Actual photo */}
                  <img
                    src={s.photo}
                    alt={s.name}
                    loading="lazy"
                    decoding="async"
                    className="photo-reveal active absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${s.brand}20, transparent 60%)` }} />

                  {/* Brand identity block */}
                  <div className="relative z-10 p-8 flex flex-col justify-between h-full">
                    {/* Status */}
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full w-fit"
                      style={{ background: `${s.brand}15`, border: `1.5px solid ${s.brand}30` }}
                    >
                      <span className={`w-2 h-2 rounded-full ${s.status.en === 'In Progress' ? 'animate-pulse' : ''}`}
                        style={{ background: s.brand }} />
                      <span className="text-xs font-semibold font-mono" style={{ color: s.brand }}>{isDE ? s.status.de : s.status.en}</span>
                    </div>

                    <div className="mt-auto">
                      {/* School initial large */}
                      <div
                        className="font-display text-[80px] font-black leading-none mb-2 opacity-10"
                        style={{ color: s.brand }}
                      >
                        {s.short.split(' ').map(w => w[0]).join('').slice(0, 3)}
                      </div>
                      <p className="text-xs font-mono text-[#8A9280]">{isDE ? s.accentText.de : s.accentText.en}</p>
                    </div>
                  </div>
                </div>

                {/* Content panel */}
                <div className="lg:col-span-3 p-6 lg:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                    <div>
                      <h3 className="font-display text-xl font-black text-[#1A1A18] leading-tight mb-1">{isDE ? s.degree.de : s.degree.en}</h3>
                      <p className="font-semibold text-sm" style={{ color: s.brand }}>{s.name}</p>
                      <p className="text-xs font-mono text-[#8A9280] mt-1">{s.period} · {isDE ? s.location.de : s.location.en}</p>
                    </div>
                  </div>

                  <p className="text-[#6E7A70] text-sm leading-relaxed mb-5">{isDE ? s.description.de : s.description.en}</p>

                  <ul className="space-y-2 mb-6">
                    {(isDE ? s.highlights.de : s.highlights.en).map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-[#4A4A47]">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.brand }} />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#8A9280] mb-2.5">
                      {isDE ? 'Hauptfächer' : 'Key Courses'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {s.courses.map(c => (
                        <span key={c} className="text-xs px-2.5 py-1 rounded-full font-medium"
                          style={{ background: s.brandLight, color: s.brand, border: `1px solid ${s.brand}20` }}>
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
