import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F8F5EE',
        'cream-dark': '#F0EDE4',
        'cream-card': '#FFFEF9',
        'green-forest': '#1A3D2B',
        'green-mid': '#2D7A52',
        'green-vivid': '#3DAA72',
        'green-light': '#E8F5EE',
        'green-pale': '#F0F9F4',
        'suzlon-orange': '#F04E23',
        'gt-gold': '#B3A369',
        'emory-navy': '#012169',
        'emory-gold': '#FFCF01',
        'iitj-blue': '#003580',
        'fs-green': '#006B38',
        'vit-maroon': '#8B1A1A',
        'manutd-red': '#DA291C',
        'basketball-orange': '#E87722',
        'warm-coral': '#E07A5F',
        'warm-gold': '#D4A843',
        ink: '#1A1A18',
        'ink-light': '#4A4A47',
        muted: '#8A9280',
        border: '#E4E0D6',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'turbine': 'turbine 3s linear infinite',
        'turbine-slow': 'turbine 5s linear infinite',
        'basketball-bounce': 'bbBounce 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite',
        'basketball-spin': 'bbSpin 0.8s linear infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'float-gentle': 'floatGentle 5s ease-in-out infinite',
        'float-gentle-slow': 'floatGentle 7s ease-in-out 1s infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'signal-wave': 'signalWave 2s ease-out infinite',
        'draw-line': 'drawLine 1.5s ease-out forwards',
        'count-up': 'countUp 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-up-delay': 'fadeUp 0.7s ease-out 0.2s forwards',
        'fade-up-delay-2': 'fadeUp 0.7s ease-out 0.4s forwards',
        'slide-right': 'slideRight 0.7s ease-out forwards',
        'blob-morph': 'blobMorph 8s ease-in-out infinite',
        'globe-spin': 'globeSpin 20s linear infinite',
        'scroll-hint': 'scrollHint 2s ease-in-out infinite',
      },
      keyframes: {
        turbine: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        bbBounce: {
          '0%, 100%': { transform: 'translateY(0) scaleY(1)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateY(-30px) scaleY(1)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
          '95%': { transform: 'translateY(2px) scaleY(0.9) scaleX(1.1)', animationTimingFunction: 'linear' },
        },
        bbSpin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-12px) rotate(1deg)' },
          '66%': { transform: 'translateY(-6px) rotate(-1deg)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.1)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.08)' },
          '70%': { transform: 'scale(1)' },
        },
        signalWave: {
          '0%': { opacity: '1', transform: 'scale(0.5)' },
          '100%': { opacity: '0', transform: 'scale(2)' },
        },
        drawLine: {
          from: { strokeDashoffset: '1000' },
          to: { strokeDashoffset: '0' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          from: { opacity: '0', transform: 'translateX(-24px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        blobMorph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '25%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '50%': { borderRadius: '50% 60% 30% 60% / 30% 60% 70% 40%' },
          '75%': { borderRadius: '60% 40% 60% 30% / 70% 30% 50% 60%' },
        },
        globeSpin: {
          from: { transform: 'rotateY(0deg)' },
          to: { transform: 'rotateY(360deg)' },
        },
        scrollHint: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.6' },
          '50%': { transform: 'translateY(8px)', opacity: '1' },
        },
        countUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'green-gradient': 'linear-gradient(135deg, #1A3D2B 0%, #2D7A52 100%)',
        'cream-gradient': 'linear-gradient(135deg, #F8F5EE 0%, #F0EDE4 100%)',
        'warm-gradient': 'linear-gradient(135deg, #F8F5EE 0%, #E8F5EE 100%)',
      },
    },
  },
  plugins: [],
}
export default config
