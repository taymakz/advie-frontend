<script setup lang="ts">
import { useWebsiteUtilStore } from '~/store/website/webUtilStore'
import { useBasketStore } from '~/store/shop/BasketStore'

useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/ico',
      href: '/images/favicon.ico',
    },
  ],
  meta: [
    { property: 'og:locale', content: 'fa_IR' },
  ],

  htmlAttrs: {
    lang: 'fa',
    dir: 'rtl',

  },

})
useSeoMeta({
  title: 'فروشگاه اینترنتی ادویه',
})
const utilStore = useWebsiteUtilStore()
useAsyncData('categories', () => utilStore.setCategories())

const basketStore = useBasketStore()

basketStore.Init()
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator :height="3" />

      <NuxtPage />
      <UNotifications />
    </NuxtLayout>
  </div>
</template>
