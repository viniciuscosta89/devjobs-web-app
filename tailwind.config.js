/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'rotate-border': 'rotate-border 2s linear infinite'
      },
      colors: {
        violet: {
          400: 'hsl(235deg 69% 61%)',
          100: 'hsl(235deg 82% 77%)'
        },
        'very-dark-blue': 'hsl(219deg 29% 14%)',
        midnight: 'hsl(220deg 29% 10%)',
        white: 'hsl(0deg 0% 100%)',
        offwhite: 'hsl(0deg 0% 95%)',
        gray: {
          900: 'hsl(214deg 17% 51%)',
          500: 'hsl(0deg 0% 59%)',
          400: 'hsl(212deg 23% 69%)',
          100: 'hsl(210deg 22% 96%)'
        }
      },
      content: {
        check: 'url("/assets/images/icon-check.svg")'
      },
      keyframes: {
        'rotate-border': {
          from: {
            transform: 'rotate(0deg)'
          },
          to: {
            transform: 'rotate(360deg)'
          }
        }
      },
      spacing: {
        18: '4.5rem'
      },
      lineHeight: {
        6: '1.125rem',
        7: '1.5rem',
        8: '1.8125rem',
        9: '2.125rem'
      }
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.75rem',
      '4xl': '2rem',
      '5xl': '2.5rem'
    }
  },
  plugins: []
};
