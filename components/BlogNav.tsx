import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function BlogNav() {
  return (
    <nav className="sticky top-0 z-40 w-full bg-[#F8F5EE]/85 backdrop-blur-md border-b border-[#E4E0D6]">
      <div className="max-w-3xl mx-auto px-5 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-sm text-[#1A3D2B] font-medium hover:text-[#3DAA72] transition-colors">
          <ArrowLeft size={16} />
          Siddharth Jain
        </Link>
        <Link
          href="/blog"
          className="text-xs font-mono uppercase tracking-[0.18em] text-[#8A9280] hover:text-[#1A3D2B] transition-colors"
        >
          All posts
        </Link>
      </div>
    </nav>
  )
}
