<template>

  <div class="w-1/2">
    <div @click="showFilter=true;utilStore.changeHeaderOverlay(true,30)"
         class="flex items-center  gap-x-2 py-3 px-4 bg-white dark:bg-gray-800 rounded-lg cursor-pointer">
      <div>
        <Icon name="system-uicons:filtering" size="25"/>
      </div>
      <div class="text-slate-500 dark:text-slate-400 text-xs">
        فیلتر
      </div>
    </div>
    <div ref="sortSection" :class="{ 'translate-y-full': !showFilter }"
         class="fixed  h-screen  bg-white dark:bg-gray-900 z-40 overflow-y-auto main-scroll transform  bottom-0 inset-x-0 transition-transform duration-500 rounded-t-lg py-4 px-10 ">
      <div class="flex items-center justify-between mb-10">

        <div class="text-slate-500 dark:text-slate-400 text-lg  text-center">
          فیلتر ها
        </div>

        <base-button theme="rose" class="py-3 w-[100px]" type="button" @click="hideFilter">
          بستن
        </base-button>

      </div>
      <div class="flex flex-col items-center gap-y-2">


        <div class="w-full ">
            <input
                type="checkbox"
                name="availableCheck"
                id="availableCheck"
                v-model="filterAvailable"
                class="peer hidden  [&:checked_+_label]:block  "
            />

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
                type="checkbox"
                name="specialCheck"
                id="specialCheck"
                v-model="filterSpecial"
                class="peer hidden  [&:checked_+_label]:block  "
            />

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

<script setup lang="ts">
import {useWebsiteUtilStore} from "~/store/website/webUtilStore";
import {onClickOutside} from "@vueuse/core";

const utilStore = useWebsiteUtilStore()

const filterSection = ref()
const hideFilter = () => {
  if (showFilter.value) {
    showFilter.value = false
    utilStore.changeHeaderOverlay(false)
  }
}

const showFilter = ref(false)

onClickOutside(filterSection, hideFilter)


const searchUtil = useSearch();
const selectedFilter = searchUtil.getFilterParams();
const router = useRouter()
const route = useRoute()

const filterAvailable = ref(selectedFilter?.available ?? false)
const filterSpecial = ref(selectedFilter?.special ?? false)

watch(filterSpecial, val => {
  const { path, query } = router.currentRoute.value
  const newQuery = { ...query }
  if (val) newQuery.special = '1'
  else delete newQuery.special
  if (newQuery.page) newQuery.page = '1'
  router.push({ path, query: newQuery })
})
watch(filterAvailable, val => {
  const { path, query } = router.currentRoute.value
  const newQuery = { ...query }
  if (val) newQuery.available = '1'
  else delete newQuery.available
  if (newQuery.page) newQuery.page = '1'
  router.push({ path, query: newQuery })
})


watch(() => router.currentRoute.value.query.special, (newVal) => {
  filterSpecial.value = !!newVal
})
watch(() => router.currentRoute.value.query.available, (newVal) => {
  filterAvailable.value = !!newVal;
})

</script>
