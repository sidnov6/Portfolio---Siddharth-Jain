import { NextRequest, NextResponse } from 'next/server'
import { getResume, saveResume, defaultResume, type Resume } from '@/lib/resume'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'sidportfolio2025'

export async function GET() {
  const r = await getResume()
  return NextResponse.json({ resume: r ?? defaultResume, seeded: !r })
}

export async function POST(req: NextRequest) {
  const pwd = req.nextUrl.searchParams.get('pwd')
  if (pwd !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = (await req.json()) as Partial<Resume> & { resume?: Resume }
    const incoming = body.resume ?? (body as Resume)
    if (!incoming?.header?.name || !incoming?.summary) {
      return NextResponse.json({ error: 'header.name and summary required' }, { status: 400 })
    }
    await saveResume(incoming)
    const r = await getResume()
    return NextResponse.json({ resume: r })
  } catch (err) {
    console.error('Save resume error:', err)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const pwd = req.nextUrl.searchParams.get('pwd')
  if (pwd !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  await saveResume(defaultResume)
  return NextResponse.json({ resume: defaultResume, reset: true })
}
