'use client'
import { useEffect, useRef, useState } from 'react'
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle } from 'lucide-react'
import { useLang } from '@/lib/language-context'
import { track } from '@/lib/track'

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.fallback) {
        // No API key — open email client as fallback
        const mailto = `mailto:sidnov6@gmail.com?subject=${encodeURIComponent(form.subject || 'Portfolio Enquiry')}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
        window.open(mailto, '_blank')
      }
      track('form_submit', { subject: form.subject })
      setStatus('sent')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section id="contact" ref={ref} className="py-28 px-6 bg-[#F8F5EE] section-grain">
      <div className="max-w-6xl mx-auto">
        <p className="reveal text-xs font-mono uppercase tracking-[0.2em] text-[#3DAA72] mb-4">
          {isDE ? '10 / Kontakt' : '10 / Contact'}
        </p>
        <h2 className="reveal font-display text-[clamp(2.2rem,5vw,3.8rem)] font-black text-[#1A1A18] mb-3 leading-tight">
          {isDE ? <>Lass uns <em className="text-[#1A3D2B]">verbinden</em></> : <>Let's <em className="text-[#1A3D2B]">Connect</em></>}
        </h2>
        <p className="reveal text-[#6E7A70] text-lg max-w-xl mb-14 leading-relaxed">
          {isDE
            ? 'KI-Opportunität, Forschungskooperation, oder du möchtest einfach über Geopolitik diskutieren — ich bin dabei.'
            : "AI opportunity, research collaboration, or you just want to debate geopolitics — I'm all ears."}
        </p>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left info */}
          <div className="lg:col-span-2 space-y-4">
            {/* Availability */}
            <div className="reveal bg-white border border-[#E4E0D6] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3DAA72] animate-pulse" />
                <span className="font-bold text-[#1A3D2B] text-sm">{isDE ? 'Offen für Chancen' : 'Open to Opportunities'}</span>
              </div>
              <p className="text-[#6E7A70] text-sm leading-relaxed mb-4">
                {isDE
                  ? 'Aktiv auf der Suche nach Vollzeit-KI/ML-Engineering-Stellen, Forschungskooperationen und interessanten Problemen.'
                  : 'Actively looking for full-time AI/ML engineering roles, research collaborations, and interesting problems to solve.'}
              </p>
              <div className="flex flex-wrap gap-2">
                {(isDE
                  ? ['Vollzeit', 'Remote OK', 'Umzug möglich', 'Forschung']
                  : ['Full-time', 'Remote OK', 'Relocation Open', 'Research']
                ).map(t => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-[#E8F5EE] text-[#1A3D2B] border border-[#3DAA72]/20 font-medium">{t}</span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="reveal bg-white border border-[#E4E0D6] rounded-2xl p-5 shadow-sm space-y-1">
              {[
                { href: 'mailto:sidnov6@gmail.com', Icon: Mail, label: 'sidnov6@gmail.com', color: '#1A3D2B', trackAs: 'email' },
                { href: 'https://www.linkedin.com/in/siddharth-jain-b33394219/', Icon: Linkedin, label: 'Siddharth Jain', color: '#0077B5', trackAs: 'linkedin' },
                { href: 'https://github.com/sidnov6', Icon: Github, label: 'github.com/sidnov6', color: '#1A1A18', trackAs: 'github' },
                { href: '#', Icon: MapPin, label: isDE ? 'Frankfurt, Deutschland' : 'Frankfurt, Germany', color: '#3DAA72', trackAs: null },
              ].map(({ href, Icon, label, color, trackAs }) => (
                <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined}
                  onClick={() => trackAs && track('click', { link: trackAs })}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F8F5EE] transition-colors group">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}10`, border: `1.5px solid ${color}20` }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                  <span className="text-sm font-medium text-[#4A4A47] group-hover:text-[#1A1A18] transition-colors">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 bg-white border border-[#E4E0D6] rounded-2xl p-7 shadow-sm space-y-4 reveal-right">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { key: 'name',  label: isDE ? 'Dein Name'  : 'Your Name',  placeholder: isDE ? 'Max Mustermann' : 'Jane Smith',       type: 'text' },
                { key: 'email', label: isDE ? 'Deine E-Mail' : 'Your Email', placeholder: 'max@firma.de',                               type: 'email' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-xs font-mono text-[#8A9280] block mb-1.5">{f.label}</label>
                  <input required type={f.type} placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full bg-[#F8F5EE] border border-[#E4E0D6] rounded-xl px-4 py-2.5 text-[#1A1A18] text-sm placeholder-[#C0B8B0] focus:outline-none focus:border-[#1A3D2B]/40 focus:ring-2 focus:ring-[#1A3D2B]/10 transition-all" />
                </div>
              ))}
            </div>
            <div>
              <label className="text-xs font-mono text-[#8A9280] block mb-1.5">{isDE ? 'Betreff' : 'Subject'}</label>
              <input type="text" placeholder={isDE ? 'KI-Ingenieur Stelle bei...' : 'AI Engineer opportunity at...'}
                value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                className="w-full bg-[#F8F5EE] border border-[#E4E0D6] rounded-xl px-4 py-2.5 text-[#1A1A18] text-sm placeholder-[#C0B8B0] focus:outline-none focus:border-[#1A3D2B]/40 focus:ring-2 focus:ring-[#1A3D2B]/10 transition-all" />
            </div>
            <div>
              <label className="text-xs font-mono text-[#8A9280] block mb-1.5">{isDE ? 'Nachricht' : 'Message'}</label>
              <textarea required rows={5} placeholder={isDE ? 'Hallo Siddharth, ich bin auf dein Portfolio gestoßen und...' : 'Hi Siddharth, I came across your portfolio and...'}
                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full bg-[#F8F5EE] border border-[#E4E0D6] rounded-xl px-4 py-2.5 text-[#1A1A18] text-sm placeholder-[#C0B8B0] focus:outline-none focus:border-[#1A3D2B]/40 focus:ring-2 focus:ring-[#1A3D2B]/10 transition-all resize-none" />
            </div>
            <button type="submit" disabled={status === 'sending'}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#1A3D2B] text-white font-semibold rounded-xl hover:bg-[#2D7A52] transition-all duration-200 shadow-md shadow-[#1A3D2B]/20 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed">
              {status === 'sending' && <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /><span>{isDE ? 'Wird gesendet…' : 'Sending…'}</span></>}
              {status === 'sent'    && <><CheckCircle size={18} /><span>{isDE ? 'Nachricht gesendet!' : 'Message sent!'}</span></>}
              {status === 'error'   && <><Send size={18} /><span>{isDE ? 'Fehler — erneut versuchen' : 'Failed — try again'}</span></>}
              {status === 'idle'    && <><Send size={18} /><span>{isDE ? 'Nachricht senden' : 'Send Message'}</span></>}
            </button>
            {status === 'sent' && <p className="text-center text-xs text-[#3DAA72] font-mono">{isDE ? 'Deine Nachricht wurde an Siddharth zugestellt.' : 'Your message was delivered to Siddharth.'}</p>}
            {status === 'idle' && <p className="text-center text-xs text-[#B0A898] font-mono">{isDE ? 'Direkt gesendet — kein E-Mail-Client erforderlich' : 'Message sent directly — no email client needed'}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}
