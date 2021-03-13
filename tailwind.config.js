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
      },
      zIndex: {
        '60': 60,
        '70': 70,
        '80': 80,
        '90': 90,
        '100': 100,
        '110': 110,
        '120': 120,
        '130': 130,
        '140': 140,
        '150': 150
      }
    },
    fontFamily: {
      'display': ['Manrope', 'sans-serif'],
      'body': ['Manrope', 'sans-serif'],
    },
  },
  variants: {
    extend: {
      borderWidth: ['last'],
    }
  },
  plugins: [],
}
