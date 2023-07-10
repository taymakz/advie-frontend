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
  ],
  spaLoadingTemplate: false,
  routeRules: {
    '/**': process.env.NODE_ENV === 'development'
      ? {}
      : {
          cache: {
            swr: true,
            maxAge: 120,
            staleMaxAge: 60,
            headersOnly: true,
          },
        },
    '/product/**': process.env.NODE_ENV === 'development'
      ? {}
      : {
          cache: {
            swr: true,
            maxAge: 120,
            staleMaxAge: 60,
            headersOnly: true,
          },
        },
    '/product/**/**': process.env.NODE_ENV === 'development'
      ? {}
      : {
          cache: {
            swr: true,
            maxAge: 120,
            staleMaxAge: 60,
            headersOnly: true,
          },
        },

    '/panel': { ssr: false },
    '/panel/**': { ssr: false },
    '/panel/**/**': { ssr: false },

    '/auth/**': { ssr: false, prerender: true },
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
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: false,
    exposeLevel: 2,
    injectPosition: 'first',
    viewer: true,
  },
  ui: {
    safelistColors: ['sky', 'red', 'green'],
    icons: ['mdi'],
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
