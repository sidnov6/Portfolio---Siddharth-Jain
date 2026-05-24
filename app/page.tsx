'use client'
import { useState } from 'react'
import { LanguageProvider } from '@/lib/language-context'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Journey from '@/components/Journey'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Education from '@/components/Education'
import BeyondCode from '@/components/BeyondCode'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'
import { MessageCircle } from 'lucide-react'

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false)
  return (
    <LanguageProvider>
    <main className="bg-[#F8F5EE]">
      <Navbar onChatOpen={() => setChatOpen(true)} />
      <Hero />
      <About />
      <Journey />
      <Skills />
      <Projects />
      <Education />
      <BeyondCode />
      <Contact />
      <Footer />

      {/* Floating chat button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#1A3D2B] text-white font-semibold text-sm shadow-xl hover:bg-[#2D7A52] hover:-translate-y-0.5 transition-all duration-200 group"
          style={{ boxShadow: '0 8px 32px rgba(26,61,43,0.35)' }}
        >
          <MessageCircle size={18} />
          Ask AI About Me
          <span className="w-2 h-2 rounded-full bg-[#3DAA72] animate-pulse" />
        </button>
      )}

      <Chatbot isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </main>
    </LanguageProvider>
  )
}
