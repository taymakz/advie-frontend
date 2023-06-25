import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [],
  darkMode: 'class',
  theme: {
    zIndex: {
      0: '0',
      10: '10',
      20: '20',
      30: '30',
      40: '40',
      50: '50',
      '-10': '-10',
      '-20': '-20',
      '-30': '-30',
      '-40': '-40',
      '-50': '-50',
      auto: 'auto'
    },
    screens: {
      '2xl': { max: '1535px' },
      xl: { max: '1279px' },
      lg: { max: '1023px' },
      md: { max: '767px' },
      sm: { max: '639px' }
    },
    container: {
      center: true,
      padding: '15px'
    },

    extend: {
      fontFamily: {
        iranyekan: 'iranyekan',
        iranyekanMedium: 'iranyekan medium',
        iranyekanBold: 'iranyekan bold',
        iranyekanFanum: 'iranyekan Fanum'
      }

    }

  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar')({ nocompatible: true })
  ]
}
