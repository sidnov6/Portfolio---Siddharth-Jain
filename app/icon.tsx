import { ImageResponse } from 'next/og'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1A3D2B 0%, #3DAA72 100%)',
          color: '#F8F5EE',
          fontSize: 36,
          fontWeight: 900,
          fontFamily: 'serif',
          letterSpacing: '-0.04em',
          borderRadius: 14,
        }}
      >
        SJ
      </div>
    ),
    { ...size }
  )
}
