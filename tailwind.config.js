/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        montserrat: ['Montserrat', 'Helvetica', 'Arial', 'sans-serif'],
        playfair: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
      },
      colors: {
        primary: '#000000', // Creed's black
        secondary: '#333333', // Creed's dark gray
        accent: '#F5F5F0', // Creed's light beige/cream
        dark: '#000000', // Black
        light: '#FFFFFF', // White
        gray: {
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#CCCCCC',
          500: '#999999',
          600: '#666666',
          700: '#4D4D4D',
          800: '#333333',
          900: '#1A1A1A',
        },
      },
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },
      boxShadow: {
        'minimal': '0 1px 3px rgba(0, 0, 0, 0.05)',
        'subtle': '0 1px 5px rgba(0, 0, 0, 0.1)',
      },
      letterSpacing: {
        'widest': '0.2em',
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};