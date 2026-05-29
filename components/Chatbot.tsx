'use client'
import { useState, useRef, useEffect } from 'react'
import { X, Send, Bot, User, Minimize2, Maximize2, Loader2, Sparkles } from 'lucide-react'
import { useLang } from '@/lib/language-context'
import { track } from '@/lib/track'

type Message = { role: 'user' | 'assistant'; content: string; id: string }

const starters = {
  en: [
    'What has he shipped to production?',
    'Why should I hire him?',
    'What is his tech stack?',
    'Is he available right now?',
    'Tell me about his finance pivot',
    'What did he build at Suzlon?',
  ],
  de: [
    'Was hat er produktiv ausgeliefert?',
    'Warum sollte ich ihn einstellen?',
    'Was ist sein Tech-Stack?',
    'Ist er aktuell verfügbar?',
    'Erzähl mir von seinem Finance-Pivot',
    'Was hat er bei Suzlon gebaut?',
  ],
}

function Bubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user'
  return (
    <div className={`flex gap-2.5 chatbot-message ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-[#E8F5EE] border border-[#3DAA72]/30' : 'bg-[#1A3D2B] '
      }`}>
        {isUser
          ? <User size={13} className="text-[#1A3D2B]" />
          : <Bot size={13} className="text-white" />}
      </div>
      <div className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
        isUser
          ? 'bg-[#1A3D2B] text-white rounded-tr-sm'
          : 'bg-white border border-[#E4E0D6] text-[#1A1A18] rounded-tl-sm shadow-sm'
      }`}>
        {msg.content}
      </div>
    </div>
  )
}

function Typing() {
  return (
    <div className="flex gap-2.5 chatbot-message">
      <div className="w-7 h-7 rounded-full bg-[#1A3D2B] flex items-center justify-center flex-shrink-0">
        <Bot size={13} className="text-white" />
      </div>
      <div className="bg-white border border-[#E4E0D6] px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#3DAA72] animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Chatbot({ isOpen, onClose, initialQuestion }: { isOpen: boolean; onClose: () => void; initialQuestion?: string }) {
  const { lang } = useLang()
  const isDE = lang === 'de'
  const [messages, setMessages] = useState<Message[]>([{
    id: '0', role: 'assistant',
    content: lang === 'de'
      ? "Hallo! Ich bin Siddharthss KI-Assistent. Frag mich alles über seine Arbeit, Forschung, Fähigkeiten oder Basketball!"
      : "Hi! I'm Siddharth's AI assistant. Ask me anything about his work, research, skills, or even his basketball career!",
  }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && !minimized) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
      inputRef.current?.focus()
    }
  }, [messages, isOpen, minimized])

  // Track chatbot opens (once per open)
  useEffect(() => {
    if (isOpen) track('chatbot_open')
  }, [isOpen])

  // Auto-send seed question when one is provided on open
  const sentQuestionRef = useRef<string | null>(null)
  useEffect(() => {
    if (isOpen && initialQuestion && sentQuestionRef.current !== initialQuestion) {
      sentQuestionRef.current = initialQuestion
      send(initialQuestion)
    }
    if (!isOpen) sentQuestionRef.current = null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialQuestion])

  const send = async (text?: string) => {
    const content = (text ?? input).trim()
    if (!content || loading) return
    track('chatbot_message', { message: content.slice(0, 200), lang })
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const res  = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: next, lang }) })
      const data = await res.json().catch(() => ({}))
      const reply = data.message
        ?? data.error
        ?? (isDE
          ? 'KI ist gerade nicht erreichbar. Schreib Siddharth direkt: sidnov6@gmail.com'
          : 'AI is temporarily unreachable. Email Siddharth directly: sidnov6@gmail.com')
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: reply }])
    } catch {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: isDE
        ? 'Verbindungsfehler. Schreib Siddharth direkt: sidnov6@gmail.com'
        : 'Connection error. Email Siddharth directly: sidnov6@gmail.com' }])
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      <div className={`fixed z-50 flex flex-col transition-all duration-300
        bottom-0 right-0 w-full sm:w-[400px] sm:bottom-6 sm:right-6 sm:rounded-2xl
        bg-[#F8F5EE] border border-[#E4E0D6] shadow-2xl overflow-hidden
        ${minimized ? 'h-16' : 'h-[580px] max-h-[90vh]'}`}
        style={{ boxShadow: '0 8px 60px rgba(26,61,43,0.15), 0 2px 20px rgba(0,0,0,0.08)' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#E4E0D6] bg-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-[#1A3D2B] flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#3DAA72] rounded-full border-2 border-white animate-pulse" />
            </div>
            <div>
              <p className="font-bold text-[#1A1A18] text-sm">{isDE ? 'Frag über Siddharth' : 'Ask About Siddharth'}</p>
              <p className="text-[10px] text-[#8A9280] font-mono">Powered by Groq · Free</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setMinimized(!minimized)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8A9280] hover:text-[#1A1A18] hover:bg-[#F8F5EE] transition-colors">
              {minimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
            </button>
            <button onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8A9280] hover:text-[#1A1A18] hover:bg-[#F8F5EE] transition-colors">
              <X size={14} />
            </button>
          </div>
        </div>

        {!minimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map(m => <Bubble key={m.id} msg={m} />)}
              {loading && <Typing />}
              <div ref={bottomRef} />
            </div>

            {/* Quick starters */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="text-[10px] font-mono text-[#B0A898] mb-2 uppercase tracking-widest">
                  {isDE ? 'Schnellfragen' : 'Quick questions'}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {starters[lang].map(s => (
                    <button key={s} onClick={() => send(s)}
                      className="text-[11px] px-2.5 py-1.5 bg-white border border-[#E4E0D6] text-[#6E7A70] rounded-lg hover:border-[#1A3D2B]/30 hover:text-[#1A3D2B] transition-all">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-[#E4E0D6] bg-white flex-shrink-0">
              <div className="flex gap-2">
                <input ref={inputRef} type="text" value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
                  placeholder={isDE ? 'Frag alles über Siddharth…' : 'Ask anything about Siddharth…'}
                  className="flex-1 bg-[#F8F5EE] border border-[#E4E0D6] rounded-xl px-4 py-2.5 text-[#1A1A18] text-sm placeholder-[#C0B8B0] focus:outline-none focus:border-[#1A3D2B]/40 focus:ring-2 focus:ring-[#1A3D2B]/10 transition-all" />
                <button onClick={() => send()} disabled={!input.trim() || loading}
                  className="w-10 h-10 rounded-xl bg-[#1A3D2B] flex items-center justify-center text-white hover:bg-[#2D7A52] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0">
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
