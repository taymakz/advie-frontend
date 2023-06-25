<template>
  <div class="flex items-center flex-wrap gap-x-2 mb-2">

    <nuxt-link to="/" class="group flex items-center justify-center gap-x-1 py-1 px-1 ">
      <div
          class="text-sm md:text-xs text-slate-500 dark:text-slate-400 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors duration-150">
        صفحه اصلی
      </div>
      <div>
        <Icon name="ic:outline-chevron-left" size="18"
              class="text-slate-500 dark:text-slate-400 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors duration-150"/>

      </div>
    </nuxt-link>

    <nuxt-link v-for="(item,index) in breadcrumbs" :key="index" :to="item.url" class="group flex items-center justify-center gap-x-1 py-1 px-1 ">
      <div
          class="text-sm md:text-xs text-slate-500 dark:text-slate-400 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors duration-150">
        {{item.title}}
      </div>
      <div>
        <Icon name="ic:outline-chevron-left" size="18"
              class="text-slate-500 dark:text-slate-400 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors duration-150"/>

      </div>
    </nuxt-link>

    <div class="text-sm  md:text-xstext-slate-500 dark:text-slate-400">
      دارچین
    </div>

  </div>

</template>

<script setup lang="ts">
import {ProductCategoryBreadcrumbs} from "~/models/shop/product/ProductDetailDTO";

defineProps<{
  breadcrumbs: ProductCategoryBreadcrumbs[]
}>()

</script>
