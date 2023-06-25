<script setup lang="ts">

</script>

<template>
  <div class="container py-2">
    <div class="grid grid-cols-4 md:grid-cols-2 items-center gap-4">
      <div v-for="i in 4" :key="i">
        <img :src="`/banners/banner-sm-0${i}.jpg`" alt="Banners" class="rounded-lg md:max-h-[200px] w-full">
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
