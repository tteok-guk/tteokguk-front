import type { Config } from 'tailwindcss'
import { generateUtilities } from './src/utils/generateUtilities'

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      gap: generateUtilities(100),
      columnGap: generateUtilities(100),
      rowGap: generateUtilities(100),
      inset: generateUtilities(200),
      width: generateUtilities(600),
      minWidth: generateUtilities(600),
      maxWidth: generateUtilities(600),
      height: generateUtilities(600),
      minHeight: generateUtilities(600),
      maxHeight: generateUtilities(600),
      margin: generateUtilities(200),
      marginTop: generateUtilities(200),
      marginRight: generateUtilities(200),
      marginBottom: generateUtilities(200),
      marginLeft: generateUtilities(200),
      padding: generateUtilities(200),
      paddingTop: generateUtilities(200),
      paddingRight: generateUtilities(200),
      paddingBottom: generateUtilities(200),
      paddingLeft: generateUtilities(200),
      border: generateUtilities(20),
      borderWidth: generateUtilities(20),
      borderRadius: generateUtilities(20),
      fontSize: generateUtilities(50),
      letterSpacing: generateUtilities(40),
      lineHeight: generateUtilities(40),
      fontFamily: {
        soyo: ['var(--font-soyo)'],
        soyoThin: ['var(--font-soyo_thin)'],
      },
      screens: {
        sm: '320px', // min width, galaxy s9+
        md: '375px', // main width
        lg: '430px', // iphone pro max
        xl: '575px', // max-with, tablet, pc
      },
      colors: {
        pr: {
          100: '#CCE4E9',
          200: '#99C9D3',
          300: '#66AEBD',
          400: '#3392A7',
          500: '#007791',
          600: '#005F74',
          700: '#004857',
          800: '#00303A',
          900: '#00181D',
        },
        gr: {
          100: '#E0E0E0',
          200: '#C2C2C2',
          300: '#A3A3A3',
          400: '#858585',
          500: '#666',
          600: '#525252',
          700: '#3D3D3D',
          800: '#292929',
          900: '#141414',
        },
        bg: '#F2F7F9',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar')({ nocompatible: true })],
  variants: {
    scrollbar: ['rounded'],
  },
} satisfies Config

export default config
