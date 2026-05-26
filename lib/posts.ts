import { Redis } from '@upstash/redis'

const redis = new Redis({
  url:   process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const POSTS_INDEX = 'posts:index'         // sorted set: slug → timestamp
const postKey = (slug: string) => `post:${slug}`

export type Post = {
  slug: string
  title: string
  excerpt: string
  date: string          // ISO
  tags: string[]
  body: string          // markdown
  published: boolean
  createdAt: string
  updatedAt: string
}

export type PostMeta = Omit<Post, 'body'>

/* ─────────────────────────────────────────────────────────
   CORE CRUD
   ───────────────────────────────────────────────────────── */

export async function listPosts(opts: { publishedOnly?: boolean } = {}): Promise<Post[]> {
  // Sorted by date desc (we store -timestamp as score so ZRANGE 0 -1 gives newest first)
  const slugs = await redis.zrange<string[]>(POSTS_INDEX, 0, -1)
  if (!slugs.length) return []

  const pipeline = redis.pipeline()
  slugs.forEach(slug => pipeline.get(postKey(slug)))
  const raw = await pipeline.exec<(Post | string | null)[]>()

  const posts = raw
    .map(item => {
      if (!item) return null
      if (typeof item === 'string') {
        try { return JSON.parse(item) as Post } catch { return null }
      }
      return item as Post
    })
    .filter((p): p is Post => p !== null)

  return opts.publishedOnly ? posts.filter(p => p.published) : posts
}

export async function getPost(slug: string): Promise<Post | null> {
  const raw = await redis.get(postKey(slug))
  if (!raw) return null
  if (typeof raw === 'string') {
    try { return JSON.parse(raw) as Post } catch { return null }
  }
  return raw as Post
}

export async function savePost(post: Post): Promise<void> {
  await redis.set(postKey(post.slug), JSON.stringify(post))
  // Use -timestamp as score so ZRANGE 0 -1 returns newest first
  const score = -new Date(post.date).getTime()
  await redis.zadd(POSTS_INDEX, { score, member: post.slug })
}

export async function deletePost(slug: string): Promise<void> {
  await redis.del(postKey(slug))
  await redis.zrem(POSTS_INDEX, slug)
}

/* ─────────────────────────────────────────────────────────
   UTILITIES
   ───────────────────────────────────────────────────────── */

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

export function readingTime(markdown: string): string {
  const words = markdown.trim().split(/\s+/).length
  const mins = Math.max(1, Math.round(words / 220))
  return `${mins} min read`
}

export function extractExcerpt(markdown: string, max = 180): string {
  // strip markdown formatting, take first paragraph-ish chunk
  const plain = markdown
    .replace(/^#+\s+.*$/gm, '')        // headings
    .replace(/[*_`>]/g, '')             // formatting chars
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // links
    .replace(/\n+/g, ' ')
    .trim()
  return plain.length > max ? plain.slice(0, max).trim() + '…' : plain
}
