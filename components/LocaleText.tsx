'use client'
import { useEffect, useState } from 'react'

/**
 * A tiny client wrapper that swaps between EN/DE strings based on
 * the persisted language choice. Use this inside server components
 * (like the blog pages) where the LanguageProvider isn't available.
 */
export default function LocaleText({ en, de }: { en: string; de: string }) {
  const [isDE, setIsDE] = useState(false)
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('portfolio-lang') : null
    setIsDE(saved === 'de')
  }, [])
  return <>{isDE ? de : en}</>
}
