<script setup lang="ts">
import type { Ref } from 'vue'
import * as Yup from 'yup'
import { useBasketStore } from '~/store/shop/BasketStore'
import type { DiscountDTO } from '~/models/shop/order/checkout/DiscountDTO'
import { UseCoupon } from '~/services/shop/order/checkout/order.coupon.service'
import { PaymentRequestSubmit } from '~/services/shop/order/checkout/order.payment.service'

definePageMeta({
  middleware: 'authenticated',
  layout: 'checkout',

})

const basketStore = useBasketStore()
const router = useRouter()
const toast = useToast()
const loading = ref(false)
const couponLoading = ref(false)
const gatewayLoading = ref(false)
const gatewayMessage = ref('درحال پردازش')

onMounted(async () => {
  loading.value = true
  const basketStore = useBasketStore()
  if (basketStore.currentOrder?.shipping === null)
    await router.push('/checkout/cart/')
  loading.value = false
})

const isFreeShipping = computed(() => {
  const total_price = basketStore.getTotalPrice()
  if (basketStore.currentOrder?.shipping)
    return basketStore.currentOrder?.shipping.price === 0 || (basketStore.currentOrder?.shipping.free_shipping_threshold > 0 && basketStore.currentOrder?.shipping.free_shipping_threshold <= total_price)
  else
    return false
})

const usedCoupon: Ref<DiscountDTO | null> = ref(null)
const couponForm = ref('')
const couponSchema = Yup.object().shape({
  coupon: Yup
    .string().required(),
})

async function useCoupon() {
  if (!couponForm.value)
    return toast.add({ title: 'کد تخفیف را وارد کنید', color: 'red' })
  couponLoading.value = true
  const result = await UseCoupon(couponForm.value)
  if (result.success) {
    toast.add({ title: result.message, color: 'green' })
    usedCoupon.value = result.data
  }
  else {
    toast.add({ title: result.message, color: 'red' })
    couponForm.value = ''
  }
  couponLoading.value = false
}

function removeCoupon() {
  usedCoupon.value = null
  couponForm.value = ''
  toast.add({ title: 'کد تخفیف حذف شد', color: 'sky' })
}

async function paymentRequest() {
  gatewayLoading.value = true
  const command = {
    coupon_code: couponForm.value,
  }
  const result = await PaymentRequestSubmit(command)
  if (result.success) {
    if (result.data.is_free) {
      gatewayMessage.value = result.message
      await router.push(result.data.redirect_to)
    }
    else {
      gatewayMessage.value = result.message
      await window.location.replace(result.data.payment_gateway_link)
    }
  }
  else {
    toast.add({ title: result.message, color: 'red' })

    if (result.data.redirect_to)
      await router.push(result.data.redirect_to)
    gatewayLoading.value = false
  }
}
</script>

<template>
  <div>
    <div class="container-checkout py-2">
      <div>
        <PagesCheckoutPaymentBreadcrumb />

        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-8 lg:col-span-12">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
              <!-- Coupon  -->
              <div class="flex flex-col gap-y-4 mb-6">
                <h4 class="text-base sm:text-sm text-slate-600 dark:text-slate-300">
                  کد تخفیف
                </h4>
                <div class="w-1/2 md:w-full ">
                  <Form v-slot="{ meta }" :validation-schema="couponSchema">
                    <Field v-slot="{ field }" name="coupon">
                      <BaseFormInput
                        v-model="couponForm"
                        v-bind="field"
                        with-border
                        label="اعمال کد تخفیف"
                        label-classes="bg-white dark:bg-slate-800"
                        :auto-complete="false"
                        with-button
                        :disabled="loading || gatewayLoading"
                        :button-color="usedCoupon ? 'red' : 'sky'"
                        :button-label="usedCoupon ? 'حذف' : 'ثبت'"
                        :button-disabled="meta.valid === false || loading || gatewayLoading"
                        :button-loading="loading || gatewayLoading"
                        @button-clicked="usedCoupon ? removeCoupon() : useCoupon()"
                      />
                    </Field>
                  </Form>
                </div>
              </div>

              <!-- Select Payment Service -->
              <div class="flex flex-col gap-y-4 mb-6">
                <div>
                  <h4 class="text-base sm:text-sm  text-slate-600 dark:text-slate-300">
                    انتخاب درگاه پرداخت
                  </h4>
                </div>
                <div>
                  <fieldset class="grid grid-cols-2 sm:grid-cols-1 gap-4">
                    <div>
                      <input
                        id="DeliveryStandard"
                        type="radio"
                        name="DeliveryOption"
                        value="DeliveryStandard"
                        class="peer hidden [&:checked_+_label_svg]:block"
                        checked
                      >

                      <label
                        for="DeliveryStandard"
                        class="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
                      >
                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-x-4">

                            <div>
                              <nuxt-img
                                src="/images/zarinpal.png"
                                class="rounded-full"
                                quality="60"
                                width="150"
                                format="png"
                                placeholder
                                loading="lazy"
                              />
                            </div>
                          </div>

                          <svg
                            class="hidden h-5 w-5 text-blue-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>

                      </label>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
          <!-- Desktop Sidebar -->
          <div class="col-span-4 lg:col-span-12 ">
            <div class="bg-white dark:bg-gray-800 rounded-lg  sticky top-28 py-4 px-6">
              <div class="flex flex-col gap-y-6 ">
                <!-- Items Price -->
                <div class="flex items-center justify-between  ">
                  <div class="text-slate-500 dark:text-slate-400 text-sm ">
                    قیمت کالاها ( {{ basketStore.getItemsCount }} )
                  </div>
                  <div class="flex items-center justify-center gap-x-1 text-sky-500 dark:text-sky-400 text-sm ">
                    <div class=" flex items-center gap-x-1">
                      <div class="font-iranyekanBold">
                        {{ splitNumber(basketStore.getTotalPriceBeforeDiscount()) }}
                      </div>
                      <div class="text-xs">
                        تومان
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Total Discount Price -->
                <div
                  v-if="basketStore.getTotalPriceAfterDiscount() > 0"
                  class="flex items-center justify-between "
                >
                  <div class="text-slate-500 dark:text-slate-400 text-sm ">
                    تخفیف کالاها
                  </div>
                  <div class="flex items-center justify-center gap-x-1 text-red-500 dark:text-red-500 text-sm ">
                    <div class=" flex items-center gap-x-1">
                      <div class="font-iranyekanBold">
                        ({{ basketStore.getDiscountPercentage() }}%)
                        {{ splitNumber(basketStore.getTotalPriceBeforeDiscount() - basketStore.getTotalPrice()) }}
                      </div>

                      <div class="text-xs">
                        تومان
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Coupon Price -->
                <div v-show="usedCoupon" class="flex items-center justify-between">
                  <div class="text-slate-500 dark:text-slate-400 text-sm ">
                    کد تخفیف
                  </div>
                  <div class="flex items-center justify-center gap-x-1  text-red-500 dark:text-red-500  text-sm ">
                    <div class=" flex items-center gap-x-1">
                      <div class="font-iranyekanBold">
                        ({{ usedCoupon ? usedCoupon.percentage_effect : 0 }}%)

                        {{ splitNumber(usedCoupon ? usedCoupon.discount_amount : 0) }}
                      </div>
                      <div class="text-xs">
                        تومان
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Shipping Price -->
                <div class="flex items-center justify-between">
                  <div class="text-slate-500 dark:text-slate-400 text-sm ">
                    هزینه ارسال
                  </div>
                  <div class="flex items-center justify-center gap-x-1  text-sm ">
                    <div class=" flex items-center gap-x-1">
                      <template v-if="basketStore.currentOrder?.shipping">
                        <template v-if="basketStore.currentOrder?.shipping.pay_at_destination">
                          <div class="font-iranyekanBold text-sky-500 dark:text-sky-400">
                            کرایه در مقصد
                          </div>
                        </template>
                        <template v-else>
                          <template v-if="isFreeShipping">
                            <div class="font-iranyekanBold text-sky-500 dark:text-sky-400">
                              رایگان
                            </div>
                          </template>
                          <template v-else>
                            <div class="font-iranyekanBold text-sky-500 dark:text-sky-400">
                              {{ splitNumber(basketStore.currentOrder?.shipping?.price) }}
                            </div>

                            <div class="text-xs text-sky-500 dark:text-sky-400">
                              تومان
                            </div>
                          </template>
                        </template>
                      </template>

                      <template v-else>
                        روش ارسال را انتخاب کنید
                      </template>
                    </div>
                  </div>
                </div>

                <!-- Total Cart Price -->
                <div
                  class="flex lg:hidden items-center justify-between  border-t border-gray-300 dark:border-gray-600 pt-4"
                >
                  <div class="text-slate-500 dark:text-slate-400 text-sm ">
                    مبلغ قابل پرداخت
                  </div>
                  <div class="flex items-center justify-center gap-x-1 text-sky-500 dark:text-sky-400 text-sm ">
                    <div class=" flex items-center gap-x-1">
                      <div class="font-iranyekanBold">
                        {{
                          splitNumber((basketStore.getTotalPrice() - (usedCoupon ? usedCoupon.discount_amount : 0)) + (basketStore.currentOrder?.shipping ? basketStore.currentOrder?.shipping.price : 0))
                        }}
                      </div>

                      <div class="text-xs">
                        تومان
                      </div>
                    </div>
                  </div>
                </div>

                <div class="lg:hidden">
                  <UButton block size="xl" color="sky" label="ثبت سفارش" @click="paymentRequest" />
                </div>
              </div>
            </div>
          </div>
          <!-- Mobile Sidebar -->
          <div
            class="z-10 hidden lg:flex fixed  bottom-0 left-0 right-0 w-full bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 py-3 px-4 h-20"
          >
            <div class="flex items-center justify-between w-full gap-x-5">
              <div class="flex-1 max-w-lg">
                <UButton
                  block size="xl" color="sky" label="ثبت سفارش" @click="paymentRequest"
                />
              </div>

              <div class="flex-col gap-y-2">
                <div class="text-slate-500 dark:text-slate-400 text-xs ">
                  مبلغ قابل پرداخت
                </div>
                <div class="flex items-center justify-center gap-x-1 text-sky-500 dark:text-sky-400 text-sm ">
                  <div class="font-bold">
                    {{
                      splitNumber((basketStore.getTotalPrice() - (usedCoupon ? usedCoupon.discount_amount : 0)) + (basketStore.currentOrder?.shipping ? basketStore.currentOrder?.shipping.price : 0))
                    }}
                  </div>
                  <div class="text-xs">
                    تومان
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
