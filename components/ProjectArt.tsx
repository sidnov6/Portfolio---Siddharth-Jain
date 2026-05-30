'use client'
import type { ReactElement } from 'react'

/**
 * Self-contained, themed animated SVG covers — one per project.
 * No external requests, no screenshots; each visual represents what the
 * project actually does and is tinted with the project's own color.
 * Animation is native SVG/SMIL so there are no CSS keyframe collisions.
 */

type ArtProps = { color: string }

const frame = 'absolute inset-0 w-full h-full'
const vb = '0 0 400 180'
const slice = 'xMidYMid slice'

/* Dam Rehabilitation Chatbot — water held by a dam wall, inspection scan */
function DamArt({ color }: ArtProps) {
  const waves = [
    { o: 0.22, d: '7s', y: 0 },
    { o: 0.32, d: '5s', y: 12 },
    { o: 0.5, d: '3.6s', y: 24 },
  ]
  return (
    <svg className={frame} viewBox={vb} preserveAspectRatio={slice} aria-hidden>
      <defs>
        <linearGradient id="dam-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.82" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <rect width="400" height="180" fill="url(#dam-bg)" />
      <circle cx="318" cy="42" r="26" fill="#fff" opacity="0.1" />
      <g>
        {waves.map((w, i) => (
          <path
            key={i}
            d={`M0 ${108 + w.y} C 60 ${98 + w.y}, 80 ${118 + w.y}, 140 ${108 + w.y} S 220 ${98 + w.y}, 280 ${108 + w.y} S 360 ${118 + w.y}, 420 ${108 + w.y} S 500 ${98 + w.y}, 560 ${108 + w.y} L 560 180 L 0 180 Z`}
            fill="#fff"
            opacity={w.o}
          >
            <animateTransform attributeName="transform" type="translate" values="0 0; -280 0" dur={w.d} repeatCount="indefinite" />
          </path>
        ))}
      </g>
      {/* dam wall */}
      <path d="M126 26 L156 26 L178 180 L100 180 Z" fill="#fff" opacity="0.16" />
      <line x1="156" y1="26" x2="178" y2="180" stroke="#fff" strokeOpacity="0.25" strokeWidth="1" />
      {/* inspection scan line */}
      <line x1="100" y1="60" x2="178" y2="60" stroke="#fff" strokeWidth="1.5" strokeOpacity="0.6">
        <animate attributeName="y1" values="40;150;40" dur="5s" repeatCount="indefinite" />
        <animate attributeName="y2" values="40;150;40" dur="5s" repeatCount="indefinite" />
        <animate attributeName="strokeOpacity" values="0;0.7;0" dur="5s" repeatCount="indefinite" />
      </line>
    </svg>
  )
}

/* Recoupe — multi-agent claim routing, a token travels claim → recovery */
function AgentsArt({ color }: ArtProps) {
  const nodes = [
    { x: 60, y: 90 }, { x: 150, y: 48 }, { x: 150, y: 132 },
    { x: 250, y: 48 }, { x: 250, y: 132 }, { x: 340, y: 90 },
  ]
  const links = [[0, 1], [0, 2], [1, 3], [2, 4], [1, 4], [2, 3], [3, 5], [4, 5]]
  return (
    <svg className={frame} viewBox={vb} preserveAspectRatio={slice} aria-hidden>
      <defs>
        <linearGradient id="ag-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.78" />
        </linearGradient>
      </defs>
      <rect width="400" height="180" fill="url(#ag-bg)" />
      {links.map(([a, b], i) => (
        <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="#fff" strokeOpacity="0.18" strokeWidth="1" />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r="7" fill="#fff" opacity="0.85">
          <animate attributeName="opacity" values="0.4;0.95;0.4" dur="2.4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* travelling token: claim → recovery */}
      <circle r="4.5" fill="#fff">
        <animateMotion dur="3.2s" repeatCount="indefinite" path="M60 90 L150 48 L250 132 L340 90" />
      </circle>
      {/* recovery glow at the target */}
      <circle cx="340" cy="90" r="12" fill="none" stroke="#fff" strokeOpacity="0.5">
        <animate attributeName="r" values="8;16;8" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="strokeOpacity" values="0.6;0;0.6" dur="1.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

/* RegRadar — radar sweep over the EU regulatory stream, blips appear */
function RadarArt({ color }: ArtProps) {
  const cx = 200, cy = 96
  const stars = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2
    return { x: cx + Math.cos(a) * 78, y: cy + Math.sin(a) * 78 }
  })
  const blips = [{ x: 250, y: 70, b: '0s' }, { x: 165, y: 130, b: '1.3s' }, { x: 235, y: 125, b: '2.5s' }]
  return (
    <svg className={frame} viewBox={vb} preserveAspectRatio={slice} aria-hidden>
      <defs>
        <radialGradient id="rd-bg" cx="50%" cy="55%" r="75%">
          <stop offset="0%" stopColor={color} stopOpacity="0.78" />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
        <linearGradient id="rd-sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="180" fill="url(#rd-bg)" />
      {[34, 56, 78].map(r => (
        <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="#fff" strokeOpacity="0.16" strokeWidth="1" />
      ))}
      <line x1={cx - 88} y1={cy} x2={cx + 88} y2={cy} stroke="#fff" strokeOpacity="0.12" strokeWidth="1" />
      <line x1={cx} y1={cy - 78} x2={cx} y2={cy + 78} stroke="#fff" strokeOpacity="0.12" strokeWidth="1" />
      {/* EU-style ring of stars */}
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r="2" fill="#FFD64A" opacity="0.85" />
      ))}
      {/* sweep wedge */}
      <g>
        <path d={`M${cx} ${cy} L${cx} ${cy - 80} A 80 80 0 0 1 ${cx + 56} ${cy - 56} Z`} fill="url(#rd-sweep)">
          <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="4s" repeatCount="indefinite" />
        </path>
      </g>
      {/* detected blips */}
      {blips.map((bl, i) => (
        <circle key={i} cx={bl.x} cy={bl.y} r="3.5" fill="#fff">
          <animate attributeName="opacity" values="0;1;0" dur="4s" begin={bl.b} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  )
}

/* CreditForge — risk scorecard: bars + a sweeping PD/risk gauge needle */
function CreditArt({ color }: ArtProps) {
  const bars = [50, 78, 40, 96, 64, 110]
  return (
    <svg className={frame} viewBox={vb} preserveAspectRatio={slice} aria-hidden>
      <defs>
        <linearGradient id="cf-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.82" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <rect width="400" height="180" fill="url(#cf-bg)" />
      {/* axis */}
      <line x1="34" y1="150" x2="220" y2="150" stroke="#fff" strokeOpacity="0.25" strokeWidth="1" />
      {/* growing bars */}
      {bars.map((h, i) => {
        const x = 44 + i * 30
        return (
          <rect key={i} x={x} width="18" rx="2" fill="#fff" opacity={0.55 + i * 0.06}>
            <animate attributeName="height" values={`${h * 0.4};${h};${h * 0.7};${h}`} dur="4s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
            <animate attributeName="y" values={`${150 - h * 0.4};${150 - h};${150 - h * 0.7};${150 - h}`} dur="4s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
          </rect>
        )
      })}
      {/* risk gauge */}
      <g transform="translate(312 112)">
        <path d="M-46 0 A 46 46 0 0 1 46 0" fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="6" strokeLinecap="round" />
        <path d="M-46 0 A 46 46 0 0 1 8 -45" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="6" strokeLinecap="round" />
        <line x1="0" y1="0" x2="0" y2="-40" stroke="#fff" strokeWidth="3" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" values="-70;55;-20;40;-70" dur="5s" repeatCount="indefinite" />
        </line>
        <circle cx="0" cy="0" r="4" fill="#fff" />
      </g>
    </svg>
  )
}

/* QUORUM — investment committee: bull vs bear over an animated ticker */
function CommitteeArt({ color }: ArtProps) {
  const candles = [
    { x: 40, up: true, t: 96, b: 132 }, { x: 70, up: false, t: 80, b: 120 },
    { x: 100, up: true, t: 70, b: 110 }, { x: 130, up: false, t: 86, b: 128 },
    { x: 160, up: true, t: 58, b: 100 }, { x: 190, up: true, t: 48, b: 92 },
  ]
  const bull = '#3DAA72', bear = '#E06C5E'
  return (
    <svg className={frame} viewBox={vb} preserveAspectRatio={slice} aria-hidden>
      <defs>
        <linearGradient id="qm-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <rect width="400" height="180" fill="url(#qm-bg)" />
      {/* candlestick ticker */}
      <g>
        {candles.map((c, i) => (
          <g key={i}>
            <line x1={c.x} y1={c.t - 10} x2={c.x} y2={c.b + 10} stroke="#fff" strokeOpacity="0.5" strokeWidth="1" />
            <rect x={c.x - 5} y={c.t} width="10" height={c.b - c.t} rx="1.5" fill={c.up ? bull : bear} opacity="0.9">
              <animate attributeName="height" values={`${(c.b - c.t) * 0.6};${c.b - c.t};${(c.b - c.t) * 0.8};${c.b - c.t}`} dur="3.5s" begin={`${i * 0.18}s`} repeatCount="indefinite" />
            </rect>
          </g>
        ))}
      </g>
      {/* bull arrow (up) */}
      <g transform="translate(288 60)" opacity="0.95">
        <path d="M0 18 L14 -10 L28 18 L19 18 L19 34 L9 34 L9 18 Z" fill={bull}>
          <animateTransform attributeName="transform" type="translate" values="0 0; 0 -5; 0 0" dur="2.2s" repeatCount="indefinite" />
        </path>
      </g>
      {/* bear arrow (down) */}
      <g transform="translate(330 96)" opacity="0.95">
        <path d="M0 6 L9 6 L9 -10 L19 -10 L19 6 L28 6 L14 34 Z" fill={bear}>
          <animateTransform attributeName="transform" type="translate" values="0 0; 0 5; 0 0" dur="2.2s" begin="0.6s" repeatCount="indefinite" />
        </path>
      </g>
      {/* committee debate dots */}
      {[300, 318, 336, 354].map((x, i) => (
        <circle key={i} cx={x} cy="150" r="3" fill="#fff" opacity="0.8">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  )
}

/* AEGIS Live — AML surveillance: tx graph, a scan sweep, a red sanctioned bloom */
function SurveillanceArt({ color }: ArtProps) {
  const nodes = [
    { x: 60, y: 60 }, { x: 130, y: 110 }, { x: 110, y: 40 },
    { x: 200, y: 70 }, { x: 200, y: 138 }, { x: 300, y: 50 }, { x: 340, y: 120 },
  ]
  const links = [[0, 2], [0, 1], [2, 3], [1, 3], [1, 4], [3, 5], [4, 6], [3, 6]]
  const flagged = { x: 300, y: 50 } // the sanctioned hit
  const alert = '#FF5A6E'
  return (
    <svg className={frame} viewBox={vb} preserveAspectRatio={slice} aria-hidden>
      <defs>
        <linearGradient id="sv-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.78" />
        </linearGradient>
      </defs>
      <rect width="400" height="180" fill="url(#sv-bg)" />
      {/* faint grid */}
      {[36, 90, 144].map(y => (
        <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke="#fff" strokeOpacity="0.05" strokeWidth="1" />
      ))}
      {[100, 200, 300].map(x => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="180" stroke="#fff" strokeOpacity="0.05" strokeWidth="1" />
      ))}
      {/* graph edges */}
      {links.map(([a, b], i) => (
        <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="#fff" strokeOpacity="0.16" strokeWidth="1" />
      ))}
      {/* transaction particles flowing along edges */}
      <circle r="3" fill="#fff">
        <animateMotion dur="2.6s" repeatCount="indefinite" path={`M${nodes[0].x} ${nodes[0].y} L${nodes[1].x} ${nodes[1].y} L${nodes[3].x} ${nodes[3].y}`} />
      </circle>
      <circle r="3" fill="#fff">
        <animateMotion dur="3.1s" begin="0.8s" repeatCount="indefinite" path={`M${nodes[2].x} ${nodes[2].y} L${nodes[3].x} ${nodes[3].y} L${nodes[5].x} ${nodes[5].y}`} />
      </circle>
      <circle r="3" fill={alert}>
        <animateMotion dur="2.9s" begin="0.4s" repeatCount="indefinite" path={`M${nodes[3].x} ${nodes[3].y} L${nodes[4].x} ${nodes[4].y} L${nodes[6].x} ${nodes[6].y}`} />
      </circle>
      {/* nodes */}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r="6" fill="#fff" opacity="0.8">
          <animate attributeName="opacity" values="0.45;0.9;0.45" dur="2.6s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* sanctioned hit: red bloom */}
      <circle cx={flagged.x} cy={flagged.y} r="6" fill={alert} />
      {[0, 0.9].map((b, i) => (
        <circle key={i} cx={flagged.x} cy={flagged.y} r="6" fill="none" stroke={alert} strokeWidth="2">
          <animate attributeName="r" values="6;22" dur="1.8s" begin={`${b}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0" dur="1.8s" begin={`${b}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* scoring scan sweep */}
      <line x1="0" y1="0" x2="0" y2="180" stroke="#fff" strokeWidth="1.5" strokeOpacity="0.5">
        <animate attributeName="x1" values="-10;410" dur="3.2s" repeatCount="indefinite" />
        <animate attributeName="x2" values="-10;410" dur="3.2s" repeatCount="indefinite" />
        <animate attributeName="strokeOpacity" values="0;0.5;0" dur="3.2s" repeatCount="indefinite" />
      </line>
    </svg>
  )
}

const registry: Record<string, (p: ArtProps) => ReactElement> = {
  dam: DamArt,
  agents: AgentsArt,
  radar: RadarArt,
  credit: CreditArt,
  committee: CommitteeArt,
  surveillance: SurveillanceArt,
}

export default function ProjectArt({ art, color }: { art: string; color: string }) {
  const Art = registry[art] ?? DamArt
  return <Art color={color} />
}
