/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eeeaff',
          100: '#d1c6ff',
          200: '#b49dff',
          300: '#9775ff',
          400: '#7a4dff',
          500: '#6224ff',
          600: '#5511ff',
          700: '#4400e6',
          800: '#3600b3',
          900: '#280080'
        },
        secondary: {
          50: '#fff2ec',
          100: '#ffdfd0',
          200: '#ffc1a8',
          300: '#ff9c7a',
          400: '#ff774c',
          500: '#ff5c2b',
          600: '#ff3c00',
          700: '#cc3000',
          800: '#992400',
          900: '#661800'
        },
        accent: {
          50: '#dafff8',
          100: '#b0fff0',
          200: '#79ffe4',
          300: '#33ffd4',
          400: '#00f0c0',
          500: '#00d8ab',
          600: '#00bf96',
          700: '#00a683',
          800: '#00805f',
          900: '#00664d'
        },
        background: {
          DEFAULT: '#0a0823',
          card: '#13113a',
          light: '#1e1a54',
          dark: '#06051a',
          element: '#252168'
        },
        surface: {
          DEFAULT: '#13113a',
          hover: '#252168',
          active: '#322c80',
          muted: '#0c0b29'
        },
        text: {
          primary: '#f5f3ff',
          secondary: '#d7d3ff',
          muted: '#9d96d3',
          dark: '#5f598c'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
        'card': '0 8px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 15px rgba(120, 77, 255, 0.3)',
        'accent-glow': '0 0 12px rgba(0, 240, 192, 0.4)'
      },
      screens: {
        'xs': '480px'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-subtle': 'linear-gradient(to bottom right, var(--tw-gradient-stops))'
      }
    }
  },
  plugins: [],
}