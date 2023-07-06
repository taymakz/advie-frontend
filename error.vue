<script setup lang="ts">
import { useWebsiteUtilStore } from '~/store/website/webUtilStore'
import { useBasketStore } from '~/store/shop/BasketStore'

defineProps({
  error: Object,
})
const utilStore = useWebsiteUtilStore()
const basketStore = useBasketStore()

basketStore.Init()
useAsyncData('categories', () => utilStore.setCategories())
</script>

<template>
  <div>
    error 404
  </div>
</template>
