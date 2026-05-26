'use client'
import { useState } from 'react'
import { LanguageProvider, useLang } from '@/lib/language-context'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Journey from '@/components/Journey'
import Skills from '@/components/Skills'
import Capability from '@/components/Capability'
import Projects from '@/components/Projects'
import Education from '@/components/Education'
import BeyondCode from '@/components/BeyondCode'
import Pivot from '@/components/Pivot'
import BlogPreview from '@/components/BlogPreview'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'
import { MessageCircle } from 'lucide-react'

function PageContent() {
  const [chatOpen, setChatOpen] = useState(false)
  const { lang } = useLang()
  return (
    <main className="bg-[#F8F5EE]">
      <Navbar onChatOpen={() => setChatOpen(true)} />
      <Hero />
      <About />
      <Journey />
      <Skills />
      <Capability />
      <Projects />
      <Education />
      <BeyondCode />
      <Pivot />
      <BlogPreview />
      <Contact />
      <Footer />

      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#1A3D2B] text-white font-semibold text-sm shadow-xl hover:bg-[#2D7A52] hover:-translate-y-0.5 transition-all duration-200 group"
          style={{ boxShadow: '0 8px 32px rgba(26,61,43,0.35)' }}
        >
          <MessageCircle size={18} />
          {lang === 'de' ? 'KI fragen' : 'Ask AI About Me'}
          <span className="w-2 h-2 rounded-full bg-[#3DAA72] animate-pulse" />
        </button>
      )}
      <Chatbot isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </main>
  )
}

export default function Home() {
  return (
    <LanguageProvider>
      <PageContent />
    </LanguageProvider>
  )
}
