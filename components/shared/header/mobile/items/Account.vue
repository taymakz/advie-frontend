<script setup lang="ts">
import { useAuthenticateStore } from '~/store/account/AuthenticateStore'
import { useBasketStore } from '~/store/shop/BasketStore'

const router = useRouter()

const authStore = useAuthenticateStore()
const basketStore = useBasketStore()

const accountSidebar = ref(false)
</script>

<template>
  <ClientOnly>
    <div v-if="authStore.loading">
      <USkeleton class="h-8 w-[120px]" />
    </div>
    <div v-else>
      <!-- Auth -->
      <div v-if="authStore.isLogin">
        <div
          class="relative bg-gray-100 dark:bg-gray-800  hover:bg-sky-500 dark:hover:bg-sky-500 group flex items-center justify-center w-8 h-8 transition-colors duration-150 rounded-full cursor-pointer"
          @click="accountSidebar = !accountSidebar"
        >
          <div class="sr-only">
            User Account
          </div>
          <div
            v-if="basketStore.currentPendingOrder.length > 0 || authStore.currentUser!.notification_count > 0 || !authStore.currentUser?.has_password"
            class="absolute -top-0 -right-0 "
          >
            <BaseBeutyPing />
          </div>
          <Icon
            name="solar:user-outline" size="20"
            class="group-hover:text-white  text-sky-500 dark:text-sky-400"
          />
        </div>
        <USlideover
          v-model="accountSidebar" dir="ltr" side="left" :ui="{
            width: 'w-screen max-w-xs',
            base: 'relative flex-1 flex flex-col w-full overflow-y-auto h-auto focus:outline-none',
          }"
        >
          <div class="flex flex-col p-4" dir="rtl">
            <div class="flex  items-center justify-between mb-6">
              <div class="cursor-pointer" @click="accountSidebar = false">
                <Icon name="clarity:close-line" size="28" />
              </div>
            </div>

            <div class="w-full mb-4 space-y-2">
              <nuxt-link
                to="/panel/"
                class="flex cursor-pointer items-center justify-between   gap-2 rounded-md border border-gray-200 bg-white  py-3 px-4 text-slate-600  dark:border-gray-800 dark:bg-gray-900 dark:text-slate-300 "
              >
                <div class="flex items-center gap-x-4">
                  <div>
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

                  <p v-if="authStore.currentUser?.full_name " class="text-sm font-medium">
                    {{ truncatedText(authStore.currentUser?.full_name, 18) }}
                  </p>
                  <p v-else class="text-base font-medium">
                    <template v-if="authStore.currentUser?.phone ">
                      {{ truncatedText(authStore.currentUser?.phone!, 18) }}
                    </template>
                    <template v-else>
                      {{ truncatedText(authStore.currentUser?.email!, 18) }}
                    </template>
                  </p>
                </div>
                <span>
                  <Icon name="ic:outline-chevron-left" size="20" class="text-sky-600 dark:text-sky-500" />
                </span>
              </nuxt-link>
            </div>
            <ul class="flex flex-col gap-y-2 ">
              <li v-if="authStore.currentUser!.notification_count > 0">
                <nuxt-link
                  to="/panel/notification/"

                  class="flex items-center justify-between gap-x-2  py-3 px-2 rounded-lg text-yellow-600 dark:text-yellow-500 hover:bg-gray-100 hover:dark:bg-gray-800 "
                >
                  <div class="flex items-center gap-x-2">
                    <Icon name="ph:bell" size="24" />
                    <span>{{ authStore.currentUser?.notification_count }} پیام جدید</span>
                  </div>
                  <div>
                    <BaseBeutyPing wrapper-class="bg-yellow-400" ping-class="bg-yellow-500 h-2 w-2" />
                  </div>
                </nuxt-link>
              </li>
              <li v-if="!authStore.currentUser?.has_password">
                <nuxt-link
                  to="/panel/profile/"

                  class="flex items-center justify-between gap-x-2  py-3 px-2 rounded-lg  text-red-600 dark:text-red-500 hover:bg-gray-100 hover:dark:bg-gray-800 "
                >
                  <div class="flex items-center gap-x-2">
                    <Icon name="solar:lock-password-broken" size="22" />
                    <span> ثبت کلمه عبور</span>
                  </div>
                  <div>
                    <BaseBeutyPing wrapper-class="bg-red-400" ping-class="bg-red-500 h-2 w-2" />
                  </div>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  to="/panel/orders/"

                  class="flex items-center justify-between gap-x-2  py-3 px-2 rounded-lg hover:bg-gray-100 hover:dark:bg-gray-800 "
                >
                  <div
                    class="flex items-center gap-x-2"
                    :class="basketStore.currentPendingOrder.length > 0 ? 'text-sky-500 dark:text-sky-400' : 'text-slate-600 dark:text-slate-300'"
                  >
                    <Icon name="solar:bag-3-linear" size="24" />
                    <span
                      class=" text-sm"
                    >
                      سفارش های من
                    </span>
                  </div>
                  <div v-if="basketStore.currentPendingOrder.length > 0">
                    <BaseBeutyPing />
                  </div>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  to="/panel/favorite/"

                  class="flex items-center justify-start gap-x-2  py-3 px-2 rounded-lg hover:bg-gray-100 hover:dark:bg-gray-800 "
                >
                  <span>
                    <Icon name="ph:heart-straight" size="24" />
                  </span>
                  <span class="text-slate-600 dark:text-slate-300 text-sm">
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
