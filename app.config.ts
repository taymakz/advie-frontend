export default defineAppConfig({
  ui: {
    primary: 'sky',
    gray: 'cool',

    button: {
      default: {
        loadingIcon: 'i-mdi-loading',
      },
      padding: {
        '2xs': 'px-2 py-1',
        'xs': 'px-2.5 py-1.5',
        'sm': 'px-2.5 py-1.5',
        'md': 'px-3 py-2',
        'lg': 'px-3.5 py-2.5',
        'xl': 'px-3.5 py-3',
      },
      variant: {
        solid: 'shadow-sm text-white dark:text-slate-200 bg-{color}-600 hover:bg-{color}-700 disabled:bg-{color}-600 dark:bg-{color}-700 hover:dark:bg-{color}-600 dark:disabled:bg-{color}-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-{color}-500 dark:focus-visible:outline-{color}-400',
      },
    },
    notifications: {
      // Show toasts at the top right of the screen
      position: 'bottom-0 left-0',
      width: 'w-[440px] md:w-full',
      title: 'text-sm md:text-xs font-medium text-gray-900 dark:text-white',

    },
    notification: {
      padding: 'px-4 py-5',
    },

    skeleton: {
      background: 'bg-gray-200 dark:bg-gray-800',
      rounded: 'rounded-lg',
    },
    tooltip: {
      base: 'visible md:invisible h-6 px-2 py-1 text-xs font-normal truncate',
    },
    modal: {
      wrapper: 'relative z-50',
      inner: 'fixed inset-0 overflow-y-auto main-scroll',
      container: 'flex min-h-full items-center justify-center text-center',
      padding: 'md:p-4',
      base: 'relative text-left rtl:text-right overflow-hidden my-8 sm:my-0 w-full flex flex-col',
      overlay: {
        base: 'fixed inset-0 transition-opacity',
        background: 'bg-gray-200/75 dark:bg-gray-800/75',
        transition: {
          enter: 'ease-out duration-300',
          enterFrom: 'opacity-0',
          enterTo: 'opacity-100',
          leave: 'ease-in duration-200',
          leaveFrom: 'opacity-100',
          leaveTo: 'opacity-0',
        },
      },

      width: 'max-w-lg',

    },
    select: {
      padding: {
        '2xs': 'px-2 py-1',
        'xs': 'px-2.5 py-1.5',
        'sm': 'px-2.5 py-1.5',
        'md': 'px-3 py-2',
        'lg': 'px-3.5 py-2.5',
        'xl': 'px-3.5 py-2.5',
      },
    },
    selectMenu: {
      base: 'relative focus:outline-none overflow-y-auto scroll-py-1 main-scroll',
      option: {
        base: 'cursor-pointer select-none relative flex items-center justify-between gap-1',
        padding: 'py-3 px-2',
      },
    },

  },

})
