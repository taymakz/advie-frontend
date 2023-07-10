<script setup lang="ts">
import type { ProductDetailDTO } from '~/models/shop/product/ProductDetailDTO'

defineProps<{
  product: ProductDetailDTO
}>()
</script>

<template>
  <div class="flex items-center flex-wrap gap-x-2 mb-2">
    <nuxt-link to="/" class="group flex items-center justify-center gap-x-1 py-1 px-1 ">
      <div
        class="text-sm md:text-xs text-slate-600 dark:text-slate-300 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors duration-150"
      >
        صفحه اصلی
      </div>
      <div>
        <ClientOnly>
          <Icon
            name="ic:outline-chevron-left" size="18"
            class="text-slate-600 dark:text-slate-300 group-hover:text-slate-300 dark:group-hover:text-sky-400 transition-colors duration-150"
          />
        </ClientOnly>
      </div>
    </nuxt-link>

    <nuxt-link
      v-for="(item, index) in product.breadcrumbs" :key="index" :to="item.url"
      class="group flex items-center justify-center gap-x-1 py-1 px-1 "
    >
      <div
        class="text-sm md:text-xs text-slate-600 dark:text-slate-300 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors duration-150"
      >
        {{ item.title }}
      </div>
      <div>
        <ClientOnly>
          <Icon
            name="ic:outline-chevron-left" size="18"
            class="text-slate-600 dark:text-slate-300 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors duration-150"
          />
        </ClientOnly>
      </div>
    </nuxt-link>

    <div class="text-sm  md:text-xs text-slate-600 dark:text-slate-300">
      دارچین
    </div>
  </div>
</template>
