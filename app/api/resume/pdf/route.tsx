import { NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { getResume, defaultResume } from '@/lib/resume'
import { ResumePdfDoc } from '@/lib/resume-pdf'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const resume = (await getResume()) ?? defaultResume
  const buffer = await renderToBuffer(<ResumePdfDoc resume={resume} />)

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Siddharth_Jain_Resume.pdf"',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  })
}
