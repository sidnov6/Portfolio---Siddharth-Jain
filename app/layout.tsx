import type { Metadata, Viewport } from 'next'
import './globals.css'
import Analytics from '@/components/Analytics'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: 'Siddharth Jain — Full Stack AI Engineer',
  description: 'Full Stack AI Engineer, Data Scientist, Gen AI Engineer. MSc AI & Data Science at Frankfurt School. Built enterprise AI generating $4.8M in savings at Suzlon Energy. National basketball player. Manchester United fan.',
  keywords: ['AI Engineer', 'Data Scientist', 'Gen AI', 'Data Engineering', 'Machine Learning', 'Portfolio', 'Siddharth Jain', 'Frankfurt'],
  authors: [{ name: 'Siddharth Jain' }],
  openGraph: {
    title: 'Siddharth Jain — Full Stack AI Engineer',
    description: 'Enterprise AI engineer with $4.8M impact, Georgia Tech researcher, national basketball player.',
    type: 'website',
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
