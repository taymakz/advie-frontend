<script setup lang="ts">
import { useBasketStore } from '~/store/shop/BasketStore'
import { RePaymentRequestSubmit } from '~/services/shop/order/checkout/order.payment.service'

const basketStore = useBasketStore()
const router = useRouter()
const toast = useToast()
const loading = ref(false)
const gatewayLoading = ref(false)
const gatewayMessage = ref('درحال پردازش')

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
</script>

<template>
  <div>
    <div v-if="basketStore.currentPendingOrder.length > 0" class="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
      <!-- Content -->
      <div class="flex flex-col gap-y-4">
        <div>
          <p
            class="text-yellow-500 dark:text-yellow-400
"
          >
            شما {{ basketStore.currentPendingOrder.length }} سفارش در انتظار پرداخت دارید
          </p>
        </div>

        <div class="flex flex-col  gap-y-2">
          <div
            v-for="item in basketStore.currentPendingOrder" :key="item.id"
            class="bg-white border dark:border-none dark:bg-gray-900  rounded-lg p-4"
          >
            <div class="flex flex-col gap-y-2">
              <div class="flex md:flex-col gap-y-4  justify-between">
                <div class="flex sm:flex-col gap-y-4 justify-center gap-x-8 ">
                  <div
                    class="text-sm flex flex-col sm:flex-row sm:justify-between gap-y-2 items-center text-slate-500 dark:text-slate-400"
                  >
                    <div>
                      شماره سفارش
                    </div>
                    <div>
                      {{ item.slug }}
                    </div>
                  </div>

                  <div
                    class="text-sm flex flex-col  sm:flex-row sm:justify-between gap-y-2 items-center text-slate-500 dark:text-slate-400"
                  >
                    <div>
                      مبلغ قابل پرداخت
                    </div>
                    <div>
                      {{ splitNumber(item.price) }} <small class="text-xs">تومان</small>
                    </div>
                  </div>
                  <div
                    class="text-sm flex flex-col  sm:flex-row sm:justify-between gap-y-2 items-center text-slate-500 dark:text-slate-400"
                  >
                    <div>
                      زمان باقی مانده
                    </div>
                    <div>
                      <LegoCountDown
                        v-slot="{ minutes }" :date="new Date(item.repayment_date_expire)"
                        enable-days
                      >
                        <strong class="text-red-600 dark:text-red-500">{{ minutes }}</strong> دقیقه
                      </LegoCountDown>
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-x-4 md:w-full md:justify-center">
                  <div class="w-32 md:w-full">
                    <UButton
                      :loading="gatewayLoading || loading" :disabled="gatewayLoading || loading" size="lg" block
                      color="green" variant="outline" label="پرداخت مجدد" @click="rePaymentRequest(item.slug)"
                    />
                  </div>
                  <div class="w-32 md:w-full">
                    <UButton
                      :loading="gatewayLoading || loading" :disabled="gatewayLoading || loading"
                      :to="`/panel/orders/${item.slug}/`" size="lg"
                      block
                      color="sky" variant="outline" label="جزئیات"
                    />
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
  </div>
</template>
