<script setup lang="ts">
import { useWebsiteUtilStore } from '~/store/website/webUtilStore'

const utilStore = useWebsiteUtilStore()
const children = computed(() => {
  const categories = utilStore.categories || []
  return categories.flatMap(category => [category, ...category.children])
})
</script>

<template>
  <div v-if="children.length > 0" class="container py-2">
    <div class="bg-white dark:bg-gray-900  rounded-lg py-2 px-4">
      <div class="flex justify-center mb-6">
        <div class="flex items-center justify-center">
          <h1 class="text-xl font-iranyekanBold text-slate-500 dark:text-slate-400">
            دسته بندی ها
          </h1>

          <div>
            <!--  Todo icon  -->
          </div>
        </div>
      </div>

      <div
        class="grid grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 items-center place-self-end  gap-y-4"
      >
        <div v-for="category in children.slice(0, 6)" :key="category.id">
          <BaseCardCategoryCircle :category="category" />
        </div>
      </div>
    </div>
  </div>
</template>
