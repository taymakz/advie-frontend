<template>

  <nuxt-link :to="category.url">
    <div
        class="flex flex-col items-center justify-center gap-y-4 ">


      <nuxt-img
          :src="GetImageUrl(category.image)"
          :alt="category.title_ir"
          class="relative rounded-full w-40 h-40 lg:w-32 lg:h-32 md:w-28 md:h-28 sm:w-20 sm:h-20"
          placeholder/>
      <div class="text-sm sm:text-xs text-slate-500 dark:text-slate-400">
        {{ category.title_ir }}

      </div>
    </div>

  </nuxt-link>

</template>

<script setup lang="ts">


import {CategoryDTO} from "~/models/shop/category/CategoryDTO";


const props = defineProps<{
  category: CategoryDTO,
}>()


</script>

<style scoped>

</style>