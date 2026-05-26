import { NextRequest, NextResponse } from 'next/server'
import { listPosts, savePost, extractExcerpt, readingTime, slugify, type Post } from '@/lib/posts'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'sidportfolio2025'

export async function GET(req: NextRequest) {
  const isAdmin = req.nextUrl.searchParams.get('pwd') === ADMIN_PASSWORD
  const posts = await listPosts({ publishedOnly: !isAdmin })
  return NextResponse.json({ posts })
}

export async function POST(req: NextRequest) {
  const pwd = req.nextUrl.searchParams.get('pwd')
  if (pwd !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    if (!body.title || !body.body) {
      return NextResponse.json({ error: 'Title and body required' }, { status: 400 })
    }

    const now = new Date().toISOString()
    const slug = body.slug?.trim() ? slugify(body.slug) : slugify(body.title)

    const post: Post = {
      slug,
      title: body.title.trim(),
      excerpt: body.excerpt?.trim() || extractExcerpt(body.body),
      date: body.date || now,
      tags: Array.isArray(body.tags) ? body.tags : (body.tags || '').split(',').map((t: string) => t.trim()).filter(Boolean),
      body: body.body,
      published: body.published !== false,
      createdAt: now,
      updatedAt: now,
    }

    await savePost(post)
    return NextResponse.json({ post, readingTime: readingTime(post.body) })
  } catch (err) {
    console.error('Create post error:', err)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
