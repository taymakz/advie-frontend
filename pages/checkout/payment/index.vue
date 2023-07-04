<script setup lang="ts">
import type { Ref } from 'vue'
import { useBasketStore } from '~/store/shop/BasketStore'
import type { AddressDetailDTO } from '~/models/account/user/AddressDTO'
import type { ShippingRateDTO } from '~/models/shop/order/checkout/ShippingMethodDTO'
import { GetShippingServices } from '~/services/shop/order/checkout/order.shipping.service'
import { PaymentRequestCheck } from '~/services/shop/order/checkout/order.payment.service'

definePageMeta({
  middleware: 'authenticated',
  layout: 'checkout',

})

const basketStore = useBasketStore()
const router = useRouter()
const toast = useToast()
const loading = ref(false)
const isOpenSelectAddressModal = ref(false)
const selectedAddress: Ref<AddressDetailDTO | null> = ref(null)

const selectedShipping: Ref<ShippingRateDTO | null> = ref(null)
const shippingServices: Ref<ShippingRateDTO[]> = ref([])
const filteredShippingServices: Ref<ShippingRateDTO[]> = ref([])
const isFreeShipping = computed(() => {
  const shipping = shippingServices.value.find(f => f.id === selectedShipping.value?.id)
  const total_price = basketStore.getTotalPrice()
  if (shipping)
    return shipping.price === 0 || (shipping.free_shipping_threshold > 0 && shipping.free_shipping_threshold <= total_price)
  else
    return false
})

watch(selectedAddress, (newValue) => {
  selectedShipping.value = null

  if (newValue === null || newValue === undefined || !selectedAddress)
    return
  const check = shippingServices.value.filter(f => f.area === newValue!.receiver_province)

  if (check.length > 0)
    filteredShippingServices.value = shippingServices.value.filter(f => f.area === newValue!.receiver_province)
  else
    filteredShippingServices.value = shippingServices.value.filter(f => f.all_area)
})

onMounted(async () => {
  const basketStore = await useBasketStore()
  if (basketStore.getItemsCount <= 0)
    return router.push('/checkout/cart/')
  const result = await GetShippingServices()
  shippingServices.value = result.data
})
watch(() => basketStore.getItemsCount, (newVal) => {
  if (newVal <= 0)
    return router.push('/checkout/cart/')
})

async function paymentRequest() {
  if (selectedAddress.value === null) {
    toast.add({ title: 'آدرس سفارش را انتخاب کنید', color: 'red' })
    return
  }
  if (selectedShipping.value === null) {
    toast.add({ title: 'شیوه ارسال را انتخاب کنید', color: 'red' })
    return
  }
  loading.value = true
  const command = {
    shipping_id: selectedShipping.value?.id,
    address_id: selectedAddress.value?.id,
  }
  const result = await PaymentRequestCheck(command)
  if (result.success) {
    await router.push('/checkout/payment/')
  }
  else {
    toast.add({ title: result.message, color: 'red' })

    if (result.data.redirect_to)
      await router.push(result.data.redirect_to)
  }

  loading.value = false
}
</script>

<template>
  <div>
    <div class="container-checkout py-2">
      <div>
        <PagesCheckoutPaymentBreadcrumb />

        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-8 lg:col-span-12">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-4" />
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

                <!-- Shipping Price -->
                <div class="flex items-center justify-between">
                  <div class="text-slate-500 dark:text-slate-400 text-sm ">
                    هزینه ارسال
                  </div>
                  <div class="flex items-center justify-center gap-x-1  text-sm ">
                    <div class=" flex items-center gap-x-1">
                      <template v-if="selectedShipping">
                        <template v-if="selectedShipping.pay_at_destination">
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
                              {{ splitNumber(selectedShipping.price) }}
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
                        {{ splitNumber(basketStore.getTotalPrice()) }}
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
                    {{ splitNumber(basketStore.getTotalPrice()) }}
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
  </div>
</template>
