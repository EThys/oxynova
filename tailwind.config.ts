import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app/**/*.vue',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Palette officielle Oxynova RDC
          900: '#031a3a', // primary-deep
          800: '#082755', // primary-dark
          700: '#174794', // primary
          600: '#2f7de1', // primary-light
          500: '#3d8eeb',
          400: '#57c7dc', // accent
          300: '#8ad7e6',
          200: '#c5ebf3',
          100: '#e9f8fb', // accent-soft
          50: '#f2f6fb', // light
        },
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
