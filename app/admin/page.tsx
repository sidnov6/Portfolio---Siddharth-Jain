'use client'
import { useState, useEffect, useCallback } from 'react'
import ResumeBuilder from '@/components/admin/ResumeBuilder'

interface Analytics {
  pageviews: number
  uniqueIPs: number
  formSubmits: number
  chatbotOpens: number
  chatbotMessages: number
  resumeDownloads: number
  clickBreakdown: Record<string, number>
  daily: Record<string, number>
  recent: Array<{
    id: number
    type: string
    meta: { link?: string; subject?: string; message?: string }
    timestamp: string
    ip: string
    ua: string
    referrer: string
  }>
}

interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
  tags: string[]
  body: string
  published: boolean
  createdAt: string
  updatedAt: string
}

function StatCard({ label, value, color = '#1A3D2B' }: { label: string; value: number | string; color?: string }) {
  return (
    <div className="bg-white border border-[#E4E0D6] rounded-2xl p-5 shadow-sm">
      <div className="text-3xl font-black font-mono" style={{ color }}>{value}</div>
      <div className="text-xs text-[#8A9280] mt-1 font-medium uppercase tracking-wider">{label}</div>
    </div>
  )
}

export default function AdminPage() {
  const [pwd, setPwd] = useState('')
  const [authed, setAuthed] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState<'analytics' | 'posts' | 'resume'>('analytics')

  /* analytics */
  const [data, setData] = useState<Analytics | null>(null)
  const loadAnalytics = useCallback(async (password: string) => {
    const res = await fetch(`/api/admin?pwd=${encodeURIComponent(password)}`)
    if (!res.ok) return null
    return res.json()
  }, [])

  /* posts */
  const [posts, setPosts] = useState<Post[]>([])
  const [editing, setEditing] = useState<Post | null>(null)
  const [editorOpen, setEditorOpen] = useState(false)
  const loadPosts = useCallback(async (password: string) => {
    const res = await fetch(`/api/posts?pwd=${encodeURIComponent(password)}`)
    if (!res.ok) return []
    const j = await res.json()
    return j.posts || []
  }, [])

  const refresh = useCallback(async (password: string) => {
    const [a, p] = await Promise.all([loadAnalytics(password), loadPosts(password)])
    if (a) setData(a)
    if (p) setPosts(p)
  }, [loadAnalytics, loadPosts])

  const authenticate = useCallback(async (password: string) => {
    setLoading(true); setError('')
    try {
      const a = await loadAnalytics(password)
      if (!a) { setError('Wrong password'); setLoading(false); return }
      setData(a)
      const p = await loadPosts(password)
      setPosts(p)
      setAuthed(true)
    } catch {
      setError('Failed to load data')
    }
    setLoading(false)
  }, [loadAnalytics, loadPosts])

  /* Auto-refresh analytics every 30s */
  useEffect(() => {
    if (!authed || !pwd) return
    const t = setInterval(() => loadAnalytics(pwd).then(a => a && setData(a)), 30000)
    return () => clearInterval(t)
  }, [authed, pwd, loadAnalytics])

  /* Post CRUD handlers */
  const blankPost = (): Post => ({
    slug: '', title: '', excerpt: '', date: new Date().toISOString().slice(0, 10),
    tags: [], body: '', published: true, createdAt: '', updatedAt: '',
  })

  const openNew = () => { setEditing(blankPost()); setEditorOpen(true) }
  const openEdit = (p: Post) => { setEditing({ ...p, date: p.date.slice(0, 10) }); setEditorOpen(true) }

  const savePost = async () => {
    if (!editing || !editing.title.trim() || !editing.body.trim()) {
      alert('Title and body are required')
      return
    }
    const isUpdate = posts.some(p => p.slug === editing.slug && editing.slug !== '')
    const url = isUpdate
      ? `/api/posts/${editing.slug}?pwd=${encodeURIComponent(pwd)}`
      : `/api/posts?pwd=${encodeURIComponent(pwd)}`
    const res = await fetch(url, {
      method: isUpdate ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: editing.title,
        slug: editing.slug,
        excerpt: editing.excerpt,
        date: new Date(editing.date).toISOString(),
        tags: editing.tags,
        body: editing.body,
        published: editing.published,
      }),
    })
    if (!res.ok) { alert('Failed to save'); return }
    setEditorOpen(false); setEditing(null)
    await refresh(pwd)
  }

  const deletePost = async (slug: string) => {
    if (!confirm('Delete this post permanently?')) return
    await fetch(`/api/posts/${slug}?pwd=${encodeURIComponent(pwd)}`, { method: 'DELETE' })
    await refresh(pwd)
  }

  const seedPosts = async () => {
    if (!confirm('Seed the 5 starter posts? (Existing posts with same slugs are skipped.)')) return
    const res = await fetch(`/api/posts/seed?pwd=${encodeURIComponent(pwd)}`, { method: 'POST' })
    const j = await res.json()
    alert(`Added ${j.added} new post(s). ${j.alreadyExisted} already existed.`)
    await refresh(pwd)
  }

  /* ── LOGIN VIEW ── */
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center px-4">
        <div className="bg-white border border-[#E4E0D6] rounded-3xl p-10 shadow-lg w-full max-w-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#1A3D2B] flex items-center justify-center mb-6">
            <span className="text-white text-xl">🔒</span>
          </div>
          <h1 className="text-2xl font-black text-[#1A1A18] mb-1">Admin Panel</h1>
          <p className="text-sm text-[#8A9280] mb-6">Analytics + Posts — private access only</p>
          <input
            type="password"
            placeholder="Enter password"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && authenticate(pwd)}
            className="w-full bg-[#F8F5EE] border border-[#E4E0D6] rounded-xl px-4 py-3 text-sm text-[#1A1A18] focus:outline-none focus:border-[#1A3D2B]/50 mb-3"
          />
          {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
          <button
            onClick={() => authenticate(pwd)}
            disabled={loading}
            className="w-full py-3 bg-[#1A3D2B] text-white font-semibold rounded-xl hover:bg-[#2D7A52] transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading…' : 'Access Dashboard'}
          </button>
        </div>
      </div>
    )
  }

  /* ── ADMIN DASHBOARD ── */
  return (
    <div className="min-h-screen bg-[#F8F5EE] px-4 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#3DAA72] mb-1">Private · Admin</p>
            <h1 className="text-3xl font-black text-[#1A1A18]">Portfolio Control</h1>
          </div>
          <button onClick={() => refresh(pwd)} className="px-4 py-2 text-sm font-medium bg-white border border-[#E4E0D6] rounded-xl hover:bg-[#E8F5EE] transition-colors">
            ↻ Refresh
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-[#E4E0D6]">
          <button
            onClick={() => setTab('analytics')}
            className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${tab === 'analytics' ? 'border-[#1A3D2B] text-[#1A3D2B]' : 'border-transparent text-[#8A9280] hover:text-[#1A1A18]'}`}
          >📊 Analytics</button>
          <button
            onClick={() => setTab('posts')}
            className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${tab === 'posts' ? 'border-[#1A3D2B] text-[#1A3D2B]' : 'border-transparent text-[#8A9280] hover:text-[#1A1A18]'}`}
          >✍️ Posts ({posts.length})</button>
          <button
            onClick={() => setTab('resume')}
            className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${tab === 'resume' ? 'border-[#1A3D2B] text-[#1A3D2B]' : 'border-transparent text-[#8A9280] hover:text-[#1A1A18]'}`}
          >📄 Resume Builder</button>
        </div>

        {/* ── ANALYTICS TAB ── */}
        {tab === 'analytics' && data && (
          <AnalyticsView data={data} />
        )}

        {/* ── RESUME TAB ── */}
        {tab === 'resume' && <ResumeBuilder pwd={pwd} />}

        {/* ── POSTS TAB ── */}
        {tab === 'posts' && (
          <div>
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <p className="text-sm text-[#6E7A70]">{posts.length} post{posts.length === 1 ? '' : 's'} total</p>
              <div className="flex gap-2">
                {posts.length === 0 && (
                  <button
                    onClick={seedPosts}
                    className="px-4 py-2 text-sm font-semibold bg-white border border-[#E4E0D6] rounded-xl hover:bg-[#E8F5EE] transition-colors"
                  >🌱 Seed 5 starter posts</button>
                )}
                <button
                  onClick={openNew}
                  className="px-4 py-2 text-sm font-semibold bg-[#1A3D2B] text-white rounded-xl hover:bg-[#2D7A52] transition-colors"
                >+ New Post</button>
              </div>
            </div>

            {posts.length === 0 ? (
              <div className="bg-white border border-[#E4E0D6] rounded-2xl p-12 text-center">
                <p className="text-[#8A9280] text-sm">No posts yet. Create one or seed the starter posts.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {posts.map(p => (
                  <div key={p.slug} className="bg-white border border-[#E4E0D6] rounded-2xl p-5 flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <time className="text-[10px] font-mono text-[#8A9280] tracking-wider">
                          {new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </time>
                        {p.published
                          ? <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#E8F5EE] text-[#1A3D2B]">PUBLISHED</span>
                          : <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#FEF2EE] text-[#C03810]">DRAFT</span>}
                        {p.tags.slice(0, 3).map(t => (
                          <span key={t} className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#F0EDE4] text-[#6E7A70]">{t}</span>
                        ))}
                      </div>
                      <p className="font-bold text-[#1A1A18] text-sm leading-tight mb-1">{p.title}</p>
                      <p className="text-[12px] text-[#8A9280] truncate font-mono">/blog/{p.slug}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => openEdit(p)} className="px-3 py-1.5 text-xs font-semibold bg-[#F8F5EE] border border-[#E4E0D6] rounded-lg hover:bg-[#E8F5EE] transition-colors">Edit</button>
                      <button onClick={() => deletePost(p.slug)} className="px-3 py-1.5 text-xs font-semibold bg-white border border-[#E4E0D6] rounded-lg text-[#C03810] hover:bg-[#FEF2EE] transition-colors">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── EDITOR MODAL ── */}
        {editorOpen && editing && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={() => setEditorOpen(false)}>
            <div onClick={e => e.stopPropagation()} className="bg-white rounded-3xl w-full max-w-3xl my-8 shadow-2xl">
              <div className="p-6 border-b border-[#E4E0D6] flex items-center justify-between">
                <p className="font-bold text-lg text-[#1A1A18]">{editing.slug ? 'Edit Post' : 'New Post'}</p>
                <button onClick={() => setEditorOpen(false)} className="text-[#8A9280] hover:text-[#1A1A18]">✕</button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#6E7A70] mb-1.5">Title *</label>
                  <input
                    value={editing.title}
                    onChange={e => setEditing({ ...editing, title: e.target.value })}
                    placeholder="The Quiet Death of Fintech APIs…"
                    className="w-full px-4 py-2.5 bg-[#F8F5EE] border border-[#E4E0D6] rounded-xl text-sm focus:outline-none focus:border-[#1A3D2B]/40"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#6E7A70] mb-1.5">Slug (URL)</label>
                    <input
                      value={editing.slug}
                      onChange={e => setEditing({ ...editing, slug: e.target.value })}
                      placeholder="auto from title if empty"
                      className="w-full px-4 py-2.5 bg-[#F8F5EE] border border-[#E4E0D6] rounded-xl text-sm font-mono focus:outline-none focus:border-[#1A3D2B]/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#6E7A70] mb-1.5">Date</label>
                    <input
                      type="date"
                      value={editing.date}
                      onChange={e => setEditing({ ...editing, date: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#F8F5EE] border border-[#E4E0D6] rounded-xl text-sm font-mono focus:outline-none focus:border-[#1A3D2B]/40"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#6E7A70] mb-1.5">Tags (comma-separated)</label>
                  <input
                    value={editing.tags.join(', ')}
                    onChange={e => setEditing({ ...editing, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                    placeholder="Finance, Agentic AI, MCP"
                    className="w-full px-4 py-2.5 bg-[#F8F5EE] border border-[#E4E0D6] rounded-xl text-sm focus:outline-none focus:border-[#1A3D2B]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#6E7A70] mb-1.5">Excerpt (one sentence, optional)</label>
                  <input
                    value={editing.excerpt}
                    onChange={e => setEditing({ ...editing, excerpt: e.target.value })}
                    placeholder="Auto-generated from body if empty"
                    className="w-full px-4 py-2.5 bg-[#F8F5EE] border border-[#E4E0D6] rounded-xl text-sm focus:outline-none focus:border-[#1A3D2B]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#6E7A70] mb-1.5">Body (Markdown) *</label>
                  <textarea
                    value={editing.body}
                    onChange={e => setEditing({ ...editing, body: e.target.value })}
                    rows={16}
                    placeholder={`## Section\n\nYour markdown content here. Use **bold**, *italic*, [links](https://example.com), > blockquotes, lists, ## headings, etc.`}
                    className="w-full px-4 py-3 bg-[#F8F5EE] border border-[#E4E0D6] rounded-xl text-[13px] font-mono leading-relaxed focus:outline-none focus:border-[#1A3D2B]/40 resize-y"
                  />
                  <p className="text-[10px] text-[#8A9280] mt-1.5 font-mono">Markdown supported: # heading, **bold**, *italic*, [link](url), &gt; quote, - list, 1. list</p>
                </div>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editing.published}
                    onChange={e => setEditing({ ...editing, published: e.target.checked })}
                    className="w-4 h-4 rounded accent-[#1A3D2B]"
                  />
                  <span className="text-[#1A1A18]">Published (visible at <span className="font-mono">/blog</span>)</span>
                </label>
              </div>
              <div className="p-6 border-t border-[#E4E0D6] flex gap-3 justify-end">
                <button onClick={() => setEditorOpen(false)} className="px-4 py-2.5 text-sm font-semibold bg-white border border-[#E4E0D6] rounded-xl hover:bg-[#F8F5EE]">Cancel</button>
                <button onClick={savePost} className="px-5 py-2.5 text-sm font-semibold bg-[#1A3D2B] text-white rounded-xl hover:bg-[#2D7A52]">Save Post</button>
              </div>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-[#C0B8B0] font-mono mt-8">
          Password protected · For Siddharth&apos;s eyes only
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   ANALYTICS VIEW (extracted for clarity)
   ───────────────────────────────────────────────────────── */
function AnalyticsView({ data }: { data: Analytics }) {
  const sortedDays = Object.keys(data.daily).sort()
  const maxDaily = Math.max(...Object.values(data.daily), 1)
  const eventIcon: Record<string, string> = {
    pageview: '👁',
    click: '🔗',
    form_submit: '📧',
    chatbot_open: '🤖',
    chatbot_message: '💬',
    resume_download: '📄',
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        <StatCard label="Total Pageviews" value={data.pageviews} color="#1A3D2B" />
        <StatCard label="Unique Visitors" value={data.uniqueIPs} color="#2D7A52" />
        <StatCard label="Form Submits" value={data.formSubmits} color="#003F88" />
        <StatCard label="Link Clicks" value={Object.values(data.clickBreakdown).reduce((a, b) => a + b, 0)} color="#F04E23" />
      </div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Chatbot Opens"    value={data.chatbotOpens}    color="#7A2B8B" />
        <StatCard label="Chatbot Messages" value={data.chatbotMessages} color="#3DAA72" />
        <StatCard label="Resume Downloads" value={data.resumeDownloads} color="#C19A3D" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-[#E4E0D6] rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-mono uppercase tracking-[0.15em] text-[#8A9280] mb-4">Daily Visits — Last 14 Days</p>
          {sortedDays.length === 0
            ? <p className="text-sm text-[#B0A898]">No data yet</p>
            : <div className="flex items-end gap-1.5 h-28">
                {sortedDays.map(day => (
                  <div key={day} className="flex-1 flex flex-col items-center gap-1 group">
                    <div
                      className="w-full rounded-t-md transition-all"
                      style={{ height: `${(data.daily[day] / maxDaily) * 96}px`, background: '#1A3D2B', minHeight: 4 }}
                      title={`${day}: ${data.daily[day]} visits`}
                    />
                  </div>
                ))}
              </div>
          }
        </div>

        <div className="bg-white border border-[#E4E0D6] rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-mono uppercase tracking-[0.15em] text-[#8A9280] mb-4">Link Click Breakdown</p>
          {Object.keys(data.clickBreakdown).length === 0
            ? <p className="text-sm text-[#B0A898]">No clicks tracked yet</p>
            : <div className="space-y-3 max-h-40 overflow-y-auto">
                {Object.entries(data.clickBreakdown)
                  .sort(([,a],[,b]) => b - a)
                  .map(([link, count]) => {
                    const total = Object.values(data.clickBreakdown).reduce((a, b) => a + b, 0)
                    return (
                      <div key={link}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-[#1A1A18] capitalize truncate">{link}</span>
                          <span className="text-[#3DAA72] font-mono ml-2">{count}</span>
                        </div>
                        <div className="h-1.5 bg-[#F0EDE4] rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-[#1A3D2B]" style={{ width: `${(count / total) * 100}%` }} />
                        </div>
                      </div>
                    )
                  })}
              </div>
          }
        </div>
      </div>

      <div className="bg-white border border-[#E4E0D6] rounded-2xl p-6 shadow-sm">
        <p className="text-xs font-mono uppercase tracking-[0.15em] text-[#8A9280] mb-4">Recent Activity (last 50 events)</p>
        {data.recent.length === 0
          ? <p className="text-sm text-[#B0A898]">No events yet</p>
          : <div className="space-y-2 max-h-96 overflow-y-auto">
              {data.recent.map(ev => (
                <div key={ev.id} className="flex items-start gap-3 py-2 border-b border-[#F0EDE4] last:border-0">
                  <span className="text-base flex-shrink-0">{eventIcon[ev.type] || '•'}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-[#1A1A18] capitalize">{ev.type}</span>
                      {ev.meta?.link && <span className="text-xs px-1.5 py-0.5 bg-[#E8F5EE] text-[#1A3D2B] rounded font-mono">{ev.meta.link}</span>}
                      <span className="text-xs text-[#8A9280] ml-auto flex-shrink-0">{new Date(ev.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="text-[11px] text-[#B0A898] mt-0.5 truncate">
                      {ev.ip} · {ev.referrer !== 'direct' ? (() => { try { return new URL(ev.referrer).hostname } catch { return ev.referrer } })() : 'direct'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
        }
      </div>
    </>
  )
}
