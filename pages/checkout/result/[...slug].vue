<script setup lang="ts">
import { GetCheckoutResult } from '~/services/shop/order/checkout/order.payment.service'
import { TransactionStatus } from '~/models/shop/order/checkout/CheckoutDTO'

definePageMeta({
  layout: 'checkout',
  middleware: 'authenticated',
})

const route = useRoute()

const transaction_id = route.params.slug[0].toString()

const transaction_slug = route.params.slug[1].toString()

const {
  data: result,
  pending,
  error,
} = await useAsyncData('checkout_result', () => GetCheckoutResult(transaction_id, transaction_slug))
if (result.value?.data == null)
  throw createError({ statusCode: 404, message: 'صفحه مورد نظر یافت نشد', fatal: true })
</script>

<template>
  <div>
    <div v-if="result?.data && !pending && !error">
      <div class="container max-w-4xl py-2">
        <!-- Success Payment -->
        <div
          v-if="result?.data?.transaction_status === TransactionStatus.SUCCESS"
          class="bg-white dark:bg-gray-800 rounded-lg p-4 relative"
        >
          <div
            class="absolute sm:static top-0 left-0 sm:inset-x-0 flex items-center justify-center bg-green-500 sm:bg-transparent sm:dark:bg-transparent dark:bg-green-500 rounded-tl-lg rounded-br-lg sm:rounded-tr-lg sm:rounded-br-none p-2 sm:p-0 sm:mb-4"
          >
            <Icon
              name="streamline:interface-validation-check-circle-checkmark-addition-circle-success-check-validation-add-form"
              class="w-14 h-14  text-white sm:text-green-500 sm:dark:text-green-500"
            />
          </div>
          <div class="flex sm:justify-center  mb-4 sm:mb-8">
            <div class="flex flex-col sm:items-center  gap-y-4">
              <h1 class="text-xl text-green-600 dark:text-green-500">
                سفارش شما با موفقیت ثبت شد!
              </h1>

              <div>
                <p class=" text-slate-600 dark:text-slate-300">
                  شماره سفارش : <span class=" tracking-wider">{{ result?.data?.order_slug }}</span>
                </p>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center  mb-6  text-sm ">
            <div class="flex flex-col items-center gap-y-2 md:gap-y-4">
              <p class="text-base text-slate-600 dark:text-slate-300">
                جرئیات پرداخت
              </p>
              <div class=" flex items-center gap-x-4">
                <p class=" text-slate-600 dark:text-slate-300">
                  شماره پیگیری : <span class=" tracking-wider">{{ result?.data?.transaction_id }}</span>
                </p>
                <p class="  text-slate-600 dark:text-slate-300">
                  تاریخ : <span class=" tracking-wider">{{
                    getPersianDate(result?.data?.payment_date, "y/M/dd")
                  }}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-center gap-x-4">
            <div class="w-32 sm:w-full">
              <UButton
                :to="`/panel/orders/${result?.data?.order_slug}`" size="xl" block color="green" variant="outline"
                label="پیگیری سفارش"
              />
            </div>
            <div class="w-32 sm:w-full">
              <UButton to="/" size="xl" block color="sky" variant="outline" label="بازگشت" />
            </div>
          </div>
        </div>
        <!-- Failed Payment -->
        <div
          v-if="result?.data?.transaction_status === TransactionStatus.FAILED"

          class="bg-white dark:bg-gray-800 rounded-lg p-4 relative"
        >
          <div
            class="absolute sm:static top-0 left-0 sm:inset-x-0 flex items-center justify-center bg-red-500 sm:bg-transparent sm:dark:bg-transparent dark:bg-red-500 rounded-tl-lg rounded-br-lg sm:rounded-tr-lg sm:rounded-br-none p-2 sm:p-0 sm:mb-4"
          >
            <Icon
              name="typcn:delete-outline"
              class="w-14 h-14  text-white sm:text-red-500 sm:dark:text-red-500"
            />
          </div>
          <div class="flex sm:justify-center  mb-4 sm:mb-8">
            <div class="flex flex-col sm:items-center  gap-y-4">
              <h1 class="text-xl text-red-600 dark:text-red-500">
                پرداخت شما ناموفق بود!
              </h1>

              <div>
                <p class=" text-slate-600 dark:text-slate-300">
                  شماره سفارش : <span class=" tracking-wider">{{ result?.data?.order_slug }}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-y-4 items-start justify-center mb-6 text-sm ">
            <div class="flex gap-x-2  ">
              <div>
                <Icon name="bx:error-circle" size="20" class="text-red-600 dark:text-red-500" />
              </div>
              <p class=" tracking-wide leading-6 text-slate-600 dark:text-slate-300">
                <LegoCountDown
                  v-slot="{ minutes }" :date="new Date(result.data?.repayment_date_expire)"
                  enable-days
                >
                  سفارش شما تا <strong class="text-red-600 dark:text-red-500">{{ minutes }}</strong> دقیقه دیگر حذف
                  خواهد شد. برای تکمیل نهایی سفارش،
                  نسبت به پرداخت اقدام نمایید
                </LegoCountDown>
              </p>
            </div>
            <div class="flex gap-x-2 ">
              <div>
                <Icon name="bx:error-circle" size="20" class="text-red-600 dark:text-red-500" />
              </div>
              <p class=" tracking-wide leading-6 text-slate-600 dark:text-slate-300">
                چنانچه مبلغی از حساب شما کسر شده است، تا ۲۴ ساعت آینده به حساب شما باز خواهد گشت.
              </p>
            </div>
          </div>

          <div class="flex items-center justify-center  mb-6  text-sm  ">
            <div class="flex flex-col items-center gap-y-2 md:gap-y-4">
              <p class="text-base text-slate-600 dark:text-slate-300">
                جرئیات پرداخت
              </p>
              <div class=" flex items-center gap-x-4">
                <p class=" text-slate-600 dark:text-slate-300">
                  شماره پیگیری : <span class=" tracking-wider">{{ result?.data?.transaction_id }}</span>
                </p>
                <p class="  text-slate-600 dark:text-slate-300">
                  تاریخ : <span class=" tracking-wider">{{
                    getPersianDate(result?.data?.payment_date, "y/M/dd")
                  }}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-center gap-x-4">
            <div class="w-32 sm:w-full">
              <UButton size="xl" block color="green" variant="outline" label="پرداخت مجدد" />
            </div>
            <div class="w-32 sm:w-full">
              <UButton to="/" size="xl" block color="sky" variant="outline" label="بازگشت" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>