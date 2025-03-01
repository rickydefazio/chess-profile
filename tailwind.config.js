/** @type {import('tailwindcss').Config} */

const tailwindConfig = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      keyframes: {
        flash: {
          '0%': { opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        flash: 'flash 300ms ease-in-out',
        fadeIn: 'fadeIn 300ms ease-in-out'
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['dracula']
  }
};

export default tailwindConfig;
