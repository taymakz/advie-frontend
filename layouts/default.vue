<script setup lang="ts">
</script>

<template>
  <div>
    <div class="flex flex-col min-h-screen">
      <SharedHeader />

      <main class="flex-grow bg-gray-100 dark:bg-gray-950 pt-28 md:pt-32 ">
        <slot />
      </main>

      <SharedFooter />
    </div>
  </div>
</template>
