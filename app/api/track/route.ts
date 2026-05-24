import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'analytics.json')

async function readData() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8')
    return JSON.parse(raw)
  } catch {
    return { events: [] }
  }
}

async function writeData(data: object) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2))
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = await readData()

    const event = {
      id: Date.now(),
      type: body.type,           // 'pageview' | 'click' | 'form_submit'
      meta: body.meta || {},     // { link: 'github' } etc.
      timestamp: new Date().toISOString(),
      ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
      ua: req.headers.get('user-agent') || 'unknown',
      referrer: req.headers.get('referer') || 'direct',
    }

    data.events.push(event)
    // Keep last 10,000 events
    if (data.events.length > 10000) data.events = data.events.slice(-10000)

    await writeData(data)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Track error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
