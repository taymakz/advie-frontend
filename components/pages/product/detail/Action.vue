<script setup lang="ts">
import type { ProductDetailDTO, Variant } from '~/models/shop/product/ProductDetailDTO'
import type { CurrentOrderItemDTO } from '~/models/shop/order/CurrentOrderDTO'
import { useBasketStore } from '~/store/shop/BasketStore'

const props = defineProps<{
  product: ProductDetailDTO
  fetchPending: boolean
}>()

const selectedVariant = ref<Variant>(props.product.variants[0])

watch(() => props.fetchPending, () => {
  selectedVariant.value = props.product.variants[0]
})

// const favoriteStore = useFavoriteStore()
const basketStore = useBasketStore()
const loading = ref(false)

function addToBasket() {
  loading.value = true
  const orderDetail = {
    id: 1,
    order_id: 1,
    product_id: props.product.id,
    product_url: props.product.url,
    product_title_ir: props.product.title_ir,
    product_title_en: props.product.title_en,
    product_image: props.product.image,
    variant: selectedVariant.value,
    count: 1,
    total_price: selectedVariant.value.final_price,

  } as CurrentOrderItemDTO
  basketStore.AddItem(orderDetail)
  loading.value = false
}

// const addToFavorite = () => {
//   const productDetail = {
//     id: props.product.id,
//     url: props.product.url,
//     image: props.product.image,
//     title_ir: props.product.title_ir,
//     title_en: props.product.title_en,
//
//     sku: props.product.sku,
//     available_in_stock: props.product.available_in_stock,
//     variant_type: props.product.variant_type,
//     variants: props.product.variants,
//     longest_special_price_end_date: props.product.longest_special_price_end_date,
//     longest_special_price_start_date: props.product.longest_special_price_start_date
//   } as ProductCardDTO
//   favoriteStore.AddItem(productDetail)
// }
</script>

<template>
  <div class="flex flex-col">
    <!-- SKU - Review  -->
    <div class="flex mb-4">
      <div class="flex items-center justify-between w-full ">
        <div class="text-xs text-slate-500 dark:text-slate-400 ">
          کد کالا : #{{ product.sku }}
        </div>
        <div class="flex items-center">
          <a href="#" class="text-xs font-medium text-slate-500  dark:text-slate-300">
            73
            دیدگاه
          </a>
          <span class="w-1.5 h-1.5 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400" />

          <p class="ml-1 text-sm font-medium text-slate-500 dark:text-slate-300 ">
            4.95
          </p>

          <Icon name="material-symbols:star-rounded" class="w-5 h-5 !text-amber-400 mb-1.5" />
        </div>
      </div>
    </div>
    <!-- Variants -->
    <div class="mb-8">
      <div class="mb-4">
        <p class="text-sm text-slate-500 dark:text-slate-400">
          انتخاب {{ product.variant_type.title_ir }}
        </p>
      </div>
      <div
        class="grid grid-cols-12 gap-x-4 border   p-3 rounded-lg border-gray-200 dark:border-gray-700"
      >
        <div v-for="item in product.variants" :key="item.id" class="col-span-3 xl:col-span-4 sm:col-span-6">
          <template v-if="fetchPending">
            <USkeleton class="h-10 w-28" />
          </template>
          <template v-else>
            <input
              :id="item.id.toString()"
              v-model="selectedVariant"
              type="radio"
              name="variant"
              :value="item"
              :disabled="loading"
              class="peer  hidden [&:checked_+_label]:block "
            >

            <label
              :for="item.id.toString()"
              class="relative flex cursor-pointer items-center  gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-900 hover:border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white peer-checked:border-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700  "
            >
              <span
                v-if="item.is_special"
                class="inline-flex absolute -top-1 -left-1 w-3 h-3 bg-red-500 rounded-full"
              >
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />

              </span>
              <small class="text-sm font-medium">{{ item.value.value }} {{ item.value.prefix.name }}</small>
            </label>
          </template>
        </div>
      </div>
    </div>

    <!-- Price  -->
    <div class="flex  justify-end mb-4">
      <div class="flex flex-col gap-y-1">
        <div>
          <div v-if="fetchPending">
            <USkeleton v-if="loading" class="h-7 w-40 " />
          </div>
          <div v-else>
            <p class="text-lg text-sky-500 dark:text-sky-500 font-bold ">
              {{ splitNumber(selectedVariant.final_price) }} تومان
            </p>
          </div>
        </div>
        <div class="h-5 flex justify-end">
          <USkeleton v-if="loading || fetchPending" class="h-5 w-32 " />
          <template v-else>
            <div v-if="selectedVariant.is_special" class="text-sm font-medium text-red-600  ">
              <strong> ({{ selectedVariant.special_price_percent }}%)</strong>
              <del>{{ splitNumber(selectedVariant.price) }}</del>
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- Add to Cart -->

    <div class="mb-2 flex flex-row md:flex-col items-center  gap-2">
      <base-button
        :loading="basketStore.loading || fetchPending"
        w-full
        class="py-4" @click="addToBasket"
      >
        افزودن به سبد خرید
      </base-button>
      <base-button
        :loading="loading || fetchPending"

        theme="rose" w-full class="py-4"
      >
        افزودن به علاقه مندی ها
      </base-button>
    </div>

    <div class="grid grid-cols-12 gap-1 ">
      <div
        class="flex items-center col-span-6 md:col-span-12 rounded-lg border border-gray-200 hover:border-gray-300 dark:border-gray-700 hover:dark:border-gray-700 h-14 "
      >
        <div class="flex items-center gap-x-4 p-2 cursor-pointer">
          <div>
            <Icon
              name="akar-icons:arrow-counter-clockwise"
              class="w-8 h-8  sm:w-6 sm:h-6 text-sky-600 dark:text-sky-500"
            />
          </div>
          <div>
            <p class="text-sm sm:text-xs text-slate-500 dark:text-slate-400">
              تا 10 روز مرجوعی
            </p>
          </div>
        </div>
      </div>
      <div
        class="flex items-center col-span-6 md:col-span-12 rounded-lg border border-gray-200 hover:border-gray-300 dark:border-gray-700 hover:dark:border-gray-700 h-14 "
      >
        <div class="flex items-center gap-x-4 p-2 cursor-pointer">
          <div>
            <Icon
              name="material-symbols:google-guarantee"
              class="w-8 h-8  sm:w-6 sm:h-6 text-sky-600 dark:text-sky-500"
            />
          </div>
          <div>
            <p class="text-sm sm:text-xs  text-slate-500 dark:text-slate-400">
              تضمین اصالت کالا
            </p>
          </div>
        </div>
      </div>
      <div
        class="flex items-center col-span-6 md:col-span-12 rounded-lg border border-gray-200 hover:border-gray-300 dark:border-gray-700 hover:dark:border-gray-700 h-14 "
      >
        <div class="flex items-center gap-x-4 p-2 cursor-pointer">
          <div>
            <Icon name="iconoir:headset-help" class="w-8 h-8  sm:w-6 sm:h-6 text-sky-600 dark:text-sky-500" />
          </div>
          <div>
            <p class="text-sm sm:text-xs  text-slate-500 dark:text-slate-400">
              هفت روز هفته
            </p>
          </div>
        </div>
      </div>
      <div
        class="flex items-center col-span-6 md:col-span-12 rounded-lg border border-gray-200 hover:border-gray-300 dark:border-gray-700 hover:dark:border-gray-700 h-14 "
      >
        <div class="flex items-center  gap-x-4 p-2 cursor-pointer">
          <div>
            <Icon name="carbon:delivery-parcel" class="w-8 h-8  sm:w-6 sm:h-6 text-sky-600 dark:text-sky-500" />
          </div>
          <div>
            <p class="text-sm sm:text-xs  text-slate-500 dark:text-slate-400">
              تحویل اکسپرس در تهران, کرج
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
