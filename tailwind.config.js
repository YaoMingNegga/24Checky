/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Rich Forest Green & Cream Palette (as in Image 2)
        forest: '#183B32',       // Primary Deep Forest Green background
        forestDark: '#122923',   // Deepest green
        forestCard: '#1F4238',   // Rich layered green for cards
        forestHover: '#264E43',  // Slightly lighter green for hover states
        beige: '#D8C7A5',        // Warm Beige / Champagne for rules, borders, accents
        cream: '#F5F0E6',        // Soft Cream for typography and highlights
        sage: '#A7B5A0',         // Muted Sage for secondary metadata
        charcoal: '#292D27',     // Charcoal for contrast
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive'],
      },
      letterSpacing: {
        'editorial': '0.15em',
        'wide-label': '0.18em',
      },
      boxShadow: {
        'editorial': '0 20px 40px -15px rgba(18, 41, 35, 0.6)',
        'card': '0 10px 25px -5px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
};
