export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxthq/ui',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    '@nuxtjs/device',
    'nuxt-icon',
    'nuxt-swiper',
    'nuxt-delay-hydration',
    '@nuxtjs/html-validator',
  ],
  spaLoadingTemplate: false,
  routeRules: {
    '/panel': { ssr: false },
    '/panel/**': { ssr: false },
    '/panel/**/**': { ssr: false },

    '/auth/**': { ssr: false },
    '/checkout/': { ssr: false },
    '/checkout/**': { ssr: false },
  },
  delayHydration: {
    // enables nuxt-delay-hydration in dev mode for testing
    debug: process.env.NODE_ENV === 'development',
  },
  device: {
    refreshOnResize: true,
  },
  extends: ['nuxt-lego'],
  vite: {
    vue: {
      script: {
        defineModel: true,
      },
    },
  },
  runtimeConfig: {

    public: {
      baseApi: '', // Base Api environment variable
      baseMedia: '', // Base Media environment variable
      domain: '', // Domain environment variable
    },
  },
  image: {
    domains: process.env.NUXT_PUBLIC_IMAGE_DOMAINS?.split(',') ?? [],
    alias: {
      media: process.env.NUXT_PUBLIC_BASE_MEDIA ?? '',
    },
  },
  ui: {
    icons: ['mdi'],
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: true,
    viewer: false,
  },

  colorMode: {
    preference: 'light', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    classSuffix: '',
    storageKey: 'theme',
  },

  app: {

    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in',

    },

  },
})
