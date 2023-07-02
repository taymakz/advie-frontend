<script setup lang="ts">
import { useBasketStore } from '~/store/shop/BasketStore'

definePageMeta({
  middleware: 'authenticated',

})

const basketStore = useBasketStore()
const router = useRouter()
const isOpenSelectAddressModal = ref(false)

onMounted(() => {
  const basketStore = useBasketStore()
  if (basketStore.getItemsCount <= 0)
    return router.push('/checkout/cart/')
})
watch(() => basketStore.getItemsCount, (newVal) => {
  if (newVal <= 0)
    return router.push('/checkout/cart/')
})
</script>

<template>
  <div>
    <div class="container-checkout py-2">
      <div>
        <div class="mb-4 bg-white dark:bg-gray-900  rounded-lg  ">
          <ol
            class="grid grid-cols-3 overflow-hidden divide-x-reverse  divide-x divide-gray-200 dark:divide-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-500"
          >
            <li class="flex flex-col items-center justify-center  gap-2 p-4 text-sky-600 dark:text-sky-500 opacity-50 text-xs">
              <Icon
                name="ic:round-done" size="20"
              />

              <p class="leading-none ">
                سبد خرید
              </p>
            </li>
            <li class="flex flex-col items-center justify-center  gap-2 p-4 text-sky-600 dark:text-sky-500  bg-gray-100 dark:bg-gray-800">
              <Icon
                name="carbon:delivery" size="24"
              />

              <p class="leading-none ">
                شیوه ارسال
              </p>
            </li>
            <li class="flex flex-col items-center justify-center  gap-2 p-4 sm:text-xs ">
              <Icon
                name="fluent:wallet-credit-card-16-regular" size="20"
              />

              <p class="leading-none ">
                پرداخت
              </p>
            </li>
          </ol>
        </div>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-8 lg:col-span-12">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div class="flex flex-col gap-y-4 mb-6">
                <h4 class="text-sm text-slate-600 dark:text-slate-300">
                  آدرس تحویل سفارش
                </h4>
                <div
                  class="flex border border-gray-200 dark:border-gray-700 relative not-prose rounded-md  bg-white dark:bg-gray-800 hover:bg-gray-100 hover:dark:bg-gray-900 cursor-pointer  text-slate-600 dark:text-slate-300 text-sm hover:text-sky-500 hover:dark:text-sky-400 transition-all duration-150"
                  @click="isOpenSelectAddressModal = true"
                >
                  <div class="w-full">
                    <div
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
                    </div><!---->
                  </div>
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
                    <div class="font-bold">
                      {{ splitNumber(basketStore.getTotalPriceBeforeDiscount()) }}
                    </div>
                    <div class="text-xs">
                      تومان
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
                    <div class="font-bold">
                      ({{ basketStore.getDiscountPercentage() }}%)
                      {{ splitNumber(basketStore.getTotalPriceBeforeDiscount() - basketStore.getTotalPrice()) }}
                    </div>
                    <div class="text-xs">
                      تومان
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
                    <div class="font-bold">
                      {{ splitNumber(basketStore.getTotalPrice()) }}
                    </div>
                    <div class="text-xs">
                      تومان
                    </div>
                  </div>
                </div>

                <div class="lg:hidden">
                  <UButton
                    to="/checkout/shipping/" block size="xl" color="sky" label="ثبت سفارش"
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
                  to="/checkout/shipping/" block size="xl" color="sky" label="ثبت سفارش"
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
    <PagesCheckoutShippingModalSelectAddress v-model="isOpenSelectAddressModal" />
  </div>
</template>

<style scoped>

</style>
