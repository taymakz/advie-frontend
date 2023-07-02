<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { useWebsiteUtilStore } from '~/store/website/webUtilStore'
import { ProductSearchSortBy } from '~/models/shop/search/ProductSearchResultDTO'

const utilStore = useWebsiteUtilStore()

const sortSection = ref()
const showSort = ref(false)

function hideSort() {
  if (showSort.value) {
    showSort.value = false
    utilStore.changeHeaderOverlay(false)
  }
}

onClickOutside(sortSection, hideSort)

const searchUtil = useSearch()
const selectedFilter = searchUtil.getFilterParams()

const router = useRouter()
const selectedSort = ref(Number(selectedFilter?.sort) ?? null)

watch(selectedSort, () => {
  const currentPath = router.currentRoute.value.path
  const queryParams = router.currentRoute.value.query
  hideSort()
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
  <div class="w-1/2 ">
    <div
      class="flex items-center  gap-x-2 py-3 px-2 bg-white dark:bg-gray-800 rounded-lg cursor-pointer"
      @click="showSort = true;utilStore.changeHeaderOverlay(true, 30)"
    >
      <div>
        <Icon name="ph:sort-ascending" size="25" />
      </div>
      <div class="text-slate-500 dark:text-slate-400 text-xs">
        مرتب سازی بر اساس
      </div>
    </div>

    <div
      ref="sortSection" :class="{ 'translate-y-full': !showSort }"
      class="fixed  h-auto  w-full  bg-white dark:bg-gray-900 z-40 overflow-y-auto main-scroll transform  bottom-0 inset-x-0 transition-transform duration-500 rounded-t-lg py-4 px-10 "
    >
      <div class="flex items-center justify-between mb-10">
        <div class="text-slate-500 dark:text-slate-400 text-lg  text-center">
          مرتب سازی بر اساس
        </div>

        <div class="w-24">
          <UButton block size="lg" color="red" variant="outline" label="بستن" @click="hideSort" />
        </div>
      </div>
      <div class="flex flex-col items-center gap-y-2">
        <button
          type="button"
          class="py-4  relative rounded-lg w-full text-slate-500 dark:text-slate-400 border border-gray-200 dark:border-gray-700"
          :class="[{ '!text-sky-500 dark:!text-sky-400 border-sky-500 dark:border-sky-400': selectedSort === ProductSearchSortBy.LATEST }]"
          @click="selectedSort = ProductSearchSortBy.LATEST"
        >
          <span class="font-iranyekanMedium">
            جدید ترین
          </span>
        </button>
        <button
          type="button"
          class="py-4  relative rounded-lg w-full text-slate-500 dark:text-slate-400 border border-gray-200 dark:border-gray-700"
          :class="[{ '!text-sky-500 dark:!text-sky-400 border-sky-500 dark:border-sky-400': selectedSort === ProductSearchSortBy.BEST_SALE }]"
          @click="selectedSort = ProductSearchSortBy.BEST_SALE"
        >
          <span class="font-iranyekanMedium">

            پرفروش ترین
          </span>
        </button>
        <button
          type="button"
          class="py-4  relative rounded-lg w-full text-slate-500 dark:text-slate-400 border border-gray-200 dark:border-gray-700"
          :class="[{ '!text-sky-500 dark:!text-sky-400 border-sky-500 dark:border-sky-400 ': selectedSort === ProductSearchSortBy.EXPENSIVE }]"
          @click="selectedSort = ProductSearchSortBy.EXPENSIVE"
        >
          <span class="font-iranyekanMedium ">

            گران ترین
          </span>
        </button>
        <button
          type="button"
          class="py-4  relative rounded-lg w-full text-slate-500 dark:text-slate-400 border border-gray-200 dark:border-gray-700"
          :class="[{ '!text-sky-500 dark:!text-sky-400 border-sky-500 dark:border-sky-400': selectedSort === ProductSearchSortBy.CHEAPEST }]"
          @click="selectedSort = ProductSearchSortBy.CHEAPEST"
        >
          <span class="font-iranyekanMedium">

            ارزان ترین
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
