<script setup lang="ts">
const colorMode = useColorMode()

function toggleTheme() {
  if (colorMode.preference === 'light')
    colorMode.preference = 'dark'
  else
    colorMode.preference = 'light'
}
</script>

<template>
  <client-only>
    <div class="w-full mb-4">
      <div
        class="relative flex cursor-pointer items-center justify-between   gap-2 rounded-md border border-gray-200 bg-white  py-3 px-4 text-slate-600  dark:border-gray-800 dark:bg-gray-900 dark:text-slate-300 "
        @click="toggleTheme"
      >
        <span class="text-sm ">
          <template v-if="$colorMode.preference === 'dark'">
            حالت شب
          </template>
          <template v-else>
            حالت روز
          </template>
        </span>
        <span>
          <Icon
            :name="$colorMode.value === 'dark' ? 'ph:moon-stars' : 'material-symbols:sunny-outline-rounded'"
            size="24"
            class=" text-sky-500 dark:text-sky-400"
          />
        </span>
      </div>
    </div>
  </client-only>
</template>
