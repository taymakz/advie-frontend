import type { Config } from 'tailwindcss'

import tailwind_scrollbar from 'tailwind-scrollbar'
import tailwind_forms from '@tailwindcss/forms'

export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    zIndex: {
      '0': '0',
      '10': '10',
      '20': '20',
      '30': '30',
      '40': '40',
      '50': '50',
      '-10': '-10',
      '-20': '-20',
      '-30': '-30',
      '-40': '-40',
      '-50': '-50',
      'auto': 'auto',
    },
    screens: {
      '2xl': { max: '1535px' },
      'xl': { max: '1279px' },
      'lg': { max: '1023px' },
      'md': { max: '767px' },
      'sm': { max: '639px' },
    },
    container: {
      center: true,
      padding: '15px',
    },

    extend: {
      fontFamily: {
        iranyekanThin: 'iranyekan thin',
        iranyekan: 'iranyekan base',
        iranyekanMedium: 'iranyekan medium',
        iranyekanBold: 'iranyekan bold',
      },

    },

  },
  plugins: [
    tailwind_forms(),
    tailwind_scrollbar({ nocompatible: true }),
  ],
}
