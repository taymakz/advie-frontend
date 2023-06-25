<script setup lang="ts">
</script>

<template>
  <div>
    <div role="status" class=" px-4 py-4  border border-gray-200 rounded-lg shadow animate-pulse dark:border-gray-700">
      <!-- image -->
      <div class="flex items-center justify-center  mb-4 bg-gray-300 rounded dark:bg-gray-700">
        <Icon name="bi:image-alt" class="w-full h-auto md:max-w-64 md:max-h-64 !text-gray-200 dark:!text-gray-600" />
      </div>

      <!-- title -->
      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-1" />
      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2" />

      <div class="flex  justify-between">
        <div class="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-10 mb-2.5" />
        <div class="flex flex-col">
          <div class="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-2.5" />
          <div class="flex justify-end">
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-12 mb-2.5 " />
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <div class="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-2.5" />
      </div>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>
