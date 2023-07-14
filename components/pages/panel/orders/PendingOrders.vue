<script setup lang="ts">
import { useBasketStore } from '~/store/shop/BasketStore'

const breakpoints = {
  1250: {
    slidesPerView: 4,
    spaceBetween: 10,
  },
}
const basketStore = useBasketStore()
</script>

<template>
  <div>
    <nuxt-link
      v-for="data in basketStore.currentPendingOrder" :key="data.id"
      :to="`/panel/orders/${data.slug}/`"
    >
      <div class="rounded-lg  bg-gray-100 dark:bg-gray-900 p-4 cursor-pointer">
        <div class="flex flex-col">
          <div class="flex  justify-between mb-4">
            <div class="flex sm:flex-col items-center  gap-4">
              <div class="flex items-center gap-x-2">
                <div>
                  <Icon
                    name="carbon:warning-filled" size="24"
                    class="text-yellow-500 dark:text-yellow-400"
                  />
                </div>
                <div class="text-yellow-500 dark:text-yellow-400">
                  در انتظار پرداخت
                </div>
              </div>
              <div class="flex items-center gap-x-2">
                <div class="text-slate-600 dark:text-slate-300 text-sm">
                  زمان باقی مانده
                </div>
                <div class="text-slate-600 dark:text-slate-300 text-sm">
                  <LegoCountDown
                    v-slot="{ minutes }" :date="new Date(data.repayment_date_expire)"
                    enable-days
                  >
                    <strong class="text-red-600 dark:text-red-500">{{ minutes }}</strong> دقیقه
                  </LegoCountDown>
                </div>
              </div>
            </div>
            <div>
              <Icon name="ic:outline-chevron-left" size="24" class="text-slate-600 dark:text-slate-300" />
            </div>
          </div>
          <div class="flex md:flex-col  justify-between mb-4 gap-8">
            <div class="flex  md:flex-col  gap-4 ">
              <div class="flex items-center md:justify-between gap-x-2 ">
                <div class="text-sm text-slate-500 dark:text-slate-400">
                  شماره
                </div>
                <div class="text-sm text-slate-600 dark:text-slate-300">
                  {{ data.slug }}
                </div>
              </div>
              <div class="flex items-center md:justify-between gap-x-2 ">
                <div class="text-sm text-slate-500 dark:text-slate-400">
                  مجموع
                </div>
                <div class="text-sm text-slate-600 dark:text-slate-300">
                  {{ splitNumber(data.price) }} تومان
                </div>
              </div>
            </div>
          </div>
          <div>
            <BaseSwiper
              effect="cards"
              :breakpoints="breakpoints"
              :items="data.items"
            >
              <template #item="{ item }">
                <div class="rounded-lg border border-gray-200 dark:border-gray-700 p-2 ">
                  <div class="flex gap-x-2">
                    <nuxt-img
                      :src="GetImageUrl(item.product_image)" class="w-12 h-12 rounded-full"
                      :alt="item.product_title_ir"
                    />

                    <div
                      class="flex items-center text-sm text-slate-800 dark:text-slate-300 h-10 text-ellipsis overflow-hidden"
                    >
                      {{ item.product_title_ir }}
                    </div>
                  </div>
                </div>
              </template>
            </BaseSwiper>
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>
