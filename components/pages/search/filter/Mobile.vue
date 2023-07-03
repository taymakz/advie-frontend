<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { useWebsiteUtilStore } from '~/store/website/webUtilStore'

const utilStore = useWebsiteUtilStore()

const filterSection = ref()
const showFilter = ref(false)

function hideFilter() {
  if (showFilter.value) {
    showFilter.value = false
    utilStore.changeHeaderOverlay(false)
  }
}

onClickOutside(filterSection, hideFilter)

const searchUtil = useSearch()
const selectedFilter = searchUtil.getFilterParams()
const router = useRouter()

const filterAvailable = ref(selectedFilter?.available ?? false)
const filterSpecial = ref(selectedFilter?.special ?? false)

watch(filterSpecial, (val) => {
  const { path, query } = router.currentRoute.value
  const newQuery = { ...query }
  if (val)
    newQuery.special = '1'
  else delete newQuery.special
  if (newQuery.page)
    newQuery.page = '1'
  router.push({ path, query: newQuery })
})
watch(filterAvailable, (val) => {
  const { path, query } = router.currentRoute.value
  const newQuery = { ...query }
  if (val)
    newQuery.available = '1'
  else delete newQuery.available
  if (newQuery.page)
    newQuery.page = '1'
  router.push({ path, query: newQuery })
})

watch(() => router.currentRoute.value.query.special, (newVal) => {
  filterSpecial.value = !!newVal
})
watch(() => router.currentRoute.value.query.available, (newVal) => {
  filterAvailable.value = !!newVal
})
</script>

<template>
  <div class="w-1/2">
    <div
      class="flex items-center  gap-x-2 py-3 px-4 bg-white dark:bg-gray-800 rounded-lg cursor-pointer"
      @click="showFilter = true;utilStore.changeHeaderOverlay(true, 30)"
    >
      <div>
        <ClientOnly>
          <Icon name="system-uicons:filtering" size="25" />
        </ClientOnly>
      </div>
      <div class="text-slate-500 dark:text-slate-400 text-xs">
        فیلتر
      </div>
    </div>
    <div
      ref="filterSection" :class="{ 'translate-y-full': !showFilter }"
      class="fixed  h-full  bg-white dark:bg-gray-900 z-40 overflow-y-auto main-scroll transform  bottom-0 inset-x-0 transition-transform duration-500 rounded-t-lg py-4 px-10 "
    >
      <div class="flex items-center justify-between mb-10">
        <div class="text-slate-500 dark:text-slate-400 text-lg  text-center">
          فیلتر ها
        </div>

        <div class="w-24">
          <UButton block size="lg" color="red" variant="outline" label="بستن" @click="hideFilter" />
        </div>
      </div>
      <div class="flex flex-col items-center gap-y-2">
        <div class="w-full ">
          <input
            id="availableCheck"
            v-model="filterAvailable"
            type="checkbox"
            name="availableCheck"
            class="peer hidden  [&:checked_+_label]:block  "
          >

          <label
            for="availableCheck"
            class="relative flex cursor-pointer items-center   gap-2 rounded-md border border-gray-200 bg-white  py-4 px-4 text-slate-500 hover:border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white peer-checked:border-none dark:border-gray-800 dark:bg-gray-900  dark:text-slate-400 dark:hover:border-gray-700  "
          >

            <span class="font-iranyekanMedium ">
              فقط کالاهای موجود
            </span>
          </label>
        </div>

        <div class="w-full ">
          <input
            id="specialCheck"
            v-model="filterSpecial"
            type="checkbox"
            name="specialCheck"
            class="peer hidden  [&:checked_+_label]:block  "
          >

          <label
            for="specialCheck"
            class="relative flex cursor-pointer items-center   gap-2 rounded-md border border-gray-200 bg-white  py-4 px-4 text-slate-500 hover:border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white peer-checked:border-none dark:border-gray-800 dark:bg-gray-900 dark:text-slate-400 dark:hover:border-gray-700  "
          >

            <span class="font-iranyekanMedium ">
              فقط محصولات ویژه
            </span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
