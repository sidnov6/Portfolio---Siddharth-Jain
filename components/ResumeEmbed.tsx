'use client'
import { useEffect, useState } from 'react'
import { Download, ExternalLink, Printer } from 'lucide-react'
import { track } from '@/lib/track'
import type { Resume } from '@/lib/resume'
import ResumeDoc from '@/components/ResumeDoc'

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

  return (
    <div className="border border-[#E4E0D6] rounded-2xl bg-white shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#E4E0D6] bg-[#F8F5EE]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#3DAA72]" />
          <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#6E7A70]">Resume · ATS-friendly · one page</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/resume"
            target="_blank"
            onClick={() => track('click', { link: 'resume_print_view' })}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold bg-white border border-[#E4E0D6] text-[#1A3D2B] rounded-lg hover:bg-[#E8F5EE] transition-colors"
          >
            <Printer size={12} /> Print view
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            onClick={() => track('resume_download', { source: 'about_embed' })}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold bg-[#1A3D2B] text-white rounded-lg hover:bg-[#2D7A52] transition-colors"
          >
            <Download size={12} /> PDF
          </a>
        </div>
      </div>

      <div className="px-6 sm:px-9 py-6 max-h-[680px] overflow-y-auto">
        <ResumeDoc resume={resume} dense />
      </div>

      <div className="px-5 py-2.5 border-t border-[#E4E0D6] bg-[#F8F5EE] text-[10px] font-mono text-[#8A9280] flex items-center justify-between flex-wrap gap-1">
        <span>Last updated {new Date(resume.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        <a href="/resume" className="hover:text-[#1A3D2B] inline-flex items-center gap-0.5">open standalone <ExternalLink size={9} /></a>
      </div>
    </div>
  )
}
