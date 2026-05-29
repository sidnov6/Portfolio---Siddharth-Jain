'use client'
import { useEffect, useState } from 'react'
import type { Resume, ResumeExperience, ResumeEducation, ResumeCertification, ResumeProject, SkillGroup } from '@/lib/resume'

const blankExperience = (): ResumeExperience    => ({ title: '', company: '', location: '', start: '', end: '', bullets: [''] })
const blankEducation  = (): ResumeEducation     => ({ degree: '', school: '', location: '', graduation: '', extra: '' })
const blankCert       = (): ResumeCertification => ({ name: '', issuer: '', year: '' })
const blankProject    = (): ResumeProject       => ({ name: '', description: '' })
const blankSkillGroup = (): SkillGroup          => ({ category: '', items: [] })

export default function ResumeBuilder({ pwd }: { pwd: string }) {
  const [resume, setResume] = useState<Resume | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<string | null>(null)
  /** Keep skills as comma-joined strings per group while editing so the user
      can type freely without us splitting on every keystroke.                 */
  const [skillDraft, setSkillDraft] = useState<Array<{ category: string; itemsText: string }>>([])

  useEffect(() => {
    fetch('/api/resume')
      .then(r => r.json())
      .then(d => {
        setResume(d.resume)
        setSkillDraft((d.resume.skills as SkillGroup[]).map(g => ({ category: g.category, itemsText: g.items.join(', ') })))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading || !resume) {
    return <div className="bg-white border border-[#E4E0D6] rounded-2xl p-10 text-center text-sm text-[#8A9280]">Loading resume…</div>
  }

  const update = (patch: Partial<Resume>) => setResume(prev => prev ? { ...prev, ...patch } : prev)
  const updateHeader = (patch: Partial<Resume['header']>) =>
    setResume(prev => prev ? { ...prev, header: { ...prev.header, ...patch } } : prev)

  const save = async () => {
    if (!resume) return
    setSaving(true)
    const skills: SkillGroup[] = skillDraft
      .map(g => ({ category: g.category.trim(), items: g.itemsText.split(',').map(s => s.trim()).filter(Boolean) }))
      .filter(g => g.category && g.items.length > 0)
    const payload: Resume = { ...resume, skills }
    const res = await fetch(`/api/resume?pwd=${encodeURIComponent(pwd)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      alert('Failed to save resume')
      setSaving(false)
      return
    }
    const j = await res.json()
    setResume(j.resume)
    setSkillDraft((j.resume.skills as SkillGroup[]).map(g => ({ category: g.category, itemsText: g.items.join(', ') })))
    setSavedAt(new Date().toLocaleTimeString())
    setSaving(false)
  }

  const resetToDefault = async () => {
    if (!confirm('Reset to the default seed resume? Your edits will be lost.')) return
    const res = await fetch(`/api/resume?pwd=${encodeURIComponent(pwd)}`, { method: 'PUT' })
    if (!res.ok) { alert('Reset failed'); return }
    const j = await res.json()
    setResume(j.resume)
    setSkillDraft((j.resume.skills as SkillGroup[]).map(g => ({ category: g.category, itemsText: g.items.join(', ') })))
    setSavedAt(new Date().toLocaleTimeString())
  }

  /* skill group helpers */
  const addSkillGroup    = () => setSkillDraft(prev => [...prev, { category: blankSkillGroup().category, itemsText: '' }])
  const removeSkillGroup = (idx: number) => setSkillDraft(prev => prev.filter((_, i) => i !== idx))
  const setSkillCategory = (idx: number, value: string) => setSkillDraft(prev => prev.map((g, i) => i === idx ? { ...g, category: value } : g))
  const setSkillItems    = (idx: number, value: string) => setSkillDraft(prev => prev.map((g, i) => i === idx ? { ...g, itemsText: value } : g))

  /* helpers for list editing */
  const setExperience = (idx: number, patch: Partial<ResumeExperience>) =>
    update({ experience: resume.experience.map((e, i) => i === idx ? { ...e, ...patch } : e) })
  const addExperience    = () => update({ experience: [...resume.experience, blankExperience()] })
  const removeExperience = (idx: number) => update({ experience: resume.experience.filter((_, i) => i !== idx) })

  const setBullet = (eIdx: number, bIdx: number, value: string) =>
    setExperience(eIdx, { bullets: resume.experience[eIdx].bullets.map((b, i) => i === bIdx ? value : b) })
  const addBullet    = (eIdx: number) => setExperience(eIdx, { bullets: [...resume.experience[eIdx].bullets, ''] })
  const removeBullet = (eIdx: number, bIdx: number) =>
    setExperience(eIdx, { bullets: resume.experience[eIdx].bullets.filter((_, i) => i !== bIdx) })

  const setEducation = (idx: number, patch: Partial<ResumeEducation>) =>
    update({ education: resume.education.map((e, i) => i === idx ? { ...e, ...patch } : e) })
  const addEducation    = () => update({ education: [...resume.education, blankEducation()] })
  const removeEducation = (idx: number) => update({ education: resume.education.filter((_, i) => i !== idx) })

  const setCert = (idx: number, patch: Partial<ResumeCertification>) =>
    update({ certifications: resume.certifications.map((c, i) => i === idx ? { ...c, ...patch } : c) })
  const addCert    = () => update({ certifications: [...resume.certifications, blankCert()] })
  const removeCert = (idx: number) => update({ certifications: resume.certifications.filter((_, i) => i !== idx) })

  const setProject = (idx: number, patch: Partial<ResumeProject>) =>
    update({ projects: resume.projects.map((p, i) => i === idx ? { ...p, ...patch } : p) })
  const addProject    = () => update({ projects: [...resume.projects, blankProject()] })
  const removeProject = (idx: number) => update({ projects: resume.projects.filter((_, i) => i !== idx) })

  /* extracurriculars share the experience shape */
  const setExtra = (idx: number, patch: Partial<ResumeExperience>) =>
    update({ extracurriculars: resume.extracurriculars.map((e, i) => i === idx ? { ...e, ...patch } : e) })
  const addExtra    = () => update({ extracurriculars: [...resume.extracurriculars, blankExperience()] })
  const removeExtra = (idx: number) => update({ extracurriculars: resume.extracurriculars.filter((_, i) => i !== idx) })
  const setExtraBullet = (eIdx: number, bIdx: number, value: string) =>
    setExtra(eIdx, { bullets: resume.extracurriculars[eIdx].bullets.map((b, i) => i === bIdx ? value : b) })
  const addExtraBullet    = (eIdx: number) => setExtra(eIdx, { bullets: [...resume.extracurriculars[eIdx].bullets, ''] })
  const removeExtraBullet = (eIdx: number, bIdx: number) =>
    setExtra(eIdx, { bullets: resume.extracurriculars[eIdx].bullets.filter((_, i) => i !== bIdx) })

  const setLanguages = (text: string) =>
    update({ additionalInfo: { ...resume.additionalInfo, languages: text.split(',').map(s => s.trim()).filter(Boolean) } })
  const setHobbies = (text: string) =>
    update({ additionalInfo: { ...resume.additionalInfo, hobbies:   text.split(',').map(s => s.trim()).filter(Boolean) } })

  return (
    <div className="space-y-6">
      {/* Sticky action bar */}
      <div className="sticky top-0 z-10 -mx-4 px-4 py-3 bg-[#F8F5EE]/95 backdrop-blur border-b border-[#E4E0D6] flex items-center justify-between flex-wrap gap-2">
        <p className="text-xs text-[#6E7A70]">
          {savedAt
            ? <>Saved at <span className="font-mono">{savedAt}</span>. Last update <span className="font-mono">{new Date(resume.updatedAt).toLocaleString()}</span>.</>
            : <>Last update <span className="font-mono">{new Date(resume.updatedAt).toLocaleString()}</span>. Edits below are local until you save.</>}
        </p>
        <div className="flex gap-2">
          <a href="/resume" target="_blank" className="px-3 py-1.5 text-xs font-semibold bg-white border border-[#E4E0D6] rounded-lg hover:bg-[#E8F5EE]">Preview</a>
          <button onClick={resetToDefault} className="px-3 py-1.5 text-xs font-semibold bg-white border border-[#E4E0D6] rounded-lg hover:bg-[#FEF2EE] text-[#C03810]">Reset to default</button>
          <button onClick={save} disabled={saving} className="px-4 py-1.5 text-xs font-semibold bg-[#1A3D2B] text-white rounded-lg hover:bg-[#2D7A52] disabled:opacity-50">
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      {/* Header */}
      <Card title="Header">
        <Grid2>
          <Input label="Full name *"   value={resume.header.name}      onChange={v => updateHeader({ name: v })} />
          <Input label="Location"      value={resume.header.location}  onChange={v => updateHeader({ location: v })} />
          <Input label="Email *"       value={resume.header.email}     onChange={v => updateHeader({ email: v })} />
          <Input label="Phone"         value={resume.header.phone || ''} onChange={v => updateHeader({ phone: v })} />
          <Input label="LinkedIn"      value={resume.header.linkedin || ''} onChange={v => updateHeader({ linkedin: v })} />
          <Input label="GitHub"        value={resume.header.github || ''}   onChange={v => updateHeader({ github: v })} />
          <Input label="Portfolio URL" value={resume.header.portfolio || ''} onChange={v => updateHeader({ portfolio: v })} />
        </Grid2>
      </Card>

      <Card title="Professional Summary" hint="2–3 sentences. Mirror the target job title. Include 1–2 standout achievements with numbers.">
        <TextArea rows={5} value={resume.summary} onChange={v => update({ summary: v })} />
      </Card>

      <Card
        title="Skills"
        hint="Grouped by domain. Each group shows as a line on the resume: Category: item, item, item."
        right={<button onClick={addSkillGroup} className="text-xs font-semibold text-[#1A3D2B] hover:underline">+ Add group</button>}
      >
        <div className="space-y-3">
          {skillDraft.map((g, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-[200px_1fr_40px] gap-2 items-end">
              <Input label="Category"
                value={g.category}
                onChange={v => setSkillCategory(i, v)} />
              <Input label="Items (comma-separated)"
                value={g.itemsText}
                onChange={v => setSkillItems(i, v)} />
              <button onClick={() => removeSkillGroup(i)} className="h-10 text-[#C03810] hover:bg-[#FEF2EE] rounded-lg text-sm">×</button>
            </div>
          ))}
        </div>
      </Card>

      <Card
        title="Work Experience"
        right={<button onClick={addExperience} className="text-xs font-semibold text-[#1A3D2B] hover:underline">+ Add role</button>}
      >
        <div className="space-y-5">
          {resume.experience.map((e, i) => (
            <div key={i} className="p-4 bg-[#F8F5EE] rounded-xl border border-[#E4E0D6]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-mono uppercase tracking-wider text-[#8A9280]">Role {i + 1}</p>
                <button onClick={() => removeExperience(i)} className="text-[11px] text-[#C03810] hover:underline">Remove</button>
              </div>
              <Grid2>
                <Input label="Title"    value={e.title}    onChange={v => setExperience(i, { title: v })} />
                <Input label="Company"  value={e.company}  onChange={v => setExperience(i, { company: v })} />
                <Input label="Location" value={e.location} onChange={v => setExperience(i, { location: v })} />
                <div />
                <Input label="Start (e.g. Jun 2025)" value={e.start} onChange={v => setExperience(i, { start: v })} />
                <Input label="End (e.g. Jun 2026 or Present)" value={e.end} onChange={v => setExperience(i, { end: v })} />
              </Grid2>
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#6E7A70]">Bullets (action verb + task + method + metric)</label>
                  <button onClick={() => addBullet(i)} className="text-[11px] font-semibold text-[#1A3D2B] hover:underline">+ Add bullet</button>
                </div>
                <div className="space-y-2">
                  {e.bullets.map((b, bi) => (
                    <div key={bi} className="flex gap-2 items-start">
                      <textarea
                        value={b}
                        onChange={ev => setBullet(i, bi, ev.target.value)}
                        rows={2}
                        className="flex-1 px-3 py-2 bg-white border border-[#E4E0D6] rounded-lg text-[13px] leading-relaxed focus:outline-none focus:border-[#1A3D2B]/40 resize-y"
                        placeholder="Launched a paid-search program using Google Ads and a $50K monthly budget, generating 1,200 qualified leads and 4.2x ROAS in 6 months."
                      />
                      <button onClick={() => removeBullet(i, bi)} className="text-[#C03810] text-xs px-2 py-1 hover:bg-[#FEF2EE] rounded">×</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Education" right={<button onClick={addEducation} className="text-xs font-semibold text-[#1A3D2B] hover:underline">+ Add school</button>}>
        <div className="space-y-4">
          {resume.education.map((e, i) => (
            <div key={i} className="p-4 bg-[#F8F5EE] rounded-xl border border-[#E4E0D6]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-mono uppercase tracking-wider text-[#8A9280]">Education {i + 1}</p>
                <button onClick={() => removeEducation(i)} className="text-[11px] text-[#C03810] hover:underline">Remove</button>
              </div>
              <Grid2>
                <Input label="Degree"     value={e.degree}     onChange={v => setEducation(i, { degree: v })} />
                <Input label="School"     value={e.school}     onChange={v => setEducation(i, { school: v })} />
                <Input label="Location"   value={e.location}   onChange={v => setEducation(i, { location: v })} />
                <Input label="Graduation" value={e.graduation} onChange={v => setEducation(i, { graduation: v })} />
                <Input label="Extra (GPA, honors, ranking)" value={e.extra || ''} onChange={v => setEducation(i, { extra: v })} />
              </Grid2>
            </div>
          ))}
        </div>
      </Card>

      <Card
        title="Extracurricular Activities"
        hint="Same shape as roles. Shown on the PDF between Career and Additional Information."
        right={<button onClick={addExtra} className="text-xs font-semibold text-[#1A3D2B] hover:underline">+ Add activity</button>}
      >
        <div className="space-y-5">
          {resume.extracurriculars.map((e, i) => (
            <div key={i} className="p-4 bg-[#F8F5EE] rounded-xl border border-[#E4E0D6]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-mono uppercase tracking-wider text-[#8A9280]">Activity {i + 1}</p>
                <button onClick={() => removeExtra(i)} className="text-[11px] text-[#C03810] hover:underline">Remove</button>
              </div>
              <Grid2>
                <Input label="Role"         value={e.title}    onChange={v => setExtra(i, { title: v })} />
                <Input label="Organisation" value={e.company}  onChange={v => setExtra(i, { company: v })} />
                <Input label="Location"     value={e.location} onChange={v => setExtra(i, { location: v })} />
                <div />
                <Input label="Start" value={e.start} onChange={v => setExtra(i, { start: v })} />
                <Input label="End"   value={e.end}   onChange={v => setExtra(i, { end: v })} />
              </Grid2>
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#6E7A70]">Bullets</label>
                  <button onClick={() => addExtraBullet(i)} className="text-[11px] font-semibold text-[#1A3D2B] hover:underline">+ Add bullet</button>
                </div>
                <div className="space-y-2">
                  {e.bullets.map((b, bi) => (
                    <div key={bi} className="flex gap-2 items-start">
                      <textarea
                        value={b}
                        onChange={ev => setExtraBullet(i, bi, ev.target.value)}
                        rows={2}
                        className="flex-1 px-3 py-2 bg-white border border-[#E4E0D6] rounded-lg text-[13px] leading-relaxed focus:outline-none focus:border-[#1A3D2B]/40 resize-y"
                      />
                      <button onClick={() => removeExtraBullet(i, bi)} className="text-[#C03810] text-xs px-2 py-1 hover:bg-[#FEF2EE] rounded">×</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Additional Information" hint="Languages and hobbies — appear under the Additional Information section after the skill groups.">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#6E7A70] mb-1.5">Languages (comma-separated)</label>
            <input
              value={resume.additionalInfo.languages.join(', ')}
              onChange={e => setLanguages(e.target.value)}
              placeholder="English (Native), Hindi (Native), French (Elementary)"
              className="w-full px-3 py-2 bg-white border border-[#E4E0D6] rounded-lg text-[13px] focus:outline-none focus:border-[#1A3D2B]/40"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#6E7A70] mb-1.5">Hobbies (comma-separated)</label>
            <input
              value={resume.additionalInfo.hobbies.join(', ')}
              onChange={e => setHobbies(e.target.value)}
              placeholder="Basketball, Manchester United, Geopolitics"
              className="w-full px-3 py-2 bg-white border border-[#E4E0D6] rounded-lg text-[13px] focus:outline-none focus:border-[#1A3D2B]/40"
            />
          </div>
        </div>
      </Card>

      <Card title="Certifications" hint="Not shown on the Harvard PDF — kept here so they can be embedded as bullet points inside Education or Career if needed." right={<button onClick={addCert} className="text-xs font-semibold text-[#1A3D2B] hover:underline">+ Add</button>}>
        <div className="space-y-3">
          {resume.certifications.map((c, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_120px_40px] gap-2 items-end">
              <Input label="Name"   value={c.name}   onChange={v => setCert(i, { name: v })} />
              <Input label="Issuer" value={c.issuer} onChange={v => setCert(i, { issuer: v })} />
              <Input label="Year"   value={c.year}   onChange={v => setCert(i, { year: v })} />
              <button onClick={() => removeCert(i)} className="h-10 text-[#C03810] hover:bg-[#FEF2EE] rounded-lg text-sm">×</button>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Projects" hint="Not shown on the Harvard PDF — used on the site embed only." right={<button onClick={addProject} className="text-xs font-semibold text-[#1A3D2B] hover:underline">+ Add</button>}>
        <div className="space-y-3">
          {resume.projects.map((p, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-[200px_1fr_40px] gap-2 items-end">
              <Input label="Name" value={p.name} onChange={v => setProject(i, { name: v })} />
              <Input label="Description (one line with tools + outcome)" value={p.description} onChange={v => setProject(i, { description: v })} />
              <button onClick={() => removeProject(i)} className="h-10 text-[#C03810] hover:bg-[#FEF2EE] rounded-lg text-sm">×</button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

/* ── form primitives ─────────────────────────────────────── */

function Card({ title, hint, right, children }: { title: string; hint?: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="bg-white border border-[#E4E0D6] rounded-2xl p-5 sm:p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="font-bold text-[#1A1A18]">{title}</h3>
          {hint && <p className="text-[11.5px] text-[#8A9280] mt-1 leading-relaxed">{hint}</p>}
        </div>
        {right}
      </div>
      {children}
    </section>
  )
}

function Grid2({ children }: { children: React.ReactNode }) {
  return <div className="grid sm:grid-cols-2 gap-3">{children}</div>
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="block text-xs font-mono uppercase tracking-wider text-[#6E7A70] mb-1.5">{label}</span>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-white border border-[#E4E0D6] rounded-lg text-[13px] focus:outline-none focus:border-[#1A3D2B]/40"
      />
    </label>
  )
}

function TextArea({ value, onChange, rows = 4 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      rows={rows}
      className="w-full px-3 py-2.5 bg-white border border-[#E4E0D6] rounded-lg text-[13px] leading-relaxed focus:outline-none focus:border-[#1A3D2B]/40 resize-y"
    />
  )
}
