<script setup lang="ts">
import { GetPaidOrderDetail } from '~/services/shop/order/paid.order.service'
import { RePaymentRequestSubmit } from '~/services/shop/order/checkout/order.payment.service'

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
</script>

<template>
  <div class="bg-white dark:bg-gray-800  rounded-lg p-4">
    <!-- Section Title -->
    <div class="flex justify-between mb-5">
      <h1 class="relative text-lg text-slate-700 dark:text-slate-200 pb-2 select-none ">
        جزئیات سفارش
        <span
          class="absolute right-0 bottom-0 w-full bg-sky-500 rounded-full h-[3px]"
        />
      </h1>

      <!--        <UButton -->
      <!--          :loading="gatewayLoading || loading" :disabled="gatewayLoading || loading" size="lg" block -->
      <!--          color="green" label="پرداخت " @click="rePaymentRequest(result?.data?.slug.toString())" -->
      <!--        /> -->
    </div>
    <!-- Section Content -->
  </div>
</template>
