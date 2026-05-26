import { ImageResponse } from 'next/og'

export const alt = 'Siddharth Jain — Full Stack AI Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '70px 80px',
          background: 'linear-gradient(135deg, #F8F5EE 0%, #EAF2EC 100%)',
          fontFamily: 'system-ui',
          position: 'relative',
        }}
      >
        {/* Dot grid backdrop */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(26,61,43,0.12) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            display: 'flex',
          }}
        />

        {/* Top — chip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '12px 22px',
            background: '#fff',
            border: '1.5px solid #D6EDE2',
            borderRadius: 999,
            alignSelf: 'flex-start',
            fontSize: 22,
            color: '#1A3D2B',
            fontWeight: 600,
            zIndex: 2,
          }}
        >
          <div style={{ width: 12, height: 12, background: '#3DAA72', borderRadius: 999, display: 'flex' }} />
          Open to opportunities · Frankfurt, Germany
        </div>

        {/* Middle — name + tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, zIndex: 2 }}>
          <div
            style={{
              fontSize: 138,
              fontWeight: 900,
              lineHeight: 0.95,
              color: '#1A1A18',
              letterSpacing: '-0.03em',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>Siddharth</span>
            <span style={{ color: '#1A3D2B', fontStyle: 'italic' }}>Jain.</span>
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#4A4A47',
              maxWidth: 880,
              lineHeight: 1.3,
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            Full Stack AI Engineer · $4.8M impact at Suzlon ·
            <span style={{ color: '#003F88', fontWeight: 700, marginLeft: 8 }}>now pivoting into Finance × AI</span>
          </div>
        </div>

        {/* Bottom — tags row */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', zIndex: 2, flexWrap: 'wrap' }}>
          {['Agentic AI', 'LangGraph · RAG', 'CFA Level 1', 'MSc Frankfurt School'].map(t => (
            <div
              key={t}
              style={{
                padding: '10px 22px',
                background: '#fff',
                border: '1.5px solid #E4E0D6',
                borderRadius: 999,
                fontSize: 20,
                color: '#1A3D2B',
                fontWeight: 600,
                display: 'flex',
              }}
            >
              {t}
            </div>
          ))}
          <div style={{ marginLeft: 'auto', fontSize: 22, color: '#8A9280', fontFamily: 'monospace', display: 'flex' }}>
            sidnov6@gmail.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
