<template>


    <button
      type="button"
      :class="[
        {'w-full':wFull},
        {'text-slate-200 dark:text-slate-200 bg-sky-600 hover:bg-sky-700 dark:bg-sky-800 dark:hover:bg-sky-600  ':theme=='sky'},
        {'text-slate-200 dark:text-slate-200 bg-rose-600 hover:bg-rose-700 dark:bg-rose-800 hover:dark:bg-rose-600 ':theme=='rose'},
    ]"
      class="flex items-center justify-center gap-x-2  text-sm sm:text-xs  rounded-lg transition-colors duration-150
disabled:bg-gray-200  disabled:hover:bg-gray-300 disabled:hover:shadow-none
dark:disabled:bg-gray-700  dark:disabled:hover:bg-gray-800 dark:disabled:hover:shadow-none
disabled:text-slate-500 disabled:dark:text-slate-400
"

      :disabled="loading"

  >
    <template v-if="loading">
      <Icon name="svg-spinners:ring-resize" class="text-sky-600 dark:text-sky-500" size="20px"/>

    </template>
    <template v-else>
      <span>
        <slot/>

    </span>
      <Icon v-if="icon" :name="icon" :size="iconSize" :class="[iconClasses]" />
    </template>

  </button>


</template>

<script setup lang="ts">
withDefaults(defineProps<{
  loading?: boolean,

  theme?: 'sky' | 'rose',
  icon?: string,
  iconClasses?: string,
  iconSize?: string,
  wFull?: boolean,
}>(), {
  loading: false,
  skeleton: false,
  theme: "sky",
  icon: "",
  iconClasses: "",
  iconSize: "20",
  wFull: false,
})

</script>

<style scoped>

</style>