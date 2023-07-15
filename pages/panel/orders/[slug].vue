<script setup lang="ts">
import { GetPaidOrderDetail } from '~/services/shop/order/paid.order.service'
import { RePaymentRequestSubmit } from '~/services/shop/order/checkout/order.payment.service'
import { toPersianDate } from '~/utils/DateUtils'
import { OrderDeliveryStatus, OrderPaymentStatus } from '~/models/shop/order/PaidOrderDTO'

definePageMeta({
  layout: 'user-panel',
})

const router = useRouter()
const toast = useToast()
const gatewayLoading = ref(false)
const gatewayMessage = ref('درحال پردازش')
const {
  data: result,
  pending,
} = await useAsyncData('panel_orders_detail', () => GetPaidOrderDetail(router.currentRoute.value.params.slug.toString()))
if (result.value?.data == null)
  throw createError({ statusCode: 404, message: 'صفحه مورد نظر یافت نشد', fatal: true })

async function rePaymentRequest(slug: string) {
  if (!slug)
    return
  gatewayLoading.value = true
  const res = await RePaymentRequestSubmit(slug)
  if (res.success) {
    gatewayMessage.value = res.message
    await window.location.replace(res.data.payment_gateway_link)
  }
  else {
    toast.add({ title: res.message, color: 'red' })

    if (res.data.redirect_to)
      await router.push(res.data.redirect_to)
    gatewayLoading.value = false
  }
}

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
  <div v-if="result?.data" class="bg-white dark:bg-gray-800  rounded-lg p-4">
    <!-- Section Title -->
    <div class="flex justify-between mb-5">
      <h1 class="relative text-lg text-slate-700 dark:text-slate-200 pb-2 select-none ">
        جزئیات سفارش
        <span
          class="absolute right-0 bottom-0 w-full bg-sky-500 rounded-full h-[3px]"
        />
      </h1>

      <div class="w-28">
        <UButton
          size="lg" block
          color="gray" label="برگشت"
          to="/panel/orders/"
          trailing-icon="i-mdi-chevron-left"
        />
      </div>
    </div>
    <!-- Section Content -->
    <div>
      <div class="flex flex-col gap-y-4">
        <div class="rounded-lg  bg-gray-100 dark:bg-gray-900 p-4  ">
          <div class="flex flex-col">
            <template v-if="result?.data?.payment_status === OrderPaymentStatus.PAID">
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
              </div>
            </template>
            <template v-if="result?.data?.payment_status === OrderPaymentStatus.PENDING_PAYMENT">
              <div class="flex sm:flex-col gap-4 justify-between mb-4">
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
                        v-slot="{ minutes }" :date="new Date(result?.data?.repayment_date_expire)"
                        enable-days
                      >
                        <strong class="text-red-600 dark:text-red-500">{{ minutes }}</strong> دقیقه
                      </LegoCountDown>
                    </div>
                  </div>
                </div>
                <div class="w-36 sm:w-full sm:order-first">
                  <UButton
                    :loading="gatewayLoading || pending" :disabled="gatewayLoading || pending" size="md" block
                    color="green" label="پرداخت مجدد" @click="rePaymentRequest(result?.data?.slug)"
                  />
                </div>
              </div>
            </template>

            <div class="flex md:flex-col  justify-between mb-4 gap-8">
              <div class="flex  md:flex-col  gap-4 ">
                <div class="flex items-center md:justify-between gap-x-2 ">
                  <div class="text-sm text-slate-500 dark:text-slate-400">
                    شماره
                  </div>
                  <div class="text-sm text-slate-600 dark:text-slate-300">
                    {{ result?.data?.slug }}
                  </div>
                </div>
                <div class="flex items-center md:justify-between gap-x-2 ">
                  <div class="text-sm text-slate-500 dark:text-slate-400">
                    مجموع
                  </div>
                  <div class="text-sm text-slate-600 dark:text-slate-300">
                    {{ splitNumber(result?.data?.total_payment_price) }} تومان
                  </div>
                </div>
                <div
                  v-if="result?.data?.payment_status === OrderPaymentStatus.PAID"
                  class="flex items-center md:justify-between gap-x-2"
                >
                  <div class="text-sm text-slate-500 dark:text-slate-400">
                    تاریخ
                  </div>
                  <div class="text-sm text-slate-600 dark:text-slate-300">
                    {{ getPersianDate(result?.data?.date_ordered, "y/M/dd") }}
                  </div>
                </div>
              </div>
              <div
                v-if="result?.data?.payment_status === OrderPaymentStatus.PAID"
                class="flex-1 max-w-xs md:flex md:max-w-full flex-col gap-y-1 "
              >
                <div
                  class="flex items-center md:justify-center gap-x-2"
                  :class="getDeliveryStatusData(result?.data?.delivery_status).textColor"
                >
                  <div class="text-sm ">
                    {{ getDeliveryStatusData(result?.data?.delivery_status).text }}
                  </div>
                  <div>
                    <Icon
                      :name="getDeliveryStatusData(result?.data?.delivery_status).icon" size="20"
                    />
                  </div>
                  <div>
                    {{ toPersianDate(result?.data?.date_delivery_status_updated, true, true) }}
                  </div>
                </div>
                <div class="mb-4">
                  <div class="mt-3   h-1.5 relative w-full rounded-full overflow-hidden">
                    <div class=" w-full h-full bg-gray-200 dark:bg-gray-700 absolute " />
                    <div
                      class=" h-full  rounded-full absolute"
                      :class="getDeliveryStatusData(result?.data?.delivery_status).bgColor"
                      :style="{ width: `${getDeliveryStatusData(result?.data?.delivery_status).percentage}%` }"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-x-4 md:justify-between">
              <div class="text-sm text-slate-500 dark:text-slate-400">
                کد پیگیری سفارش
              </div>
              <div class="text-sm text-slate-600 dark:text-slate-300">
                <template v-if="result?.data?.transaction_id">
                  {{ result?.data?.transaction_id }}
                </template>
                <template v-else>
                  <UTooltip text="بعد پرداخت نهایی, ثبت می شود">
                    <div class="flex items-center gap-x-2 cursor-pointer">
                      <div>
                        ثبت نشده
                      </div>
                      <div>
                        <Icon name="solar:question-circle-linear" size="20" />
                      </div>
                    </div>
                  </UTooltip>
                </template>
              </div>
            </div>
          </div>
        </div>

        <!-- Address -->
        <div
          class="bg-gray-100 dark:bg-gray-900 py-4 px-4 rounded-lg "
        >
          <div class="flex items-center justify-between gap-x-2 mb-4">
            <div class="text-slate-600 dark:text-slate-300 ">
              آدرس تحویل سفارش
            </div>
            <div class="w-24">
              <UButton
                size="md" block
                color="sky" label="تغییر"
              />
            </div>
          </div>
          <div class="flex flex-col gap-y-6 text-sm">
            <p class=" text-slate-700 dark:text-slate-200">
              {{ result?.data?.address?.receiver_address }}
            </p>
            <div class="grid grid-cols-4 lg:grid-cols-2 items-center  center gap-4  w-fit lg:w-full">
              <div class="flex items-center gap-x-2">
                <Icon name="solar:user-outline" size="20" class="text-sky-500 dark:text-sky-400" />
                <p class="text-slate-600 dark:text-slate-300">
                  {{ result?.data?.address?.receiver_name }} {{ result?.data?.address?.receiver_family }}
                </p>
              </div>

              <div class="flex items-center gap-x-2">
                <Icon name="solar:signpost-broken" size="20" class="text-sky-500 dark:text-sky-400" />
                <p class="text-slate-600 dark:text-slate-300">
                  {{ result?.data?.address?.receiver_province }}, {{ result?.data?.address?.receiver_city }}
                </p>
              </div>
              <div class="flex items-center gap-x-2">
                <Icon name="material-symbols:mail-outline" size="20" class="text-sky-500 dark:text-sky-400" />
                <p class="text-slate-600 dark:text-slate-300">
                  {{ result?.data?.address?.receiver_postal_code }}
                </p>
              </div>
              <div class="flex items-center  gap-x-2">
                <Icon name="solar:phone-linear" size="20" class="text-sky-500 dark:text-sky-400" />
                <p class="text-slate-600 dark:text-slate-300">
                  {{ result?.data?.address?.receiver_phone }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- Order Items -->
        <div class="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg ">
          <div class="flex flex-col gap-4 border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
            <div class="flex md:flex-col gap-4">
              <div class="flex items-center gap-x-4 md:justify-between">
                <div class="text-sm text-slate-500 dark:text-slate-400">
                  مبلغ مرسوله
                </div>
                <div class=" text-slate-600 dark:text-slate-300">
                  {{ splitNumber(result?.data?.total_price_before_discount) }} تومان
                </div>
              </div>

              <div class="flex items-center gap-x-4 md:justify-between">
                <div class="text-sm text-slate-500 dark:text-slate-400">
                  تخفیف کالا ها
                </div>
                <template v-if="result?.data?.total_profit_before_discount">
                  <div class=" text-red-500 dark:text-red-400">
                    {{ splitNumber(result?.data?.total_profit_before_discount) }} تومان
                  </div>
                </template>
                <template v-else>
                  <span class=" text-slate-600 dark:text-slate-300">
                    ندارد

                  </span>
                </template>
              </div>
              <div class="flex items-center gap-x-4 md:justify-between">
                <div class="text-sm text-slate-500 dark:text-slate-400">
                  کد تخفیف
                </div>
                <div>
                  <template v-if="result?.data?.coupon_effect_price">
                    <span class=" text-red-500 dark:text-red-400">
                      {{ splitNumber(result?.data?.coupon_effect_price) }} تومان

                    </span>
                  </template>
                  <template v-else>
                    <span class=" text-slate-600 dark:text-slate-300">
                      ثبت نشده

                    </span>
                  </template>
                </div>
              </div>
            </div>

            <div class="flex md:flex-col gap-4">
              <div class="flex items-center gap-x-4 md:justify-between">
                <div class="text-sm text-slate-500 dark:text-slate-400">
                  شرکت پست
                </div>
                <div class=" text-slate-600 dark:text-slate-300">
                  {{ result?.data?.shipping_service.name }}
                </div>
              </div>
              <div class="flex items-center gap-x-4 md:justify-between">
                <div class=" text-slate-500 dark:text-slate-400">
                  هزینه ارسال
                </div>
                <div class=" text-slate-600 dark:text-slate-300">
                  <template v-if="result?.data?.shipping_service.pay_at_destination">
                    <UTooltip text="توسط شرکت پست قیمت گذاری می شود" class="cursor-pointer">
                      <div class="flex items-center gap-x-2 cursor-pointer">
                        <div>
                          کرایه در مقصد
                        </div>
                        <div>
                          <Icon name="solar:question-circle-linear" size="20" />
                        </div>
                      </div>
                    </UTooltip>
                  </template>
                  <template v-else>
                    <template v-if="result?.data?.shipping_service.price > 0">
                      {{ splitNumber(result?.data?.shipping_service.price) }} تومان
                    </template>
                    <template v-else>
                      رایگان
                    </template>
                  </template>
                </div>
              </div>
              <div class="flex items-center gap-x-4 md:justify-between">
                <div class="text-sm text-slate-500 dark:text-slate-400">
                  کد پیگیری مرسوله
                </div>
                <div class=" text-slate-600 dark:text-slate-300">
                  <template v-if="result?.data?.tracking_code">
                    {{ result?.data?.tracking_code }}
                  </template>
                  <template v-else>
                    <UTooltip text="بعد از مرحله ارسال, ثبت می شود">
                      <div class="flex items-center gap-x-2 cursor-pointer">
                        <div>
                          ثبت نشده
                        </div>
                        <div>
                          <Icon name="solar:question-circle-linear" size="20" />
                        </div>
                      </div>
                    </UTooltip>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="text-slate-600 dark:text-slate-300 mb-4">
              اقلام سفارش
            </div>
            <div class="flex flex-col gap-y-4">
              <div
                v-for="product in result?.data?.items" :key="product.id"
                class="border border-gray-200 dark:border-gray-800 p-4 rounded-lg"
              >
                <div class="flex xs:flex-col gap-4">
                  <!-- item image -->
                  <div class="flex items-start justify-center min-w-fit">
                    <nuxt-link :to="product.product_url">
                      <nuxt-img
                        :src="GetImageUrl(product.product_image)"
                        :alt="product.product_title_ir"
                        width="120"
                        height="120"
                        loading="lazy"
                        placeholder
                        quality="50"
                        class="rounded-lg"
                      />
                    </nuxt-link>
                  </div>
                  <!-- item detail -->
                  <div class="flex flex-col gap-y-4">
                    <nuxt-link
                      :to="product.product_url"
                      class="text-slate-600 dark:text-slate-300 h-5 xs:h-12 text-ellipsis overflow-hidden"
                    >
                      {{ product.product_title_ir }}
                    </nuxt-link>
                    <!-- Order Item Selected Variant -->

                    <div v-if="!product.variant.type.is_none" class="flex items-center gap-x-2 xs:justify-between">
                      <div class="text-sm xs:text-base text-slate-500 dark:text-slate-400">
                        {{ product.variant.type.title_ir }}
                      </div>
                      <div class="text-sm xs:text-base text-slate-500 dark:text-slate-400">
                        {{ splitNumber(product.variant.value.value) }}

                        {{ product.variant.value.prefix.name }}
                      </div>
                    </div>
                    <!-- Order Item Count -->

                    <div class="flex items-center gap-x-2 xs:justify-between">
                      <div class="text-sm xs:text-base text-slate-500 dark:text-slate-400">
                        تعداد
                      </div>
                      <div class="text-sm xs:text-base text-slate-500 dark:text-slate-400">
                        {{ product.count }}
                      </div>
                    </div>
                    <!-- Order Item Price with profit -->

                    <div class="flex xs:flex-col  gap-4">
                      <div class="flex items-center gap-x-2 xs:justify-between">
                        <div class="text-sm xs:text-base text-slate-500 dark:text-slate-400">
                          قیمت
                        </div>
                        <div class="text-sm xs:text-base text-slate-500 dark:text-slate-400">
                          {{ splitNumber(product.final_price / product.count) }} تومان
                        </div>
                      </div>
                      <div
                        v-if="product.final_profit"
                        class="flex items-center gap-x-2 xs:justify-between text-red-500 dark:text-red-400"
                      >
                        <div class="text-sm xs:text-base ">
                          {{ splitNumber(product.final_profit) }} تومان
                        </div>
                        <div class="text-sm xs:text-base ">
                          تخفیف
                        </div>
                      </div>
                    </div>
                    <!-- Order Item Total Price -->
                    <div class="flex items-center gap-x-2 xs:justify-between text-sky-500 dark:text-sky-400">
                      <div class=" xs:text-base ">
                        مجموع سفارش
                      </div>
                      <div class=" xs:text-base ">
                        {{ splitNumber(product.final_price) }} تومان
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="gatewayLoading"
      class="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-gray-200/75 dark:bg-gray-800/75"
    >
      <div
        class=" py-10 px-24 bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800 shadow rounded-lg flex items-center flex-col"
      >
        <div>
          <Icon name="svg-spinners:3-dots-scale" size="40" class="text-sky-500 dark:text-sky-400" />
        </div>
        <div class="text-gray-500 dark:text-gray-400  text-sm sm:text-xs font-medium mt-2 text-center">
          {{ gatewayMessage }}
        </div>
      </div>
    </div>
  </div>
</template>
