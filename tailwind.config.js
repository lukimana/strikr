/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#30FAA2',
        primary: '#101211',
        secondary: '#1E1F1F',
        'secondary-darker': '#1B1D1C',
        tertiary: '#2F3331',
        win: '#00FF19',
        loss: '#FF0000',
        subtle: '#7D8A88'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
