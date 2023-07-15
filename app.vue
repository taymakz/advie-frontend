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

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.1s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active {
  transition: all 0.1s ease-out;
}

.layout-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}
</style>
