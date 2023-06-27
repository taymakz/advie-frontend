<script setup lang="ts">
import { useAuthenticateStore } from '~/store/account/AuthenticateStore'

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const router = useRouter()

const authStore = useAuthenticateStore()
const accountDropdownSection = ref()
const accountDropdown = ref(false)
</script>

<template>
  <ClientOnly>
    <div v-if="loading">
      <USkeleton v-if="loading" class="h-8 w-[120px]" />
    </div>
    <div v-else>
      <!-- Auth -->
      <div v-if="authStore.isLogin" ref="accountDropdownSection" class="relative">
        <div
          class="bg-gray-100 dark:bg-gray-800  hover:bg-sky-500 dark:hover:bg-sky-500 group flex items-center justify-center w-8 h-8 transition-colors duration-150 rounded-full cursor-pointer"
          @click="accountDropdown = !accountDropdown"
        >
          <Icon
            name="solar:user-outline" size="20"
            class="group-hover:text-white "
          />
        </div>
        <USlideover
          v-model="accountDropdown" dir="ltr" side="left" :ui="{
            width: 'w-screen max-w-xs',
            base: 'relative flex-1 flex flex-col w-full overflow-y-auto h-auto focus:outline-none',
          }"
        >
          <div class="flex flex-col p-4" dir="rtl">
            <div class="flex  items-center justify-between mb-6">
              <div class="cursor-pointer" @click="accountDropdown = false">
                <Icon name="clarity:close-line" size="28" />
              </div>
            </div>

            <div class="w-full mb-4">
              <div
                class="relative flex cursor-pointer items-center justify-between   gap-2 rounded-md border border-gray-200 bg-white  py-3 px-4 text-slate-500  dark:border-gray-800 dark:bg-gray-900 dark:text-slate-400 "
              >
                <p v-if="authStore.currentUser?.first_name " class="text-sm font-medium">
                  {{ truncatedText(`${authStore.currentUser.first_name}${authStore.currentUser.last_name}`, 18) }}
                </p>
                <p v-else class="text-base font-medium">
                  {{ truncatedText(authStore.currentUser?.username!, 18) }}
                </p>
                <span>
                  <Icon name="ic:outline-chevron-left" size="20" />

                </span>
              </div>
            </div>
            <ul class="flex flex-col gap-y-2 ">
              <li>
                <nuxt-link
                  to="/"
                  class="flex items-center justify-start gap-x-2  py-3 px-2 rounded-lg hover:bg-gray-100 hover:dark:bg-gray-800 "
                >
                  <span>
                    <Icon name="ph:handbag-light" size="24" />
                  </span>
                  <span class="text-slate-500 dark:text-slate-400 text-sm">
                    سفارش های من
                  </span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  to="/"
                  class="flex items-center justify-start gap-x-2  py-3 px-2 rounded-lg hover:bg-gray-100 hover:dark:bg-gray-800 "
                >
                  <span>
                    <Icon name="ic:baseline-favorite-border" size="24" />
                  </span>
                  <span class="text-slate-500 dark:text-slate-400 text-sm">
                    علاقه مندی های من
                  </span>
                </nuxt-link>
              </li>
              <li>
                <div
                  class="group flex items-center justify-start gap-x-2  py-3 px-2 cursor-pointer rounded-lg hover:bg-red-100 hover:dark:bg-red-900 "
                  @click="authStore.Logout"
                >
                  <span>
                    <Icon
                      name="fluent:arrow-exit-20-regular" size="24"
                      class="!text-red-600 dark:!text-red-600 group-hover:dark:!text-red-200"
                    />
                  </span>
                  <span class="text-red-600 dark:text-red-500 group-hover:dark:text-red-200 text-sm">
                    خروج از حساب کاربری
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </USlideover>
      </div>
      <!-- Not Auth -->
      <div v-else>
        <nuxt-link
          :to="`/auth/login?backUrl=${router.currentRoute.value.fullPath}`"
          class="flex items-center justify-center bg-gray-100 dark:bg-gray-800  hover:bg-sky-500 dark:hover:bg-sky-500 h-8 w-[120px]  rounded-lg text-sm text-sky-500 dark:text-sky-500 hover:text-white dark:hover:text-white"
        >
          ورود / ثبت نام
        </nuxt-link>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped>

</style>
