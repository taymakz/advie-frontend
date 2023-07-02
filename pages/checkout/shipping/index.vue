<script setup lang="ts">
import { useBasketStore } from '~/store/shop/BasketStore'

definePageMeta({
  middleware: ['authenticated',
    function () {
      const basketStore = useBasketStore()
      if (basketStore.getItemsCount === 0)
        return navigateTo('/checkout/cart/')
    },
  ],

})

const basketStore = useBasketStore()
</script>

<template>
  <div>
    <!-- Breadcrumb -->
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
            <li class="flex flex-col items-center justify-center  gap-2 p-4 text-sky-600 dark:text-sky-500  bg-gray-800">
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
              <div class="flex flex-col gap-y-4">
                <h4 class="text-sm text-slate-600 dark:text-slate-300">
                  آدرس تحویل سفارش
                </h4>
                <div
                  class="bg-gray-100 dark:bg-gray-900 opacity-30 hover:opacity-100 transition-opacity  duration-300 py-4 px-4 rounded-lg cursor-pointer"
                >
                  <div class="h-10 flex items-center justify-center text-sky-500 dark:text-sky-400 text-sm ">
                    تغییر یا ویرایش آدرس
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
                  <nuxt-link to="/checkout/cart/">
                    <base-button w-full theme="sky" class="py-3">
                      ادامه فرایند خرید
                    </base-button>
                  </nuxt-link>
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
                <nuxt-link to="/checkout/cart/">
                  <button
                    class="gap-x-2 w-full px-2 py-4  text-xs font-iranyekanBold text-slate-200 dark:text-slate-200 rounded-lg bg-sky-600 hover:bg-sky-700 dark:bg-sky-900 dark:hover:bg-sky-600 transition-colors duration-150"
                  >
                    ادامه فرایند خرید
                  </button>
                </nuxt-link>
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

<style scoped>

</style>
