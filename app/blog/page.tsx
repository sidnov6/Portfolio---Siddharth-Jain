import Link from 'next/link'
import { listPosts, readingTime } from '@/lib/posts'
import BlogNav from '@/components/BlogNav'
import LocaleText from '@/components/LocaleText'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Blog — Siddharth Jain',
  description: 'Notes on AI in finance, agentic systems, fintech disruption, and the technical-to-finance pivot.',
}

export default async function BlogIndex() {
  const posts = await listPosts({ publishedOnly: true })

  return (
    <>
      <BlogNav />
      <main className="min-h-screen bg-[#F8F5EE] section-grain">
        <div className="max-w-3xl mx-auto px-5 py-16 md:py-24">
          {/* Header */}
          <div className="mb-14">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#3DAA72] mb-4">
              <LocaleText en="Writing" de="Blog" />
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-black text-[#1A1A18] leading-[1.05] mb-5">
              <LocaleText en="Notes on" de="Notizen zu" /> <em className="text-[#003F88]"><LocaleText en="AI in Finance." de="KI in Finance." /></em>
            </h1>
            <p className="text-[#6E7A70] text-lg leading-relaxed max-w-xl">
              <LocaleText
                en="Where the agentic moment meets capital markets — what is happening, why it matters, and what I am building toward."
                de="Wo der agentenbasierte Moment auf Kapitalmärkte trifft — was passiert, warum es zählt und was ich baue."
              />
            </p>
          </div>

          {/* Post list */}
          {posts.length === 0 ? (
            <div className="text-center py-20 text-[#8A9280]">
              <p className="font-mono text-sm"><LocaleText en="No posts yet." de="Noch keine Beiträge." /></p>
            </div>
          ) : (
            <div className="space-y-5">
              {posts.map(p => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="block group rounded-2xl bg-white border border-[#E4E0D6] p-6 md:p-7 hover:border-[#003F88]/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <time className="text-[11px] font-mono text-[#8A9280] tracking-wider">
                      {new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </time>
                    <span className="text-[#E4E0D6]">·</span>
                    <span className="text-[11px] font-mono text-[#8A9280]">{readingTime(p.body)}</span>
                    {p.tags.slice(0, 2).map(t => (
                      <span key={t} className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E8F5EE] text-[#1A3D2B]">{t}</span>
                    ))}
                  </div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-[#1A1A18] leading-tight mb-2 group-hover:text-[#003F88] transition-colors">
                    {p.title}
                  </h2>
                  <p className="text-[#6E7A70] text-sm md:text-base leading-relaxed">{p.excerpt}</p>
                  <p className="mt-4 text-xs font-mono text-[#3DAA72] group-hover:translate-x-1 transition-transform inline-block">
                    <LocaleText en="Read post →" de="Beitrag lesen →" />
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
