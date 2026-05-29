'use client'
export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="px-3 py-1.5 text-[12px] font-semibold bg-[#1A3D2B] text-white rounded-lg hover:bg-[#2D7A52] transition-colors"
    >
      Print / Save as PDF
    </button>
  )
}
