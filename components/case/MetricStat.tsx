import type { Eval } from '@/lib/case-studies'

/** A single eval result: value + label + the methodology that backs it. */
export default function MetricStat({ ev, color }: { ev: Eval; color: string }) {
  return (
    <div className="rounded-2xl border border-[#E4E0D6] bg-white p-5">
      <div className="font-display text-2xl font-black leading-tight" style={{ color }}>{ev.value}</div>
      <div className="text-[11px] font-mono uppercase tracking-wider text-[#1A1A18] mt-1 mb-2">{ev.metric}</div>
      <p className="text-[12px] text-[#6E7A70] leading-relaxed">{ev.methodology}</p>
    </div>
  )
}
