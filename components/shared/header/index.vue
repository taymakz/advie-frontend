<script setup lang="ts">
import { useWebsiteUtilStore } from '~/store/website/webUtilStore'

const utilStore = useWebsiteUtilStore()
</script>

<template>
  <div>
    <header class="z-30 fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-gray-200 dark:shadow-gray-600 shadow-sm">
      <!-- Desktop Header -->
      <SharedHeaderDesktop />
      <!-- Mobile Header -->
      <SharedHeaderMobile />
      <div
        v-if="utilStore.headerOverlay"

        class="fixed inset-0 w-full h-screen bg-black opacity-50  transition-opacity duration-150 " :class="[`z-${utilStore.zIndex}`] "
      />
    </header>
  </div>
</template>

<style scoped>

</style>
