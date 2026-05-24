'use client'
import { useState, useEffect, useCallback } from 'react'

interface Analytics {
  pageviews: number
  uniqueIPs: number
  formSubmits: number
  clickBreakdown: Record<string, number>
  daily: Record<string, number>
  recent: Array<{
    id: number
    type: string
    meta: { link?: string }
    timestamp: string
    ip: string
    ua: string
    referrer: string
  }>
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
  const [data, setData] = useState<Analytics | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const load = useCallback(async (password: string) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/admin?pwd=${encodeURIComponent(password)}`)
      if (!res.ok) { setError('Wrong password'); setLoading(false); return }
      const json = await res.json()
      setData(json)
      setAuthed(true)
    } catch {
      setError('Failed to load data')
    }
    setLoading(false)
  }, [])

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!authed || !pwd) return
    const t = setInterval(() => load(pwd), 30000)
    return () => clearInterval(t)
  }, [authed, pwd, load])

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center px-4">
        <div className="bg-white border border-[#E4E0D6] rounded-3xl p-10 shadow-lg w-full max-w-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#1A3D2B] flex items-center justify-center mb-6">
            <span className="text-white text-xl">🔒</span>
          </div>
          <h1 className="text-2xl font-black text-[#1A1A18] mb-1">Admin Panel</h1>
          <p className="text-sm text-[#8A9280] mb-6">Portfolio analytics — private access only</p>
          <input
            type="password"
            placeholder="Enter password"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && load(pwd)}
            className="w-full bg-[#F8F5EE] border border-[#E4E0D6] rounded-xl px-4 py-3 text-sm text-[#1A1A18] focus:outline-none focus:border-[#1A3D2B]/50 mb-3"
          />
          {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
          <button
            onClick={() => load(pwd)}
            disabled={loading}
            className="w-full py-3 bg-[#1A3D2B] text-white font-semibold rounded-xl hover:bg-[#2D7A52] transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading…' : 'Access Dashboard'}
          </button>
        </div>
      </div>
    )
  }

  if (!data) return null

  const sortedDays = Object.keys(data.daily).sort()
  const maxDaily = Math.max(...Object.values(data.daily), 1)

  const eventIcon: Record<string, string> = {
    pageview: '👁',
    click: '🔗',
    form_submit: '📧',
  }

  return (
    <div className="min-h-screen bg-[#F8F5EE] px-4 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#3DAA72] mb-1">Private · Admin</p>
            <h1 className="text-3xl font-black text-[#1A1A18]">Portfolio Analytics</h1>
          </div>
          <button onClick={() => load(pwd)} className="px-4 py-2 text-sm font-medium bg-white border border-[#E4E0D6] rounded-xl hover:bg-[#E8F5EE] transition-colors">
            ↻ Refresh
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Pageviews" value={data.pageviews} color="#1A3D2B" />
          <StatCard label="Unique Visitors" value={data.uniqueIPs} color="#2D7A52" />
          <StatCard label="Form Submits" value={data.formSubmits} color="#003F88" />
          <StatCard label="Link Clicks" value={Object.values(data.clickBreakdown).reduce((a, b) => a + b, 0)} color="#F04E23" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Daily chart */}
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
                      <span className="text-[8px] text-[#C0B8B0] rotate-[-45deg] origin-top-left mt-1 hidden group-hover:block absolute">
                        {day.slice(5)}
                      </span>
                    </div>
                  ))}
                </div>
            }
          </div>

          {/* Click breakdown */}
          <div className="bg-white border border-[#E4E0D6] rounded-2xl p-6 shadow-sm">
            <p className="text-xs font-mono uppercase tracking-[0.15em] text-[#8A9280] mb-4">Link Click Breakdown</p>
            {Object.keys(data.clickBreakdown).length === 0
              ? <p className="text-sm text-[#B0A898]">No clicks tracked yet</p>
              : <div className="space-y-3">
                  {Object.entries(data.clickBreakdown)
                    .sort(([,a],[,b]) => b - a)
                    .map(([link, count]) => {
                      const total = Object.values(data.clickBreakdown).reduce((a, b) => a + b, 0)
                      return (
                        <div key={link}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-[#1A1A18] capitalize">{link}</span>
                            <span className="text-[#3DAA72] font-mono">{count}</span>
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

        {/* Recent events log */}
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
                        {ev.ip} · {ev.referrer !== 'direct' ? new URL(ev.referrer).hostname : 'direct'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
          }
        </div>

        <p className="text-center text-xs text-[#C0B8B0] font-mono mt-6">
          Auto-refreshes every 30s · Password protected · For Siddharth's eyes only
        </p>
      </div>
    </div>
  )
}
