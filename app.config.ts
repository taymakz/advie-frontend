export default defineAppConfig({
  ui: {
    primary: 'sky',
    gray: 'cool',

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
  },
  nuxtIcon: {
    class: 'icon', // default <Icon> class applied
  },

})
