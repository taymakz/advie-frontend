<script setup lang="ts">
import { useAuthenticateStore } from '~/store/account/AuthenticateStore'

const authStore = useAuthenticateStore()
const isOpenModal = ref(false)
const loading = ref(false)
</script>

<template>
  <div>
    <div v-if="loading">
      <div
        class="flex items-center justify-between rounded-lg bg-gray-200 dark:bg-gray-900 p-4 cursor-pointer select-none"
        @click="isOpenModal = true"
      >
        <div class="flex flex-col gap-y-2">
          <div class="flex items-center gap-x-2">
            <h4 class="text-slate-500 dark:text-slate-400">
              ایمیل
            </h4>
          </div>
          <p class="text-slate-600 dark:text-slate-300">
            <USkeleton
              class="w-60 h-6"
            />
          </p>
        </div>
        <div>
          <USkeleton
            class="w-6 h-6 rounded-full"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <div
        class="flex items-center justify-between rounded-lg bg-gray-200 dark:bg-gray-900 p-4 cursor-pointer select-none"
        @click="isOpenModal = true"
      >
        <div class="flex flex-col gap-y-2">
          <div class="flex items-center gap-x-2">
            <h4 class="text-slate-500 dark:text-slate-400">
              ایمیل
            </h4>
            <div v-if="!authStore.currentUser?.email">
              <BaseBeutyPing />
            </div>
          </div>
          <p class="text-slate-600 dark:text-slate-300">
            {{ authStore.currentUser?.email }}
          </p>
        </div>
        <div>
          <Icon
            v-if="authStore.currentUser?.email" name="ic:baseline-mode-edit" size="24"
            class="text-sky-500 dark:text-sky-400"
          />

          <Icon v-else name="ic:round-plus" size="24" class="text-sky-500 dark:text-sky-400" />
        </div>
      </div>
    </div>
    <BaseUserModalSubmitNewEmail v-model="isOpenModal" @loading="state => loading = state " />
  </div>
</template>

<style scoped>

</style>
