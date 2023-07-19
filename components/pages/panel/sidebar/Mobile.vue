<script setup lang="ts">
import { useAuthenticateStore } from '~/store/account/AuthenticateStore'

const showMenu = ref(false)
const route = useRoute()

watch(() => route.fullPath, () => {
  showMenu.value = false
})
const authStore = useAuthenticateStore()
</script>

<template>
  <div>
    <div
      class="z-10 hidden lg:flex fixed  bottom-0 left-0 right-0 w-full bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 py-3 px-4 h-16 cursor-pointer"
      @click="showMenu = true"
    >
      <div class="flex items-center justify-center gap-x-4 w-full  text-slate-600 dark:text-slate-300">
        <div>
          <Icon name="material-symbols:lists-rounded" size="26" />
        </div>
        <div class="text-lg ">
          منوی پنل کاربری
        </div>
      </div>
    </div>

    <div
      :class="{ 'translate-y-full': !showMenu }"
      class="fixed  h-full  bg-white dark:bg-gray-900 z-40 overflow-y-auto main-scroll transform  bottom-0 inset-x-0 transition-transform duration-500 rounded-t-lg py-4 px-10 "
    >
      <div class="flex items-center justify-between mb-10">
        <div class="flex items-center  gap-x-4 w-full  text-slate-600 dark:text-slate-300">
          <div>
            <Icon name="material-symbols:lists-rounded" size="26" />
          </div>
          <div class="text-lg ">
            منوی پنل کاربری
          </div>
        </div>

        <div class="w-24">
          <UButton block size="lg" color="red" label="بستن" @click="showMenu = false" />
        </div>
      </div>
      <div>
        <!-- User Information -->
        <div class="flex items-center justify-between gap-x-2 py-3 px-4 mb-4  bg-gray-200 dark:bg-gray-800 rounded-lg">
          <div v-if="!authStore.loading" class="flex items-center gap-x-4">
            <div>
              <nuxt-img
                :src="authStore.currentUser?.profile ? GetImageUrl(authStore.currentUser.profile) : ''"
                alt="User Profile"
                class="rounded-full ring-2"
                placeholder
                loading="lazy"
                width="40"
                height="40"
              />
            </div>
            <div class="flex flex-col">
              <div>
                <p v-if="authStore.currentUser?.full_name " class="  font-medium">
                  {{
                    truncatedText(authStore.currentUser?.full_name, 18)
                  }}
                </p>
              </div>
              <div class=" text-slate-500 dark:text-slate-300">
                <p v-if="authStore.currentUser?.phone">
                  {{ authStore.currentUser?.phone }}
                </p>
                <p v-else>
                  {{ authStore.currentUser?.email }}
                </p>
              </div>
            </div>
          </div>
          <div>
            <nuxt-link to="/panel/profile/">
              <Icon name="ic:baseline-mode-edit" size="20" class="text-sky-500 dark:text-sky-400" />
            </nuxt-link>
          </div>
        </div>
        <!-- Panel Links -->
        <div class="flex flex-col">
          <!-- Links -->

          <ul class="space-y-2">
            <li>
              <nuxt-link
                to="/panel/"
                class="flex items-center gap-x-4 rounded-lg py-4 px-6 bg-gray-200 dark:bg-gray-800 text-slate-600 dark:text-slate-300 "
                active-class="bg-sky-500 dark:bg-sky-600 !text-slate-100 dark:!text-slate-100 hover:bg-sky-500 dark:hover:bg-sky-600 "
              >
                <Icon name="ph:house" size="22" />

                <div>
                  خلاصه فعالیت ها
                </div>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                to="/panel/orders/"
                class="flex items-center gap-x-4 rounded-lg py-4 px-6 bg-gray-200 dark:bg-gray-800 text-slate-600 dark:text-slate-300 "
                active-class="bg-sky-500 dark:bg-sky-600 !text-slate-100 dark:!text-slate-100 hover:bg-sky-500 dark:hover:bg-sky-600 "
              >
                <div>
                  <Icon name="solar:bag-3-linear" size="22" />
                </div>
                <div>
                  سفارش ها
                </div>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                to="/panel/favorite/"
                class="flex items-center gap-x-4 rounded-lg py-4 px-6 bg-gray-200 dark:bg-gray-800 text-slate-600 dark:text-slate-300 "
                active-class="bg-sky-500 dark:bg-sky-600 !text-slate-100 dark:!text-slate-100 hover:bg-sky-500 dark:hover:bg-sky-600 "
              >
                <div>
                  <Icon name="ph:heart-straight" size="22" />
                </div>
                <div>
                  علاقه‌مندی ‌ها
                </div>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                to="/panel/recent/"
                class="flex items-center gap-x-4 rounded-lg py-4 px-6 bg-gray-200 dark:bg-gray-800 text-slate-600 dark:text-slate-300 "
                active-class="bg-sky-500 dark:bg-sky-600 !text-slate-100 dark:!text-slate-100 hover:bg-sky-500 dark:hover:bg-sky-600 "
              >
                <div>
                  <Icon name="ph:clock-clockwise-fill" size="22" />
                </div>
                <div>
                  بازدیدهای اخیر
                </div>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                to="/panel/notification/"
                class="flex items-center justify-between gap-x-4 rounded-lg py-4 px-6 bg-gray-200 dark:bg-gray-800 text-slate-600 dark:text-slate-300 "
                active-class="bg-sky-500 dark:bg-sky-600 !text-slate-100 dark:!text-slate-100 hover:bg-sky-500 dark:hover:bg-sky-600 "
              >
                <div class="flex items-center gap-x-4 ">
                  <div>
                    <Icon
                      name="ph:bell" size="22"
                    />
                  </div>
                  <div>
                    پیام ‌ها
                  </div>
                </div>
                <div
                  v-if="authStore.currentUser!.notification_count > 0"

                  class="bg-yellow-700 dark:bg-yellow-600 px-3 rounded-lg text-white"
                >
                  {{ authStore.currentUser?.notification_count }}
                </div>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                to="/panel/addresses/"
                class="flex items-center gap-x-4 rounded-lg py-4 px-6 bg-gray-200 dark:bg-gray-800 text-slate-600 dark:text-slate-300 "
                active-class="bg-sky-500 dark:bg-sky-600 !text-slate-100 dark:!text-slate-100 hover:bg-sky-500 dark:hover:bg-sky-600 "
              >
                <div>
                  <Icon
                    name="material-symbols:location-on-outline-rounded" size="22"
                  />
                </div>
                <div>
                  آدرس ‌ها
                </div>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                to="/panel/profile/"
                class="flex items-center gap-x-4 rounded-lg py-4 px-6 bg-gray-200 dark:bg-gray-800 text-slate-600 dark:text-slate-300 "
                active-class="bg-sky-500 dark:bg-sky-600 !text-slate-100 dark:!text-slate-100 hover:bg-sky-500 dark:hover:bg-sky-600 "
              >
                <div>
                  <Icon
                    name="ri:user-settings-line" size="22"
                  />
                </div>
                <div>
                  اطلاعات حساب کاربری
                </div>
              </nuxt-link>
            </li>
            <li>
              <div
                class="flex items-center gap-x-4 rounded-lg py-4 px-6 bg-red-600 dark:bg-red-500 text-slate-100 dark:text-slate-200 cursor-pointer "

                @click="authStore.Logout"
              >
                <div>
                  <Icon
                    name="fluent:arrow-exit-20-regular" size="22"
                  />
                </div>
                <div>
                  خروج
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
