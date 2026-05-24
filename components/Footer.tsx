'use client'
import { Github, Linkedin, Mail } from 'lucide-react'
import { useLang } from '@/lib/language-context'

export default function Footer() {
  const { lang } = useLang()
  const isDE = lang === 'de'
  return (
    <footer className="bg-[#1A3D2B] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-white/10">
          <div>
            <div className="font-display text-2xl font-black mb-1">Siddharth Jain</div>
            <p className="text-white/50 text-sm">
              {isDE ? 'Full-Stack-KI-Ingenieur · Frankfurt, Deutschland' : 'Full Stack AI Engineer · Frankfurt, Germany'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {[
              { href: 'https://github.com/sidnov6', Icon: Github },
              { href: 'https://www.linkedin.com/in/siddharth-jain-b33394219/', Icon: Linkedin },
              { href: 'mailto:sidnov6@gmail.com', Icon: Mail },
            ].map(({ href, Icon }) => (
              <a key={href} href={href} target={href.startsWith('http') ? '_blank' : undefined}
                className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 hover:border-white/20 transition-all">
                <Icon size={17} />
              </a>
            ))}
          </div>

          <div className="text-right">
            <p className="text-white/40 text-xs font-mono">{isDE ? 'Entwickelt mit Next.js · Tailwind · Gemini AI' : 'Built with Next.js · Tailwind · Gemini AI'}</p>
            <p className="text-white/40 text-xs font-mono mt-1">Fraunces × Plus Jakarta Sans</p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs font-mono">© 2025 Siddharth Jain. {isDE ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}</p>
          {/* Man Utd easter egg */}
          <p className="text-white/20 text-[10px] font-mono hover:text-[#DA291C] transition-colors cursor-default select-none">
            Glory Glory Man United 🔴
          </p>
        </div>
      </div>
    </footer>
  )
}
