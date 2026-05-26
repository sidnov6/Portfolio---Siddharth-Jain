'use client'
import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/lib/language-context'
import { CodeBracketsSVG } from '@/components/Decorations'

const categories = [
  {
    label: { en: 'Programming & Analytics', de: 'Programmierung & Analytik' },
    color: '#1A3D2B', bg: '#E8F5EE',
    items: ['Python', 'SQL', 'Power BI', 'Excel', 'PySpark', 'Pandas', 'NumPy', 'Matplotlib', 'Statistical Analysis', 'Plotly'],
  },
  {
    label: { en: 'AI & Machine Learning', de: 'KI & Machine Learning' },
    color: '#2D7A52', bg: '#EEF8F3',
    items: ['Machine Learning', 'Deep Learning', 'NLP', 'Generative AI', 'LLMs', 'RAG', 'Computer Vision', 'PyTorch', 'TensorFlow', 'Scikit-learn'],
  },
  {
    label: { en: 'Data Engineering & Cloud', de: 'Data Engineering & Cloud' },
    color: '#003F88', bg: '#EEF3FB',
    items: ['Apache Spark', 'Kafka', 'Airflow', 'Databricks', 'Snowflake', 'ETL Pipelines', 'AWS', 'Azure', 'dbt', 'Data Warehousing'],
  },
  {
    label: { en: 'AI Frameworks & Tools', de: 'KI-Frameworks & Tools' },
    color: '#F04E23', bg: '#FEF2EE',
    items: ['LangChain', 'ChromaDB', 'Streamlit', 'OpenAI API', 'Anthropic Claude', 'Gemini API', 'Prompt Engineering', 'Vector Search', 'AI Agents', 'FastAPI'],
  },
  {
    label: { en: 'Core Domains', de: 'Kernbereiche' },
    color: '#B3A369', bg: '#FAF8F0',
    items: ['Data Engineering', 'Analytics Engineering', 'Predictive Analytics', 'Business Intelligence', 'Manufacturing AI', 'Healthcare AI', 'Cybersecurity', '5G / Network Security'],
  },
]

const topSkills = [
  { name: 'Python',           pct: 96 },
  { name: 'SQL',              pct: 93 },
  { name: 'LangChain / RAG',  pct: 91 },
  { name: 'Power BI',         pct: 90 },
  { name: 'Apache Spark / PySpark', pct: 87 },
  { name: 'Machine Learning', pct: 89 },
  { name: 'AWS / Azure',      pct: 82 },
  { name: 'Databricks / Snowflake', pct: 85 },
]

export default function Skills() {
  const ref       = useRef<HTMLElement>(null)
  const barsRef   = useRef<HTMLDivElement>(null)
  const animated  = useRef(false)
  const [active, setActive] = useState(0)
  const { lang } = useLang()
  const isDE = lang === 'de'

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          if (e.target === barsRef.current && !animated.current) {
            animated.current = true
            setTimeout(() => {
              barsRef.current?.querySelectorAll<HTMLElement>('.bar-fill').forEach(el => {
                el.style.width = el.dataset.pct + '%'
              })
            }, 200)
          }
        }
      }),
      { threshold: 0.15 }
    )
    ref.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => io.observe(el))
    if (barsRef.current) io.observe(barsRef.current)
    return () => io.disconnect()
  }, [])

  return (
    <section id="skills" ref={ref} className="relative py-28 px-6 bg-[#F8F5EE] section-grain overflow-hidden">
      {/* Background code brackets decoration */}
      <div className="pointer-events-none absolute hidden lg:block opacity-[0.07] float-slow" style={{ right: '60px', top: '120px' }}>
        <CodeBracketsSVG size={130} color="#1A3D2B" />
      </div>
      <div className="pointer-events-none absolute hidden lg:block opacity-[0.06] float-slow-2" style={{ left: '40px', bottom: '160px' }}>
        <CodeBracketsSVG size={110} color="#1A3D2B" />
      </div>

      <div className="max-w-6xl mx-auto relative">

        {/* Header */}
        <p className="reveal text-xs font-mono uppercase tracking-[0.2em] text-[#3DAA72] mb-4">
          {isDE ? '03 / Fähigkeiten' : '03 / Skills'}
        </p>
        <h2 className="reveal font-display text-[clamp(2.2rem,5vw,3.8rem)] font-black text-[#1A1A18] mb-3 leading-tight">
          {isDE ? <>Technisches <em className="text-[#1A3D2B]">Arsenal</em></> : <>Technical <em className="text-[#1A3D2B]">Arsenal</em></>}
        </h2>
        <p className="reveal text-[#6E7A70] text-lg max-w-2xl mb-14 leading-relaxed">
          {isDE
            ? 'Ein Full-Stack-KI-Werkzeugkasten, entwickelt durch Enterprise-Deployments im Fortune-500-Maßstab, akademische Forschung am Georgia Tech und Emory sowie reale Produktionssysteme.'
            : 'A full-stack AI toolkit forged from enterprise deployments at Fortune 500 scale, academic research at Georgia Tech and Emory, and real production systems.'}
        </p>

        {/* Top skills bars */}
        <div ref={barsRef} className="reveal mb-16 bg-white rounded-2xl p-7 border border-[#E4E0D6] shadow-sm">
          <p className="text-xs font-mono uppercase tracking-[0.15em] text-[#8A9280] mb-6">{isDE ? 'Kernkompetenzen' : 'Core Proficiencies'}</p>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-5">
            {topSkills.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm font-semibold text-[#1A1A18]">{s.name}</span>
                  <span className="text-xs font-mono text-[#3DAA72]">{s.pct}%</span>
                </div>
                <div className="h-1.5 bg-[#F0EDE4] rounded-full overflow-hidden">
                  <div
                    className="bar-fill h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: '0%', background: 'linear-gradient(90deg, #1A3D2B, #3DAA72)' }}
                    data-pct={s.pct}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category tabs */}
        <div className="reveal mb-6 flex flex-wrap gap-2">
          {categories.map((c, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={active === i
                ? { background: c.color, color: '#fff', boxShadow: `0 4px 16px ${c.color}30` }
                : { background: c.bg, color: c.color, border: `1.5px solid ${c.color}20` }
              }
            >
              {isDE ? c.label.de : c.label.en}
            </button>
          ))}
        </div>

        {/* Active category tags */}
        <div className="reveal min-h-[120px] bg-white rounded-2xl p-6 border border-[#E4E0D6] shadow-sm">
          <div className="flex flex-wrap gap-2">
            {categories[active].items.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 cursor-default"
                style={{
                  background: categories[active].bg,
                  color: categories[active].color,
                  border: `1.5px solid ${categories[active].color}25`,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Marquee strip of all skills */}
        <div className="reveal mt-12 overflow-hidden">
          <div className="marquee-track gap-3">
            {[...categories.flatMap(c => c.items), ...categories.flatMap(c => c.items)].map((item, i) => (
              <span
                key={i}
                className="flex-shrink-0 px-3 py-1.5 bg-white border border-[#E4E0D6] rounded-full text-xs text-[#6E7A70] font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
