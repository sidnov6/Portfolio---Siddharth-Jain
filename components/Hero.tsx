'use client'
import { useEffect, useState, useRef } from 'react'
import { Github, Linkedin, Mail, ArrowDown, Download } from 'lucide-react'
import { useLang } from '@/lib/language-context'

const roles = {
  en: ['Full Stack AI Engineer', 'Data Scientist', 'Gen AI Engineer', 'Data Engineer', 'Point Guard · Basketball'],
  de: ['Full-Stack-KI-Ingenieur', 'Datenwissenschaftler', 'Generative-KI-Ingenieur', 'Dateningenieur', 'Point Guard · Basketball'],
}

const stats = {
  en: [
    { value: '$4.8M', label: 'Cost Savings' },
    { value: '10+',   label: 'Plants Scaled' },
    { value: '300+',  label: 'Daily Users' },
    { value: '3',     label: 'Countries' },
  ],
  de: [
    { value: '$4.8M', label: 'Kosteneinsparungen' },
    { value: '10+',   label: 'Skalierte Anlagen' },
    { value: '300+',  label: 'Tägliche Nutzer' },
    { value: '3',     label: 'Länder' },
  ],
}

function WindTurbine({ className = '', size = 120 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size * 1.6} viewBox="0 0 80 130" className={className} aria-hidden>
      <polygon points="38,130 42,130 43,60 37,60" fill="#C8D5CA" />
      <ellipse cx="40" cy="130" rx="10" ry="3" fill="#B5C4B8" />
      <rect x="34" y="55" width="12" height="8" rx="3" fill="#8FA894" />
      <g style={{ transformBox: 'fill-box', transformOrigin: '40px 59px', animation: 'turbineSpin 3s linear infinite' }}>
        <ellipse cx="40" cy="38" rx="4" ry="21" fill="#3DAA72" transform="rotate(0 40 59)" />
        <ellipse cx="40" cy="38" rx="4" ry="21" fill="#2D7A52" transform="rotate(120 40 59)" />
        <ellipse cx="40" cy="38" rx="4" ry="21" fill="#3DAA72" transform="rotate(240 40 59)" />
        <circle cx="40" cy="59" r="5" fill="#1A3D2B" />
        <circle cx="40" cy="59" r="2.5" fill="#3DAA72" />
      </g>
    </svg>
  )
}

/* Polaroid component with pointer-events + hover scale */
function Polaroid({ src, caption, rotate, style }: {
  src: string; caption: string; rotate: string; style?: React.CSSProperties
}) {
  return (
    <div
      className="absolute pointer-events-auto group cursor-default"
      style={{ transform: rotate, transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)', ...style }}
    >
      <div
        className="bg-white p-3.5 pb-10 shadow-[0_14px_44px_rgba(0,0,0,0.16)] transition-transform duration-300 group-hover:scale-110"
        style={{ width: '185px' }}
      >
        <img src={src} alt="" className="w-full h-[135px] object-cover object-top" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
        <p className="text-center text-[10px] font-mono text-[#8A9280] mt-2.5 tracking-wide">{caption}</p>
      </div>
    </div>
  )
}

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const { lang } = useLang()
  const isDE = lang === 'de'
  const currentRoles = roles[lang]

  // Reset typing when language changes
  useEffect(() => {
    setRoleIdx(0)
    setDisplayed('')
    setDeleting(false)
  }, [lang])

  // Typing animation
  useEffect(() => {
    const target = currentRoles[roleIdx]
    let t: NodeJS.Timeout
    if (!deleting && displayed.length < target.length) {
      t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 70)
    } else if (!deleting && displayed.length === target.length) {
      t = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
    } else {
      setDeleting(false)
      setRoleIdx(i => (i + 1) % currentRoles.length)
    }
    return () => clearTimeout(t)
  }, [displayed, deleting, roleIdx, currentRoles])

  // Mouse parallax
  useEffect(() => {
    const h = (e: MouseEvent) =>
      setMousePos({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 })
    window.addEventListener('mousemove', h, { passive: true })
    return () => window.removeEventListener('mousemove', h)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => {
      document.querySelectorAll('#hero .reveal, #hero .reveal-left, #hero .reveal-right')
        .forEach(el => el.classList.add('visible'))
    }, 80)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(e => { if (e[0].isIntersecting) setStatsVisible(true) }, { threshold: 0.5 })
    if (statsRef.current) io.observe(statsRef.current)
    return () => io.disconnect()
  }, [])

  const parallax = (fx: number, fy: number) => ({
    transform: `translate(${(mousePos.x - 50) * fx}px, ${(mousePos.y - 50) * fy}px)`,
    transition: 'transform 0.7s ease',
  })

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#F8F5EE] section-grain">

      {/* Soft blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute blob" style={{ width: 520, height: 520, top: '-10%', right: '-8%', background: 'radial-gradient(circle, rgba(61,170,114,0.13) 0%, transparent 70%)', ...parallax(0.08, 0.05) }} />
        <div className="absolute blob" style={{ width: 400, height: 400, bottom: '5%', left: '-5%', background: 'radial-gradient(circle, rgba(26,61,43,0.07) 0%, transparent 70%)', animationDelay: '3s' }} />
        <div className="absolute" style={{ width: 300, height: 300, top: '30%', left: '5%', background: 'radial-gradient(circle, rgba(232,135,34,0.06) 0%, transparent 70%)', borderRadius: '50%', ...parallax(-0.05, 0.04) }} />
      </div>

      {/* LEFT polaroids — xl only */}
      <div className="pointer-events-none absolute left-0 top-0 h-full hidden xl:block" style={{ width: '320px' }}>
        <Polaroid
          src="/beyond/IMG_0401.jpg"
          caption="exploring cities"
          rotate="rotate(3deg)"
          style={{ top: '22%', left: '20px', ...parallax(0.05, 0.04) }}
        />
        <Polaroid
          src="/beyond/D7C0B623-1A94-4E4A-8AD9-5E481D34C990.JPG"
          caption="adventure mode"
          rotate="rotate(-2.5deg)"
          style={{ top: '52%', left: '50px', ...parallax(0.04, 0.06) }}
        />
      </div>

      {/* RIGHT polaroids — xl only */}
      <div className="pointer-events-none absolute right-0 top-0 h-full hidden xl:block" style={{ width: '340px' }}>
        <Polaroid
          src="/beyond/IMG_5397.jpg"
          caption="Georgia Tech '24"
          rotate="rotate(-4deg)"
          style={{ top: '14%', right: '50px', ...parallax(0.06, 0.04) }}
        />
        <Polaroid
          src="/beyond/IMG_0242.jpg"
          caption="Kashmir, India"
          rotate="rotate(3deg)"
          style={{ top: '42%', right: '18px', ...parallax(0.04, 0.06) }}
        />
        <Polaroid
          src="/beyond/IMG_9023.jpg"
          caption="good times"
          rotate="rotate(-2deg)"
          style={{ top: '68%', right: '60px', ...parallax(0.05, 0.03) }}
        />
      </div>

      {/* Decorative wind turbine */}
      <div className="pointer-events-none absolute hidden xl:block opacity-[0.05]" style={{ right: '310px', top: '50px', ...parallax(0.12, 0.08) }}>
        <WindTurbine size={140} />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 sm:pt-28 pb-16 sm:pb-20">

        {/* Availability chip */}
        <div className="reveal mb-8 inline-flex items-center gap-2.5 px-4 py-2 bg-white border border-[#D6EDE2] rounded-full shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#3DAA72] animate-pulse" />
          <span className="text-sm font-medium text-[#1A3D2B]">
            {isDE ? 'Offen für Chancen · Frankfurt, Deutschland' : 'Open to opportunities · Frankfurt, Germany'}
          </span>
        </div>

        {/* Headline */}
        <h1 className="reveal reveal-d1 font-display text-[clamp(3rem,9vw,7rem)] font-black leading-[0.95] tracking-tight text-[#1A1A18] mb-6">
          Siddharth<br />
          <em className="not-italic text-[#1A3D2B]">Jain.</em>
        </h1>

        {/* Typing role */}
        <div className="reveal reveal-d2 h-10 flex items-center mb-6">
          <span className="text-2xl sm:text-3xl font-bold text-[#1A3D2B]">
            {displayed}
            <span className="text-[#3DAA72] font-light animate-pulse">|</span>
          </span>
        </div>

        {/* Tagline */}
        <p className="reveal reveal-d3 text-[#3D3D3A] text-base sm:text-xl max-w-xl leading-relaxed mb-10">
          {isDE
            ? <>Ich entwickle Unternehmens-KI, die messbare Ergebnisse liefert —<strong className="text-[#1A3D2B] font-semibold"> 4,8 Mio. $ Einsparungen</strong> bei Suzlon. Forscher am Georgia Tech. Student an der Frankfurt School. Nationaler Basketballspieler.</>
            : <>I build enterprise AI that moves needles —<strong className="text-[#1A3D2B] font-semibold"> $4.8M in savings</strong> at Suzlon. Georgia Tech researcher. Frankfurt School student. National basketball player.</>
          }
        </p>

        {/* CTAs */}
        <div className="reveal reveal-d4 flex flex-wrap gap-3 mb-16">
          <a href="#journey" className="px-7 py-3.5 bg-[#1A3D2B] text-white font-semibold rounded-xl hover:bg-[#2D7A52] transition-all duration-200 shadow-lg shadow-[#1A3D2B]/20 hover:shadow-[#1A3D2B]/30 hover:-translate-y-0.5">
            {isDE ? 'Mein Werdegang' : 'See My Journey'}
          </a>
          <a href="#contact" className="px-7 py-3.5 border-2 border-[#1A3D2B] text-[#1A3D2B] font-semibold rounded-xl hover:bg-[#1A3D2B] hover:text-white transition-all duration-200 hover:-translate-y-0.5">
            {isDE ? 'Kontakt aufnehmen' : 'Get In Touch'}
          </a>
          <a href="/resume.pdf" target="_blank" className="flex items-center gap-2 px-5 py-3.5 bg-white border border-[#E4E0D6] text-[#4A4A47] font-medium rounded-xl hover:border-[#1A3D2B]/30 hover:shadow-md transition-all duration-200">
            <Download size={16} />
            {isDE ? 'Lebenslauf' : 'Resume'}
          </a>
        </div>

        {/* Socials */}
        <div className="reveal flex items-center gap-6">
          {[
            { href: 'https://github.com/sidnov6',                                Icon: Github,   label: 'GitHub',   color: '#1A1A18' },
            { href: 'https://www.linkedin.com/in/siddharth-jain-b33394219/',     Icon: Linkedin, label: 'LinkedIn', color: '#0077B5' },
            { href: 'mailto:sidnov6@gmail.com',                                   Icon: Mail,     label: 'Email',    color: '#1A3D2B' },
          ].map(({ href, Icon, label, color }) => (
            <a key={href} href={href} target={href.startsWith('http') ? '_blank' : undefined}
              className="flex items-center gap-2 text-[#8A9280] hover:text-[#1A1A18] font-medium text-sm transition-colors group">
              <Icon size={18} className="group-hover:scale-110 transition-transform" style={{ color }} />
              <span className="hidden sm:block">{label}</span>
            </a>
          ))}
        </div>

        {/* Stats strip */}
        <div ref={statsRef} className="mt-10 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats[lang].map((s, i) => (
            <div key={s.label} className={`p-5 bg-white rounded-2xl border border-[#E4E0D6] shadow-sm card-lift transition-all duration-700 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="text-2xl font-black font-mono text-[#1A3D2B]">{s.value}</div>
              <div className="text-xs text-[#8A9280] mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8A9280] hover:text-[#1A3D2B] transition-colors"
        style={{ animation: 'scrollHint 2s ease-in-out infinite' }}>
        <span className="text-xs font-mono uppercase tracking-widest">{isDE ? 'Scrollen' : 'Scroll'}</span>
        <ArrowDown size={16} />
      </a>
    </section>
  )
}
