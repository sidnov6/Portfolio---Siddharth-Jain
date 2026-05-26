import type { Metadata, Viewport } from 'next'
import './globals.css'
import Analytics from '@/components/Analytics'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-siddharth-jain.vercel.app'),
  title: 'Siddharth Jain — Full Stack AI Engineer · Finance × AI',
  description: 'Full Stack AI Engineer. $4.8M in enterprise AI savings at Suzlon. Now pivoting into Finance × AI — MSc at Frankfurt School, CFA Level 1 in progress. Building agentic systems for fintech and banking.',
  keywords: ['AI Engineer', 'Finance AI', 'Quant', 'Agentic AI', 'CFA', 'LangChain', 'Data Scientist', 'Gen AI', 'Data Engineering', 'Machine Learning', 'Frankfurt', 'Siddharth Jain', 'Fintech'],
  authors: [{ name: 'Siddharth Jain' }],
  openGraph: {
    title: 'Siddharth Jain — Full Stack AI Engineer · Finance × AI',
    description: '$4.8M in enterprise AI savings at Suzlon. Now pivoting into Finance × AI. Building agentic systems for fintech and banking.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Siddharth Jain · Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Siddharth Jain — Full Stack AI Engineer · Finance × AI',
    description: '$4.8M in enterprise AI savings at Suzlon. Now pivoting into Finance × AI.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
        <Analytics />
        {children}
      </body>
    </html>
  )
}
