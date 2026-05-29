import { getResume, defaultResume } from '@/lib/resume'
import ResumeDoc from '@/components/ResumeDoc'
import PrintButton from './PrintButton'

export const dynamic = 'force-dynamic'

export default async function ResumePage() {
  const resume = (await getResume()) ?? defaultResume

  return (
    <main
      className="min-h-screen bg-white px-6 sm:px-10 py-8 max-w-[800px] mx-auto print:px-0 print:py-0 print:max-w-none"
    >
      <style>{`
        @media print {
          @page { size: Letter; margin: 0.45in; }
          .no-print { display: none !important; }
          html, body { background: white; }
        }
      `}</style>

      <div className="no-print mb-5 flex items-center justify-between text-[12px]">
        <p className="font-mono text-[#8A9280] uppercase tracking-[0.18em]">Resume · ATS-friendly · one page</p>
        <PrintButton />
      </div>

      <ResumeDoc resume={resume} dense />
    </main>
  )
}
