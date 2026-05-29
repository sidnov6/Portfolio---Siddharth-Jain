import { getResume, defaultResume } from '@/lib/resume'
import ResumeDoc from '@/components/ResumeDoc'

export const dynamic = 'force-dynamic'

export default async function ResumePage() {
  const resume = (await getResume()) ?? defaultResume

  return (
    <main
      className="min-h-screen bg-white px-8 sm:px-12 py-10 mx-auto"
      style={{ maxWidth: 820 }}
    >
      <div className="mb-5 flex items-center justify-between text-[12px]">
        <p className="font-mono text-[#8A9280] uppercase tracking-[0.18em]">Preview · download the PDF for ATS portals</p>
        <a
          href="/api/resume/pdf"
          className="px-3 py-1.5 text-[12px] font-semibold bg-[#1A3D2B] text-white rounded-lg hover:bg-[#2D7A52]"
        >
          Download PDF
        </a>
      </div>

      <ResumeDoc resume={resume} />
    </main>
  )
}
