import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import type { Metadata } from 'next'
import { CASE_STUDIES, getCaseStudy } from '@/lib/case-studies'
import ArchDiagram from '@/components/case/ArchDiagram'
import EvalPanel from '@/components/case/EvalPanel'
import MetricStat from '@/components/case/MetricStat'
import BlogNav from '@/components/BlogNav'

type Params = { params: { slug: string } }

export function generateStaticParams() {
  return CASE_STUDIES.map(c => ({ slug: c.slug }))
}

export function generateMetadata({ params }: Params): Metadata {
  const cs = getCaseStudy(params.slug)
  if (!cs) return { title: 'Case study not found' }
  return {
    title: `${cs.title} — Case Study — Siddharth Jain`,
    description: cs.tagline,
    openGraph: { title: cs.title, description: cs.tagline, type: 'article' },
  }
}

function SectionLabel({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <p className="text-xs font-mono uppercase tracking-[0.2em] mb-4" style={{ color }}>{children}</p>
  )
}

export default function CaseStudyPage({ params }: Params) {
  const cs = getCaseStudy(params.slug)
  if (!cs) notFound()

  return (
    <>
      <BlogNav />
      <main className="min-h-screen bg-white">
        <article className="max-w-3xl mx-auto px-5 py-12 md:py-20">
          {/* Back */}
          <Link href="/#projects" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#6E7A70] hover:text-[#1A1A18] transition-colors mb-8">
            <ArrowLeft size={14} /> All projects
          </Link>

          {/* Hero */}
          <header className="mb-12 md:mb-16">
            <span className="inline-block text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded-full mb-5" style={{ background: `${cs.color}14`, color: cs.color }}>
              {cs.category}
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-black text-[#1A1A18] leading-[1.05] mb-5">{cs.title}</h1>
            <p className="text-[#6E7A70] text-lg md:text-xl leading-relaxed mb-7">{cs.tagline}</p>
            <div className="flex flex-wrap gap-3">
              <a href={cs.demoUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-transform hover:scale-105"
                style={{ background: cs.color }}>
                <ExternalLink size={15} /> Live demo
              </a>
              {cs.github && (
                <a href={cs.github} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white border border-[#E4E0D6] text-[#1A1A18] hover:bg-[#F8F5EE] transition-colors">
                  <Github size={15} /> Source
                </a>
              )}
            </div>
          </header>

          {/* Problem */}
          <section className="mb-14">
            <SectionLabel color={cs.color}>The problem</SectionLabel>
            {cs.problem.map((p, i) => (
              <p key={i} className="text-[#3D3D3A] text-base md:text-lg leading-[1.75] mb-4">{p}</p>
            ))}
          </section>

          {/* Architecture */}
          <section className="mb-14">
            <SectionLabel color={cs.color}>Architecture</SectionLabel>
            <div className="rounded-2xl border border-[#E4E0D6] bg-[#F8F5EE] p-6 md:p-8">
              <ArchDiagram steps={cs.architecture} color={cs.color} />
            </div>
          </section>

          {/* Tradeoffs */}
          <section className="mb-14">
            <SectionLabel color={cs.color}>Key tradeoffs</SectionLabel>
            <div className="space-y-4">
              {cs.tradeoffs.map((t, i) => (
                <div key={i} className="rounded-2xl border border-[#E4E0D6] bg-white p-5">
                  <p className="font-bold text-[#1A1A18] text-[15px] leading-snug mb-1.5">{t.choice}</p>
                  <p className="text-[#6E7A70] text-sm leading-relaxed"><span className="font-mono text-[11px] uppercase tracking-wider" style={{ color: cs.color }}>Why&nbsp;·&nbsp;</span>{t.why}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Eval results */}
          <section className="mb-14">
            <SectionLabel color={cs.color}>Eval results</SectionLabel>
            <div className="grid sm:grid-cols-2 gap-4">
              {cs.evals.map((ev, i) => (
                <MetricStat key={i} ev={ev} color={cs.color} />
              ))}
            </div>
          </section>

          {/* Production proof */}
          <section className="mb-14">
            <SectionLabel color={cs.color}>Production proof</SectionLabel>
            <p className="text-[#6E7A70] text-sm md:text-base leading-relaxed mb-5">
              The artifact that keeps the numbers honest — the eval harness / monitoring gates that run in CI, not a one-off notebook result.
            </p>
            <EvalPanel proof={cs.proof} color={cs.color} />
          </section>

          {/* Value line */}
          <section className="mb-16">
            <div className="rounded-2xl p-6 md:p-7 border-l-4 font-display italic text-lg md:text-xl text-[#1A1A18] leading-relaxed" style={{ background: `${cs.color}0A`, borderColor: cs.color }}>
              {cs.value}
            </div>
          </section>

          {/* CTA */}
          <div className="p-7 rounded-2xl bg-gradient-to-br from-[#1A3D2B] to-[#0F2A1C] text-white">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#3DAA72] mb-3">Let&apos;s talk</p>
            <p className="text-base md:text-lg leading-relaxed mb-4">
              I&apos;m focused on finance AI — credit risk, RegTech, AML, and agentic investment research. Open to roles, mentorship, and collaborators in fintech, quant, and bank AI.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a href="mailto:sidnov6@gmail.com" className="px-4 py-2 rounded-lg bg-[#FFD56B] text-[#1A1A18] text-sm font-bold hover:bg-[#FFE08C] transition-colors">Email me</a>
              <a href="https://www.linkedin.com/in/siddharth-jain-b33394219/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-bold border border-white/15 hover:bg-white/15 transition-colors">LinkedIn</a>
            </div>
          </div>

          {/* Other case studies */}
          <div className="mt-14">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#3DAA72] mb-5">More case studies</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {CASE_STUDIES.filter(c => c.slug !== cs.slug).slice(0, 2).map(c => (
                <Link key={c.slug} href={`/projects/${c.slug}`} className="block group rounded-xl bg-[#F8F5EE] border border-[#E4E0D6] p-5 hover:border-[#1A3D2B]/30 transition-all">
                  <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: c.color }}>{c.category}</span>
                  <p className="font-display text-base font-bold text-[#1A1A18] leading-tight mt-1 group-hover:text-[#1A3D2B] transition-colors">{c.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </main>
    </>
  )
}
