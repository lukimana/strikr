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
        tertiary: '#120C18',
        secondary: '#0C0B0E',
        'secondary-border': '#1D1D29',
        'primary-500': '#06000C',
        'primary-600': '#03000B',
        'primary-border': '#E5E5E5',
        accent: '#B592FF',
        goalie: '#F66618',
        forward: '#F69E18',
        subtle: '#85828B',
        win: '#A4FF95',
        loss: '#FF7979',
        support: '#17161B',
        'support-border': '#27262B'
      },
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
        '17': 'repeat(17, minmax(0, 1fr))',
        '18': 'repeat(18, minmax(0, 1fr))',
        '19': 'repeat(19, minmax(0, 1fr))',
        '20': 'repeat(20, minmax(0, 1fr))',
      }
    },
  }
}
