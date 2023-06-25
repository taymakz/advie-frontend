<script setup lang="ts">
withDefaults(defineProps<{
  wrapperClass?: string
  bgClass?: string
}>(), {
  wrapperClass: '',
  bgClass: '',
})

const { isDesktop } = useDevice()
const card = ref<HTMLDivElement>()
const { elementX, elementY } = useMouseInElement(card)
</script>

<template>
  <div>
    <div
      ref="card"

      :style="isDesktop ? { '--x': `${elementX}px`, '--y': `${elementY}px` } : {}"
      class=" border-gradient group relative transition  border-transparent border before:absolute before:-inset-px before:h-[calc(100%+2px)] before:w-[calc(100%+2px)] "
      :class="[wrapperClass]"
    >
      <div
        class="absolute inset-0  transition-colors duration-300"
        :class="[bgClass]"
      />
      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>
