import { Check } from 'lucide-react'
import type { Proof } from '@/lib/case-studies'

/** The "production proof" artifact — a small monitoring/eval-harness panel
 *  listing the CI/eval gates that keep the system honest. */
export default function EvalPanel({ proof, color }: { proof: Proof; color: string }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-[#22324A] bg-[#0E1116] shadow-lg">
      <div className="flex items-center gap-2.5 px-5 py-3 border-b border-white/10">
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#3DAA72' }} />
        <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/70">{proof.title}</p>
        <span className="ml-auto text-[10px] font-mono text-white/40">CI · passing</span>
      </div>
      <div className="divide-y divide-white/5">
        {proof.gates.map((g, i) => (
          <div key={i} className="flex items-center gap-3 px-5 py-3">
            <span className="text-sm text-white/90 font-medium flex-1">{g.name}</span>
            <span className="text-[11px] font-mono text-white/40 hidden sm:inline">{g.threshold}</span>
            <span
              className="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-1 rounded-md"
              style={{ background: `${color}26`, color: '#7FE6B0' }}
            >
              <Check size={12} /> {g.value}
            </span>
          </div>
        ))}
      </div>
      <p className="px-5 py-3 text-[12px] leading-relaxed text-white/55 border-t border-white/10 font-mono">{proof.note}</p>
    </div>
  )
}
