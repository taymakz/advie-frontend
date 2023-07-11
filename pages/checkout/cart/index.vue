<script setup lang="ts">
import { useBasketStore } from '~/store/shop/BasketStore'

useSeoMeta({
  title: 'سبد خرید - فروشگاه اینترنتی ادویه',
})
definePageMeta({
  layout: 'checkout',
})
const basketStore = useBasketStore()
</script>

<template>
  <div>
    <!-- Breadcrumb -->
    <div class="container-checkout py-2">
      <div v-if="basketStore.initLoading">
        <USkeleton class="w-full h-96" />
      </div>

      <div v-else>
        <PagesCheckoutCartPendingOrders />
        <div v-if="basketStore.getItemsCount > 0">
          <div class="grid grid-cols-12 gap-4">
            <!-- Basket -->
            <div class="col-span-8 lg:col-span-12">
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                <!-- Cart Items -->
                <div class="flex flex-col  gap-y-2">
                  <div
                    v-for="item in basketStore.items" :key="item.id"
                    class="bg-white border dark:border-none dark:bg-gray-900  rounded-lg p-4"
                  >
                    <div class="flex items-center gap-x-4">
                      <!-- Image -->
                      <div>
                        <div class="w-28 h-28 sm:w-24 sm:h-24">
                          <nuxt-link :to="item.product_url">
                            <nuxt-img
                              :src="GetImageUrl(item.product_image)" :alt="item.product_title_ir"
                              class="w-full h-auto rounded-2xl"
                            />
                          </nuxt-link>
                        </div>
                      </div>
                      <!-- Title - Variant - Price - Count -->

                      <div class="flex flex-col items-start gap-y-2 ">
                        <!-- Title -->
                        <div>
                          <nuxt-link
                            :to="item.product_url"
                            class="text-slate-500 dark:text-slate-400 text-sm md:text-xs"
                          >
                            <div class="hidden md:block">
                              {{ truncatedText(item.product_title_ir, 60) }}
                            </div>
                            <div class="block md:hidden">
                              {{ item.product_title_ir }}
                            </div>
                          </nuxt-link>
                        </div>
                        <!-- Variant -->
                        <div class="flex items-center">
                          <div v-if="!item.variant.type.is_none" class="text-slate-500 dark:text-slate-400  text-xs">
                            {{ item.variant.type.title_ir }} : {{ splitNumber(item.variant.value.value) }}
                            {{ item.variant.value.prefix.name }}
                          </div>
                        </div>
                        <!-- Price - Count -->
                        <div class="flex sm:flex-col items-center sm:items-start justify-between gap-2">
                          <!-- Price -->
                          <div class="flex flex-col w-32">
                            <div>
                              <del
                                v-if="item.variant.is_special"
                                class="text-sm md:text-xs font-medium text-red-600 "
                              >
                                {{ splitNumber(item.variant.price * item.count) }}
                              </del>
                            </div>
                            <div
                              class="flex items-center gap-x-2 font-bold text-sm md:text-xs text-sky-400 dark:text-sky-500 "
                            >
                              {{ splitNumber(item.total_price) }}
                              <div class="text-xs font-medium">
                                تومان
                              </div>
                            </div>
                          </div>
                          <!-- Count - Remove -->

                          <div class="flex items-center justify-center gap-x-2">
                            <!-- Count -->
                            <div
                              class="w-30 h-9 flex justify-center  border border-slate-200 dark:border-none dark:bg-gray-800 rounded-lg px-4 py-1 gap-x-3"
                            >
                              <button
                                type="button"
                                :disabled="basketStore.loading"
                                @click="basketStore.IncreaseCount(item.product_id, item.variant.id)"
                              >
                                <Icon
                                  name="ic:baseline-plus" size="20"
                                  class="text-green-600 dark:text-green-500"
                                />
                              </button>
                              <div class=" p-1 select-none text-slate-500 dark:text-slate-400 text-sm">
                                {{ item.count }}
                              </div>
                              <button
                                type="button"
                                :disabled="basketStore.loading || item.count === 1"
                                class="group"
                                @click="basketStore.DecreaseCount(item.product_id, item.variant.id)"
                              >
                                <Icon
                                  name="ic:twotone-minus" size="20"
                                  class="!text-red-600 group-disabled:!text-gray-400"
                                />
                              </button>
                            </div>

                            <!-- Remove -->
                            <UButton
                              :disabled="basketStore.loading"
                              :padded="false"
                              icon="i-mdi-delete-outline"
                              variant="ghost"
                              size="xl"
                              class=" w-10 h-9 flex items-center justify-center bg-white dark:bg-gray-800 hover:bg-red-600 dark:hover:bg-red-600 transition-colors duration-150 text-red-600 dark:text-red-600 hover:text-white dark:hover:text-white "
                              @click="basketStore.RemoveItem(item.product_id, item.variant.id)"
                            />
                          </div>
                        </div>
                      </div>
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
                      to="/checkout/shipping/" block size="xl" color="sky" label="ادامه فرایند خرید"
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
                    to="/checkout/shipping/" block size="xl" color="sky" label="ادامه فرایند خرید"
                  />
                </div>

                <div class="flex-col gap-y-2">
                  <div class="text-slate-500 dark:text-slate-400 text-xs ">
                    مبلغ قابل پرداخت
                  </div>
                  <div class="flex items-center justify-center gap-x-1 text-sky-500 dark:text-sky-400 text-sm ">
                    <div class="font-iranyekanBold">
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

        <div v-else class="bg-white dark:bg-gray-800 rounded-lg ">
          <div class="flex flex-col gap-y-4 py-10 mt-10 items-center justify-center">
            <div>
              <Icon name="teenyicons:basket-outline" size="80" class="!text-slate-500 dark:text-slate-400" />
            </div>
            <div class="text-slate-500 dark:text-slate-400">
              سبد خرید شما خالی است!
            </div>
            <div class="w-1/4 flex justify-center">
              <nuxt-link
                to="/search/"
                class="flex  flex-row items-center justify-center w-full gap-x-2 md:gap-x-1 py-3 text-sm sm:text-xs text-slate-200 dark:text-slate-200 rounded-lg bg-sky-600 hover:bg-sky-700 dark:bg-sky-900 dark:hover:bg-sky-600 px-4 transition-colors duration-150"
              >
                فروشگاه
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
