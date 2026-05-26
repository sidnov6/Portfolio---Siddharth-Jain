'use client'
import { useEffect, useRef } from 'react'
import { useLang } from '@/lib/language-context'
import { track } from '@/lib/track'
import {
  Factory, Building2, TrendingUp, Shield, Banknote, Bot, FileText,
  LineChart, Search, Scale, BookOpen, Briefcase, GraduationCap,
  Sparkles, ArrowRight, Mail, Linkedin, Quote,
} from 'lucide-react'
import { CandlestickChartSVG, DollarCoinSVG, OpenBookSVG, StockLineSVG } from '@/components/Decorations'

/* ─────────────────────────────────────────────────────────
   CEO QUOTES (paraphrased + attributed)
   ───────────────────────────────────────────────────────── */
const quotes = [
  {
    initials: 'JD',
    name: 'Jamie Dimon',
    role_en: 'CEO, JPMorgan Chase',
    role_de: 'CEO, JPMorgan Chase',
    quote_en: 'AI may prove to be as transformational as some of the major technological inventions of the past several hundred years — printing press, electricity, the internet.',
    quote_de: 'KI könnte sich als ebenso transformativ erweisen wie einige der wichtigsten technologischen Erfindungen der letzten Jahrhunderte — Buchdruck, Elektrizität, Internet.',
    source: 'Annual Letter, 2024',
    color: '#003F88', bg: '#E8EFF8',
  },
  {
    initials: 'JF',
    name: 'Jane Fraser',
    role_en: 'CEO, Citigroup',
    role_de: 'CEO, Citigroup',
    quote_en: 'GenAI will turn knowledge workers into super-knowledge workers. It will revolutionize financial services in the next decade.',
    quote_de: 'GenAI wird Wissensarbeiter zu Super-Wissensarbeitern machen und Finanzdienstleistungen im nächsten Jahrzehnt revolutionieren.',
    source: 'Citi GPS Report, 2024',
    color: '#0085CA', bg: '#E5F4FB',
  },
  {
    initials: 'LF',
    name: 'Larry Fink',
    role_en: 'CEO, BlackRock',
    role_de: 'CEO, BlackRock',
    quote_en: 'AI has the potential to transform every aspect of our business and the broader financial system — from research, to risk, to client service.',
    quote_de: 'KI hat das Potenzial, jeden Aspekt unseres Geschäfts und des Finanzsystems zu transformieren — von Research über Risiko bis Kundenservice.',
    source: 'Davos 2024',
    color: '#1A1A18', bg: '#F0EDE7',
  },
  {
    initials: 'TP',
    name: 'Ted Pick',
    role_en: 'CEO, Morgan Stanley',
    role_de: 'CEO, Morgan Stanley',
    quote_en: 'Wealth management may well be the most powerful AI use case in our industry. We are only scratching the surface.',
    quote_de: 'Vermögensverwaltung könnte der mächtigste KI-Anwendungsfall unserer Branche sein. Wir kratzen erst an der Oberfläche.',
    source: 'Q1 Earnings Call, 2024',
    color: '#C19A3D', bg: '#FAF3E2',
  },
]

/* ─────────────────────────────────────────────────────────
   MARKET OPPORTUNITY STATS
   ───────────────────────────────────────────────────────── */
const marketStats = [
  { n: '$15.7T', en: "AI's contribution to global GDP by 2030", de: 'KI-Beitrag zum globalen BIP bis 2030',     src: 'PwC, Sizing the Prize' },
  { n: '$340B',  en: 'Annual GenAI value potential in banking', de: 'Jährliches GenAI-Wertpotenzial im Banking', src: 'McKinsey GenAI Report' },
  { n: '$97B',   en: 'Financial-services AI spend by 2027',     de: 'KI-Ausgaben Finanzdienste bis 2027',         src: 'IDC, 2024' },
  { n: '95%',    en: 'Finance leaders deploying GenAI',         de: 'Finanzchefs mit GenAI-Einsatz',              src: 'Accenture / Citi GPS' },
]

/* ─────────────────────────────────────────────────────────
   AI USE CASES IN FINANCE
   ───────────────────────────────────────────────────────── */
const useCases = [
  { icon: LineChart,  name_en: 'Algorithmic Trading',  name_de: 'Algorithmischer Handel', body_en: 'ML-driven strategies, sentiment models, high-frequency signals',     body_de: 'ML-Strategien, Sentiment-Modelle, hochfrequente Signale',          color: '#003F88' },
  { icon: Shield,     name_en: 'Fraud Detection',      name_de: 'Betrugserkennung',        body_en: 'Real-time anomaly detection across millions of transactions',     body_de: 'Echtzeit-Anomalieerkennung über Millionen Transaktionen',          color: '#C03810' },
  { icon: Scale,      name_en: 'Credit Risk ML',       name_de: 'Kreditrisiko-ML',         body_en: 'Alt-data scoring beyond FICO — fairer, faster, more accurate',  body_de: 'Alt-Daten-Scoring jenseits FICO — fairer, schneller, präziser',     color: '#7A2B8B' },
  { icon: Bot,        name_en: 'Robo-Advisors',        name_de: 'Robo-Advisor',            body_en: 'Autonomous portfolio construction, rebalancing, tax loss harvest', body_de: 'Autonome Portfolio-Konstruktion, Rebalancing, Steueroptimierung', color: '#1A3D2B' },
  { icon: FileText,   name_en: 'Document AI',          name_de: 'Dokumenten-KI',           body_en: '10-Ks, prospectuses, contracts, ISDA agreements — at scale',     body_de: '10-Ks, Prospekte, Verträge, ISDA-Abkommen — in großem Maßstab',   color: '#0085CA' },
  { icon: Search,     name_en: 'Agentic Research',     name_de: 'Agentenbasierte Recherche', body_en: 'AI agents that read filings, news, and build investment theses',    body_de: 'KI-Agenten, die Berichte lesen und Investmentthesen erstellen',   color: '#3DAA72' },
  { icon: Banknote,   name_en: 'RegTech & Compliance', name_de: 'RegTech & Compliance',    body_en: 'AML, KYC, transaction monitoring — automated, auditable',         body_de: 'AML, KYC, Transaktions-Monitoring — automatisiert, prüfbar',       color: '#C19A3D' },
  { icon: TrendingUp, name_en: 'Earnings NLP',         name_de: 'NLP für Earnings',        body_en: 'Sentiment + tone analysis on earnings calls and shareholder letters', body_de: 'Sentiment- und Tonanalyse von Earnings-Calls',                color: '#1A1A18' },
]

/* ─────────────────────────────────────────────────────────
   CFA LEVEL 1 TOPICS (mapped to AI use cases)
   ───────────────────────────────────────────────────────── */
const cfaTopics = [
  { code: 'Ethics',  en: 'Ethical & Professional Standards', de: 'Ethik & Berufsstandards' },
  { code: 'Quant',   en: 'Quantitative Methods',              de: 'Quantitative Methoden' },
  { code: 'Econ',    en: 'Economics',                          de: 'Ökonomie' },
  { code: 'FSA',     en: 'Financial Statement Analysis',       de: 'Finanzanalyse' },
  { code: 'Corp',    en: 'Corporate Issuers',                  de: 'Unternehmensemittenten' },
  { code: 'Equity',  en: 'Equity Investments',                 de: 'Aktieninvestments' },
  { code: 'Fixed',   en: 'Fixed Income',                       de: 'Anleihen' },
  { code: 'Deriv',   en: 'Derivatives',                        de: 'Derivate' },
  { code: 'Alt',     en: 'Alternative Investments',            de: 'Alternative Investments' },
  { code: 'PM',      en: 'Portfolio Management',               de: 'Portfoliomanagement' },
]

/* ─────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────── */
export default function Pivot() {
  const ref = useRef<HTMLElement>(null)
  const { lang } = useLang()
  const isDE = lang === 'de'

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    )
    ref.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section
      id="pivot"
      ref={ref}
      className="relative py-28 px-6 bg-white overflow-hidden"
    >
      {/* Background subtle ticker pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent 0 60px, #003F88 60px 61px)',
          maskImage: 'linear-gradient(180deg, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(180deg, transparent, black 20%, black 80%, transparent)',
        }}
      />

      {/* Floating finance decorations */}
      <div className="pointer-events-none absolute hidden lg:block opacity-[0.10] float-slow" style={{ left: '40px', top: '120px' }}>
        <CandlestickChartSVG size={180} />
      </div>
      <div className="pointer-events-none absolute hidden lg:block opacity-[0.12] float-slow-2" style={{ right: '40px', top: '200px' }}>
        <DollarCoinSVG size={70} />
      </div>
      <div className="pointer-events-none absolute hidden lg:block opacity-[0.08] float-slow" style={{ left: '60px', bottom: '280px' }}>
        <OpenBookSVG size={140} color="#003F88" />
      </div>
      <div className="pointer-events-none absolute hidden lg:block opacity-[0.10]" style={{ right: '60px', bottom: '160px' }}>
        <StockLineSVG size={170} color="#003F88" />
      </div>
      <div className="pointer-events-none absolute hidden lg:block opacity-[0.14] float-slow-2" style={{ right: '120px', top: '60px' }}>
        <DollarCoinSVG size={50} />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* ── HEADER ─────────────────────────────────────── */}
        <p className="reveal text-xs font-mono uppercase tracking-[0.2em] text-[#3DAA72] mb-4">
          {isDE ? '07 / Der nächste Schritt' : '07 / The Next Chapter'}
        </p>
        <h2 className="reveal font-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-black text-[#1A1A18] mb-5 leading-[1.02] max-w-4xl">
          {isDE ? (
            <>Industrie war gestern.<br /><em className="text-[#003F88] font-display not-italic">Finance ist heute.</em></>
          ) : (
            <>Manufacturing was yesterday.<br /><em className="text-[#003F88] font-display not-italic">Finance is today.</em></>
          )}
        </h2>
        <p className="reveal text-[#6E7A70] text-lg max-w-2xl leading-relaxed mb-16">
          {isDE
            ? 'Ein Jahr Fertigungs-KI im CEO-Büro hat mir gezeigt, was KI im Großmaßstab leisten kann. Jetzt — zurück an der Frankfurt School — nehme ich dieses Playbook in eine 50-Billionen-Dollar-Industrie mit: Finance.'
            : 'One year of manufacturing AI at the CEO Office showed me what AI can do at scale. Now — back at Frankfurt School full-time — I am taking that playbook to a $50 trillion industry: finance.'}
        </p>

        {/* ── THE BRIDGE VISUAL ─────────────────────────── */}
        <BridgeVisual isDE={isDE} />

        {/* ── MARKET OPPORTUNITY STATS ──────────────────── */}
        <div className="reveal mt-20 mb-20">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#003F88] mb-4 text-center">
            {isDE ? 'Warum jetzt' : 'Why now'}
          </p>
          <h3 className="font-display text-3xl md:text-4xl font-black text-[#1A1A18] mb-10 text-center">
            {isDE
              ? <>Das Finanzwesen <em className="text-[#003F88]">braucht KI</em> — dringend.</>
              : <>Finance <em className="text-[#003F88]">needs AI</em> — urgently.</>}
          </h3>

          <div className="relative rounded-3xl bg-gradient-to-br from-[#0A1F3D] via-[#0F2B52] to-[#003F88] p-8 md:p-12 overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,63,136,0.45)]">
            {/* Background candles silhouette */}
            <CandlestickBackdrop />

            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8">
              {marketStats.map((s, i) => (
                <div key={i} className="relative">
                  <div className="font-display text-4xl md:text-6xl font-black text-white mb-2 tracking-tight leading-none">
                    <span className="bg-gradient-to-br from-[#FFD56B] to-[#C19A3D] bg-clip-text text-transparent">{s.n}</span>
                  </div>
                  <p className="text-[13px] text-white/85 font-medium leading-snug mb-2">{isDE ? s.de : s.en}</p>
                  <p className="text-[10px] font-mono text-white/45 tracking-wide">— {s.src}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CEO QUOTES ────────────────────────────────── */}
        <div className="mb-20">
          <p className="reveal text-[10px] font-mono uppercase tracking-[0.25em] text-[#003F88] mb-4 text-center">
            {isDE ? 'Was die Branche sagt' : 'What the industry says'}
          </p>
          <h3 className="reveal font-display text-3xl md:text-4xl font-black text-[#1A1A18] mb-10 text-center max-w-3xl mx-auto">
            {isDE
              ? <>Die einflussreichsten Stimmen <em className="text-[#003F88]">sind sich einig.</em></>
              : <>The most influential voices <em className="text-[#003F88]">are aligned.</em></>}
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            {quotes.map((q, i) => (
              <div
                key={q.name}
                className="reveal group relative bg-white border border-[#E4E0D6] rounded-2xl p-6 md:p-7 hover:border-[#003F88]/30 hover:shadow-xl transition-all duration-300"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <Quote
                  size={32}
                  className="absolute top-5 right-5 text-[#003F88]/10 group-hover:text-[#003F88]/20 transition-colors"
                />
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm tracking-wide"
                    style={{ background: q.bg, color: q.color }}
                  >
                    {q.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#1A1A18] text-sm leading-tight">{q.name}</p>
                    <p className="text-xs text-[#8A9280] font-mono mt-0.5">{isDE ? q.role_de : q.role_en}</p>
                  </div>
                </div>
                <p className="text-[#1A1A18] text-base leading-relaxed font-display italic mb-3">
                  &ldquo;{isDE ? q.quote_de : q.quote_en}&rdquo;
                </p>
                <p className="text-[10px] font-mono text-[#B0A898] tracking-wider uppercase">{q.source}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── AI × FINANCE USE CASES ────────────────────── */}
        <div className="mb-20">
          <p className="reveal text-[10px] font-mono uppercase tracking-[0.25em] text-[#003F88] mb-4 text-center">
            {isDE ? 'Was ich bauen möchte' : 'What I want to build'}
          </p>
          <h3 className="reveal font-display text-3xl md:text-4xl font-black text-[#1A1A18] mb-10 text-center max-w-3xl mx-auto">
            {isDE
              ? <>KI × Finance: die Anwendungsfälle, die mich <em className="text-[#003F88]">begeistern.</em></>
              : <>AI × Finance: the use cases I am <em className="text-[#003F88]">excited</em> about.</>}
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {useCases.map((u, i) => {
              const Icon = u.icon
              return (
                <div
                  key={u.name_en}
                  className="reveal group bg-white border border-[#E4E0D6] rounded-2xl p-5 hover:border-[#003F88]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  style={{ transitionDelay: `${(i % 4) * 60}ms` }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                    style={{ background: `${u.color}15` }}
                  >
                    <Icon size={20} style={{ color: u.color }} />
                  </div>
                  <p className="font-bold text-[#1A1A18] text-sm mb-1 leading-tight">{isDE ? u.name_de : u.name_en}</p>
                  <p className="text-[11px] text-[#6E7A70] leading-snug">{isDE ? u.body_de : u.body_en}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── THE BRIDGE: CFA + TECH = UNIQUE ───────────── */}
        <div className="mb-20">
          <p className="reveal text-[10px] font-mono uppercase tracking-[0.25em] text-[#003F88] mb-4 text-center">
            {isDE ? 'Die Brücke schlagen' : 'Bridging the gap'}
          </p>
          <h3 className="reveal font-display text-3xl md:text-4xl font-black text-[#1A1A18] mb-3 text-center max-w-3xl mx-auto">
            {isDE
              ? <>Technische Tiefe trifft auf <em className="text-[#003F88]">Finanz-Fluenz.</em></>
              : <>Technical depth meets <em className="text-[#003F88]">finance fluency.</em></>}
          </h3>
          <p className="reveal text-center text-[#6E7A70] text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            {isDE
              ? 'Um die richtigen KI-Agenten für Finance zu bauen, muss man die Sprache des Geldes sprechen. Deshalb lerne ich nicht nur weiter — ich verfolge auch CFA Level 1.'
              : 'To build the right AI agents for finance, you need to speak the language of money. So I am not just leveling up technically — I am pursuing the CFA Level 1.'}
          </p>

          <div className="reveal grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
            {/* LEFT: CFA Level 1 */}
            <div className="bg-gradient-to-br from-[#0A1F3D] to-[#003F88] rounded-2xl p-7 text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD56B] rounded-full blur-3xl opacity-10" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap size={18} className="text-[#FFD56B]" />
                  <p className="text-[10px] font-mono tracking-[0.25em] text-[#FFD56B]">CFA · LEVEL 1 · {isDE ? 'IN VORBEREITUNG' : 'PURSUING'}</p>
                </div>
                <h4 className="font-display text-2xl font-black mb-1">{isDE ? 'Aktuell am Lernen' : 'Currently studying'}</h4>
                <p className="text-white/60 text-xs font-mono mb-5">{isDE ? 'Prüfung 2026 · noch nicht bestanden' : '2026 sitting · not yet cleared'}</p>

                <div className="grid grid-cols-2 gap-1.5">
                  {cfaTopics.map((t, i) => (
                    <div
                      key={t.code}
                      className="text-[10px] py-1.5 px-2.5 rounded-md bg-white/8 border border-white/10 text-white/85 font-mono"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      {t.code}
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-white/10">
                  <div className="flex justify-between text-[10px] font-mono text-white/60 mb-1.5">
                    <span>{isDE ? 'Lernfortschritt' : 'Study progress'}</span>
                    <span className="text-[#FFD56B]">35%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#FFD56B] to-[#C19A3D]" style={{ width: '35%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* CENTER: PLUS sign */}
            <div className="flex md:flex-col items-center justify-center gap-3 py-2">
              <div className="font-display text-5xl font-black text-[#003F88]/30">+</div>
              <div className="hidden md:block h-px w-12 bg-[#003F88]/20" />
            </div>

            {/* RIGHT: Technical AI Stack */}
            <div className="bg-gradient-to-br from-[#0F2A1C] to-[#1A3D2B] rounded-2xl p-7 text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3DAA72] rounded-full blur-3xl opacity-10" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={18} className="text-[#3DAA72]" />
                  <p className="text-[10px] font-mono tracking-[0.25em] text-[#3DAA72]">AI ENGINEERING · LEVELING UP</p>
                </div>
                <h4 className="font-display text-2xl font-black mb-1">{isDE ? 'Tiefer im Stack' : 'Deeper in the stack'}</h4>
                <p className="text-white/60 text-xs font-mono mb-5">{isDE ? 'Agentic + RAG-Systeme' : 'Agentic + RAG systems'}</p>

                <div className="grid grid-cols-2 gap-1.5">
                  {['LangGraph', 'Agentic AI', 'RAG', 'Vector DBs', 'MCP', 'LLM Eval', 'FastAPI', 'Streaming', 'PyTorch', 'Quant ML'].map((t) => (
                    <div
                      key={t}
                      className="text-[10px] py-1.5 px-2.5 rounded-md bg-white/8 border border-white/10 text-white/85 font-mono"
                    >
                      {t}
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-white/10">
                  <div className="flex justify-between text-[10px] font-mono text-white/60 mb-1.5">
                    <span>{isDE ? 'Tägliches Bauen' : 'Daily building'}</span>
                    <span className="text-[#3DAA72]">{isDE ? 'AKTIV' : 'ACTIVE'}</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#3DAA72] to-[#1A3D2B] animate-pulse" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Equals: the result */}
          <div className="reveal mt-8 text-center">
            <div className="inline-flex items-center gap-4 px-6 py-4 rounded-full bg-white border-2 border-[#003F88]/15 shadow-lg">
              <span className="font-display text-3xl font-black text-[#003F88]/30">=</span>
              <p className="font-display text-lg md:text-xl font-black text-[#1A1A18]">
                {isDE
                  ? 'KI-Agenten, die Finance wirklich verstehen.'
                  : 'AI agents that actually understand finance.'}
              </p>
            </div>
          </div>
        </div>

        {/* ── LOOKING FOR / CALL TO ACTION ──────────────── */}
        <div className="reveal">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#1A1A18] via-[#0F1A24] to-[#0A1F3D] p-8 md:p-12 text-white overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#FFD56B] blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#3DAA72] blur-3xl" />
            </div>

            <div className="relative grid md:grid-cols-2 gap-10 items-start">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#FFD56B] mb-4">
                  {isDE ? 'Wie du helfen kannst' : 'How you can help'}
                </p>
                <h3 className="font-display text-3xl md:text-4xl font-black leading-[1.05] mb-5">
                  {isDE
                    ? <>Ich suche Menschen,<br /><em className="text-[#FFD56B] not-italic font-display">die diesen Sprung mit mir wagen.</em></>
                    : <>I&rsquo;m looking for people who<br /><em className="text-[#FFD56B] not-italic font-display">want to take this leap with me.</em></>}
                </h3>
                <p className="text-white/70 text-base leading-relaxed">
                  {isDE
                    ? 'Wenn du in Finance + KI baust, einstellst, mentorierst — oder einfach jemanden kennst, der das tut — schreib mir.'
                    : 'If you build, hire, mentor, or invest in Finance + AI — or know someone who does — please reach out.'}
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { icon: Briefcase, en: 'Roles in fintech, quant, or bank AI teams', de: 'Rollen in Fintech, Quant oder Bank-KI-Teams' },
                  { icon: BookOpen,  en: 'Mentors with finance + ML backgrounds',     de: 'Mentoren mit Finance- und ML-Hintergrund' },
                  { icon: Sparkles,  en: 'Collaborators on agentic finance projects', de: 'Mitstreiter für agentenbasierte Finance-Projekte' },
                  { icon: Building2, en: 'Intros to teams shipping AI in production', de: 'Kontakte zu Teams, die KI in Produktion bringen' },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 hover:border-[#FFD56B]/30 transition-all group">
                      <div className="w-9 h-9 rounded-lg bg-[#FFD56B]/15 flex items-center justify-center group-hover:bg-[#FFD56B]/25 transition-colors">
                        <Icon size={16} className="text-[#FFD56B]" />
                      </div>
                      <p className="text-sm text-white/90 flex-1">{isDE ? item.de : item.en}</p>
                      <ArrowRight size={14} className="text-white/30 group-hover:text-[#FFD56B] group-hover:translate-x-1 transition-all" />
                    </div>
                  )
                })}

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <a
                    href="mailto:sidnov6@gmail.com"
                    onClick={() => track('click', { link: 'pivot_email' })}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FFD56B] text-[#1A1A18] font-bold text-sm hover:bg-[#FFE08C] transition-colors"
                  >
                    <Mail size={16} />
                    {isDE ? 'E-Mail schreiben' : 'Send an email'}
                  </a>
                  <a
                    href="https://www.linkedin.com/in/siddharth-jain-b33394219/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('click', { link: 'pivot_linkedin' })}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 text-white font-bold text-sm border border-white/15 hover:bg-white/15 transition-colors"
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────
   BRIDGE VISUAL — Manufacturing → Finance
   ───────────────────────────────────────────────────────── */
function BridgeVisual({ isDE }: { isDE: boolean }) {
  return (
    <div className="reveal relative rounded-3xl border border-[#E4E0D6] bg-gradient-to-b from-[#FBFAF6] to-white shadow-[0_30px_80px_-30px_rgba(0,63,136,0.18)] p-6 md:p-10 overflow-hidden">
      {/* SVG: live data feel — ticker chart in the background */}
      <svg
        viewBox="0 0 1200 320"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]"
      >
        <path
          d="M 0 240 L 60 220 L 120 230 L 180 200 L 240 215 L 300 185 L 360 195 L 420 160 L 480 175 L 540 140 L 600 155 L 660 110 L 720 130 L 780 90 L 840 105 L 900 70 L 960 85 L 1020 50 L 1080 65 L 1140 35 L 1200 50"
          stroke="#003F88"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M 0 240 L 60 220 L 120 230 L 180 200 L 240 215 L 300 185 L 360 195 L 420 160 L 480 175 L 540 140 L 600 155 L 660 110 L 720 130 L 780 90 L 840 105 L 900 70 L 960 85 L 1020 50 L 1080 65 L 1140 35 L 1200 50 L 1200 320 L 0 320 Z"
          fill="#003F88"
          opacity="0.5"
        />
      </svg>

      <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-3 items-center">
        {/* ── LEFT: MANUFACTURING (where I've been) ── */}
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#1A3D2B]">{isDE ? 'Jun 2025 — Jun 2026' : 'Jun 2025 — Jun 2026'}</span>
            <span className="h-px flex-1 bg-[#1A3D2B]/15" />
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#E8F5EE] to-white border border-[#1A3D2B]/15 p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#1A3D2B] flex items-center justify-center flex-shrink-0">
                <Factory size={20} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#3DAA72] mb-0.5">{isDE ? 'Vergangenheit' : 'Yesterday'}</p>
                <h3 className="font-display text-xl md:text-2xl font-black text-[#1A1A18] leading-tight">
                  {isDE ? 'Industrie-KI' : 'Manufacturing AI'}
                </h3>
                <p className="text-xs text-[#6E7A70] font-mono mt-0.5">Suzlon Energy · CEO Office</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="text-center p-2 rounded-lg bg-white border border-[#E4E0D6]">
                <div className="font-display text-base font-black text-[#1A3D2B]">14</div>
                <div className="text-[9px] text-[#8A9280] font-mono">{isDE ? 'Dashboards' : 'dashboards'}</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-white border border-[#E4E0D6]">
                <div className="font-display text-base font-black text-[#1A3D2B]">10</div>
                <div className="text-[9px] text-[#8A9280] font-mono">{isDE ? 'Werke' : 'plants'}</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-white border border-[#E4E0D6]">
                <div className="font-display text-base font-black text-[#1A3D2B]">300+</div>
                <div className="text-[9px] text-[#8A9280] font-mono">{isDE ? 'Nutzer' : 'users'}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['SAP', 'Spark', 'Power BI', 'GenAI'].map(t => (
                <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#1A3D2B]/8 text-[#1A3D2B]">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── CENTER: ANIMATED BRIDGE ── */}
        <div className="flex flex-col items-center justify-center px-2 md:px-4 py-4 md:py-0">
          <p className="text-[9px] font-mono tracking-[0.3em] text-[#8A9280] mb-3">{isDE ? 'DER SPRUNG' : 'THE LEAP'}</p>

          {/* Bridge SVG with animated particles */}
          <div className="relative w-full md:w-[120px]">
            <svg viewBox="0 0 120 80" className="w-full h-20 md:h-20" preserveAspectRatio="none">
              <defs>
                <linearGradient id="bridgeGrad" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%"  stopColor="#1A3D2B" />
                  <stop offset="50%" stopColor="#003F88" />
                  <stop offset="100%" stopColor="#C19A3D" />
                </linearGradient>
                <filter id="bridgeGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="2" />
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path d="M 5 40 Q 60 5, 115 40" stroke="url(#bridgeGrad)" strokeWidth="2.5" fill="none" />
              {/* Particles flowing along the bridge */}
              {[0, 0.8, 1.6, 2.4].map((delay) => (
                <circle key={delay} r="3" fill="#FFD56B" filter="url(#bridgeGlow)" opacity="0">
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.15;0.85;1"
                    dur="3.2s"
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                  />
                  <animateMotion
                    dur="3.2s"
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                    path="M 5 40 Q 60 5, 115 40"
                  />
                </circle>
              ))}
            </svg>
            <p className="text-[10px] text-center font-mono text-[#003F88] mt-1">{isDE ? '2026 →' : '2026 →'}</p>
          </div>
        </div>

        {/* ── RIGHT: FINANCE (where I'm going) ── */}
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-px flex-1 bg-[#003F88]/15" />
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#003F88]">{isDE ? '2026 →' : '2026 →'}</span>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#E8EFF8] to-white border border-[#003F88]/20 p-5 relative overflow-hidden">
            {/* Decorative ticker dots */}
            <div className="absolute top-3 right-3 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C03810] animate-pulse" />
              <span className="text-[8px] font-mono text-[#C03810]">LIVE</span>
            </div>

            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#003F88] to-[#0A1F3D] flex items-center justify-center flex-shrink-0 shadow-lg">
                <Building2 size={20} className="text-[#FFD56B]" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#003F88] mb-0.5">{isDE ? 'Heute' : 'Today'}</p>
                <h3 className="font-display text-xl md:text-2xl font-black text-[#1A1A18] leading-tight">
                  {isDE ? 'Finance-KI' : 'Finance AI'}
                </h3>
                <p className="text-xs text-[#6E7A70] font-mono mt-0.5">{isDE ? 'Quant · Fintech · Bank-KI' : 'Quant · Fintech · Bank AI'}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="text-center p-2 rounded-lg bg-white border border-[#E4E0D6]">
                <div className="font-display text-base font-black text-[#003F88]">$50T+</div>
                <div className="text-[9px] text-[#8A9280] font-mono">{isDE ? 'Branche' : 'industry'}</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-white border border-[#E4E0D6]">
                <div className="font-display text-base font-black text-[#003F88]">CFA</div>
                <div className="text-[9px] text-[#8A9280] font-mono">{isDE ? 'L1 — laufend' : 'L1 — pursuing'}</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-white border border-[#E4E0D6]">
                <div className="font-display text-base font-black text-[#003F88]">∞</div>
                <div className="text-[9px] text-[#8A9280] font-mono">{isDE ? 'Potenzial' : 'potential'}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['Agentic AI', 'Quant ML', 'RAG', 'CFA'].map(t => (
                <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#003F88]/8 text-[#003F88]">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   CANDLESTICK BACKDROP — Trading aesthetic
   ───────────────────────────────────────────────────────── */
function CandlestickBackdrop() {
  const candles = Array.from({ length: 30 }, (_, i) => {
    const seed = i * 7919 // deterministic
    const high = 30 + ((seed * 13) % 80)
    const low  = 130 + ((seed * 17) % 60)
    const open = high + 10 + ((seed * 11) % 50)
    const close = low  - 10 - ((seed * 19) % 50)
    const isGreen = (seed * 23) % 2 === 0
    return { x: i * 42 + 20, high, low, open, close, isGreen }
  })

  return (
    <svg
      viewBox="0 0 1280 200"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.08]"
    >
      {candles.map((c, i) => (
        <g key={i}>
          <line x1={c.x} x2={c.x} y1={c.high} y2={c.low} stroke="#FFD56B" strokeWidth="1" />
          <rect
            x={c.x - 8}
            y={Math.min(c.open, c.close)}
            width="16"
            height={Math.abs(c.open - c.close)}
            fill={c.isGreen ? '#3DAA72' : '#FFD56B'}
          />
        </g>
      ))}
    </svg>
  )
}
