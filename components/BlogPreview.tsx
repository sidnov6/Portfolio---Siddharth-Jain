'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useLang } from '@/lib/language-context'
import { ArrowRight, Sparkles } from 'lucide-react'

type PostMeta = {
  slug: string
  title: string
  excerpt: string
  date: string
  tags: string[]
  body: string
}

export default function BlogPreview() {
  const ref = useRef<HTMLElement>(null)
  const [posts, setPosts] = useState<PostMeta[]>([])
  const [loading, setLoading] = useState(true)
  const { lang } = useLang()
  const isDE = lang === 'de'

  useEffect(() => {
    fetch('/api/posts')
      .then(r => r.ok ? r.json() : { posts: [] })
      .then(d => setPosts((d.posts || []).slice(0, 3)))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    )
    ref.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [posts])

  const readingTime = (md: string) => {
    const mins = Math.max(1, Math.round(md.trim().split(/\s+/).length / 220))
    return `${mins} min read`
  }

  if (!loading && posts.length === 0) return null

  return (
    <section
      id="writing"
      ref={ref}
      className="relative py-28 px-6 bg-[#F8F5EE] section-grain overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="reveal text-xs font-mono uppercase tracking-[0.2em] text-[#3DAA72] mb-4">
              {isDE ? '09 / Schreiben' : '09 / Writing'}
            </p>
            <h2 className="reveal font-display text-[clamp(2.2rem,5vw,3.8rem)] font-black text-[#1A1A18] mb-3 leading-tight">
              {isDE
                ? <>Notizen zu <em className="text-[#003F88]">KI in Finance.</em></>
                : <>Notes on <em className="text-[#003F88]">AI in Finance.</em></>}
            </h2>
            <p className="reveal text-[#6E7A70] text-base md:text-lg max-w-xl leading-relaxed">
              {isDE
                ? 'Wo der agentenbasierte Moment auf Kapitalmärkte trifft — was passiert, warum es zählt und was ich baue.'
                : 'Where the agentic moment meets capital markets — what is happening, why it matters, and what I am building toward.'}
            </p>
          </div>
          <Link
            href="/blog"
            className="reveal hidden md:inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1A3D2B] text-white font-semibold text-sm hover:bg-[#2D7A52] transition-all duration-200 shadow-md shadow-[#1A3D2B]/15 hover:-translate-y-0.5"
          >
            <Sparkles size={14} />
            {isDE ? 'Alle Beiträge' : 'All posts'}
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Posts grid */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-5">
            {[0, 1, 2].map(i => (
              <div key={i} className="h-56 bg-white rounded-2xl border border-[#E4E0D6] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {posts.map((p, i) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className={`reveal reveal-d${i + 1} group flex flex-col bg-white border border-[#E4E0D6] rounded-2xl p-6 hover:border-[#003F88]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <time className="text-[10px] font-mono text-[#8A9280] tracking-wider">
                    {new Date(p.date).toLocaleDateString(isDE ? 'de-DE' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </time>
                  <span className="text-[#E4E0D6]">·</span>
                  <span className="text-[10px] font-mono text-[#8A9280]">{readingTime(p.body)}</span>
                </div>

                <h3 className="font-display text-lg md:text-xl font-bold text-[#1A1A18] leading-tight mb-3 group-hover:text-[#003F88] transition-colors line-clamp-3">
                  {p.title}
                </h3>

                <p className="text-sm text-[#6E7A70] leading-relaxed mb-5 line-clamp-3 flex-1">
                  {p.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 2).map(t => (
                      <span key={t} className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E8F5EE] text-[#1A3D2B]">{t}</span>
                    ))}
                  </div>
                  <span className="text-xs font-mono text-[#3DAA72] group-hover:translate-x-1 transition-transform">
                    {isDE ? 'Lesen →' : 'Read more →'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Mobile-only "All posts" link */}
        <div className="md:hidden mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1A3D2B] text-white font-semibold text-sm hover:bg-[#2D7A52] transition-colors"
          >
            <Sparkles size={14} />
            {isDE ? 'Alle Beiträge ansehen' : 'View all posts'}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
