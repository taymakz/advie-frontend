<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
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

function hideAccountDropdown() {
  if (accountDropdown.value)
    accountDropdown.value = false
}

onClickOutside(accountDropdownSection, hideAccountDropdown)
</script>

<template>
  <ClientOnly>
    <div v-if="loading">
      <USkeleton class="h-8 w-[120px]" />
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
        <div
          :class="{ hidden: !accountDropdown }"
          class="absolute z-40 top-14 left-0 bg-white dark:bg-slate-900 border border-gray-200 dark:border-none rounded-lg  w-56 overflow-hidden"
        >
          <div>
            <nuxt-link
              to="/"
              class="flex items-center justify-between p-4 dark:text-slate-200 hover:bg-zinc-100 dark:hover:bg-slate-800"
            >
              <div class="flex items-center justify-between gap-x-2">
                <div class="w-8 h-8">
                  <nuxt-img
                    :src="authStore.currentUser?.profile ? GetImageUrl(authStore.currentUser.profile) : ''"
                    alt="User Profile"
                    class="w-full h-auto rounded-full ring-2 "
                  />
                </div>
                <div>
                  <p v-if="authStore.currentUser?.first_name " class="text-sm font-medium">
                    {{ truncatedText(`${authStore.currentUser.first_name}${authStore.currentUser.last_name}`, 18) }}
                  </p>
                  <p v-else class="text-base font-medium">
                    {{ truncatedText(authStore.currentUser?.username!, 18) }}
                  </p>
                </div>
              </div>
              <div>
                <Icon name="ic:outline-chevron-left" size="18" />
              </div>
            </nuxt-link>
          </div>

          <!--     items       -->
          <ul class="flex flex-col ">
            <li>
              <nuxt-link
                to="/"
                class="flex items-center justify-start py-4 gap-x-2  dark:text-slate-300 hover:bg-zinc-100 dark:hover:bg-slate-800   text-sm"
              >
                <Icon name="ph:handbag-light" size="22" class="mr-5" />
                <span>سفارش های من</span>
              </nuxt-link>
            </li>

            <li>
              <nuxt-link
                to="/"
                class="flex items-center justify-start py-4 gap-x-2  dark:text-slate-300 hover:bg-zinc-100 dark:hover:bg-slate-800  text-sm"
              >
                <Icon name="ic:baseline-favorite-border" size="22" class="mr-5" />
                <span>علاقه مندی های من</span>
              </nuxt-link>
            </li>
            <li>
              <div
                class="flex items-center justify-start py-4 gap-x-2 cursor-pointer dark:text-slate-300 hover:bg-zinc-100 dark:hover:bg-slate-800   text-sm"
                @click="authStore.Logout"
              >
                <Icon name="fluent:arrow-exit-20-regular" size="22" class="mr-5" />
                <span>خروج از حساب کاربری</span>
              </div>
            </li>
          </ul>
        </div>
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
