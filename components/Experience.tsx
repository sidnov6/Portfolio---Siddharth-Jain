'use client'
import { useEffect, useRef, useState } from 'react'
import { Building2, FlaskConical, Shield, Wifi, ChevronDown, ExternalLink } from 'lucide-react'

const experiences = [
  {
    id: 0,
    company: 'Suzlon Energy Limited',
    role: 'AI Engineer — CEO Office (Manufacturing AI & Digitisation)',
    period: 'Jun 2025 – Jun 2026',
    location: 'Pune, India 🇮🇳',
    type: 'Full-time',
    color: '#00d4ff',
    icon: Building2,
    logo: '⚡',
    headline: 'Led enterprise AI transformation across 10 manufacturing plants, generating $4.8M in cost savings.',
    highlights: [
      'Worked directly under CEO Office for manufacturing AI & digitisation across Asia and Europe',
      'Designed and built enterprise data pipelines integrating 50+ operational sources into a unified analytics ecosystem',
      'Deployed 14 enterprise dashboards and 7 AI/GenAI chatbots covering 250+ manufacturing KPIs',
      'Led analytics for 300+ business users across Safety, Quality, Productivity, Delivery, and Cost domains',
      'Implemented predictive quality analytics across 40 production lines, reducing downtime and improving yield',
      'Contributed to ~$3M annualized savings through process optimization and automation',
      'Coordinated BRC operations with 23 cross-functional stakeholders, totalling ~$4.8M in cost savings',
      'Enabled self-service analytics adoption across 7 operational domains',
      'Coordinated with 20+ senior stakeholders and CXO leadership on AI roadmap',
    ],
    tags: ['GenAI', 'Data Engineering', 'Power BI', 'LangChain', 'Manufacturing Analytics', 'Enterprise AI', 'Stakeholder Management'],
  },
  {
    id: 1,
    company: 'Georgia Institute of Technology',
    role: 'Cybersecurity Summer Intern',
    period: 'May 2024 – Aug 2024',
    location: 'Atlanta, USA 🇺🇸',
    type: 'Internship',
    color: '#f59e0b',
    icon: Shield,
    logo: '🛡️',
    headline: 'Selected from 1000+ applicants to work on healthcare cybersecurity and interoperability at Georgia Tech.',
    highlights: [
      'Selected from ~1000 applicants for this competitive research internship',
      'Worked under Matt Sanders (Director of Research Computing and Data) at Georgia Tech',
      'Contributed to healthcare cybersecurity research bridging legacy hospital systems with cloud EHR platforms',
      'Developed core components of a cybersecurity middleware platform for patient data pipelines',
      'Solved 50+ critical integration and interoperability failures across healthcare systems',
      'Enabled production-ready data exchange between legacy and modern healthcare technologies',
      'Presented findings and technical insights to senior researchers and technical stakeholders',
    ],
    tags: ['Cybersecurity', 'Healthcare Systems', 'Middleware', 'Distributed Systems', 'Cloud Integration', 'Interoperability'],
  },
  {
    id: 2,
    company: 'Emory University / Georgia Tech',
    role: 'AI Research Intern — Medical Imaging',
    period: 'Jan 2024 – Sep 2024',
    location: 'Atlanta, USA 🇺🇸',
    type: 'Research',
    color: '#00ff88',
    icon: FlaskConical,
    logo: '🧬',
    headline: 'Built deep learning pipeline achieving 94% accuracy for CT scan sarcopenia assessment under Dr. Rakesh Shiradkar.',
    highlights: [
      'Conducted AI research under Dr. Rakesh Shiradkar at Emory on medical imaging for sarcopenia assessment',
      'Built automated deep learning pipeline for CT scan analysis and muscle degradation assessment',
      'Developed CV models capable of processing 1000+ CT scans with 94% prediction accuracy',
      'Achieved ~1mm human-level precision in automated muscle segmentation',
      'Reduced scan analysis time from ~10 minutes manually to under 1 second using AI inference',
      'Automated previously manual radiological workflows with deployable production AI systems',
      'Contributed to translational AI research with direct clinical application potential',
    ],
    tags: ['Deep Learning', 'Medical Imaging', 'Computer Vision', 'PyTorch', 'CT Scan Analysis', 'Healthcare AI'],
  },
  {
    id: 3,
    company: 'IIT Jammu',
    role: 'Research Intern — 5G & Network Security',
    period: 'Oct 2023 – Dec 2023',
    location: 'Jammu, India 🇮🇳',
    type: 'Research',
    color: '#a855f7',
    icon: Wifi,
    logo: '📡',
    headline: 'Improved network throughput by 19% under peak loads via containerized IDS/IPS deployment for 5G security.',
    highlights: [
      'Conducted research under Dr. Samaresh Bera in 5G security and network infrastructure',
      'Worked on containerized IDS/IPS deployment architectures for secure traffic routing in 5G networks',
      'Focused on high-reliability and low-latency network security constraints for telecom environments',
      'Improved network throughput by 19% under peak loads through optimization and deployment analysis',
      'Analyzed performance of security systems under varying network loads and traffic conditions',
      'Gained deep exposure to 5G architecture, IDS/IPS systems, and containerized deployments',
    ],
    tags: ['5G Security', 'IDS/IPS', 'Docker', 'Network Security', 'Telecom', 'Performance Optimization'],
  },
]

function ExperienceCard({ exp, isOpen, onToggle }: { exp: typeof experiences[0]; isOpen: boolean; onToggle: () => void }) {
  const Icon = exp.icon
  return (
    <div className="relative">
      {/* Timeline dot */}
      <div
        className="absolute left-0 top-8 w-4 h-4 rounded-full border-2 z-10 -translate-x-1/2 transition-all"
        style={{
          background: isOpen ? exp.color : '#030712',
          borderColor: exp.color,
          boxShadow: isOpen ? `0 0 12px ${exp.color}60` : 'none',
        }}
      />

      <div
        className={`ml-8 bg-[#0d1117] border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer card-hover ${
          isOpen ? 'border-opacity-50' : 'border-[#21262d] hover:border-opacity-30'
        }`}
        style={{ borderColor: isOpen ? exp.color : undefined }}
        onClick={onToggle}
      >
        {/* Header */}
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: `${exp.color}10`, border: `1px solid ${exp.color}30` }}
              >
                {exp.logo}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded-full"
                    style={{ background: `${exp.color}15`, color: exp.color }}
                  >
                    {exp.type}
                  </span>
                  <span className="text-xs text-gray-600 font-mono">{exp.period}</span>
                  <span className="text-xs text-gray-600">{exp.location}</span>
                </div>
                <h3 className="text-white font-bold text-base sm:text-lg leading-tight">{exp.role}</h3>
                <p className="text-gray-400 text-sm mt-0.5">{exp.company}</p>
              </div>
            </div>
            <ChevronDown
              size={18}
              className={`text-gray-500 flex-shrink-0 transition-transform duration-300 mt-1 ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>

          <p className="text-gray-400 text-sm mt-4 leading-relaxed">{exp.headline}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {exp.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 bg-[#030712] border border-[#21262d] rounded-full text-gray-500">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Expanded details */}
        {isOpen && (
          <div className="px-5 sm:px-6 pb-6 pt-0 border-t border-[#21262d]">
            <h4 className="text-xs text-gray-600 font-mono mt-5 mb-3">// key contributions</h4>
            <ul className="space-y-2.5">
              {exp.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: exp.color }} />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const [openId, setOpenId] = useState<number | null>(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.section-fade').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-[#ff6b35]/3 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="section-fade mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#00d4ff]" />
            <span className="text-[#00d4ff] font-mono text-sm">03. experience</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Where I've <span className="gradient-text">Built Things</span>
          </h2>
          <p className="text-gray-400 text-lg">
            From CEO-level AI strategy at a Fortune 500 to cutting-edge research at Georgia Tech and Emory.
          </p>
        </div>

        {/* Timeline */}
        <div className="section-fade relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-8 bottom-8 w-px timeline-line" />

          <div className="space-y-6">
            {experiences.map((exp) => (
              <ExperienceCard
                key={exp.id}
                exp={exp}
                isOpen={openId === exp.id}
                onToggle={() => setOpenId(openId === exp.id ? null : exp.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
