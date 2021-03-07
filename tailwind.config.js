module.exports = {
  purge: false,
  theme: {
    extend: {
      screens: {
        '2xl': '1600px',
        '3xl': '1920px',
      },
      fontSize: {
        '2xs': '.60rem',
      },
      textColor: {
        'primary': '#1f1f1f',
      },
      colors: {
        'peach': '#ff5563',
        'dirty': '#f7f6f6',
        'custom-gray': '#f2f2f2',
        'input-border': '#00000033',
        'input-bg': '#f7f7f7'
      },
      minHeight: {
        '20': '5rem',
        '12': '3rem',
        '8': '2rem',
      },
      boxShadow: {
        'custom': '0 1px 5px #ccc'
      }
    },
    fontFamily: {
      'display': ['Manrope', 'sans-serif'],
      'body': ['Manrope', 'sans-serif'],
    },
  },
  variants: {},
  plugins: [],
}
