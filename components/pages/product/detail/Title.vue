<script setup lang="ts">
import type { ProductDetailDTO } from '~/models/shop/product/ProductDetailDTO'

defineProps<{
  product: ProductDetailDTO
}>()
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <div>
      <h1 class="text-lg text-slate-700 dark:text-slate-200">
        {{ product.title_ir }}
      </h1>
    </div>
    <div class="flex items-center  gap-x-2">
      <div>
        <h2 class="text-sm text-slate-500 dark:text-slate-400">
          {{ product.title_en }}
        </h2>
      </div>
      <div class="h-[1px] flex-grow bg-gray-200 dark:bg-gray-700" />
    </div>
  </div>
</template>

<style scoped>

</style>
