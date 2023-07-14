<script setup lang="ts">
import { GetPaidOrderList } from '~/services/shop/order/paid.order.service'
import { OrderDeliveryStatus } from '~/models/shop/order/PaidOrderDTO'

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
const loading = ref(false)
const {
  data: result,
  refresh,
  pending,
} = await useAsyncData('panel_orders', () => GetPaidOrderList(pageNumber.value, 20))

interface deliveryData {
  text: string
  color: string
  percentage: number
}

function getDeliveryStatusData(status: OrderDeliveryStatus): deliveryData {
  if (status === OrderDeliveryStatus.PENDING)
    return { text: 'در انتظار تایید', color: 'bg-yellow-500 dark:bg-yellow-400', percentage: 25 }

  else if (status === OrderDeliveryStatus.CANCELED)
    return { text: 'لغو شده', color: 'bg-red-500 dark:bg-red-400', percentage: 100 }

  else if (status === OrderDeliveryStatus.PROCESSING)
    return { text: 'درحال پردازش', color: 'bg-sky-500 dark:bg-sky-400', percentage: 50 }

  else if (status === OrderDeliveryStatus.SHIPPED)
    return { text: 'ارسال شده', color: 'bg-teal-500 dark:bg-teal-400', percentage: 75 }

  else if (status === OrderDeliveryStatus.DELIVERED)
    return { text: 'تحویل داده شده', color: 'bg-green-500 dark:bg-green-400', percentage: 100 }
  return { text: '', color: '', percentage: 0 }
}
</script>

<template>
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
      <div class="space-y-4">
        <!-- Pending Orders -->
        <PagesPanelOrdersPendingOrders />
        <!-- Paid Orders -->
        <div
          v-for="data in result?.data?.data" :key="data.id"
          class="rounded-lg  bg-gray-100 dark:bg-gray-900 p-4 cursor-pointer"
        >
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
                <div class="text-sm md:text-center text-slate-500 dark:text-slate-400">
                  {{ getDeliveryStatusData(data.delivery_status).text }}
                </div>
                <div>
                  <div class="mt-3   h-1.5 relative w-full md:w-full rounded-full overflow-hidden">
                    <div class=" w-full h-full bg-gray-200 dark:bg-gray-700 absolute " />
                    <div
                      class=" h-full  rounded-full absolute"
                      :class="getDeliveryStatusData(data.delivery_status).color"
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
      </div>
    </div>
  </div>
</template>
