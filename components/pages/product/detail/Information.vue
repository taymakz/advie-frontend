<script setup lang="ts">
import type { ProductDetailDTO } from '~/models/shop/product/ProductDetailDTO'

defineProps<{
  product: ProductDetailDTO

}>()
</script>

<template>
  <div>
    <div class="flex flex-col gap-y-2">
      <div v-for="(item, index) in product.properties" :key="index" class="flex flex-col gap-y-2">
        <div class="text-sm font-iranyekanBold  text-slate-500 dark:text-slate-400 " v-text="item.property.name" />
        <div class="text-xs  font-medium text-slate-500 dark:text-slate-400 leading-5" v-html="item.value" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
