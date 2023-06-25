<script setup lang="ts">
import type { CategoryDTO } from '~/models/shop/category/CategoryDTO'

defineProps<{
  category: CategoryDTO
}>()
</script>

<template>
  <nuxt-link
    :to="category.url"
    class="w-72 md:w-56 flex items-center justify-start col-span-6 md:col-span-12 rounded-lg border border-gray-200 hover:border-gray-300 dark:border-gray-800 hover:dark:border-gray-700  "
  >
    <div class="flex w-full items-center justify-end  gap-x-4 px-4 py-2 cursor-pointer">
      <div>
        <p class="text-sm md:text-xs text-slate-500 dark:text-slate-400">
          {{ category.title_ir }}
        </p>
      </div>
      <div class="w-24 h-24 md:w-16 md:h-16">
        <nuxt-img
          :src="GetImageUrl(category.image)" :alt="category.title_ir" :title="category.title_ir" placeholder
          class="rounded-full w-full h-auto"
        />
      </div>
    </div>
  </nuxt-link>
</template>

<style scoped>

</style>
