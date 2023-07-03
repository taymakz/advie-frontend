<script setup lang="ts">
import type { ProductCardDTO } from '~/models/shop/product/ProductCardDTO'

defineProps<{
  product: ProductCardDTO
}>()
</script>

<template>
  <BaseBeutyBorderColor
    wrapper-class="before:rounded-md"
    bg-class="rounded-[5px] bg-white dark:bg-gray-800 "
  >
    <nuxt-link :to="product.url" class="relative flex  justify-center px-4 pt-4 ">
      <div class="flex flex-col">
        <div class="flex items-center justify-center mb-4 mx-auto">
          <div class=" ">
            <nuxt-img
              :src="GetImageUrl(product.image)" :alt="product.title_ir"
              class="rounded-lg"
              width="240"
              height="240"
              placeholder
              loading="lazy"
            />
          </div>
        </div>
        <div class="mb-2">
          <p class="text-sm text-slate-800 dark:text-slate-300 h-10">
            {{ product.title_ir }}
          </p>
        </div>
        <div class="flex  justify-between  mb-1">
          <div>
            <div
              v-if="product.has_any_special_price"
              class="bg-red-600 rounded-xl flex items-center justify-center py-0.5 px-0.5 w-10 text-sm lg:text-xs font-medium text-white"
            >
              {{ product.special_price_percent }}%
            </div>
          </div>
          <div class="flex flex-col  gap-x-1">
            <div class=" font-bold  text-slate-700 dark:text-slate-200 ">
              {{ splitNumber(product.final_price) }}
            </div>
            <div class="text-xs font-thin text-slate-700 dark:text-slate-200 flex justify-end">
              تومان
            </div>
          </div>
        </div>
        <div class="flex justify-end h-6">
          <div>
            <del v-if="product.has_any_special_price" class="  text-sm text-red-500">
              {{ splitNumber(product.price) }}
            </del>
          </div>
        </div>
      </div>
    </nuxt-link>
  </BaseBeutyBorderColor>
</template>

<style>

</style>
