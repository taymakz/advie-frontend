<script setup lang="ts">
import { useAuthenticateStore } from '~/store/account/AuthenticateStore'

const isOpenModal = ref(false)
const authStore = useAuthenticateStore()
const loading = ref(false)
</script>

<template>
  <div>
    <div v-if="loading">
      <div
        class="flex items-center justify-between rounded-lg bg-gray-200 dark:bg-gray-900  p-4 cursor-wait select-none "
      >
        <div class="flex flex-col gap-y-2">
          <div class="flex items-center gap-x-2">
            <h4 class="text-slate-500 dark:text-slate-400">
              نام و نام خانوادگی
            </h4>
          </div>
          <p class="text-slate-600 dark:text-slate-300">
            <USkeleton
              class="w-40 h-6"
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

        class="flex items-center justify-between rounded-lg bg-gray-200 dark:bg-gray-900 p-4 cursor-pointer select-none "
        @click="isOpenModal = true"
      >
        <div class="flex flex-col gap-y-2">
          <div class="flex items-center gap-x-2">
            <h4 class="text-slate-500 dark:text-slate-400">
              نام و نام خانوادگی
            </h4>
            <div v-if="!authStore.currentUser?.first_name">
              <BaseBeutyPing />
            </div>
          </div>
          <p class="text-slate-600 dark:text-slate-300">
            {{ authStore.currentUser?.first_name }} {{ authStore.currentUser?.last_name }}
          </p>
        </div>
        <div>
          <Icon
            v-if="authStore.currentUser?.first_name" name="ic:baseline-mode-edit" size="24"
            class="text-sky-500 dark:text-sky-400"
          />

          <Icon v-else name="ic:round-plus" size="24" class="text-sky-500 dark:text-sky-400" />
        </div>
      </div>
    </div>
    <BaseUserModalSubmitNewFullName v-model="isOpenModal" @loading="state => loading = state " />
  </div>
</template>
