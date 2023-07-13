<script setup lang="ts">

</script>

<template>
  <ClientOnly>
    <div
      class="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 hover:dark:bg-gray-700 flex items-center justify-between rounded-xl py-3 px-4 cursor-pointer"
    >
      <div class="text-sm text-slate-700 dark:text-slate-300">
        جستجو کنید ...
      </div>
      <div>
        <Icon name="iconoir:search" size="22" class="text-sky-500 dark:text-sky-400" />
      </div>
    </div>
  </ClientOnly>
</template>
