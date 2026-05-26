/* ─────────────────────────────────────────────────────────
   DECORATIVE SVG ANIMATIONS
   Lightweight, low-opacity background elements used across
   sections to theme them — finance, geopolitics, education,
   sports, debate, etc.
   ───────────────────────────────────────────────────────── */

type Props = { size?: number; className?: string; color?: string }

/* ── Globe (geopolitics) — rotating sphere with arcs ──── */
export function GlobeSVG({ size = 120, className = '', color = '#1A3D2B' }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={className} aria-hidden>
      <defs>
        <clipPath id="globeClip">
          <circle cx="60" cy="60" r="46" />
        </clipPath>
      </defs>
      <circle cx="60" cy="60" r="46" fill="none" stroke={color} strokeWidth="2" opacity="0.65" />
      {/* rotating grid */}
      <g className="globe-ring" style={{ transformOrigin: '60px 60px' }}>
        <g clipPath="url(#globeClip)">
          {/* latitudes */}
          {[20, 40, 60, 80, 100].map(y => (
            <ellipse key={y} cx="60" cy={y} rx="46" ry="6" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
          ))}
          {/* longitudes */}
          {[0, 30, 60, 90, 120, 150].map(deg => (
            <ellipse key={deg} cx="60" cy="60" rx="14" ry="46" fill="none" stroke={color} strokeWidth="1" opacity="0.4"
              transform={`rotate(${deg} 60 60)`} />
          ))}
        </g>
      </g>
      {/* orbiting arc */}
      <g className="globe-ring" style={{ transformOrigin: '60px 60px', animationDuration: '14s', animationDirection: 'reverse' }}>
        <path d="M 14 60 Q 60 12, 106 60" fill="none" stroke={color} strokeWidth="1.5" opacity="0.55" strokeDasharray="3 4" />
      </g>
      {/* connection dots */}
      <circle cx="32" cy="44" r="2.5" fill={color}>
        <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="88" cy="68" r="2.5" fill={color}>
        <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="62" cy="36" r="2" fill={color}>
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

/* ── Candlestick chart (finance) — animated trading vibe ── */
export function CandlestickChartSVG({ size = 160, className = '' }: Props) {
  const candles = [
    { x: 12, top: 28, bottom: 70, open: 36, close: 60, up: true  },
    { x: 30, top: 22, bottom: 60, open: 52, close: 30, up: false },
    { x: 48, top: 18, bottom: 56, open: 24, close: 50, up: true  },
    { x: 66, top: 14, bottom: 46, open: 40, close: 20, up: false },
    { x: 84, top: 10, bottom: 38, open: 16, close: 34, up: true  },
    { x: 102, top: 8, bottom: 32, open: 12, close: 28, up: true  },
    { x: 120, top: 6,  bottom: 30, open: 10, close: 26, up: true  },
  ]
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 140 90" className={className} aria-hidden>
      {/* baseline */}
      <line x1="0" y1="78" x2="140" y2="78" stroke="#1A3D2B" strokeWidth="0.5" opacity="0.3" />
      {candles.map((c, i) => (
        <g key={i} style={{ animation: `candleGrow 0.5s ease-out ${i * 0.18}s both` }}>
          {/* wick */}
          <line x1={c.x} x2={c.x} y1={c.top} y2={c.bottom} stroke={c.up ? '#3DAA72' : '#C03810'} strokeWidth="1.2" />
          {/* body */}
          <rect
            x={c.x - 4}
            y={Math.min(c.open, c.close)}
            width="8"
            height={Math.abs(c.open - c.close)}
            fill={c.up ? '#3DAA72' : '#C03810'}
          />
        </g>
      ))}
      {/* trend arrow */}
      <path d="M 8 70 L 130 12" stroke="#1A3D2B" strokeWidth="1.5" fill="none" strokeDasharray="2 3" opacity="0.45"
        style={{ animation: 'lineDrawUp 2s ease-out 1.3s both' }} />
    </svg>
  )
}

/* ── Stock line chart (finance) — drawing line going up ── */
export function StockLineSVG({ size = 140, className = '', color = '#003F88' }: Props) {
  return (
    <svg width={size} height={size * 0.55} viewBox="0 0 140 80" className={className} aria-hidden>
      <path
        d="M 0 60 L 18 52 L 32 56 L 48 42 L 64 46 L 80 28 L 96 32 L 112 18 L 130 22 L 140 12"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 400,
          strokeDashoffset: 400,
          animation: 'lineDrawUp 3s ease-out infinite alternate',
        }}
      />
      {/* end-of-line dot */}
      <circle cx="140" cy="12" r="3" fill={color}>
        <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

/* ── Dollar coin (finance) — flipping coin ──────────── */
export function DollarCoinSVG({ size = 72, className = '' }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" className={`${className} coin-flip`} aria-hidden>
      <defs>
        <radialGradient id="coinGrad" cx="40%" cy="40%">
          <stop offset="0%"  stopColor="#FFE08C" />
          <stop offset="60%" stopColor="#D4A017" />
          <stop offset="100%" stopColor="#8C6914" />
        </radialGradient>
      </defs>
      <circle cx="40" cy="40" r="34" fill="url(#coinGrad)" stroke="#8C6914" strokeWidth="1.5" />
      <circle cx="40" cy="40" r="28" fill="none" stroke="#8C6914" strokeWidth="1" opacity="0.55" />
      <text x="40" y="52" textAnchor="middle" fontFamily="serif" fontWeight="900" fontSize="36" fill="#8C5614">$</text>
    </svg>
  )
}

/* ── Trophy (achievements / Man Utd) ─────────────── */
export function TrophySVG({ size = 100, className = '' }: Props) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 100 110" className={className} aria-hidden>
      <defs>
        <linearGradient id="trophyGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%"  stopColor="#FFE08C" />
          <stop offset="55%" stopColor="#D4A017" />
          <stop offset="100%" stopColor="#8C6914" />
        </linearGradient>
      </defs>
      {/* handles */}
      <path d="M 22 30 Q 8 30 8 50 Q 8 64 22 64" fill="none" stroke="url(#trophyGrad)" strokeWidth="4" strokeLinecap="round" />
      <path d="M 78 30 Q 92 30 92 50 Q 92 64 78 64" fill="none" stroke="url(#trophyGrad)" strokeWidth="4" strokeLinecap="round" />
      {/* cup */}
      <path d="M 24 20 L 76 20 L 72 58 Q 50 76 28 58 Z" fill="url(#trophyGrad)" stroke="#8C6914" strokeWidth="1.5" />
      {/* stem + base */}
      <rect x="44" y="74" width="12" height="14" fill="#8C6914" />
      <rect x="32" y="86" width="36" height="8" rx="2" fill="#8C6914" />
      <rect x="28" y="94" width="44" height="6" rx="1.5" fill="#6B500F" />
      {/* sparkles */}
      {[
        { cx: 18, cy: 14, delay: 0   },
        { cx: 82, cy: 18, delay: 0.5 },
        { cx: 50, cy: 8,  delay: 1   },
        { cx: 30, cy: 36, delay: 1.5 },
      ].map((s, i) => (
        <g key={i} style={{ transformOrigin: `${s.cx}px ${s.cy}px`, animation: `sparkleStar 2.4s ease-in-out ${s.delay}s infinite` }}>
          <path d={`M ${s.cx} ${s.cy - 4} L ${s.cx + 1} ${s.cy - 1} L ${s.cx + 4} ${s.cy} L ${s.cx + 1} ${s.cy + 1} L ${s.cx} ${s.cy + 4} L ${s.cx - 1} ${s.cy + 1} L ${s.cx - 4} ${s.cy} L ${s.cx - 1} ${s.cy - 1} Z`} fill="#FFE08C" />
        </g>
      ))}
    </svg>
  )
}

/* ── Graduation cap (education) — swinging tassel ────── */
export function GraduationCapSVG({ size = 110, className = '', color = '#1A3D2B' }: Props) {
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 110 100" className={className} aria-hidden>
      {/* cap base */}
      <ellipse cx="55" cy="60" rx="32" ry="8" fill={color} opacity="0.85" />
      {/* mortarboard */}
      <polygon points="5,42 55,22 105,42 55,62" fill={color} />
      <polygon points="5,42 55,22 105,42 55,62" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* button on top */}
      <circle cx="55" cy="42" r="3" fill="#D4A017" />
      {/* tassel cord */}
      <line x1="55" y1="42" x2="78" y2="48" stroke="#D4A017" strokeWidth="1.5" />
      {/* tassel itself — swings */}
      <g style={{ transformOrigin: '78px 48px', animation: 'tasselSwing 3s ease-in-out infinite' }}>
        <line x1="78" y1="48" x2="78" y2="68" stroke="#D4A017" strokeWidth="2" />
        <g>
          {[0, 2, -2, 1].map((dx, i) => (
            <line key={i} x1={78 + dx} y1="68" x2={78 + dx * 1.5} y2="80" stroke="#D4A017" strokeWidth="1.5" />
          ))}
        </g>
        <circle cx="78" cy="68" r="2.5" fill="#D4A017" />
      </g>
    </svg>
  )
}

/* ── Open book (CFA / study) — pages with subtle lift ── */
export function OpenBookSVG({ size = 130, className = '', color = '#003F88' }: Props) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 140 90" className={className} aria-hidden>
      {/* spine shadow */}
      <line x1="70" y1="14" x2="70" y2="80" stroke={color} strokeWidth="2" opacity="0.4" />
      {/* left page */}
      <path d="M 70 16 Q 40 12, 12 18 L 12 78 Q 40 72, 70 78 Z" fill="white" stroke={color} strokeWidth="1.5" />
      {/* right page */}
      <path d="M 70 16 Q 100 12, 128 18 L 128 78 Q 100 72, 70 78 Z" fill="white" stroke={color} strokeWidth="1.5" />
      {/* text lines on left */}
      {[28, 36, 44, 52, 60].map((y, i) => (
        <line key={`l-${i}`} x1="22" x2={20 + 38 - i * 4} y1={y} y2={y} stroke={color} strokeWidth="1" opacity="0.45" />
      ))}
      {/* text lines on right */}
      {[28, 36, 44, 52, 60].map((y, i) => (
        <line key={`r-${i}`} x1="78" x2={78 + 38 - i * 4} y1={y} y2={y} stroke={color} strokeWidth="1" opacity="0.45" />
      ))}
      {/* page-turn shimmer */}
      <path d="M 70 16 Q 100 14, 124 22"
        fill="none" stroke={color} strokeWidth="1" opacity="0.7"
        style={{
          strokeDasharray: 60,
          strokeDashoffset: 60,
          animation: 'pageTurn 3.5s ease-in-out infinite',
        }}
      />
      {/* CFA accent dot */}
      <circle cx="128" cy="14" r="3.5" fill="#D4A017">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

/* ── Football (Man Utd) — rolling soccer ball ───────── */
export function FootballSVG({ size = 80, className = '' }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" className={`${className} football-roll`} aria-hidden>
      <circle cx="40" cy="40" r="34" fill="#fff" stroke="#1A1A18" strokeWidth="2" />
      {/* center pentagon */}
      <polygon points="40,28 49,34 46,46 34,46 31,34" fill="#1A1A18" />
      {/* outer hex hints */}
      <polygon points="18,38 26,34 32,40 28,48 20,46" fill="none" stroke="#1A1A18" strokeWidth="1.5" />
      <polygon points="62,38 54,34 48,40 52,48 60,46" fill="none" stroke="#1A1A18" strokeWidth="1.5" />
      <polygon points="40,58 32,60 30,68 38,70 46,68 44,60" fill="none" stroke="#1A1A18" strokeWidth="1.5" />
      <polygon points="34,16 30,22 36,28 44,28 50,22 46,16" fill="none" stroke="#1A1A18" strokeWidth="1.5" />
    </svg>
  )
}

/* ── Mini basketball (for backgrounds) ──────────────── */
export function BasketballMiniSVG({ size = 60, className = '' }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" className={`${className} bb-ball`} aria-hidden>
      <circle cx="40" cy="40" r="36" fill="#E87722" />
      <circle cx="40" cy="40" r="36" fill="none" stroke="#C45F10" strokeWidth="1.5"/>
      <path d="M4,40 Q40,20 76,40" fill="none" stroke="#C45F10" strokeWidth="2.5"/>
      <path d="M4,40 Q40,60 76,40" fill="none" stroke="#C45F10" strokeWidth="2.5"/>
      <line x1="40" y1="4" x2="40" y2="76" stroke="#C45F10" strokeWidth="2.5"/>
    </svg>
  )
}

/* ── Code brackets (tech) — typing terminal vibe ────── */
export function CodeBracketsSVG({ size = 100, className = '', color = '#1A3D2B' }: Props) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 100 50" className={className} aria-hidden>
      <path d="M 18 12 L 6 25 L 18 38" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 82 12 L 94 25 L 82 38" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="58" y1="10" x2="42" y2="40" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {/* cursor */}
      <rect x="48" y="22" width="2.5" height="10" fill={color}>
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.45;0.55;1" dur="1.2s" repeatCount="indefinite" />
      </rect>
    </svg>
  )
}

/* ── Chess knight (geopolitics — "grand chessboard") ─ */
export function ChessKnightSVG({ size = 90, className = '', color = '#1A3D2B' }: Props) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 90 100" className={className} aria-hidden>
      {/* base */}
      <rect x="18" y="88" width="54" height="8" rx="2" fill={color} opacity="0.85" />
      <rect x="22" y="80" width="46" height="8" rx="2" fill={color} />
      {/* body */}
      <path d="M 30 80 L 30 56 Q 30 32, 50 28 L 60 22 L 64 26 L 56 38 Q 70 44, 70 62 L 70 80 Z" fill={color} />
      {/* eye */}
      <circle cx="58" cy="38" r="1.8" fill="#fff" />
      {/* mane */}
      <path d="M 50 28 Q 46 36, 36 40 Q 36 50, 30 56" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
    </svg>
  )
}
