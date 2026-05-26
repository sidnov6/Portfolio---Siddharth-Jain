import { NextRequest, NextResponse } from 'next/server'
import { getPost, savePost, deletePost, extractExcerpt, type Post } from '@/lib/posts'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'sidportfolio2025'

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ post })
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  const pwd = req.nextUrl.searchParams.get('pwd')
  if (pwd !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const existing = await getPost(params.slug)
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = await req.json()
  const updated: Post = {
    ...existing,
    title: body.title?.trim() ?? existing.title,
    excerpt: body.excerpt?.trim() || (body.body ? extractExcerpt(body.body) : existing.excerpt),
    date: body.date ?? existing.date,
    tags: Array.isArray(body.tags) ? body.tags : (body.tags !== undefined ? (body.tags || '').split(',').map((t: string) => t.trim()).filter(Boolean) : existing.tags),
    body: body.body ?? existing.body,
    published: body.published !== undefined ? body.published : existing.published,
    updatedAt: new Date().toISOString(),
  }

  await savePost(updated)
  return NextResponse.json({ post: updated })
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
  const pwd = req.nextUrl.searchParams.get('pwd')
  if (pwd !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await deletePost(params.slug)
  return NextResponse.json({ ok: true })
}
