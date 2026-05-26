'use client'
import { useEffect, useRef } from 'react'
import { useLang } from '@/lib/language-context'

const photos = [
  { src: '/beyond/IMG_5397.jpg',   caption: 'Georgia Tech, Atlanta',    caption_de: 'Georgia Tech, Atlanta',      span: 'col-span-1 row-span-2' },
  { src: '/beyond/IMG_0952.jpg',   caption: 'with the squad',           caption_de: 'mit Freunden',               span: 'col-span-1' },
  { src: '/beyond/IMG_9023.jpg',   caption: 'good times',               caption_de: 'gute Zeiten',                span: 'col-span-1' },
  { src: '/beyond/IMG_0242.jpg',   caption: 'Kashmir, India',           caption_de: 'Kaschmir, Indien',           span: 'col-span-1' },
  { src: '/beyond/IMG_0401.jpg',   caption: 'exploring the city',       caption_de: 'die Stadt erkunden',         span: 'col-span-1' },
  { src: '/beyond/D7C0B623-1A94-4E4A-8AD9-5E481D34C990.JPG', caption: 'adventure mode', caption_de: 'Abenteuermodus', span: 'col-span-1' },
  { src: '/beyond/80a06d6b-6acb-470c-907c-448b1f0aa6ae.JPG', caption: 'family first',   caption_de: 'Familie zuerst',  span: 'col-span-1' },
  { src: '/beyond/IMG_1008.jpg',   caption: 'somewhere in the world',   caption_de: 'irgendwo auf der Welt',      span: 'col-span-1' },
]

function JsonBlock({ lang }: { lang: 'en' | 'de' }) {
  const isDE = lang === 'de'
  const C = ({ c, children }: { c: string; children: React.ReactNode }) => (
    <span style={{ color: c }}>{children}</span>
  )
  return (
    <div className="rounded-2xl overflow-hidden border border-[#E4E0D6] shadow-md h-full">
      {/* Editor titlebar */}
      <div className="bg-[#1E1E1E] px-4 py-2.5 flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
        <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        <span className="ml-3 text-[#6E7A70] text-xs font-mono">siddharth.json</span>
      </div>
      {/* Code */}
      <div className="bg-[#1A1A1A] p-4 sm:p-5 font-mono text-[10px] sm:text-[12px] leading-relaxed overflow-x-auto">
        <div><C c="#ABB2BF">{'{'}</C></div>
        <div className="pl-4"><C c="#E06C75">"name"</C><C c="#ABB2BF">: </C><C c="#98C379">"Siddharth Jain"</C><C c="#ABB2BF">,</C></div>
        <div className="pl-4"><C c="#E06C75">"age"</C><C c="#ABB2BF">: </C><C c="#D19A66">22</C><C c="#ABB2BF">,</C></div>
        <div className="pl-4"><C c="#E06C75">"{isDE ? 'standort' : 'location'}"</C><C c="#ABB2BF">: </C><C c="#98C379">"Frankfurt, {isDE ? 'Deutschland' : 'Germany'}"</C><C c="#ABB2BF">,</C></div>
        <div className="pl-4"><C c="#E06C75">"{isDE ? 'rolle' : 'role'}"</C><C c="#ABB2BF">: </C><C c="#98C379">"{isDE ? 'Full-Stack-KI-Ingenieur' : 'Full Stack AI Engineer'}"</C><C c="#ABB2BF">,</C></div>
        <div className="pl-4 mt-1"><C c="#E06C75">"{isDE ? 'aktuell' : 'currently'}"</C><C c="#ABB2BF">: {'{'}</C></div>
        <div className="pl-8"><C c="#E06C75">"{isDE ? 'studium' : 'studying'}"</C><C c="#ABB2BF">: </C><C c="#98C379">"MSc AI @ Frankfurt School"</C><C c="#ABB2BF">,</C></div>
        <div className="pl-8"><C c="#E06C75">"{isDE ? 'offen_fuer' : 'open_to'}"</C><C c="#ABB2BF">: </C><C c="#98C379">"{isDE ? 'neue Stellen' : 'new opportunities'}"</C></div>
        <div className="pl-4"><C c="#ABB2BF">{'}'}<C c="#ABB2BF">,</C></C></div>
        <div className="pl-4 mt-1"><C c="#E06C75">"impact"</C><C c="#ABB2BF">: {'{'}</C></div>
        <div className="pl-8"><C c="#E06C75">"{isDE ? 'kosteneinsparungen' : 'cost_savings'}"</C><C c="#ABB2BF">: </C><C c="#D19A66">"$4.8M"</C><C c="#ABB2BF">,</C></div>
        <div className="pl-8"><C c="#E06C75">"{isDE ? 'unternehmensnutzer' : 'enterprise_users'}"</C><C c="#ABB2BF">: </C><C c="#D19A66">300</C><C c="#ABB2BF">,</C></div>
        <div className="pl-8"><C c="#E06C75">"{isDE ? 'werke_skaliert' : 'plants_scaled'}"</C><C c="#ABB2BF">: </C><C c="#D19A66">10</C><C c="#ABB2BF">,</C></div>
        <div className="pl-8"><C c="#E06C75">"{isDE ? 'chatbots' : 'chatbots_shipped'}"</C><C c="#ABB2BF">: </C><C c="#D19A66">7</C></div>
        <div className="pl-4"><C c="#ABB2BF">{'}'}<C c="#ABB2BF">,</C></C></div>
        <div className="pl-4 mt-1"><C c="#E06C75">"{isDE ? 'erfahrung' : 'experience'}"</C><C c="#ABB2BF">: [</C></div>
        {[
          '"Suzlon Energy (AI Eng)"',
          '"Georgia Tech (Cybersec)"',
          '"Emory Univ. (Medical AI)"',
          '"IIT Jammu (5G Research)"',
        ].map((item, i, arr) => (
          <div key={i} className="pl-8"><C c="#98C379">{item}</C>{i < arr.length - 1 && <C c="#ABB2BF">,</C>}</div>
        ))}
        <div className="pl-4"><C c="#ABB2BF">],</C></div>
        <div className="pl-4 mt-1"><C c="#E06C75">"{isDE ? 'interessen' : 'interests'}"</C><C c="#ABB2BF">: [</C></div>
        <div className="pl-8">
          {['"basketball"', '"geopolitics"', '"MUFC"', '"debate"'].map((t, i, arr) => (
            <span key={i}><C c="#98C379">{t}</C>{i < arr.length - 1 && <C c="#ABB2BF">, </C>}</span>
          ))}
        </div>
        <div className="pl-4"><C c="#ABB2BF">],</C></div>
        <div className="pl-4 mt-1"><C c="#E06C75">"status"</C><C c="#ABB2BF">: </C><C c="#98C379">"{isDE ? 'offen_fuer_stellen' : 'open_to_opportunities'}"</C></div>
        <div><C c="#ABB2BF">{'}'}</C></div>
      </div>
    </div>
  )
}

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const { lang } = useLang()
  const isDE = lang === 'de'

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.15 }
    )
    ref.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="about" ref={ref} className="py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Top 2-col grid: text left, JSON right */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">

          {/* Left — editorial intro */}
          <div>
            <p className="reveal text-xs font-mono uppercase tracking-[0.2em] text-[#3DAA72] mb-5">
              {isDE ? '01 / Über mich' : '01 / About'}
            </p>
            <h2 className="reveal reveal-d1 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-black leading-[1.05] text-[#1A1A18] mb-6">
              {isDE ? <>Mehr als ein<br /><em className="text-[#1A3D2B]">Lebenslauf.</em></> : <>More than a<br /><em className="text-[#1A3D2B]">resume.</em></>}
            </h2>
            <p className="reveal reveal-d2 text-[#6E7A70] text-lg leading-relaxed mb-5">
              {isDE
                ? 'Ich bin Full-Stack-KI-Ingenieur und habe KI-Transformationen auf CEO-Ebene geleitet, medizinische Bildgebungsforschung an der Emory University durchgeführt und Cybersecurity-Projekte am Georgia Tech umgesetzt — alles noch vor Abschluss meines Masterstudiums.'
                : "I'm a Full Stack AI Engineer who's led enterprise AI transformation at CEO level, conducted medical imaging research at Emory, and done cybersecurity work at Georgia Tech — all before finishing my master's degree."}
            </p>
            <p className="reveal reveal-d3 text-[#6E7A70] text-lg leading-relaxed mb-8">
              {isDE
                ? 'Abseits des Bildschirms bin ich nationaler Basketballspieler, leidenschaftlicher Geopolitik-Analyst, aktiver Debattierer und überzeugter Manchester-United-Fan. Die besten Ingenieure sind neugierig auf alles — nicht nur auf Code.'
                : "Off the screen, I'm a national-level basketball player, a geopolitics obsessive, an active debater, and a die-hard Manchester United supporter. I think the best engineers are curious about everything — not just code."}
            </p>

            {/* Stat row */}
            <div className="reveal reveal-d4 flex flex-wrap gap-6">
              {[
                { n: '22', en: 'Years old',             de: 'Jahre alt' },
                { n: '3',  en: 'Countries',              de: 'Länder' },
                { n: '7',  en: 'GenAI chatbots shipped', de: 'GenAI-Chatbots entwickelt' },
              ].map(s => (
                <div key={s.en}>
                  <div className="font-display text-3xl font-black text-[#1A3D2B]">{s.n}</div>
                  <div className="text-xs text-[#8A9280] font-medium mt-0.5">{isDE ? s.de : s.en}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — JSON code block */}
          <div className="reveal-right">
            <JsonBlock lang={lang} />
          </div>
        </div>

        {/* Photo collage — full width */}
        <div className="reveal">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#3DAA72] mb-6">
            {isDE ? 'Das Leben in Bildern' : 'Life in frames'}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {photos.map((p, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-xl bg-[#F0EDE7] ${
                  i === 0 ? 'sm:row-span-2' : ''
                }`}
                style={{ aspectRatio: i === 0 ? 'unset' : '4/3' }}
              >
                <img
                  src={p.src}
                  alt={p.caption}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  style={{ minHeight: i === 0 ? '100%' : undefined }}
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="absolute bottom-2 left-2 right-2 text-white text-[10px] font-mono text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
                  {isDE ? p.caption_de : p.caption}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
