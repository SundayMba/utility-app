/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}', './features/**/*.{js,jsx,ts,tsx}', './data/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#4F7BF7',
        aqua: '#47C2C0',
        canvas: '#F4F7FB',
        coral: '#FF7A85',
        ink: '#183B6B',
        lilac: '#95A4FF',
        line: '#DCE6F2',
        muted: '#6D7A90',
        success: '#1F8B71',
        surface: '#FFFFFF',
        warm: '#F5B64D',
      },
      fontFamily: {
        body: ['Manrope_500Medium'],
        display: ['Manrope_700Bold'],
        heading: ['Manrope_600SemiBold'],
        light: ['Manrope_400Regular'],
      },
    },
  },
  plugins: [],
};
