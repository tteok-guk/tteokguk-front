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
      top: generateUtilities(200),
      right: generateUtilities(200),
      bottom: generateUtilities(200),
      left: generateUtilities(200),
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
      fontSize: generateUtilities(30),
      letterSpacing: generateUtilities(40),
      lineHeight: generateUtilities(40),
      colors: {
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
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
