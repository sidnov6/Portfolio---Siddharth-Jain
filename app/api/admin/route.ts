import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'analytics.json')
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'sidportfolio2025'

async function readData() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8')
    return JSON.parse(raw)
  } catch {
    return { events: [] }
  }
}

export async function GET(req: NextRequest) {
  const pwd = req.nextUrl.searchParams.get('pwd')
  if (pwd !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = await readData()
  const events: Array<{type: string; meta?: {link?: string}; timestamp: string; ip: string; ua: string; referrer: string}> = data.events || []

  // Summarise
  const pageviews = events.filter(e => e.type === 'pageview').length
  const uniqueIPs = new Set(events.filter(e => e.type === 'pageview').map(e => e.ip)).size
  const clicks = events.filter(e => e.type === 'click')
  const formSubmits = events.filter(e => e.type === 'form_submit').length

  const clickBreakdown: Record<string, number> = {}
  clicks.forEach(e => {
    const key = e.meta?.link || 'unknown'
    clickBreakdown[key] = (clickBreakdown[key] || 0) + 1
  })

  // Last 50 events for the live log
  const recent = [...events].reverse().slice(0, 50)

  // Daily visits (last 14 days)
  const daily: Record<string, number> = {}
  const cutoff = Date.now() - 14 * 24 * 60 * 60 * 1000
  events
    .filter(e => e.type === 'pageview' && new Date(e.timestamp).getTime() > cutoff)
    .forEach(e => {
      const day = e.timestamp.slice(0, 10)
      daily[day] = (daily[day] || 0) + 1
    })

  return NextResponse.json({ pageviews, uniqueIPs, formSubmits, clickBreakdown, daily, recent })
}
