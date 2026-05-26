'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useLang } from '@/lib/language-context'
import { track } from '@/lib/track'

const links = [
  { href: '#about',     en: 'About',     de: 'Über mich' },
  { href: '#journey',   en: 'Journey',   de: 'Werdegang' },
  { href: '#skills',     en: 'Skills',     de: 'Fähigkeiten' },
  { href: '#capability', en: 'Stack',      de: 'Stack' },
  { href: '#projects',   en: 'Projects',   de: 'Projekte' },
  { href: '#education', en: 'Education', de: 'Ausbildung' },
  { href: '#beyond',     en: 'Life',       de: 'Leben' },
  { href: '#pivot',      en: 'Next',       de: 'Nächstes' },
  { href: '#contact',    en: 'Contact',    de: 'Kontakt' },
]

export default function Navbar({ onChatOpen }: { onChatOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active,   setActive]   = useState('')
  const { lang, setLang } = useLang()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive('#' + e.target.id) }),
      { threshold: 0.4 }
    )
    links.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className={`max-w-6xl mx-auto px-4 transition-all duration-500 ${
        scrolled ? 'bg-[#F8F5EE]/90 backdrop-blur-xl shadow-lg shadow-black/5 rounded-2xl border border-[#E4E0D6]' : ''
      }`}>
        <div className="flex items-center justify-between h-14 px-2">

          {/* Logo */}
          <a href="#" className="group flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#1A3D2B] flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white text-xs font-bold font-mono">SJ</span>
            </div>
            <span className="font-bold text-[#1A3D2B] hidden sm:block">Siddharth Jain</span>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map(({ href, en, de }) => (
              <a
                key={href}
                href={href}
                onClick={() => track('click', { link: `nav_${href.replace('#', '')}` })}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active === href
                    ? 'bg-[#1A3D2B] text-white'
                    : 'text-[#4A4A47] hover:text-[#1A3D2B] hover:bg-[#E8F5EE]'
                }`}
              >
                {lang === 'de' ? de : en}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <div className="hidden sm:flex items-center rounded-lg border border-[#E4E0D6] overflow-hidden bg-white/60 text-xs font-mono font-semibold">
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1.5 transition-all ${lang === 'en' ? 'bg-[#1A3D2B] text-white' : 'text-[#6E7A70] hover:text-[#1A3D2B]'}`}
              >EN</button>
              <button
                onClick={() => setLang('de')}
                className={`px-2.5 py-1.5 transition-all ${lang === 'de' ? 'bg-[#1A3D2B] text-white' : 'text-[#6E7A70] hover:text-[#1A3D2B]'}`}
              >DE</button>
            </div>

            <button
              onClick={onChatOpen}
              className="flex items-center gap-2 px-4 py-2 bg-[#1A3D2B] text-white rounded-xl text-sm font-semibold hover:bg-[#2D7A52] transition-all duration-200 shadow-md shadow-[#1A3D2B]/20 hover:shadow-[#1A3D2B]/30 hover:scale-105"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#3DAA72] animate-pulse" />
              {lang === 'de' ? 'KI fragen' : 'Ask AI'}
            </button>
            <button
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#E8F5EE] transition-colors text-[#1A3D2B]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden pb-4 border-t border-[#E4E0D6] pt-3">
            <div className="flex flex-col gap-1">
              {links.map(({ href, en, de }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => { track('click', { link: `nav_${href.replace('#', '')}` }); setMenuOpen(false) }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active === href
                      ? 'bg-[#1A3D2B] text-white'
                      : 'text-[#4A4A47] hover:bg-[#E8F5EE] hover:text-[#1A3D2B]'
                  }`}
                >
                  {lang === 'de' ? de : en}
                </a>
              ))}
              {/* Mobile lang toggle */}
              <div className="flex gap-2 px-4 pt-2">
                {(['en', 'de'] as const).map(l => (
                  <button key={l} onClick={() => setLang(l)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all ${lang === l ? 'bg-[#1A3D2B] text-white border-[#1A3D2B]' : 'border-[#E4E0D6] text-[#6E7A70]'}`}>
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
