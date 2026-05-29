import { getResume, defaultResume } from '@/lib/resume'
import PrintButton from './PrintButton'

export const dynamic = 'force-dynamic'

export default async function ResumePage() {
  const resume = (await getResume()) ?? defaultResume
  const { header } = resume

  return (
    <main style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif', color: '#1A1A18', background: '#fff' }}
      className="min-h-screen px-6 sm:px-12 py-10 max-w-[820px] mx-auto print:py-6 print:px-8">

      <style>{`
        @media print {
          @page { margin: 0.5in; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="no-print mb-6 flex items-center justify-between text-[12px]">
        <p className="font-mono text-[#8A9280] uppercase tracking-[0.18em]">Resume · ATS-friendly</p>
        <PrintButton />
      </div>

      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-1">{header.name}</h1>
        <p className="text-[13px] text-[#3A3A35] leading-relaxed">
          {[header.location, header.phone, header.email, header.linkedin, header.github, header.portfolio]
            .filter(Boolean)
            .join('  |  ')}
        </p>
      </header>

      <Section title="Professional Summary">
        <p className="text-[13.5px] leading-relaxed">{resume.summary}</p>
      </Section>

      <Section title="Skills">
        <p className="text-[13.5px] leading-relaxed">{resume.skills.join(', ')}</p>
      </Section>

      <Section title="Work Experience">
        <div className="space-y-5">
          {resume.experience.map((e, i) => (
            <div key={i}>
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <p className="font-semibold text-[14.5px]">{e.title}</p>
                <p className="text-[12px] font-mono text-[#3A3A35]">{e.start} – {e.end}</p>
              </div>
              <p className="text-[13px] text-[#3A3A35] italic mb-2">{e.company}, {e.location}</p>
              <ul className="list-disc pl-5 space-y-1 marker:text-[#1A3D2B]">
                {e.bullets.map((b, j) => (
                  <li key={j} className="text-[13.5px] leading-relaxed">{b}</li>
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
                <p className="text-[12px] font-mono text-[#3A3A35]">{e.graduation}</p>
              </div>
              <p className="text-[13px] text-[#3A3A35]">{e.location}{e.extra ? ` · ${e.extra}` : ''}</p>
            </div>
          ))}
        </div>
      </Section>

      {resume.certifications.length > 0 && (
        <Section title="Certifications">
          <ul className="space-y-1">
            {resume.certifications.map((c, i) => (
              <li key={i} className="text-[13.5px]">{c.name} — {c.issuer}, {c.year}</li>
            ))}
          </ul>
        </Section>
      )}

      {resume.projects.length > 0 && (
        <Section title="Projects">
          <ul className="space-y-1.5">
            {resume.projects.map((p, i) => (
              <li key={i} className="text-[13.5px] leading-relaxed">
                <span className="font-semibold">{p.name}</span> — {p.description}
              </li>
            ))}
          </ul>
        </Section>
      )}
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5 last:mb-0">
      <h2 className="text-[11.5px] font-bold tracking-[0.18em] uppercase text-[#1A3D2B] border-b border-[#E4E0D6] pb-1 mb-3">{title}</h2>
      {children}
    </section>
  )
}
