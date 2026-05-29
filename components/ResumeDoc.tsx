import type { Resume, ResumeExperience, SkillGroup } from '@/lib/resume'

/* Shared, ATS-friendly Harvard / consulting resume document used by both the
   About-section embed and the standalone /resume page. Matches the PDF
   output in lib/resume-pdf.tsx so what you see on the site is what you
   download.                                                                  */

const ensureHttp = (u: string) => (/^https?:\/\//i.test(u) ? u : `https://${u}`)

function ContactLink({ kind, value }: { kind: 'email' | 'url'; value: string }) {
  const href = kind === 'email' ? `mailto:${value}` : ensureHttp(value)
  return (
    <a
      href={href}
      target={kind === 'url' ? '_blank' : undefined}
      rel={kind === 'url' ? 'noopener noreferrer' : undefined}
      style={{ color: 'inherit', textDecoration: 'underline' }}
    >
      {value}
    </a>
  )
}

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
      nodes.push(<ContactLink key={start} kind="email" value={token} />)
    } else {
      nodes.push(<ContactLink key={start} kind="url" value={token} />)
    }
    lastIndex = start + token.length
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))
  return <>{nodes}</>
}

const FONT = '"EB Garamond", Garamond, "Adobe Garamond Pro", "Times New Roman", serif'

export default function ResumeDoc({ resume }: { resume: Resume; dense?: boolean }) {
  const { header } = resume

  const contactParts: React.ReactNode[] = []
  if (header.location)  contactParts.push(header.location)
  if (header.phone)     contactParts.push(header.phone)
  if (header.email)     contactParts.push(<ContactLink key="email"     kind="email" value={header.email} />)
  if (header.linkedin)  contactParts.push(<ContactLink key="linkedin"  kind="url"   value={header.linkedin} />)
  if (header.github)    contactParts.push(<ContactLink key="github"    kind="url"   value={header.github} />)
  if (header.portfolio) contactParts.push(<ContactLink key="portfolio" kind="url"   value={header.portfolio} />)

  return (
    <div style={{ fontFamily: FONT, color: '#000', fontSize: 14, lineHeight: 1.18, background: '#fff' }}>

      <h1 style={{ fontSize: 22, fontWeight: 700, textAlign: 'center', marginBottom: 2 }}>{header.name}</h1>
      <p style={{ fontSize: 13, textAlign: 'center', marginBottom: 12 }}>
        {contactParts.map((node, i) => (
          <span key={i}>
            {node}
            {i < contactParts.length - 1 && <span> | </span>}
          </span>
        ))}
      </p>

      <SectionTitle>Education</SectionTitle>
      {resume.education.map((e, i) => (
        <div key={i} style={{ marginBottom: 6 }}>
          <Row left={<strong>{e.school}</strong>} right={<strong>{e.location}</strong>} />
          <Row left={<strong>{e.degree}</strong>} right={<strong>{e.graduation}</strong>} />
          {e.extra && <p style={{ textAlign: 'justify' }}>{e.extra}</p>}
        </div>
      ))}

      <SectionTitle>Career</SectionTitle>
      {resume.experience.map((e, i) => <EntryWithBullets key={i} e={e} />)}

      {resume.extracurriculars.length > 0 && (
        <>
          <SectionTitle>Extracurricular Activities</SectionTitle>
          {resume.extracurriculars.map((e, i) => <EntryWithBullets key={i} e={e} />)}
        </>
      )}

      <SectionTitle>Additional Information</SectionTitle>
      {resume.skills.map((g: SkillGroup) => (
        <p key={g.category} style={{ marginTop: 1, textAlign: 'justify' }}>
          <strong>{g.category}:</strong> {g.items.join(', ')}
        </p>
      ))}
      {resume.additionalInfo.languages.length > 0 && (
        <p style={{ marginTop: 1, textAlign: 'justify' }}>
          <strong>Languages:</strong> {resume.additionalInfo.languages.join(', ')}
        </p>
      )}
      {resume.additionalInfo.hobbies.length > 0 && (
        <p style={{ marginTop: 1, textAlign: 'justify' }}>
          <strong>Hobbies:</strong> {resume.additionalInfo.hobbies.join(', ')}
        </p>
      )}
    </div>
  )
}

function SectionTitle({ children }: { children: string }) {
  return (
    <div style={{ marginTop: 8 }}>
      <p style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>
        {children}
      </p>
      <div style={{ borderBottom: '0.5px solid #000', marginBottom: 4 }} />
    </div>
  )
}

function Row({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
      <span style={{ minWidth: 0 }}>{left}</span>
      <span style={{ flexShrink: 0, textAlign: 'right' }}>{right}</span>
    </div>
  )
}

function EntryWithBullets({ e }: { e: ResumeExperience }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <Row left={<strong>{e.company}</strong>} right={<strong>{e.location}</strong>} />
      <Row left={<strong>{e.title}</strong>}   right={<strong>{e.start} – {e.end}</strong>} />
      <ul style={{ marginTop: 2, paddingLeft: 18, listStyleType: 'disc' }}>
        {e.bullets.map((b, i) => (
          <li key={i} style={{ textAlign: 'justify', marginBottom: 1 }}>
            <Linkify text={b} />
          </li>
        ))}
      </ul>
    </div>
  )
}
