import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPost, listPosts, readingTime, type Post } from '@/lib/posts'
import BlogNav from '@/components/BlogNav'
import LocaleText from '@/components/LocaleText'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type Params = { params: { slug: string } }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title: 'Post not found' }
  return {
    title: `${post.title} — Siddharth Jain`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function PostPage({ params }: Params) {
  const post = await getPost(params.slug)
  if (!post || !post.published) notFound()

  const allPosts = await listPosts({ publishedOnly: true })
  const others = allPosts.filter(p => p.slug !== post.slug).slice(0, 2)

  return (
    <>
      <BlogNav />
      <main className="min-h-screen bg-white">
        <article className="max-w-3xl mx-auto px-5 py-12 md:py-20">
          {/* Header */}
          <header className="mb-10 md:mb-14">
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <time className="text-[11px] font-mono text-[#8A9280] tracking-wider">
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </time>
              <span className="text-[#E4E0D6]">·</span>
              <span className="text-[11px] font-mono text-[#8A9280]">{readingTime(post.body)}</span>
              {post.tags.map(t => (
                <span key={t} className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E8F5EE] text-[#1A3D2B]">{t}</span>
              ))}
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-black text-[#1A1A18] leading-[1.05] mb-5">
              {post.title}
            </h1>
            <p className="text-[#6E7A70] text-lg md:text-xl leading-relaxed">{post.excerpt}</p>
          </header>

          {/* Body */}
          <div className="prose-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => <h2 className="font-display text-2xl md:text-3xl font-black text-[#1A1A18] mt-12 mb-4 leading-tight">{children}</h2>,
                h2: ({ children }) => <h2 className="font-display text-2xl md:text-3xl font-black text-[#1A1A18] mt-12 mb-4 leading-tight">{children}</h2>,
                h3: ({ children }) => <h3 className="font-display text-xl md:text-2xl font-bold text-[#1A1A18] mt-8 mb-3 leading-tight">{children}</h3>,
                p: ({ children }) => <p className="text-[#3D3D3A] text-base md:text-lg leading-[1.75] mb-5">{children}</p>,
                strong: ({ children }) => <strong className="text-[#1A3D2B] font-bold bg-[#E8F5EE] px-1 rounded">{children}</strong>,
                em: ({ children }) => <em className="italic text-[#1A1A18]">{children}</em>,
                a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#003F88] underline underline-offset-2 hover:text-[#1A3D2B]">{children}</a>,
                ul: ({ children }) => <ul className="text-[#3D3D3A] text-base md:text-lg leading-[1.8] mb-6 space-y-2 pl-5 list-disc marker:text-[#3DAA72]">{children}</ul>,
                ol: ({ children }) => <ol className="text-[#3D3D3A] text-base md:text-lg leading-[1.8] mb-6 space-y-2 pl-5 list-decimal marker:text-[#3DAA72] marker:font-bold">{children}</ol>,
                li: ({ children }) => <li className="pl-1">{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className="my-8 p-6 md:p-7 rounded-2xl bg-gradient-to-br from-[#F8F5EE] to-white border-l-4 border-[#003F88] font-display italic text-lg md:text-xl text-[#1A1A18] leading-relaxed">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => <code className="text-[13px] font-mono px-1.5 py-0.5 rounded bg-[#F0EDE4] text-[#1A3D2B]">{children}</code>,
                hr: () => <div className="my-10 flex justify-center"><div className="flex gap-2">{[0,1,2].map(i => <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#3DAA72]/40" />)}</div></div>,
              }}
            >
              {post.body}
            </ReactMarkdown>
          </div>

          {/* Footer / CTA */}
          <div className="mt-16 p-7 rounded-2xl bg-gradient-to-br from-[#1A3D2B] to-[#0F2A1C] text-white">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#3DAA72] mb-3">
              <LocaleText en="Let's talk" de="Lass uns reden" />
            </p>
            <p className="text-base md:text-lg leading-relaxed mb-4">
              <LocaleText
                en="I'm pivoting from manufacturing AI to finance — open to roles, mentorship, and collaborators in fintech, quant, and bank AI."
                de="Ich wechsle von der Industrie-KI in den Finanzsektor — offen für Stellen, Mentoring und Mitarbeit in Fintech, Quant und Bank-KI."
              />
            </p>
            <div className="flex gap-3 flex-wrap">
              <a href="mailto:sidnov6@gmail.com" className="px-4 py-2 rounded-lg bg-[#FFD56B] text-[#1A1A18] text-sm font-bold hover:bg-[#FFE08C] transition-colors">
                <LocaleText en="Email me" de="E-Mail schreiben" />
              </a>
              <a href="https://www.linkedin.com/in/siddharth-jain-b33394219/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-bold border border-white/15 hover:bg-white/15 transition-colors">LinkedIn</a>
            </div>
          </div>

          {/* Related */}
          {others.length > 0 && (
            <div className="mt-14">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#3DAA72] mb-5">
                <LocaleText en="More posts" de="Weitere Beiträge" />
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {others.map((p: Post) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="block group rounded-xl bg-[#F8F5EE] border border-[#E4E0D6] p-5 hover:border-[#003F88]/30 transition-all"
                  >
                    <time className="text-[10px] font-mono text-[#8A9280] tracking-wider">
                      {new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </time>
                    <p className="font-display text-base font-bold text-[#1A1A18] leading-tight mt-1 group-hover:text-[#003F88] transition-colors">
                      {p.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
    </>
  )
}
