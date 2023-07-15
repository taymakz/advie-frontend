<script setup lang="ts">
definePageMeta({
  layout: 'user-panel',
})

const pageNumber = ref(1)
const takeNumber = ref(6)
// const {
//   data: result,
//   refresh,
//   pending,
// } = await useAsyncData('panel_favorite', () => GetUserRecent(pageNumber.value, takeNumber.value))
</script>

<template>
  <div>
    <div class="bg-white dark:bg-gray-800  rounded-lg p-4">
      <!-- Section Title -->
      <div class="flex mb-5">
        <h1 class="relative text-lg text-slate-700 dark:text-slate-200 pb-2 select-none ">
          پیام ها
          <span class="absolute right-0 bottom-0 w-full bg-sky-500 rounded-full h-[3px]" />
        </h1>
      </div>
      <!-- Section Content -->
    </div>
  </div>
</template>
