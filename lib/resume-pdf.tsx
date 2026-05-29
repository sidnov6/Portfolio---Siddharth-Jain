/* Harvard / consulting one-page A4 resume.
   Uses @react-pdf/renderer so the output is a real PDF — no browser print
   chrome (no URL, no date, no page numbers). EB Garamond TTFs live in
   public/fonts/ and are registered at module load.                           */

import path from 'path'
import { Document, Page, View, Text, Font, StyleSheet, Link } from '@react-pdf/renderer'
import type { Resume, ResumeExperience, SkillGroup } from './resume'

const fontFile = (name: string) => path.join(process.cwd(), 'public', 'fonts', name)

Font.register({
  family: 'EB Garamond',
  fonts: [
    { src: fontFile('EBGaramond-Regular.ttf'), fontWeight: 'normal' },
    { src: fontFile('EBGaramond-Bold.ttf'),    fontWeight: 'bold' },
    { src: fontFile('EBGaramond-Italic.ttf'),  fontStyle: 'italic' },
  ],
})

/* Disable @react-pdf's word hyphenation so justified lines stay clean. */
Font.registerHyphenationCallback(word => [word])

const PT = (inches: number) => inches * 72

const styles = StyleSheet.create({
  page: {
    fontFamily: 'EB Garamond',
    fontSize: 10,
    color: '#000000',
    lineHeight: 1.13,
    paddingTop: PT(0.5),
    paddingBottom: PT(0.65),
    paddingLeft: PT(0.5),
    paddingRight: PT(0.5),
  },
  name: { fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginBottom: 2 },
  contact: { fontSize: 10, textAlign: 'center', marginBottom: 8 },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginTop: 6,
    marginBottom: 2,
  },
  rule: { borderBottomWidth: 0.5, borderBottomColor: '#000000', marginBottom: 4 },

  entryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  bold:     { fontWeight: 'bold' },
  italic:   { fontStyle: 'italic' },

  bulletRow:   { flexDirection: 'row', marginTop: 1 },
  bulletMark:  { width: PT(0.18), textAlign: 'left' },
  bulletText:  { flex: 1, textAlign: 'justify' },

  body:     { textAlign: 'justify' },
  infoLine: { marginTop: 1 },

  link: { color: '#000000', textDecoration: 'underline' },
})

const ensureHttp = (u: string) => (/^https?:\/\//i.test(u) ? u : `https://${u}`)

function HeaderContact({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <Text style={styles.contact}>
      {items.map((it, i) => (
        <Text key={i}>
          {it.href ? <Link src={it.href} style={styles.link}>{it.label}</Link> : it.label}
          {i < items.length - 1 ? ' | ' : ''}
        </Text>
      ))}
    </Text>
  )
}

function SectionTitle({ children }: { children: string }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>{children}</Text>
      <View style={styles.rule} />
    </View>
  )
}

function EntryHeader({ org, location, title, dates }: { org: string; location: string; title: string; dates: string }) {
  return (
    <View>
      <View style={styles.entryRow}>
        <Text style={styles.bold}>{org}</Text>
        <Text style={styles.bold}>{location}</Text>
      </View>
      <View style={styles.entryRow}>
        <Text style={styles.bold}>{title}</Text>
        <Text style={styles.bold}>{dates}</Text>
      </View>
    </View>
  )
}

function Bullet({ text }: { text: string }) {
  return (
    <View style={styles.bulletRow}>
      <Text style={styles.bulletMark}>•</Text>
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  )
}

function ExperienceEntry({ e }: { e: ResumeExperience }) {
  return (
    <View wrap={false} style={{ marginBottom: 4 }}>
      <EntryHeader org={e.company} location={e.location} title={e.title} dates={`${e.start} – ${e.end}`} />
      {e.bullets.map((b, i) => <Bullet key={i} text={b} />)}
    </View>
  )
}

export function ResumePdfDoc({ resume }: { resume: Resume }) {
  const { header } = resume

  const contactItems: Array<{ label: string; href?: string }> = []
  if (header.location)  contactItems.push({ label: header.location })
  if (header.phone)     contactItems.push({ label: header.phone })
  if (header.email)     contactItems.push({ label: header.email,    href: `mailto:${header.email}` })
  if (header.linkedin)  contactItems.push({ label: header.linkedin, href: ensureHttp(header.linkedin) })
  if (header.github)    contactItems.push({ label: header.github,   href: ensureHttp(header.github) })
  if (header.portfolio) contactItems.push({ label: header.portfolio, href: ensureHttp(header.portfolio) })

  const skillLine = (g: SkillGroup) => (
    <Text key={g.category} style={styles.infoLine}>
      <Text style={styles.bold}>{g.category}: </Text>
      {g.items.join(', ')}
    </Text>
  )

  return (
    <Document title={`${header.name} — Resume`} author={header.name}>
      <Page size="A4" style={styles.page}>

        {/* Header */}
        <Text style={styles.name}>{header.name}</Text>
        <HeaderContact items={contactItems} />

        {/* Education */}
        <SectionTitle>Education</SectionTitle>
        {resume.education.map((e, i) => (
          <View key={i} wrap={false} style={{ marginBottom: 4 }}>
            <View style={styles.entryRow}>
              <Text style={styles.bold}>{e.school}</Text>
              <Text style={styles.bold}>{e.location}</Text>
            </View>
            <View style={styles.entryRow}>
              <Text style={styles.bold}>{e.degree}</Text>
              <Text style={styles.bold}>{e.graduation}</Text>
            </View>
            {e.extra && <Text style={styles.body}>{e.extra}</Text>}
          </View>
        ))}

        {/* Career */}
        <SectionTitle>Career</SectionTitle>
        {resume.experience.map((e, i) => <ExperienceEntry key={i} e={e} />)}

        {/* Extracurriculars */}
        {resume.extracurriculars.length > 0 && (
          <>
            <SectionTitle>Extracurricular Activities</SectionTitle>
            {resume.extracurriculars.map((e, i) => <ExperienceEntry key={i} e={e} />)}
          </>
        )}

        {/* Additional Information */}
        <SectionTitle>Additional Information</SectionTitle>
        {resume.skills.map(skillLine)}
        {resume.additionalInfo.languages.length > 0 && (
          <Text style={styles.infoLine}>
            <Text style={styles.bold}>Languages: </Text>
            {resume.additionalInfo.languages.join(', ')}
          </Text>
        )}
        {resume.additionalInfo.hobbies.length > 0 && (
          <Text style={styles.infoLine}>
            <Text style={styles.bold}>Hobbies: </Text>
            {resume.additionalInfo.hobbies.join(', ')}
          </Text>
        )}

      </Page>
    </Document>
  )
}
