import type { Resume } from '@/lib/resume'

/* Shared, ATS-friendly resume document used by both the About-section embed
   and the standalone /resume page. Single column, system font, hairline rules,
   tight spacing, bold-left + right-aligned dates per role.                    */

const ensureHttp = (u: string) => (/^https?:\/\//i.test(u) ? u : `https://${u}`)

function HeaderLink({ kind, value }: { kind: 'email' | 'url'; value: string }) {
  const href = kind === 'email' ? `mailto:${value}` : ensureHttp(value)
  return (
    <a
      href={href}
      target={kind === 'url' ? '_blank' : undefined}
      rel={kind === 'url' ? 'noopener noreferrer' : undefined}
      style={{ color: '#1A3D2B', textDecoration: 'underline' }}
    >
      {value}
    </a>
  )
}

/* Linkify URLs (http(s)://… or bare domains like github.com/x) inside free text.
   Email addresses become mailto: links. Plain words are returned as-is.       */
const URL_RE   = /(https?:\/\/[^\s)]+|(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s)]*)?)/gi
const EMAIL_RE = /[\w.+-]+@[\w-]+\.[\w.-]+/g

function Linkify({ text }: { text: string }) {
  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  const combined = new RegExp(`${EMAIL_RE.source}|${URL_RE.source}`, 'gi')
  let m: RegExpExecArray | null
  while ((m = combined.exec(text)) !== null) {
    const start = m.index
    if (start > lastIndex) nodes.push(text.slice(lastIndex, start))
    const token = m[0]
    if (token.includes('@') && !token.includes('/')) {
      nodes.push(<HeaderLink key={start} kind="email" value={token} />)
    } else {
      nodes.push(<HeaderLink key={start} kind="url" value={token} />)
    }
    lastIndex = start + token.length
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))
  return <>{nodes}</>
}

export default function ResumeDoc({ resume, dense = false }: { resume: Resume; dense?: boolean }) {
  const { header } = resume
  const base = dense ? '11px'   : '12.5px'
  const sub  = dense ? '10px'   : '11.5px'
  const gap  = dense ? 10       : 14

  const contactParts: React.ReactNode[] = []
  if (header.location)  contactParts.push(header.location)
  if (header.phone)     contactParts.push(header.phone)
  if (header.email)     contactParts.push(<HeaderLink key="email"     kind="email" value={header.email} />)
  if (header.linkedin)  contactParts.push(<HeaderLink key="linkedin"  kind="url"   value={header.linkedin} />)
  if (header.github)    contactParts.push(<HeaderLink key="github"    kind="url"   value={header.github} />)
  if (header.portfolio) contactParts.push(<HeaderLink key="portfolio" kind="url"   value={header.portfolio} />)

  return (
    <div
      style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', color: '#1A1A18', fontSize: base, lineHeight: 1.4 }}
    >
      {/* Header — centered */}
      <header style={{ textAlign: 'center', marginBottom: dense ? 10 : 16 }}>
        <h1
          style={{ fontSize: dense ? '20px' : '26px', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 3 }}
        >
          {header.name}
        </h1>
        <p style={{ fontSize: sub, color: '#3A3A35', lineHeight: 1.45 }}>
          {contactParts.map((node, i) => (
            <span key={i}>
              {node}
              {i < contactParts.length - 1 && <span style={{ color: '#8A9280' }}> | </span>}
            </span>
          ))}
        </p>
      </header>

      <Section title="Professional Summary" gap={gap}>
        <p style={{ fontSize: base, lineHeight: 1.45 }}>{resume.summary}</p>
      </Section>

      <Section title="Skills" gap={gap}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {resume.skills.map((g, i) => (
            <p key={i} style={{ fontSize: base, lineHeight: 1.45 }}>
              <strong>{g.category}:</strong> {g.items.join(', ')}
            </p>
          ))}
        </div>
      </Section>

      <Section title="Work Experience" gap={gap}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: dense ? 6 : 10 }}>
          {resume.experience.map((e, i) => (
            <div key={i}>
              <Row left={<strong>{e.company}</strong>} right={<strong>{e.location}</strong>} />
              <Row
                left={<span style={{ fontStyle: 'italic' }}>{e.title}</span>}
                right={<span style={{ fontFamily: '"Courier New", monospace', fontSize: sub }}>{e.start} – {e.end}</span>}
              />
              <ul style={{ marginTop: 4, paddingLeft: 16, listStyleType: 'disc' }} className="marker:text-[#1A3D2B]">
                {e.bullets.map((b, j) => (
                  <li key={j} style={{ fontSize: base, lineHeight: 1.45, marginBottom: 2 }}>
                    <Linkify text={b} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Education" gap={gap}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: dense ? 4 : 8 }}>
          {resume.education.map((e, i) => (
            <div key={i}>
              <Row left={<strong>{e.school}</strong>} right={<strong>{e.location}</strong>} />
              <Row
                left={<span>{e.degree}</span>}
                right={<span style={{ fontFamily: '"Courier New", monospace', fontSize: sub }}>{e.graduation}</span>}
              />
              {e.extra && <p style={{ fontSize: sub, color: '#3A3A35' }}>{e.extra}</p>}
            </div>
          ))}
        </div>
      </Section>

      {resume.certifications.length > 0 && (
        <Section title="Certifications" gap={gap}>
          <ul style={{ paddingLeft: 16, listStyleType: 'disc' }} className="marker:text-[#1A3D2B]">
            {resume.certifications.map((c, i) => (
              <li key={i} style={{ fontSize: base, lineHeight: 1.45 }}>
                <strong>{c.name}</strong> — {c.issuer}, {c.year}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {resume.projects.length > 0 && (
        <Section title="Projects" gap={gap} last>
          <ul style={{ paddingLeft: 16, listStyleType: 'disc' }} className="marker:text-[#1A3D2B]">
            {resume.projects.map((p, i) => (
              <li key={i} style={{ fontSize: base, lineHeight: 1.45, marginBottom: 2 }}>
                <strong>{p.name}</strong> — <Linkify text={p.description} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  )
}

function Section({ title, children, gap = 14, last = false }: { title: string; children: React.ReactNode; gap?: number; last?: boolean }) {
  return (
    <section style={{ marginBottom: last ? 0 : gap }}>
      <h2
        style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#1A1A18',
          borderBottom: '1px solid #1A1A18',
          paddingBottom: 2,
          marginBottom: 6,
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

function Row({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
      <span style={{ minWidth: 0 }}>{left}</span>
      <span style={{ flexShrink: 0, textAlign: 'right' }}>{right}</span>
    </div>
  )
}
