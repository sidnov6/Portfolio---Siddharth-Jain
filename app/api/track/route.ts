import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const EVENTS_KEY = 'analytics:events'
const MAX_EVENTS = 10000

const redis = new Redis({
  url:   process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const event = {
      id: Date.now(),
      type: body.type,           // 'pageview' | 'click' | 'form_submit' | 'chatbot_open' | 'chatbot_message' | 'resume_download'
      meta: body.meta || {},
      timestamp: new Date().toISOString(),
      ip: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown',
      ua: req.headers.get('user-agent') || 'unknown',
      referrer: req.headers.get('referer') || 'direct',
    }

    // Push to the head of a Redis list and trim to keep only the latest MAX_EVENTS
    await redis.lpush(EVENTS_KEY, JSON.stringify(event))
    await redis.ltrim(EVENTS_KEY, 0, MAX_EVENTS - 1)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Track error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
