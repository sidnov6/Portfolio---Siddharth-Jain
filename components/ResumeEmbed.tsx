'use client'
import { useEffect, useState } from 'react'
import { Download, ExternalLink, Printer } from 'lucide-react'
import { track } from '@/lib/track'
import type { Resume } from '@/lib/resume'

export default function ResumeEmbed() {
  const [resume, setResume] = useState<Resume | null>(null)

  useEffect(() => {
    fetch('/api/resume')
      .then(r => r.json())
      .then(d => setResume(d.resume))
      .catch(() => setResume(null))
  }, [])

  if (!resume) {
    return (
      <div className="border border-[#E4E0D6] rounded-2xl bg-white p-10 text-center">
        <p className="text-sm text-[#8A9280]">Loading resume…</p>
      </div>
    )
  }

  const { header } = resume

  return (
    <div className="border border-[#E4E0D6] rounded-2xl bg-white shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#E4E0D6] bg-[#F8F5EE]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#3DAA72]" />
          <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#6E7A70]">Resume · ATS-friendly · always latest</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/resume.pdf"
            target="_blank"
            onClick={() => track('resume_download', { source: 'about_embed' })}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold bg-[#1A3D2B] text-white rounded-lg hover:bg-[#2D7A52] transition-colors"
          >
            <Download size={12} /> PDF
          </a>
          <a
            href="/resume"
            target="_blank"
            onClick={() => track('click', { link: 'resume_print_view' })}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold bg-white border border-[#E4E0D6] text-[#1A3D2B] rounded-lg hover:bg-[#E8F5EE] transition-colors"
          >
            <Printer size={12} /> Print view
          </a>
        </div>
      </div>

      {/* Document — single column, system font, ATS-friendly */}
      <div className="px-6 sm:px-10 py-8 max-h-[640px] overflow-y-auto" style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif', color: '#1A1A18' }}>

        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight mb-1">{header.name}</h1>
          <p className="text-[12.5px] text-[#3A3A35] leading-relaxed">
            {[header.location, header.phone, header.email, header.linkedin, header.github, header.portfolio]
              .filter(Boolean)
              .join('  |  ')}
          </p>
        </header>

        <Section title="Professional Summary">
          <p className="text-[13px] leading-relaxed text-[#1A1A18]">{resume.summary}</p>
        </Section>

        <Section title="Skills">
          <p className="text-[13px] leading-relaxed text-[#1A1A18]">{resume.skills.join(', ')}</p>
        </Section>

        <Section title="Work Experience">
          <div className="space-y-5">
            {resume.experience.map((e, i) => (
              <div key={i}>
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <p className="font-semibold text-[14px]">{e.title}</p>
                  <p className="text-[11.5px] font-mono text-[#3A3A35]">{e.start} – {e.end}</p>
                </div>
                <p className="text-[12.5px] text-[#3A3A35] italic mb-2">{e.company}, {e.location}</p>
                <ul className="list-disc pl-5 space-y-1 marker:text-[#1A3D2B]">
                  {e.bullets.map((b, j) => (
                    <li key={j} className="text-[13px] leading-relaxed">{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Education">
          <div className="space-y-3">
            {resume.education.map((e, i) => (
              <div key={i}>
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <p className="font-semibold text-[14px]">{e.degree} — {e.school}</p>
                  <p className="text-[11.5px] font-mono text-[#3A3A35]">{e.graduation}</p>
                </div>
                <p className="text-[12.5px] text-[#3A3A35]">{e.location}{e.extra ? ` · ${e.extra}` : ''}</p>
              </div>
            ))}
          </div>
        </Section>

        {resume.certifications.length > 0 && (
          <Section title="Certifications">
            <ul className="space-y-1">
              {resume.certifications.map((c, i) => (
                <li key={i} className="text-[13px]">{c.name} — {c.issuer}, {c.year}</li>
              ))}
            </ul>
          </Section>
        )}

        {resume.projects.length > 0 && (
          <Section title="Projects">
            <ul className="space-y-1.5">
              {resume.projects.map((p, i) => (
                <li key={i} className="text-[13px] leading-relaxed">
                  <span className="font-semibold">{p.name}</span> — {p.description}
                </li>
              ))}
            </ul>
          </Section>
        )}

        <p className="text-[10px] font-mono text-[#C0B8B0] mt-6">
          Last updated {new Date(resume.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          {' · '}
          <a href="/resume" className="hover:text-[#1A3D2B] inline-flex items-center gap-0.5">open standalone <ExternalLink size={9} /></a>
        </p>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5 last:mb-0">
      <h2 className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#1A3D2B] border-b border-[#E4E0D6] pb-1 mb-3">{title}</h2>
      {children}
    </section>
  )
}
