module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'arabian-indigo': '#2B2A6A',
        'arabian-gold': '#D4AF37',
        'arabian-sand': '#F4E9DA'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['"Playfair Display"', 'serif']
      }
    },
  },
  plugins: [],
}
