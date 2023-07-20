<script setup lang="ts">
import { useAuthenticateStore } from '~/store/account/AuthenticateStore'
import type { PanelDataDTO } from '~/models/panel/PanelDataDTO'

definePageMeta({
  layout: 'user-panel',
})
const authStore = useAuthenticateStore()

const { data, error, pending } = useAsyncData('user_panel_data', () => FetchApi<PanelDataDTO>('/data/page/panel/'))
</script>

<template>
  <div class="bg-white dark:bg-gray-800  rounded-lg p-4">
    <!-- Account -->
    <div class="mb-10">
      <div class="flex justify-between mb-8">
        <h1 class="relative text-lg text-slate-700 dark:text-slate-200 pb-2 select-none ">
          حساب کاربری
          <span class="absolute right-0 bottom-0 w-full bg-sky-500 rounded-full h-[3px]" />
        </h1>
      </div>
      <div class="grid grid-cols-3 md:grid-cols-2  gap-6 md:gap-2">
        <nuxt-link
          v-if="!authStore.currentUser?.has_password"
          to="/panel/profile/"
          class="flex md:flex-col items-center  gap-4 border border-gray-200 dark:border-gray-700 rounded-lg py-2 px-4"
        >
          <div class="relative">
            <Icon name="solar:lock-password-broken" size="40" class="text-red-600 dark:text-red-500" />
            <div
              class="absolute top-0 right-0"
            >
              <BaseBeutyPing
                class="bg-red-600 dark:bg-red-500 rounded-full"
                wrapper-class="bg-red-600 dark:bg-red-500"
                ping-class="bg-red-600 dark:bg-red-500"
              />
            </div>
          </div>
          <div class="text-slate-600 dark:text-slate-300">
            ثبت کلمه عبور
          </div>
        </nuxt-link>
        <nuxt-link
          v-if="!authStore.currentUser?.first_name || !authStore.currentUser?.last_name || !authStore.currentUser?.email || !authStore.currentUser?.phone || !authStore.currentUser?.national_code"
          to="/panel/profile/"
          class="flex md:flex-col items-center  gap-4 border  border-gray-200 dark:border-gray-700 rounded-lg py-2 px-4"
        >
          <div class="relative">
            <Icon name="tabler:user-cog" size="40" class="text-sky-500 dark:text-sky-400" />
            <div
              class="absolute top-1 right-1"
            >
              <BaseBeutyPing />
            </div>
          </div>
          <div class="text-slate-600 dark:text-slate-300">
            تکمیل مشخصات
          </div>
        </nuxt-link>
        <nuxt-link
          to="/panel/favorite/"
          class="flex md:flex-col items-center  gap-4 border border-gray-200 dark:border-gray-700 rounded-lg py-2 px-4"
        >
          <div>
            <Icon name="ph:heart-straight" size="40" class="text-rose-500 dark:text-rose-400" />
          </div>
          <div class="text-slate-600 dark:text-slate-300">
            {{ data?.data.favorite_count }} علاقه مندی
          </div>
        </nuxt-link>
        <nuxt-link
          v-if="authStore?.currentUser?.notification_count > 0"
          to="/panel/notification/"
          class="flex md:flex-col items-center  gap-4 border border-gray-200 dark:border-gray-700 rounded-lg py-2 px-4"
        >
          <div class="relative">
            <Icon name="ph:bell" size="40" class="text-yellow-600 dark:text-yellow-500" />
            <div
              class="absolute top-0 right-0"
            >
              <BaseBeutyPing
                class="bg-yellow-600 dark:bg-yellow-500 rounded-full"
                wrapper-class="bg-yellow-600 dark:bg-yellow-500"
                ping-class="bg-yellow-600 dark:bg-yellow-500"
              />
            </div>
          </div>
          <div class="text-slate-600 dark:text-slate-300">
            {{ authStore.currentUser?.notification_count }} پیام جدید
          </div>
        </nuxt-link>
      </div>
    </div>
    <!-- Orders -->
    <div>
      <div class="flex justify-between mb-8">
        <h1 class="relative text-lg text-slate-700 dark:text-slate-200 pb-2 select-none ">
          سفارش ها
          <span class="absolute right-0 bottom-0 w-full bg-sky-500 rounded-full h-[3px]" />
        </h1>

        <div>
          <UButton
            to="/panel/orders/" size="md" color="sky" variant="link" label="مشاهده همه" icon="i-mdi-chevron-left"
            trailing
          />
        </div>
      </div>
      <div class="grid grid-cols-4 md:grid-cols-2  gap-6">
        <div class="flex md:flex-col items-center justify-center gap-2">
          <div class="relative">
            <Icon name="solar:bag-smile-broken" size="50" class="text-sky-500 dark:text-sky-400" />
            <div
              class="absolute -top-1 -right-1 flex items-center justify-center text-sm text-white font-iranyekanBold bg-sky-500 dark:bg-sky-400 rounded-full w-5 h-5"
            >
              {{ data?.data.orders_count.current }}
            </div>
          </div>
          <div class="text-slate-600 dark:text-slate-300">
            سفارش فعلی
          </div>
        </div>
        <div class="flex md:flex-col items-center justify-center  gap-2">
          <div class="relative">
            <Icon name="solar:bag-check-broken" size="50" class="text-green-600 dark:text-green-500" />
            <div
              class="absolute -top-1 -right-1 flex items-center justify-center text-sm text-white font-iranyekanBold bg-green-600 dark:bg-green-500 rounded-full w-5 h-5"
            >
              {{ data?.data.orders_count.delivered }}
            </div>
          </div>
          <div class="text-slate-600 dark:text-slate-300">
            تحویل شده
          </div>
        </div>
        <div class="flex md:flex-col items-center  justify-center gap-2">
          <div class="relative">
            <Icon name="solar:bag-cross-broken" size="50" class="text-red-500 dark:text-red-400" />
            <div
              class="absolute -top-1 -right-1 flex items-center justify-center text-sm text-white font-iranyekanBold bg-red-500 dark:bg-red-400 rounded-full w-5 h-5"
            >
              {{ data?.data.orders_count.canceled }}
            </div>
          </div>
          <div class="text-slate-600 dark:text-slate-300">
            لغو شده
          </div>
        </div>
        <div class="flex md:flex-col items-center  justify-center gap-2">
          <div class="relative">
            <div class="text-yellow-600 dark:text-yellow-500">
              <svg
                id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="50px" height="50px"
                viewBox="0 0 30 30"
              >
                <path
                  d="m23.98,15.03c-.78-4.16-1.17-6.24-2.65-7.47-1.48-1.23-3.6-1.23-7.83-1.23h-.96c-4.23,0-6.35,0-7.83,1.23-1.48,1.23-1.87,3.31-2.65,7.47-1.1,5.85-1.65,8.78-.05,10.71,1.6,1.93,4.57,1.93,10.53,1.93h.96c5.95,0,8.93,0,10.53-1.93.93-1.12,1.13-2.57.93-4.74M9.01,6.33v-1.33c0-2.21,1.79-4,4-4s4,1.79,4,4v1.33"
                  fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="5.33" stroke-width="2"
                />
                <g>
                  <path
                    d="m9.62,12.07l-2.16,1.85,2.16,2.16" fill="none" stroke="currentColor" stroke-linecap="round"
                    stroke-linejoin="round" stroke-width="1.3"
                  />
                  <path
                    d="m7.46,13.92h7.09c2.12,0,3.92,1.73,4.01,3.85.09,2.24-1.76,4.16-4.01,4.16h-5.24" fill="none"
                    stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3"
                  />
                </g>
              </svg>
            </div>
            <div
              class="absolute -top-1 -right-1 flex items-center justify-center text-sm text-white font-iranyekanBold bg-amber-600 dark:bg-amber-500 rounded-full w-5 h-5"
            >
              {{ data?.data.orders_count.refunded }}
            </div>
          </div>
          <div class="text-slate-600 dark:text-slate-300">
            مرجوع شده
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
