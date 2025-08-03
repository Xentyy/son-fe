/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#6B5DE8',
        'accent': '#5446C8',
        'light-bg': '#000000ff', // Biraz daha açık bir arka plan
        'positive': '#22C55E',
        'negative': '#EF4444',
        'neutral': '#F59E0B',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}