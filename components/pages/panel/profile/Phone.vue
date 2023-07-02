<script setup lang="ts">
import { useAuthenticateStore } from '~/store/account/AuthenticateStore'

const authStore = useAuthenticateStore()

const isOpenModal = ref(false)
</script>

<template>
  <div>
    <div
      class="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-4 cursor-pointer select-none"
      @click="isOpenModal = true"
    >
      <div class="flex flex-col gap-y-2">
        <div class="flex items-center gap-x-2">
          <h4 class="text-slate-500 dark:text-slate-400">
            شماره موبایل
          </h4>
          <div v-if="!authStore.currentUser?.phone">
            <BaseBeutyPing />
          </div>
        </div>
        <p class="text-slate-600 dark:text-slate-300">
          {{ authStore.currentUser?.phone }}
        </p>
      </div>
      <div>
        <Icon
          v-if="authStore.currentUser?.phone" name="ic:baseline-mode-edit" size="24"
          class="text-sky-500 dark:text-sky-400"
        />
        <Icon v-else name="ic:round-plus" size="24" class="text-sky-500 dark:text-sky-400" />
      </div>
    </div>
    <BaseUserModalSubmitNewPhone v-model="isOpenModal" />
  </div>
</template>

<style scoped>

</style>
