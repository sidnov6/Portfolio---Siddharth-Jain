'use client'
import { useEffect } from 'react'

export default function Analytics() {
  useEffect(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'pageview' }),
    }).catch(() => {})
  }, [])
  return null
}
