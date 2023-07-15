<script setup lang="ts">
import { GetPaidOrderList } from '~/services/shop/order/paid.order.service'
import { OrderDeliveryStatus } from '~/models/shop/order/PaidOrderDTO'
import { toPersianDate } from '~/utils/DateUtils'

definePageMeta({
  layout: 'user-panel',
})
const breakpoints = {
  1250: {
    slidesPerView: 4,
    spaceBetween: 10,
  },
}
const pageNumber = ref(1)
const takeNumber = ref(5)
const {
  data: result,
  refresh,
  pending,
} = await useAsyncData('panel_orders', () => GetPaidOrderList(pageNumber.value, takeNumber.value))
watch(() => pageNumber.value, () => {
  refresh()
})

interface deliveryData {
  text: string
  bgColor: string
  textColor: string
  percentage: number
  icon: string
}

function getDeliveryStatusData(status: OrderDeliveryStatus): deliveryData {
  if (status === OrderDeliveryStatus.PENDING) {
    return {
      text: 'در انتظار تایید',
      bgColor: 'bg-yellow-500 dark:bg-yellow-400',
      textColor: 'text-yellow-500 dark:text-yellow-400',
      percentage: 25,
      icon: 'ic:baseline-pending-actions',
    }
  }
  else if (status === OrderDeliveryStatus.CANCELED) {
    return {
      text: 'لغو شده',
      bgColor: 'bg-red-500 dark:bg-red-400',
      textColor: 'text-red-500 dark:text-red-400',
      percentage: 100,
      icon: 'ep:circle-close',
    }
  }
  else if (status === OrderDeliveryStatus.PROCESSING) {
    return {
      text: 'درحال پردازش',
      bgColor: 'bg-sky-500 dark:bg-sky-400',
      textColor: 'text-sky-500 dark:text-sky-400',
      percentage: 50,
      icon: 'carbon:delivery-parcel',
    }
  }
  else if (status === OrderDeliveryStatus.SHIPPED) {
    return {
      text: 'ارسال شده',
      bgColor: 'bg-teal-500 dark:bg-teal-400',
      textColor: 'text-teal-500 dark:text-teal-400',
      percentage: 75,
      icon: 'carbon:delivery',
    }
  }
  else if (status === OrderDeliveryStatus.DELIVERED) {
    return {
      text: 'تحویل داده شده',
      bgColor: 'bg-green-500 dark:bg-green-400',
      textColor: 'text-green-500 dark:text-green-400',
      percentage: 100,
      icon: 'icon-park-outline:delivery',
    }
  }
  return { text: '', bgColor: '', textColor: '', percentage: 0, icon: '' }
}
</script>

<template>
  <div>
    <div class="bg-white dark:bg-gray-800  rounded-lg p-4">
      <!-- Section Title -->
      <div class="flex mb-5">
        <h1 class="relative text-lg text-slate-700 dark:text-slate-200 pb-2 select-none ">
          سفارش ها
          <span class="absolute right-0 bottom-0 w-full bg-sky-500 rounded-full h-[3px]" />
        </h1>
      </div>
      <!-- Section Content -->
      <div>
        <!-- orders List -->

        <template v-if="pending">
          <div class="flex flex-col gap-y-4">
            <div v-for="i in 1" :key="i" class="relative bg-gray-100 dark:bg-gray-900 py-4 px-4 rounded-lg">
              <div class="flex flex-col gap-y-4 text-sm">
                <p class=" text-slate-700 dark:text-slate-200">
                  <USkeleton class="w-28 h-5" />
                </p>
                <div class="flex md:flex-col  justify-between mb-4 gap-8">
                  <div class="flex md:flex-col md:justify-between gap-4">
                    <div class="flex items-center md:justify-between gap-x-2">
                      <USkeleton class="w-14 h-5" />
                      <USkeleton class="w-14 h-5" />
                    </div>
                    <div class="flex items-center md:justify-between gap-x-2">
                      <USkeleton class="w-14 h-5" />
                      <USkeleton class="w-14 h-5" />
                    </div>
                    <div class="flex items-center md:justify-between gap-x-2">
                      <USkeleton class="w-14 h-5" />
                      <USkeleton class="w-14 h-5" />
                    </div>
                  </div>
                  <div class="flex-1 max-w-xs md:flex md:max-w-full">
                    <div class="flex flex-col  gap-2 w-full">
                      <div class="flex gap-x-2 md:justify-center">
                        <USkeleton class="w-28 h-3" />
                        <USkeleton class="w-28 h-3" />
                      </div>
                      <USkeleton class="w-full h-1.5" />
                    </div>
                  </div>
                </div>
                <div>
                  <BaseSwiper
                    effect="cards"
                    :breakpoints="breakpoints"
                    :items="[1, 2, 3, 4]"
                  >
                    <template #item>
                      <div>
                        <USkeleton class="w-full h-16" />
                      </div>
                    </template>
                  </BaseSwiper>
                </div>
              </div>
              <div class="absolute left-3 top-4 md:hidden">
                <USkeleton class="w-5 h-5 rounded-full" />
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="flex flex-col gap-y-4">
            <!-- Pending Orders -->
            <PagesPanelOrdersPendingOrders />
            <template v-if="result!.data?.data.length > 0">
              <!-- Paid Orders -->
              <nuxt-link
                v-for="data in result?.data?.data" :key="data.id"
                :to="`/panel/orders/${data.slug}/`"
              >
                <div class="rounded-lg  bg-gray-100 dark:bg-gray-900 p-4 cursor-pointer ">
                  <div class="flex flex-col">
                    <div class="flex items-center justify-between mb-4">
                      <div class="flex items-center gap-x-2">
                        <div>
                          <Icon
                            name="material-symbols:check-circle-rounded" size="24"
                            class="text-green-500 dark:text-green-400"
                          />
                        </div>
                        <div class="text-green-500 dark:text-green-400">
                          پرداخت شده
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
                            {{ splitNumber(data.total_payment_price) }} تومان
                          </div>
                        </div>
                        <div class="flex items-center md:justify-between gap-x-2">
                          <div class="text-sm text-slate-500 dark:text-slate-400">
                            تاریخ
                          </div>
                          <div class="text-sm text-slate-600 dark:text-slate-300">
                            {{ getPersianDate(data.date_ordered, "y/M/dd") }}
                          </div>
                        </div>
                      </div>
                      <div class="flex-1 max-w-xs md:flex md:max-w-full flex-col gap-y-1 ">
                        <div
                          class="flex items-center md:justify-center gap-x-2"
                          :class="getDeliveryStatusData(data.delivery_status).textColor"
                        >
                          <div class="text-sm ">
                            {{ getDeliveryStatusData(data.delivery_status).text }}
                          </div>
                          <div>
                            <Icon
                              :name="getDeliveryStatusData(data.delivery_status).icon" size="20"
                            />
                          </div>
                          <div>
                            {{ toPersianDate(data.date_delivery_status_updated, true, true) }}
                          </div>
                        </div>
                        <div>
                          <div class="mt-3   h-1.5 relative w-full rounded-full overflow-hidden">
                            <div class=" w-full h-full bg-gray-200 dark:bg-gray-700 absolute " />
                            <div
                              class=" h-full  rounded-full absolute"
                              :class="getDeliveryStatusData(data.delivery_status).bgColor"
                              :style="{ width: `${getDeliveryStatusData(data.delivery_status).percentage}%` }"
                            />
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
            </template>
            <template v-if="result!.data?.data.length <= 0 && !pending">
              <div class="flex flex-col gap-y-4 items-center justify-center">
                <div>
                  <Icon name="tabler:notes-off" size="100" class="!text-slate-500 dark:text-slate-400" />
                </div>
                <div class="text-slate-500 dark:text-slate-400 text-xl">
                  سفارشی یافت نشد!
                </div>
              </div>
            </template>
          </div>
        </template>

        <!-- Pagination -->
        <div v-if="result!.data.page_count > 1 && !pending" class="mt-8">
          <UPagination
            v-model="pageNumber" :page-count="takeNumber" size="lg"
            :total="result?.data?.entity_count ?? 0"
            :ui="{ rounded: 'first-of-type:rounded-s-md last-of-type:rounded-e-md' }"
          >
            <template #prev="{ onClick }">
              <UTooltip text="صفحه قبلی">
                <UButton
                  icon="i-heroicons-arrow-small-left-20-solid" color="primary" :ui="{ rounded: 'rounded-full' }"
                  class="rtl:[&_span:first-child]:rotate-180 me-2" @click="onClick"
                />
              </UTooltip>
            </template>

            <template #next="{ onClick }">
              <UTooltip text="صفحه بعدی">
                <UButton
                  icon="i-heroicons-arrow-small-right-20-solid" color="primary" :ui="{ rounded: 'rounded-full' }"
                  class="rtl:[&_span:last-child]:rotate-180 ms-2" @click="onClick"
                />
              </UTooltip>
            </template>
          </UPagination>
        </div>
      </div>
    </div>
  </div>
</template>
