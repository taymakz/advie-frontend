<script setup lang="ts">
import { useWebsiteUtilStore } from '~/store/website/webUtilStore'
import { useBasketStore } from '~/store/shop/BasketStore'
import { useFavoriteStore } from '~/store/shop/FavoriteStore'

useHead({

  title: 'Ecommerce Project',
  htmlAttrs: {
    lang: 'fa',
    dir: 'rtl',

  },
})

const utilStore = useWebsiteUtilStore()
useAsyncData('categories', () => utilStore.setCategories())

const basketStore = useBasketStore()
const favoriteStore = useFavoriteStore()

basketStore.Init()
favoriteStore.Init()
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

<!-- <style> -->
<!-- .page-enter-active { -->
<!--  animation: page-fade-in 0.1s ease-out; -->
<!-- } -->

<!-- .page-leave-active { -->
<!--  animation: page-fade-out 0.1s cubic-bezier(1, 0.5, 0.8, 1); -->
<!-- } -->

<!-- @keyframes page-fade-in { -->
<!--  from { -->
<!--    opacity: 0; -->
<!--  } -->
<!--  to { -->
<!--    opacity: 1; -->
<!--    transform: translateY(0); -->
<!--  } -->
<!-- } -->

<!-- @keyframes page-fade-out { -->
<!--  from { -->
<!--    opacity: 1; -->
<!--    transform: translateY(0); -->
<!--  } -->
<!--  to { -->
<!--    opacity: 0; -->
<!--  } -->
<!-- } -->

<!-- .layout-enter-active { -->
<!--  transition: all 0.1s ease-out; -->
<!-- } -->

<!-- .layout-leave-active { -->
<!--  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1); -->
<!-- } -->

<!-- .layout-enter-from, -->
<!-- .layout-leave-to { -->
<!--  opacity: 0; -->
<!-- } -->
<!-- </style> -->
