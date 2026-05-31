import type { ArchStep } from '@/lib/case-studies'

/** Vertical numbered flow of the system's stages, themed by the project color. */
export default function ArchDiagram({ steps, color }: { steps: ArchStep[]; color: string }) {
  return (
    <div className="relative">
      {/* connecting rail */}
      <div className="absolute left-[15px] top-3 bottom-3 w-px" style={{ background: `${color}30` }} />
      <ol className="space-y-4">
        {steps.map((s, i) => (
          <li key={i} className="relative flex gap-4">
            <div
              className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold font-mono text-white shadow-sm"
              style={{ background: color }}
            >
              {i + 1}
            </div>
            <div className="flex-1 pt-0.5">
              <p className="font-bold text-[#1A1A18] text-sm leading-snug">{s.label}</p>
              <p className="text-[#6E7A70] text-sm leading-relaxed mt-0.5">{s.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
