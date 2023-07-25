<script setup lang="ts">
import { ProductSearchSortBy } from '~/models/shop/search/ProductSearchResultDTO'

const searchUtil = useSearch()
const selectedFilter = searchUtil.getFilterParams()
const router = useRouter()
const selectedSort = ref(Number(selectedFilter?.sort) ?? null)
watch(selectedSort, () => {
  const currentPath = router.currentRoute.value.path
  const queryParams = router.currentRoute.value.query
  router.push({
    path: currentPath,
    query: { ...queryParams, sort: selectedSort.value },
  })
})
watch(() => router.currentRoute.value.query.sort, (newVal) => {
  if (newVal)
    selectedSort.value = Number(newVal)
})
</script>

<template>
  <div class="block md:hidden h-14">
    <div
      class="flex items-center gap-x-2 bg-white dark:bg-gray-800 py-2 px-2 text-slate-500 dark:text-slate-400 rounded-lg"
    >
      <div class="flex items-center justify-center rounded p-0.5">
        <ClientOnly>
          <Icon name="ph:sort-ascending" size="25" />
        </ClientOnly>
      </div>
      <div>
        <p class="text-sm font-medium select-none">
          مرتب سازی :
        </p>
      </div>

      <button
        aria-label="Sort Latest"
        type="button"
        class="py-2 px-2 relative rounded-lg "
        :class="[{ 'bg-gray-100 dark:bg-gray-900  text-sky-500 dark:text-sky-400 font-bold': selectedSort === ProductSearchSortBy.LATEST }]"
        @click="selectedSort = ProductSearchSortBy.LATEST"
      >
        <span class="text-sm lg:text-xs font-medium">
          جدید ترین
        </span>
      </button>
      <button
        aria-label="Sort Best Sale"
        type="button"
        class="py-2 px-2 relative rounded-lg "
        :class="[{ 'bg-gray-100 dark:bg-gray-900 text-sky-500 dark:text-sky-400 font-bold': selectedSort === ProductSearchSortBy.BEST_SALE }]"
        @click="selectedSort = ProductSearchSortBy.BEST_SALE"
      >
        <span class="text-sm lg:text-xs font-medium">

          پرفروش ترین
        </span>
      </button>
      <button
        aria-label="Sort Expensive"
        type="button"
        class="py-2 px-2 relative rounded-lg "
        :class="[{ 'bg-gray-100 dark:bg-gray-900 text-sky-500 dark:text-sky-400 font-bold': selectedSort === ProductSearchSortBy.EXPENSIVE }]"
        @click="selectedSort = ProductSearchSortBy.EXPENSIVE"
      >
        <span class="text-sm lg:text-xs font-medium">

          گران ترین
        </span>
      </button>
      <button
        aria-label="Sort Cheapest"
        type="button"
        class="py-2 px-2 relative rounded-lg "
        :class="[{ 'bg-gray-100 dark:bg-gray-900 text-sky-500 dark:text-sky-400 font-bold': selectedSort === ProductSearchSortBy.CHEAPEST }]"
        @click="selectedSort = ProductSearchSortBy.CHEAPEST"
      >
        <span class="text-sm lg:text-xs font-medium">

          ارزان ترین
        </span>
      </button>
    </div>
  </div>
</template>
