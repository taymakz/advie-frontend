<script setup lang="ts">
</script>

<template>
  <div>
    <div role="status" class="w-48 px-4 py-3  border border-gray-200 rounded-lg shadow animate-pulse dark:border-gray-700">
      <!-- image -->
      <div class="flex items-center justify-center w-40 h-40 mb-4 bg-gray-300 rounded dark:bg-gray-700">
        <Icon name="bi:image-alt" size="130" class="!text-gray-200 dark:!text-gray-600" />
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
