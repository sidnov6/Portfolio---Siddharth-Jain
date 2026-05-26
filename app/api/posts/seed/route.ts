import { NextRequest, NextResponse } from 'next/server'
import { listPosts, savePost } from '@/lib/posts'
import { SEED_POSTS } from '@/lib/seed-posts'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'sidportfolio2025'

export async function POST(req: NextRequest) {
  const pwd = req.nextUrl.searchParams.get('pwd')
  if (pwd !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const existing = await listPosts()
  const existingSlugs = new Set(existing.map(p => p.slug))

  let added = 0
  for (const post of SEED_POSTS) {
    if (!existingSlugs.has(post.slug)) {
      await savePost(post)
      added++
    }
  }

  return NextResponse.json({ ok: true, added, total: SEED_POSTS.length, alreadyExisted: SEED_POSTS.length - added })
}
