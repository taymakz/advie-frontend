<script setup lang="ts">
defineProps({
  haveChild: {
    type: Boolean,
    default: true,
  },
  titleLink: {
    type: String,
    default: '',
  },
})

const show = ref(false)
const contents = ref<HTMLElement>()

const { height: targetHeight } = useElementSize(contents, undefined, {
  box: 'border-box',
})

const height = computed(() => (show.value ? targetHeight.value : 0))

const toggle = () => (show.value = !show.value)
</script>

<template>
  <div

    class="group rounded-lg  transition duration-500  "
  >
    <div class="flex justify-between cursor-pointer items-center py-4" @click="toggle">
      <div
        class="text-base text-slate-600 dark:text-slate-300 transition "
      >
        <template v-if="titleLink">
          <nuxt-link :to="titleLink">
            <slot name="title" />
          </nuxt-link>
        </template>
        <template v-else>
          <slot name="title" />
        </template>
      </div>

      <div
        v-if="haveChild"
      >
        <Icon
          name="ic:outline-chevron-left" size="18"
          class="text-sky-600 dark:text-sky-500 transition-transform duration-150"
          :class="{ '-rotate-90 ': show }"
        />
      </div>
    </div>

    <div
      v-if="haveChild"

      :style="{
        height: `${height}px`,
      }"
      class="overflow-hidden px-5 transition-[height] duration-500 will-change-[height] md:px-6"
    >
      <div ref="contents" class="pb-5 md:pb-6">
        <slot />
      </div>
    </div>
  </div>
</template>
