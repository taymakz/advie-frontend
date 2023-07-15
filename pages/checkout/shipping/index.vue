<script setup lang="ts">
import type { Ref } from 'vue'
import { useBasketStore } from '~/store/shop/BasketStore'
import type { AddressDetailDTO } from '~/models/account/user/AddressDTO'
import type { ShippingRateDTO } from '~/models/shop/order/checkout/ShippingMethodDTO'
import { GetShippingServices } from '~/services/shop/order/checkout/order.shipping.service'
import { PaymentRequestCheck } from '~/services/shop/order/checkout/order.payment.service'

useSeoMeta({
  title: 'انتخاب شیوه ارسال - فروشگاه اینترنتی ادویه',
})
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
        <PagesCheckoutShippingBreadcrumb />

        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-8 lg:col-span-12">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
              <!-- Select Address -->
              <div class="flex flex-col gap-y-4 mb-6">
                <div class="flex items-center justify-between">
                  <h4 class="text-base sm:text-sm text-slate-600 dark:text-slate-300">
                    آدرس تحویل سفارش
                  </h4>
                  <div class="w-28">
                    <UButton
                      :disabled="loading"
                      block label="تغییر" color="sky"
                      @click="isOpenSelectAddressModal = true"
                    />
                  </div>
                </div>
                <button
                  v-show="!selectedAddress"
                  :disabled="loading"
                  class="flex border border-gray-200 dark:border-gray-700 relative not-prose rounded-md  bg-white dark:bg-gray-800 hover:bg-gray-100 hover:dark:bg-gray-900 cursor-pointer  text-slate-600 dark:text-slate-300 text-sm hover:text-sky-500 hover:dark:text-sky-400 transition-all duration-150 disabled:blur disabled:cursor-not-allowed"
                  @click="isOpenSelectAddressModal = true"
                >
                  <span class="w-full">
                    <span
                      class="relative overflow-hidden rounded  opacity-75 h-20  select-none w-full flex items-center justify-center "
                    >
                      <svg class="absolute inset-0 h-full w-full stroke-gray-900/10 dark:stroke-white/10" fill="none">
                        <defs>
                          <pattern
                            id="pattern-5c1e4f0e-62d5-498b-8ff0-cf77bb448c8e" x="0" y="0" width="10" height="10"
                            patternUnits="userSpaceOnUse"
                          >
                            <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3" />
                          </pattern>

                        </defs>
                        <rect
                          stroke="none" fill="url(#pattern-5c1e4f0e-62d5-498b-8ff0-cf77bb448c8e)" width="100%"
                          height="100%"
                        />
                      </svg>
                      <span>
                        انتخاب, تغییر یا ویرایش آدرس
                      </span>
                    </span><!---->
                  </span>
                </button>
                <div v-show="selectedAddress">
                  <div
                    class="relative bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 py-4 px-4 rounded-lg "
                  >
                    <div class="flex flex-col gap-y-4 text-sm">
                      <p class=" text-slate-700 dark:text-slate-200">
                        {{ selectedAddress?.receiver_address }}
                      </p>
                      <div class="grid grid-cols-4 lg:grid-cols-2 items-center  center gap-4  w-fit lg:w-full">
                        <div class="flex items-center  gap-x-2">
                          <Icon name="solar:signpost-broken" size="20" class="text-sky-500 dark:text-sky-400" />
                          <p class="text-slate-600 dark:text-slate-300">
                            {{ selectedAddress?.receiver_province }}, {{ selectedAddress?.receiver_city }}
                          </p>
                        </div>
                        <div class="flex items-center gap-x-2">
                          <Icon name="material-symbols:mail-outline" size="20" class="text-sky-500 dark:text-sky-400" />
                          <p class="text-slate-600 dark:text-slate-300">
                            {{ selectedAddress?.receiver_postal_code }}
                          </p>
                        </div>
                        <div class="flex items-center gap-x-2">
                          <Icon name="solar:phone-linear" size="20" class="text-sky-500 dark:text-sky-400" />
                          <p class="text-slate-600 dark:text-slate-300">
                            {{ selectedAddress?.receiver_phone }}
                          </p>
                        </div>
                        <div class="flex items-center gap-x-2">
                          <Icon name="solar:user-outline" size="20" class="text-sky-500 dark:text-sky-400" />
                          <p class="text-slate-600 dark:text-slate-300">
                            {{ selectedAddress?.receiver_name }} {{ selectedAddress?.receiver_family }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <BaseUserModalSelectAddress
                  v-model="isOpenSelectAddressModal"
                  :selected-address-id="selectedAddress?.id"
                  @selected="(address) => selectedAddress = address"
                />
              </div>

              <!-- Select Shipping Service -->
              <div class="flex flex-col gap-y-4 mb-6">
                <div class="flex items-center justify-between">
                  <h4 class="text-base sm:text-sm  text-slate-600 dark:text-slate-300">
                    شیوه ارسال
                  </h4>
                </div>
                <div>
                  <fieldset v-if="selectedAddress" class="grid grid-cols-2 sm:grid-cols-1 gap-4">
                    <div v-for="item in filteredShippingServices" :key="item.id">
                      <input
                        :id="`DeliveryOption-${item.id}`"
                        v-model="selectedShipping"
                        :value="item"
                        type="radio"
                        name="DeliveryOption"
                        class="peer hidden [&:checked_+_label_svg]:block"
                        :disabled="loading"
                      >

                      <label
                        :for="`DeliveryOption-${item.id}`"

                        class="block cursor-pointer rounded-lg border border-gray-200 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-300 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
                      >
                        <span class="flex items-center justify-between">
                          <span class="flex items-center gap-x-4">
                            <span class="text-gray-700 dark:text-gray-200">{{ item.shipping_service.name }}</span>
                            <span>
                              <nuxt-img
                                :src="GetImageUrl(item.shipping_service.image)"
                                class="rounded-full"
                                quality="50"
                                format="png"
                                width="80"
                                height="40"
                                placeholder
                                loading="lazy"
                              />
                            </span>

                          </span>

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
                        </span>

                        <span class="mt-1 md:mt-2 text-gray-900 dark:text-white">
                          <template v-if="item.pay_at_destination">
                            <!-- Display when pay_at_destination is true -->
                            <span>کرایه در مقصد</span>
                          </template>
                          <template
                            v-else-if="item.price === 0 || (item.free_shipping_threshold > 0 && item.free_shipping_threshold <= basketStore.getTotalPrice())"
                          >
                            <!-- Display when price is 0 or the free shipping threshold is met -->
                            <span>هزینه حمل رایگان</span>
                          </template>
                          <template v-else>
                            <!-- Display when none of the above conditions are met -->
                            <div class="flex flex-col gap-y-1">
                              <span>{{ splitNumber(item.price) }} تومان</span>
                              <span v-if="item.free_shipping_threshold > 0" class="text-xs flex items-center gap-x-2">
                                <!-- Display when free_shipping_threshold is greater than 0 -->

                                <span>
                                  رایگان  بالای {{ splitNumber(item.free_shipping_threshold) }} تومان
                                </span>
                                <span class="md:hidden">
                                  <UTooltip>
                                    <template #text>
                                      هزینه حمل رایگان برای سفارش های بالای {{
                                        splitNumber(item.free_shipping_threshold)
                                      }} تومان
                                    </template>
                                    <Icon
                                      name="ph:seal-question-fill" size="20"
                                    />
                                  </UTooltip>
                                </span>
                              </span>

                            </div>
                          </template>

                        </span>
                      </label>
                    </div>
                  </fieldset>
                  <template v-else>
                    <div class="relative select-none">
                      <div
                        class="absolute inset-0 z-10 flex items-center justify-center text-slate-500 dark:text-slate-400"
                      >
                        آدرسی انخاب نکرده اید
                      </div>
                      <div class="flex gap-x-2 blur relative">
                        <div class="w-full">
                          <input
                            type="radio"
                            class="peer hidden [&:checked_+_label_svg]:block"
                          >

                          <label
                            class="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700 h-24 w-full"
                          >
                            <span class="flex items-center justify-between">
                              <span class="flex items-center gap-x-4">
                                <span />
                              </span>

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
                            </span>

                          </label>
                        </div>
                        <div class="w-full">
                          <input
                            type="radio"
                            class="peer hidden [&:checked_+_label_svg]:block"
                          >

                          <label
                            class="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700 h-24 w-full"
                          >
                            <span class="flex items-center justify-between">
                              <span class="flex items-center gap-x-4">
                                <span />
                              </span>

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
                            </span>

                          </label>
                        </div>
                      </div>
                    </div>
                  </template>
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
                        شیوه ارسال را انتخاب کنید
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
                        {{ splitNumber(basketStore.getTotalPrice() + (selectedShipping ? selectedShipping.price : 0)) }}
                      </div>

                      <div class="text-xs">
                        تومان
                      </div>
                    </div>
                  </div>
                </div>

                <div class="lg:hidden">
                  <UButton
                    block :size="(!selectedShipping || !selectedAddress) ? 'lg' : 'xl'" color="sky"
                    :label="(!selectedShipping || !selectedAddress) ? 'آدرس تحویل و شیوه ارسال را انتخاب کنید' : 'ادامه فرایند خرید'"
                    :disabled="!selectedShipping || !selectedAddress || loading" @click="paymentRequest"
                  />
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
                  block size="xl" color="sky"
                  :label="(!selectedShipping || !selectedAddress) ? 'آدرس تحویل و شیوه ارسال را انتخاب کنید' : 'ادامه فرایند خرید'"
                  :disabled="!selectedShipping || !selectedAddress || loading" @click="paymentRequest"
                />
              </div>

              <div class="flex-col gap-y-2">
                <div class="text-slate-500 dark:text-slate-400 text-xs ">
                  مبلغ قابل پرداخت
                </div>
                <div class="flex items-center justify-center gap-x-1 text-sky-500 dark:text-sky-400 text-sm ">
                  <div class="font-bold">
                    {{ splitNumber(basketStore.getTotalPrice() + (selectedShipping ? selectedShipping.price : 0)) }}
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
