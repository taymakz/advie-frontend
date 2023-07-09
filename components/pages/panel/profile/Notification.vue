<script setup lang="ts">
const phoneNotification = ref(false)
const emailNotification = ref(false)
// const loading = ref(false)
</script>

<template>
  <div
    class="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-4  "
  >
    <div>
      <h4 class="text-slate-500 dark:text-slate-400">
        تنظیمات اعلان ها
      </h4>
    </div>
    <div class="flex items-center justify-evenly gap-x-4">
      <div class="flex items-center gap-x-2">
        <label for="emailNotification" class="text-sm text-slate-600 dark:text-slate-300"> ایمیل</label>
        <UToggle
          id="emailNotification" v-model="emailNotification" on-icon="i-heroicons-check-20-solid"
          off-icon="i-heroicons-x-mark-20-solid"
        />
      </div>
      <div class="flex items-center gap-x-2">
        <label for="phoneNotification" class="text-sm text-slate-600 dark:text-slate-300"> پیامک</label>

        <UToggle
          id="phoneNotification" v-model="phoneNotification" on-icon="i-heroicons-check-20-solid"
          off-icon="i-heroicons-x-mark-20-solid"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
