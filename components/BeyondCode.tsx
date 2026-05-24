'use client'
import { useEffect, useRef } from 'react'
import { useLang } from '@/lib/language-context'

function ManUtdCrest() {
  return (
    <svg viewBox="0 0 100 120" className="w-full h-full" aria-hidden>
      <path d="M50,5 L92,22 L92,65 Q92,100 50,115 Q8,100 8,65 L8,22 Z"
        fill="rgba(218,41,28,0.12)" stroke="#DA291C" strokeWidth="2.5" />
      <g stroke="#DA291C" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <line x1="50" y1="80" x2="50" y2="45" />
        <line x1="38" y1="80" x2="38" y2="52" />
        <line x1="62" y1="80" x2="62" y2="52" />
        <path d="M44,45 Q50,38 56,45" />
        <path d="M32,52 Q38,43 44,52" />
        <path d="M56,52 Q62,43 68,52" />
      </g>
      <text x="50" y="95" textAnchor="middle" fill="#DA291C" fontSize="9" fontWeight="bold" fontFamily="sans-serif" letterSpacing="2">MUFC</text>
      {[0,1,2].map(i => (
        <circle key={i} cx={38 + i * 12} cy={28} r={2} fill="#DA291C"
          style={{ animation: `pulseSoft ${1.5 + i * 0.3}s ease-in-out ${i * 0.3}s infinite` }} />
      ))}
    </svg>
  )
}

function BasketballFull() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <svg viewBox="0 0 80 80" className="w-24 h-24 bb-ball" aria-hidden>
        <circle cx="40" cy="40" r="36" fill="#E87722" />
        <circle cx="40" cy="40" r="36" fill="none" stroke="#C45F10" strokeWidth="1.5"/>
        <path d="M4,40 Q40,20 76,40" fill="none" stroke="#C45F10" strokeWidth="2.5"/>
        <path d="M4,40 Q40,60 76,40" fill="none" stroke="#C45F10" strokeWidth="2.5"/>
        <line x1="40" y1="4" x2="40" y2="76" stroke="#C45F10" strokeWidth="2.5"/>
      </svg>
      <div className="bb-shadow w-16 h-3 rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(26,61,43,0.2) 0%, transparent 70%)' }} />
    </div>
  )
}

function DebateWavesSVG() {
  return (
    <svg viewBox="0 0 120 80" className="w-full h-full" aria-hidden>
      <rect x="50" y="8" width="20" height="30" rx="10" fill="rgba(45,122,82,0.15)" stroke="#2D7A52" strokeWidth="2" />
      <path d="M35,38 Q35,62 60,62 Q85,62 85,38" fill="none" stroke="#2D7A52" strokeWidth="2" strokeLinecap="round" />
      <line x1="60" y1="62" x2="60" y2="74" stroke="#2D7A52" strokeWidth="2" strokeLinecap="round" />
      <line x1="48" y1="74" x2="72" y2="74" stroke="#2D7A52" strokeWidth="2" strokeLinecap="round" />
      {[1, 2, 3].map(i => (
        <path key={i}
          d={`M${92 + i * 7},18 Q${98 + i * 7},30 ${92 + i * 7},42`}
          fill="none" stroke="#2D7A52" strokeWidth="2" strokeLinecap="round"
          style={{ animation: `pulseSoft 1.5s ease-in-out ${i * 0.25}s infinite`, opacity: 1 - i * 0.25 }} />
      ))}
    </svg>
  )
}

const passions = [
  {
    id: 'basketball',
    title: { en: 'National Level Basketball', de: 'Nationaler Basketball' },
    sub: { en: 'Point guard · Played nationally', de: 'Point Guard · Nationaler Wettbewerb' },
    color: '#E87722',
    bg: 'rgba(232,135,34,0.06)',
    Visual: BasketballFull,
    story: {
      en: `Basketball isn't a hobby — it's where I learned everything that matters: reading situations in real time, leading under pressure, trusting teammates. Playing at national level shaped how I think about systems, strategy, and performing when it counts.`,
      de: `Basketball ist kein Hobby — es ist der Ort, wo ich alles Wesentliche gelernt habe: Situationen in Echtzeit lesen, unter Druck führen, Teammitgliedern vertrauen. Das Spiel auf nationalem Niveau hat mein Denken über Systeme, Strategie und Leistung in entscheidenden Momenten geprägt.`,
    },
    tags: {
      en: ['National-level competitor', 'Point guard', 'Team leadership', 'Pressure performance'],
      de: ['Nationaler Wettbewerber', 'Point Guard', 'Teamführung', 'Leistung unter Druck'],
    },
    photos: ['/beyond/basketball-2.jpg'],
  },
  {
    id: 'manutd',
    title: { en: 'Manchester United', de: 'Manchester United' },
    sub: { en: 'Red Devils · Theatre of Dreams', de: 'Red Devils · Theatre of Dreams' },
    color: '#DA291C',
    bg: 'rgba(218,41,28,0.05)',
    Visual: ManUtdCrest,
    story: {
      en: `Die-hard Red Devil through every trophy and every rebuild. Supporting United taught me loyalty, resilience through brutal seasons, and absolute belief in systems even when short-term results disagree. Glory Glory Man United — we always come back.`,
      de: `Überzeugter Red Devil durch jeden Titel und jeden Neuaufbau. United zu unterstützen hat mir Loyalität, Resilienz in schwierigen Phasen und absolutes Vertrauen in Systeme gelehrt — auch wenn kurzfristige Ergebnisse dagegensprechen. Glory Glory Man United — wir kommen immer zurück.`,
    },
    tags: {
      en: ['Die-hard supporter', 'Premier League analyst', 'Champions League', 'Glory Glory'],
      de: ['Überzeugter Fan', 'Premier-League-Analyst', 'Champions League', 'Glory Glory'],
    },
    photos: ['/beyond/manutd-squad.jpg'],
  },
  {
    id: 'geopolitics',
    title: { en: 'Geopolitics & World Affairs', de: 'Geopolitik & Weltgeschehen' },
    sub: { en: 'The grand chessboard', de: 'Das große Schachbrett' },
    color: '#1A3D2B',
    bg: 'rgba(26,61,43,0.05)',
    Visual: null,
    story: {
      en: `I follow geopolitics the way some people follow football — obsessively, analytically, with strong opinions. From Indo-Pacific power shifts to EU economic architecture, from energy markets to defense policy. Understanding power structures makes me a sharper systems architect.`,
      de: `Ich verfolge Geopolitik so, wie andere Fußball verfolgen — obsessiv, analytisch, mit klaren Meinungen. Von indo-pazifischen Machtverschiebungen bis zur EU-Wirtschaftsarchitektur, von Energiemärkten bis zur Verteidigungspolitik. Das Verstehen von Machtstrukturen macht mich zu einem schärferen Systemarchitekten.`,
    },
    tags: {
      en: ['Indo-Pacific dynamics', 'EU economic policy', 'Energy geopolitics', 'Defense strategy'],
      de: ['Indo-Pazifik-Dynamik', 'EU-Wirtschaftspolitik', 'Energie-Geopolitik', 'Verteidigungsstrategie'],
    },
    photos: ['/beyond/geo-politics.jpg'],
  },
  {
    id: 'debate',
    title: { en: 'Debate & Oratory', de: 'Debatte & Redekunst' },
    sub: { en: 'Evidence-based argumentation', de: 'Evidenzbasierte Argumentation' },
    color: '#2D7A52',
    bg: 'rgba(45,122,82,0.06)',
    Visual: DebateWavesSVG,
    story: {
      en: `Debating sharpens the mind in ways no technical course can. I participated in collegiate competitions and Model UN, and I believe deeply in structured argumentation and evidence-based reasoning. It's made me a sharper thinker and a much better presenter to CXO stakeholders.`,
      de: `Debattieren schärft den Geist auf eine Weise, die kein technischer Kurs kann. Ich habe an Hochschulwettbewerben und Model UN teilgenommen und glaube fest an strukturierte Argumentation und evidenzbasiertes Denken. Es hat mich zu einem schärferen Denker und einem viel besseren Präsentator für CXO-Stakeholder gemacht.`,
    },
    tags: {
      en: ['Collegiate debate', 'Model UN delegate', 'CXO communication', 'Evidence-based reasoning'],
      de: ['Hochschul-Debatte', 'Model-UN-Delegierter', 'CXO-Kommunikation', 'Evidenzbasiertes Denken'],
    },
    photos: ['/beyond/debate-1.jpg'],
  },
]

export default function BeyondCode() {
  const ref = useRef<HTMLElement>(null)
  const { lang } = useLang()
  const isDE = lang === 'de'

  useEffect(() => {
    const io = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="beyond" ref={ref} className="py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <p className="reveal text-xs font-mono uppercase tracking-[0.2em] text-[#3DAA72] mb-4">
          {isDE ? '06 / Leben' : '06 / Life'}
        </p>
        <h2 className="reveal font-display text-[clamp(2.2rem,5vw,3.8rem)] font-black text-[#1A1A18] mb-3 leading-tight">
          {isDE
            ? <>Jenseits des <em className="text-[#1A3D2B]">Terminals</em></>
            : <>Beyond the <em className="text-[#1A3D2B]">Terminal</em></>}
        </h2>
        <p className="reveal text-[#6E7A70] text-lg max-w-2xl mb-4 leading-relaxed">
          {isDE
            ? 'Die besten Ingenieure sind neugierig auf alles. Hier ist, was mich menschlich macht.'
            : "The best engineers are curious about everything. Here's what makes me human."}
        </p>

        {/* Journey path */}
        <div className="reveal mb-16 flex flex-wrap items-center gap-2 text-sm font-mono text-[#8A9280]">
          {['🇮🇳 Vellore', '→', '🇮🇳 Jammu', '→', '🇺🇸 Atlanta', '→', '🇮🇳 Pune', '→', '🇩🇪 Frankfurt'].map((s, i) => (
            <span key={i} className={s === '→' ? 'text-[#D0C8BE]' : 'text-[#4A4A47] font-semibold'}>{s}</span>
          ))}
          <span className="text-[#8A9280] italic ml-2">
            {isDE ? '— alles mit 22' : '— all by 22'}
          </span>
        </div>

        {/* Passions grid */}
        <div className="space-y-6">
          {passions.map((p, idx) => {
            const Visual = p.Visual
            const isEven = idx % 2 === 0
            return (
              <div key={p.id} className="reveal grid lg:grid-cols-2 gap-0 bg-[#F8F5EE] border border-[#E4E0D6] rounded-3xl overflow-hidden card-lift">
                {/* Visual panel */}
                <div className={`relative min-h-[260px] flex flex-col overflow-hidden ${isEven ? 'order-1' : 'lg:order-2'}`}
                  style={{ background: p.bg }}>

                  {p.id === 'basketball' ? (
                    <>
                      <img src="/beyond/basketball-2.jpg" alt="Basketball team lineup"
                        className="absolute inset-0 w-full h-full object-cover object-center grayscale" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A10]/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                        <span className="text-white text-xs font-mono font-semibold tracking-widest opacity-90">
                          DPS VASANT KUNJ · {isDE ? 'NATIONAL' : 'NATIONAL LEVEL'}
                        </span>
                      </div>
                    </>
                  ) : p.id === 'manutd' ? (
                    <>
                      <img src="/beyond/manutd-squad.jpg" alt="Manchester United"
                        className="absolute inset-0 w-full h-full object-cover object-top"
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A0000]/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                        <span className="text-white text-xs font-mono font-semibold tracking-widest opacity-80">GLORY GLORY MAN UNITED</span>
                      </div>
                    </>
                  ) : p.id === 'geopolitics' ? (
                    <>
                      <img src="/beyond/geo-politics.jpg" alt="Geopolitics"
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A3D2B]/50 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                        <span className="text-white text-xs font-mono font-semibold tracking-widest opacity-80">
                          {isDE ? 'DAS GROSSE SCHACHBRETT' : 'THE GRAND CHESSBOARD'}
                        </span>
                      </div>
                    </>
                  ) : p.id === 'debate' ? (
                    <>
                      <img src={p.photos[0]} alt="Debate"
                        className="absolute inset-0 w-full h-full object-cover object-top"
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A3D2B]/40 via-transparent to-transparent" />
                      <div className="relative z-10 flex-1 flex items-end justify-center pb-4">
                        {Visual && <div className="w-20 h-20 opacity-70"><Visual /></div>}
                      </div>
                    </>
                  ) : null}
                </div>

                {/* Content panel */}
                <div className={`p-8 flex flex-col justify-center ${isEven ? 'order-2' : 'lg:order-1'}`}>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full w-fit mb-4"
                    style={{ background: `${p.color}12`, border: `1.5px solid ${p.color}25` }}>
                    <span className="text-xs font-mono font-semibold" style={{ color: p.color }}>
                      {isDE ? p.sub.de : p.sub.en}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-[#1A1A18] mb-4 leading-tight">
                    {isDE ? p.title.de : p.title.en}
                  </h3>
                  <p className="text-[#6E7A70] text-sm leading-relaxed mb-5">
                    {isDE ? p.story.de : p.story.en}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(isDE ? p.tags.de : p.tags.en).map(t => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ background: `${p.color}10`, color: p.color, border: `1px solid ${p.color}20` }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
