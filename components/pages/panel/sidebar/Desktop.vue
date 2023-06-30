<script setup lang="ts">
import { useAuthenticateStore } from '~/store/account/AuthenticateStore'

const authStore = useAuthenticateStore()
</script>

<template>
  <div
    class="flex flex-col divide-y-2 divide-gray-200 dark:divide-gray-500 overflow-hidden bg-white dark:bg-gray-800  rounded-lg border border-gray-200 dark:border-gray-700"
  >
    <!-- User Information -->
    <div class="flex items-center justify-between gap-x-2 py-3 px-4 ">
      <div v-if="!authStore.loading" class="flex items-center gap-x-4">
        <div>
          <nuxt-img
            :src="authStore.currentUser?.profile ? GetImageUrl(authStore.currentUser.profile) : ''"
            alt="User Profile"
            class="w-full h-auto rounded-full ring-2"
            placeholder
            loading="lazy"
            width="40"
            height="40"
          />
        </div>
        <div class="flex flex-col">
          <div>
            <p v-if="authStore.currentUser?.first_name " class="text-sm font-medium">
              {{
                truncatedText(`${authStore.currentUser?.first_name}${authStore.currentUser?.last_name}`, 18)
              }}
            </p>
            <p v-else class="text-base font-medium">
              {{ truncatedText(authStore.currentUser?.username!, 18) }}
            </p>
          </div>
          <div class="text-sm text-slate-500 dark:text-slate-300">
            <p v-if="authStore.currentUser?.phone">
              {{ authStore.currentUser?.phone ?? '' }}
            </p>
            <p v-else>
              {{ authStore.currentUser?.email ?? '' }}
            </p>
          </div>
        </div>
      </div>
      <div>
        <nuxt-link to="/panel/profile/">
          <Icon name="ic:baseline-mode-edit" size="20" />
        </nuxt-link>
      </div>
    </div>
    <!-- Panel Links -->
    <div class="flex flex-col">
      <!-- Links -->

      <ul class="divide-y divide-gray-200 dark:divide-gray-700">
        <li>
          <nuxt-link
            to="/panel/"
            class="relative flex items-center gap-x-4 text-sm py-4 px-6  hover:bg-gray-200 dark:hover:bg-gray-700 "
          >
            <div
              v-if="$route.path === '/panel' || $route.path === '/panel/'"
              class="absolute right-2 w-1 h-3/4 bg-sky-600 dark:bg-sky-500 rounded-full"
            />
            <div>
              <Icon name="ph:house" size="22" class="!text-slate-700 dark:!text-slate-200" />
            </div>
            <div class="text-slate-700 dark:text-slate-200">
              خلاصه فعالیت ها
            </div>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/panel/orders/"
            class="relative flex items-center gap-x-4 text-sm py-4 px-6 hover:bg-gray-200 dark:hover:bg-gray-700 "
          >
            <div
              v-if="$route.path === '/panel/orders' || $route.path === '/panel/orders/'"
              class="absolute right-2 w-1 h-3/4 bg-sky-600 dark:bg-sky-500 rounded-full"
            />
            <div>
              <Icon name="solar:bag-3-linear" size="22" class="!text-slate-700 dark:!text-slate-200" />
            </div>
            <div class="text-slate-700 dark:text-slate-200">
              سفارش ها
            </div>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/panel/favorite/"
            class="relative flex items-center gap-x-4 text-sm py-4 px-6 hover:bg-gray-200 dark:hover:bg-gray-700 "
          >
            <div
              v-if="$route.path === '/panel/favorite' || $route.path === '/panel/favorite/'"
              class="absolute right-2 w-1 h-3/4 bg-sky-600 dark:bg-sky-500 rounded-full"
            />
            <div>
              <Icon name="ph:heart-straight" size="22" class="!text-slate-700 dark:!text-slate-200" />
            </div>
            <div class="text-slate-700 dark:text-slate-200">
              علاقه‌مندی ‌ها
            </div>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/panel/recent/"
            class="relative flex items-center gap-x-4 text-sm py-4 px-6 hover:bg-gray-200 dark:hover:bg-gray-700 "
          >
            <div
              v-if="$route.path === '/panel/recents' || $route.path === '/panel/recent/'"
              class="absolute right-2 w-1 h-3/4 bg-sky-600 dark:bg-sky-500 rounded-full"
            />
            <div>
              <Icon name="ph:clock-clockwise-fill" size="22" class="!text-slate-700 dark:!text-slate-200" />
            </div>
            <div class="text-slate-700 dark:text-slate-200">
              بازدیدهای اخیر
            </div>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/panel/notification/"
            class="relative flex items-center gap-x-4 text-sm py-4 px-6 hover:bg-gray-200 dark:hover:bg-gray-700 "
          >
            <div
              v-if="$route.path === '/panel/notification' || $route.path === '/panel/notification/'"
              class="absolute right-2 w-1 h-3/4 bg-sky-600 dark:bg-sky-500 rounded-full"
            />
            <div>
              <Icon
                name="ph:bell" size="22"
                class="!text-slate-700 dark:!text-slate-200"
              />
            </div>
            <div class="text-slate-700 dark:text-slate-200">
              پیام ‌ها
            </div>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/panel/addresses/"
            class="relative flex items-center gap-x-4 text-sm py-4 px-6 hover:bg-gray-200 dark:hover:bg-gray-700 "
          >
            <div
              v-if="$route.path === '/panel/addresses' || $route.path === '/panel/addresses/'"
              class="absolute right-2 w-1 h-3/4 bg-sky-600 dark:bg-sky-500 rounded-full"
            />
            <div>
              <Icon
                name="material-symbols:location-on-outline-rounded" size="22"
                class="!text-slate-700 dark:!text-slate-200"
              />
            </div>
            <div class="text-slate-700 dark:text-slate-200">
              آدرس ‌ها
            </div>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/panel/profile/"
            class="relative flex items-center gap-x-4 text-sm py-4 px-6 hover:bg-gray-200 dark:hover:bg-gray-700 "
          >
            <div
              v-if="$route.path === '/panel/profile' || $route.path === '/panel/profile/'"
              class="absolute right-2 w-1 h-3/4 bg-sky-600 dark:bg-sky-500 rounded-full"
            />
            <div>
              <Icon
                name="ri:user-settings-line" size="22"
                class="!text-slate-700 dark:!text-slate-200"
              />
            </div>
            <div class="text-slate-700 dark:text-slate-200">
              اطلاعات حساب کاربری
            </div>
          </nuxt-link>
        </li>
        <li>
          <div
            class="relative flex items-center gap-x-4 text-sm cursor-pointer py-4 px-6 hover:bg-gray-200 dark:hover:bg-gray-700 "
            @click="authStore.Logout"
          >
            <div>
              <Icon
                name="fluent:arrow-exit-20-regular" size="22"
                class="!text-slate-700 dark:!text-slate-200"
              />
            </div>
            <div class="text-slate-700 dark:text-slate-200">
              خروج
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>
