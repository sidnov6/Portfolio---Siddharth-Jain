export function track(type: string, meta?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, meta }),
    keepalive: true,
  }).catch(() => {})
}
