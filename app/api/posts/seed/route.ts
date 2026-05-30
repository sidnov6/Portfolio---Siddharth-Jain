import { NextRequest, NextResponse } from 'next/server'
import { listPosts, savePost } from '@/lib/posts'
import { SEED_POSTS } from '@/lib/seed-posts'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'sidportfolio2025'

export async function POST(req: NextRequest) {
  const pwd = req.nextUrl.searchParams.get('pwd')
  if (pwd !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ?refresh=1 (or ?force=1) upserts existing posts too, so edits to seed
  // content propagate. Default stays add-only to protect admin-edited posts.
  const flag = (req.nextUrl.searchParams.get('refresh') ?? req.nextUrl.searchParams.get('force') ?? '').toLowerCase()
  const refresh = flag === '1' || flag === 'true' || flag === 'yes'

  const existing = await listPosts()
  const existingBySlug = new Map(existing.map(p => [p.slug, p]))

  let added = 0
  let updated = 0
  let skipped = 0
  for (const post of SEED_POSTS) {
    const prior = existingBySlug.get(post.slug)
    if (!prior) {
      await savePost(post)
      added++
    } else if (refresh) {
      // Preserve the original createdAt; refresh everything else.
      await savePost({ ...post, createdAt: prior.createdAt ?? post.createdAt, updatedAt: new Date().toISOString() })
      updated++
    } else {
      skipped++
    }
  }

  return NextResponse.json({ ok: true, refresh, added, updated, skipped, total: SEED_POSTS.length })
}
