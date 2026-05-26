import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const EVENTS_KEY = 'analytics:events'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'sidportfolio2025'

const redis = new Redis({
  url:   process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

type Event = {
  id: number
  type: string
  meta?: { link?: string; subject?: string; message?: string }
  timestamp: string
  ip: string
  ua: string
  referrer: string
}

export async function GET(req: NextRequest) {
  const pwd = req.nextUrl.searchParams.get('pwd')
  if (pwd !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Fetch all stored events (newest first because we LPUSH)
  const raw = await redis.lrange(EVENTS_KEY, 0, -1)
  const events: Event[] = raw.map(item => {
    // Upstash SDK may auto-parse JSON, handle both cases
    if (typeof item === 'string') {
      try { return JSON.parse(item) } catch { return null }
    }
    return item
  }).filter(Boolean) as Event[]

  const pageviews   = events.filter(e => e.type === 'pageview').length
  const uniqueIPs   = new Set(events.filter(e => e.type === 'pageview').map(e => e.ip)).size
  const clicks      = events.filter(e => e.type === 'click')
  const formSubmits = events.filter(e => e.type === 'form_submit').length

  // Custom event counts
  const chatbotOpens    = events.filter(e => e.type === 'chatbot_open').length
  const chatbotMessages = events.filter(e => e.type === 'chatbot_message').length
  const resumeDownloads = events.filter(e => e.type === 'resume_download').length

  const clickBreakdown: Record<string, number> = {}
  clicks.forEach(e => {
    const key = e.meta?.link || 'unknown'
    clickBreakdown[key] = (clickBreakdown[key] || 0) + 1
  })

  // Latest 50 for the activity log (events are already newest-first)
  const recent = events.slice(0, 50)

  // Daily pageviews for last 14 days
  const daily: Record<string, number> = {}
  const cutoff = Date.now() - 14 * 24 * 60 * 60 * 1000
  events
    .filter(e => e.type === 'pageview' && new Date(e.timestamp).getTime() > cutoff)
    .forEach(e => {
      const day = e.timestamp.slice(0, 10)
      daily[day] = (daily[day] || 0) + 1
    })

  return NextResponse.json({
    pageviews,
    uniqueIPs,
    formSubmits,
    chatbotOpens,
    chatbotMessages,
    resumeDownloads,
    clickBreakdown,
    daily,
    recent,
  })
}
