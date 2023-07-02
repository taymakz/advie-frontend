<script setup lang="ts">
import { useBasketStore } from '~/store/shop/BasketStore'
import { truncatedText } from '~/utils/TextUtils'

const basketStore = useBasketStore()

const removePending = ref()
</script>

<template>
  <ClientOnly>
    <div>
      <div v-if="basketStore.initLoading">
        <USkeleton class="rounded-full h-8 w-8 " />
      </div>
      <UPopover
        v-else
      >
        <div
          class="relative flex items-center justify-center bg-gray-100 dark:bg-gray-800  hover:bg-sky-500 dark:hover:bg-sky-500 group   w-8 h-8 rounded-full cursor-pointer"
        >
          <div
            class=" bg-sky-600 inline-flex absolute -top-1.5 -right-1.5 w-[18px]  h-[18px] p-1  rounded-full  items-center justify-center cursor-pointer select-none text-xs text-gray-200  "
          >
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-25 " />
            {{ basketStore.getItemsCount }}
          </div>
          <Icon
            name="ph:shopping-cart-simple" size="20"
            class="group-hover:text-white text-sky-500 dark:text-sky-400"
          />
        </div>

        <template #panel>
          <div v-if="basketStore.getItemsCount > 0">
            <div class="relative w-[400px] h-[400px]  overflow-y-auto main-scroll">
              <div class="flex flex-col  divide-y-[1px] divide-gray-300 dark:divide-gray-600">
                <!--     items       -->

                <div
                  v-for="item in basketStore.items" :key="item.variant.id" class="relative"
                  :class="{ 'select-none blur': removePending === item.id }"
                >
                  <button
                    class="absolute top-2 right-2 cursor-pointer rounded-full bg-red-600 w-6 h-6 flex items-center justify-center"
                    :disabled="basketStore.loading"
                    @click="basketStore.RemoveItem(item.product_id, item.variant.id);removePending = item.id"
                  >
                    <Icon name="mdi:close" size="20" class="!text-white dark:!text-white" />
                  </button>
                  <div class=" px-3 py-4   min-h-[160px] ">
                    <div class="flex items-center  gap-x-4">
                      <nuxt-link :to="item.product_url" class="inline-block">
                        <div class="w-[100px] h-[100px]">
                          <nuxt-img
                            :src="GetImageUrl(item.product_image)" :alt="item.product_title_ir"
                            class="rounded-lg"

                            width="100"
                            height="100"
                            placeholder
                            loading="lazy"
                          />
                        </div>
                      </nuxt-link>

                      <div class="flex flex-col w-full gap-y-1">
                        <div class="mb-1">
                          <nuxt-link :to="item.product_url">
                            <p class="text-xs font-medium text-slate-500 dark:text-slate-400 leading-6">
                              {{ truncatedText(item.product_title_ir, 100) }}
                            </p>
                          </nuxt-link>
                        </div>

                        <div
                          v-if="!item.variant.type.is_none"
                          class="flex items-center  gap-x-2  mb-1 text-xs select-none text-green-500 dark:text-green-400"
                        >
                          <div> {{ item.variant.type.title_ir }} :</div>
                          <div>
                            {{ splitNumber(item.variant.value.value) }}
                            {{ item.variant.value.prefix.name }}
                          </div>
                        </div>
                        <div class="flex items-center  justify-between gap-x-4 ">
                          <div class="flex flex-col gap-y-1 ">
                            <div class="h-4 ">
                              <del
                                v-if="item.variant.is_special"
                                class=" text-sm font-medium text-red-600 "
                              >
                                {{ splitNumber(item.variant.price * item.count) }}
                              </del>
                            </div>
                            <div
                              class="flex items-center gap-x-2 font-bold text-sm text-sky-400 dark:text-sky-500 "
                            >
                              {{ splitNumber(item.total_price) }}
                              <div class="text-xs font-medium">
                                تومان
                              </div>
                            </div>
                          </div>

                          <div class="flex items-center justify-center">
                            <div
                              class="flex justify-center  border border-slate-200 dark:border-none dark:bg-gray-800 rounded-lg px-4 py-1 gap-x-3"
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
                              <template v-if="item.count > 1">
                                <button
                                  type="button"
                                  :disabled="basketStore.loading"
                                  @click="basketStore.DecreaseCount(item.product_id, item.variant.id)"
                                >
                                  <Icon
                                    name="ic:twotone-minus" size="20"
                                    class="!text-red-600 "
                                  />
                                </button>
                              </template>
                              <template v-else>
                                <button
                                  type="button"
                                  :disabled="basketStore.loading"
                                  @click="basketStore.RemoveItem(item.product_id, item.variant.id);removePending = item.id"
                                >
                                  <Icon
                                    name="streamline:interface-delete-bin-1-remove-delete-empty-bin-trash-garbage"
                                    size="20"
                                    class="!text-red-600 "
                                  />
                                </button>
                              </template>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--     Basket Total Price       -->

            <div
              class=" bottom-0  left-0 border-t border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900  w-full  rounded-b-xl py-4 px-4"
            >
              <div class="flex items-center justify-between select-none mb-4">
                <p class="text-xs  text-slate-500 dark:text-slate-400 font-iranyekanBold ">
                  مجموع سبد خرید
                </p>
                <div class="text-sky-500 dark:text-sky-400 text-sm font-medium ">
                  {{ splitNumber(basketStore.getTotalPrice()) }}
                  <span class="text-xs">تومان</span>
                </div>
              </div>
              <div>
                <UButton
                  to="/checkout/cart/" size="xl" color="sky" label="ویرایش و مشاهده سبد خرید" block
                />
              </div>
            </div>
          </div>
          <div v-else>
            <div class="relative w-[400px] py-4">
              <div class="flex flex-col gap-y-4 items-center justify-center">
                <div>
                  <Icon name="teenyicons:basket-outline" size="80" class="!text-slate-500 dark:text-slate-400" />
                </div>
                <div class="text-slate-500 dark:text-slate-400">
                  سبد خرید شما خالی است!
                </div>
              </div>
            </div>
          </div>
        </template>
      </UPopover>
    </div>
  </ClientOnly>
</template>

<style scoped>

</style>
