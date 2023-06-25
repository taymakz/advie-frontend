<template>
<div class="container py-2">
<div class="grid grid-cols-4 md:grid-cols-2 items-center gap-4">
    <div v-for="i in 4">
        <img :src="`/banners/banner-sm-0${i}.jpg`" alt="Banners" class="rounded-lg md:max-h-[200px] w-full">
    </div>
</div>

</div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>