<script setup lang="ts">
import type { CategoryDTO } from '~/models/shop/category/CategoryDTO'

defineProps<{
  category: CategoryDTO
}>()
</script>

<template>
  <div>
    <nuxt-link :to="category.url">
      <div
        class="flex flex-col items-center justify-center gap-y-4 "
      >
        <BaseBeutyBorderColor
          wrapper-class="before:rounded-full rounded-xl items-center justify-center flex"
          bg-class="rounded-[11px] "
        >
          <nuxt-img
            :src="GetImageUrl(category.image)"
            :alt="category.title_ir"
            class="relative rounded-full w-40 h-40 lg:w-32 lg:h-32 md:w-28 md:h-28 sm:w-20 sm:h-20"
            placeholder
          />
        </BaseBeutyBorderColor>
        <div class="text-sm sm:text-xs text-slate-500 dark:text-slate-400">
          {{ category.title_ir }}
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<style scoped>

</style>
