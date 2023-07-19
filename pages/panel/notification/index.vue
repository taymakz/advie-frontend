<script setup lang="ts">
import { GetUserNotification } from '~/services/account/user.notification.service'
import { UserNotificationTemplate } from '~/models/account/user/UserNotificationDTO'

definePageMeta({
  layout: 'user-panel',
})
const loading = ref(false)
const {
  data: result,
  // refresh,
  pending,
} = await useAsyncData('panel_notification', () => GetUserNotification())
</script>

<template>
  <div>
    <div class="bg-white dark:bg-gray-800  rounded-lg p-4">
      <!-- Section Title -->
      <div class="flex items-center justify-between mb-5">
        <div class="flex mb-5">
          <h1 class="relative text-lg text-slate-700 dark:text-slate-200 pb-2 select-none ">
            پیام ها
            <span class="absolute right-0 bottom-0 w-full bg-sky-500 rounded-full h-[3px]" />
          </h1>
        </div>

        <template v-if="result?.data?.length > 0">
          <UButton
            size="lg"
            color="red"
            label="حدف همه پیام ها"
            :disabled="pending "
            :loading="loading"
          />
        </template>
      </div>

      <!-- Section Content -->
      <div class="space-y-4">
        <div v-for="item in result?.data" :key="item.id" class="bg-gray-200 dark:bg-gray-900 rounded-lg p-4 space-y-4">
          <!-- Title -->

          <div class="flex items-center gap-x-4">
            <div>
              <Icon
                v-if="item.template === UserNotificationTemplate.COMMENT" name="iconamoon:comment-add-fill"
                size="24" class="text-yellow-500 dark:text-yellow-400"
              />
              <Icon
                v-else-if="item.template === UserNotificationTemplate.ORDER" name="mingcute:announcement-line"
                size="24" class="text-sky-500 dark:text-sky-400"
              />
            </div>
            <div class="text-slate-600 dark:text-slate-300">
              {{ item.title }}
            </div>
          </div>
          <!-- Message -->

          <div class="text-slate-500 dark:text-slate-400 ">
            {{ item.message }}
          </div>
          <!-- Content -->
          <div>
            <template v-if="item.template === UserNotificationTemplate.COMMENT">
              <div class=" rounded-lg border border-gray-200 dark:border-gray-700 w-fit md:w-full">
                <nuxt-link
                  :to="item.product.url"
                >
                  <div class="flex gap-x-2 p-2">
                    <nuxt-img
                      :src="GetImageUrl(item.product.image)"
                      class="w-12 h-12 rounded-full"
                      placeholder
                      loading="lazy"
                      quality="30"
                      :alt="item.product.title_ir"
                    />

                    <div
                      class="flex items-center text-sm text-slate-800 dark:text-slate-300 h-10 text-ellipsis overflow-hidden"
                    >
                      {{ truncatedText(item.product.title_ir, 40) }}
                    </div>
                  </div>
                </nuxt-link>
              </div>
            </template>
            <template v-else-if="item.template === UserNotificationTemplate.ORDER">
              <div class="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                <div
                  v-for="(product, index) in item.order_items" :key="index"
                  class=" rounded-lg border border-gray-200 dark:border-gray-700 "
                >
                  <nuxt-link
                    :to="product.url"
                  >
                    <div class="flex gap-x-2 p-2">
                      <nuxt-img
                        :src="GetImageUrl(product.image)"
                        class="w-12 h-12 rounded-full"
                        placeholder
                        loading="lazy"
                        quality="30"
                        :alt="product.title_ir"
                      />

                      <div
                        class="flex items-center text-sm text-slate-800 dark:text-slate-300 h-10 text-ellipsis overflow-hidden"
                      >
                        {{ truncatedText(product.title_ir, 40) }}
                      </div>
                    </div>
                  </nuxt-link>
                </div>
              </div>
            </template>
          </div>
          <!-- Action -->
          <div>
            <template v-if="item.template === UserNotificationTemplate.COMMENT">
              <UButton
                :to="item.link"
                size="lg"

                label="ثبت نظر" icon="i-mdi-chevron-left" trailing
              />
            </template>
            <template v-else-if="item.template === UserNotificationTemplate.ORDER">
              <UButton
                :to="item.link"
                size="lg"
                label="مشاهده جزئیات سفارش" icon="i-mdi-chevron-left" trailing
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
