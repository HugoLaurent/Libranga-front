module.exports = {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    extend: {
      colors: {
        bgcolor: '#FF6363',
        primary: '#EB2345',
        secondary: '#7073EE',
        tertiary: '#545454',
      },
      fontFamily: {
        mainFont: ['Roboto', 'sans-serif'],
        secondaryFont: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
