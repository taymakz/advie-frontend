<script setup lang="ts">
import { useAuthenticateStore } from '~/store/account/AuthenticateStore'
import { truncatedText } from '~/utils/TextUtils'

const router = useRouter()

const authStore = useAuthenticateStore()
</script>

<template>
  <ClientOnly>
    <div>
      <div v-if="authStore.loading">
        <USkeleton class="h-8 w-[120px]" />
      </div>
      <div v-else>
        <UPopover
          v-if="authStore.isLogin"
        >
          <!-- Auth -->
          <div>
            <div
              class="bg-gray-100 dark:bg-gray-800  hover:bg-sky-500 dark:hover:bg-sky-500 group flex items-center justify-center w-8 h-8 transition-colors duration-150 rounded-full cursor-pointer"
            >
              <div class="sr-only">
                User Basket
              </div>
              <Icon
                name="solar:user-outline" size="20"
                class="group-hover:text-white text-sky-500 dark:text-sky-400"
              />
            </div>
          </div>
          <!-- Not Auth -->
          <template #panel>
            <div>
              <nuxt-link
                to="/panel/"
                class="flex items-center justify-between p-4 dark:text-slate-200 hover:bg-zinc-100 dark:hover:bg-slate-800"
              >
                <div class="flex items-center justify-between gap-x-2 ">
                  <div class="w-8 h-8">
                    <nuxt-img
                      :src="authStore.currentUser?.profile ? GetImageUrl(authStore.currentUser.profile) : ''"
                      alt="User Profile"
                      class="w-full h-auto rounded-full ring-2 "
                      width="32"
                      height="32"
                      placeholder
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p v-if="authStore.currentUser?.full_name " class="text-sm font-medium">
                      {{ truncatedText(authStore.currentUser?.full_name, 18) }}
                    </p>
                    <p v-else class="text-base font-medium">
                      <template v-if="authStore.currentUser?.phone ">
                        {{ truncatedText(authStore.currentUser?.phone, 18) }}
                      </template>
                      <template v-else>
                        {{ truncatedText(authStore.currentUser?.email, 18) }}
                      </template>
                    </p>
                  </div>
                </div>
                <div>
                  <Icon name="ic:outline-chevron-left" size="18" class="text-sky-600 dark:text-sky-500" />
                </div>
              </nuxt-link>
            </div>

            <!--     items       -->
            <ul class="flex flex-col ">
              <li>
                <nuxt-link
                  to="/"
                  class="flex items-center justify-start py-4 px-5 gap-x-2  dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800   text-sm"
                >
                  <Icon name="solar:bag-3-linear" size="22" />
                  <span>سفارش های من</span>
                </nuxt-link>
              </li>

              <li>
                <nuxt-link
                  to="/"
                  class="flex items-center justify-start py-4 px-5 gap-x-2  dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800  text-sm"
                >
                  <Icon name="ph:heart-straight" size="22" />
                  <span>علاقه مندی های من</span>
                </nuxt-link>
              </li>
              <li>
                <div
                  class="group flex items-center justify-start py-4 px-5 gap-x-2 cursor-pointer dark:text-slate-300 hover:bg-red-100 hover:dark:bg-red-900   text-sm"
                  @click="authStore.Logout"
                >
                  <Icon
                    name="fluent:arrow-exit-20-regular" size="22"
                    class="!text-red-600 dark:!text-red-600 group-hover:dark:!text-red-200"
                  />
                  <span
                    class="text-red-600 dark:text-red-500 group-hover:dark:text-red-200"
                  >خروج از حساب کاربری</span>
                </div>
              </li>
            </ul>
          </template>
        </UPopover>
        <div v-else>
          <nuxt-link
            :to="`/auth/login?backUrl=${router.currentRoute.value.fullPath}`"
            class="flex items-center justify-center bg-gray-100 dark:bg-gray-800  hover:bg-sky-500 dark:hover:bg-sky-500 h-8 w-[120px]  rounded-lg text-sm text-sky-500 dark:text-sky-500 hover:text-white dark:hover:text-white"
          >
            ورود / ثبت نام
          </nuxt-link>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped>

</style>
