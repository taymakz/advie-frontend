<script setup lang="ts">
withDefaults(defineProps<{
  sizeClass?: string
  wrapperClass?: string
  pingClass?: string

}>(), {
  sizeClass: 'h-2 w-2',
  wrapperClass: 'bg-sky-400',
  pingClass: 'bg-sky-500',

})
</script>

<template>
  <span class="relative flex" :class="sizeClass">
    <span
      class="absolute inline-flex h-full w-full animate-ping rounded-full  opacity-75" :class="wrapperClass"
    />
    <span
      class="relative inline-flex h-2 w-2 rounded-full " :class="pingClass"
    />
  </span>
</template>
