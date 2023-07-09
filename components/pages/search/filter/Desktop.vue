<script setup lang="ts">
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
  <div class=" block md:hidden col-span-2 2xl:col-span-3 lg:col-span-4  row-span-2">
    <div class="bg-white dark:bg-gray-800  rounded-xl  sticky top-32 mb-4 overflow-hidden ">
      <!--          Filters          -->
      <div
        class="flex flex-col max-h-[calc(90vh_-_100px)]overflow-y-auto overflow-x-hidden main-scroll px-4 py-3 divide-y-[0.5px] divide-gray-200 dark:divide-gray-700 "
      >
        <div>
          <h5 class="text-slate-800 dark:text-slate-300 py-3">
            فیلتر ها
          </h5>
        </div>
        <div>
          <details class="group [&_summary::-webkit-details-marker]:hidden py-3">
            <summary
              class="flex cursor-pointer items-center justify-between rounded-lg  py-2"
            >
              <span class="text-slate-500 dark:text-slate-400 lg:text-sm "> دسته بندی ها </span>

              <span
                class="shrink-0 transition duration-300 group-open:-rotate-90"
              >
                <ClientOnly>

                  <Icon name="ic:outline-chevron-left" size="18" />
                </ClientOnly>

              </span>
            </summary>

            <ul class="mt-2  px-4 divide-y-[0.5px] divide-gray-200 dark:divide-gray-700">
              <li>
                <div

                  class="flex items-center gap-x-2 rounded-lg px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
                >
                  <span>
                    همه محصولات
                  </span>
                  <ClientOnly>
                    <Icon name="ep:arrow-left-bold" class="!text-gray-500 dark:!text-gray-400" />
                  </ClientOnly>
                </div>
              </li>
              <li>
                <div

                  class="flex items-center gap-x-2 rounded-lg px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
                >
                  <span>
                    همه محصولات
                  </span>
                  <ClientOnly>
                    <Icon name="ep:arrow-left-bold" class="!text-gray-500 dark:!text-gray-400" />
                  </ClientOnly>
                </div>
              </li>
              <li>
                <div

                  class="flex items-center gap-x-2 rounded-lg px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
                >
                  <span>
                    همه محصولات
                  </span>
                  <ClientOnly>
                    <Icon name="ep:arrow-left-bold" class="!text-gray-500 dark:!text-gray-400" />
                  </ClientOnly>
                </div>
              </li>
              <li>
                <div

                  class="flex items-center gap-x-2 rounded-lg px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
                >
                  <span>
                    همه محصولات
                  </span>
                  <ClientOnly>
                    <Icon name="ep:arrow-left-bold" class="!text-gray-500 dark:!text-gray-400" />
                  </ClientOnly>
                </div>
              </li>
              <li>
                <div

                  class="flex items-center gap-x-2 rounded-lg px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
                >
                  <span>
                    همه محصولات
                  </span>
                  <ClientOnly>
                    <Icon name="ep:arrow-left-bold" class="!text-gray-500 dark:!text-gray-400" />
                  </ClientOnly>
                </div>
              </li>
              <li>
                <div

                  class="flex items-center gap-x-2 rounded-lg px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
                >
                  <span>
                    همه محصولات
                  </span>
                  <ClientOnly>
                    <Icon name="ep:arrow-left-bold" class="!text-gray-500 dark:!text-gray-400" />
                  </ClientOnly>
                </div>
              </li>
              <li>
                <div

                  class="flex items-center gap-x-2 rounded-lg px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
                >
                  <span>
                    همه محصولات
                  </span>
                  <ClientOnly>
                    <Icon name="ep:arrow-left-bold" class="!text-gray-500 dark:!text-gray-400" />
                  </ClientOnly>
                </div>
              </li>
              <li>
                <div

                  class="flex items-center gap-x-2 rounded-lg px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
                >
                  <span>
                    همه محصولات
                  </span>
                  <ClientOnly>
                    <Icon name="ep:arrow-left-bold" class="!text-gray-500 dark:!text-gray-400" />
                  </ClientOnly>
                </div>
              </li>
            </ul>
          </details>
        </div>

        <div
          class="flex items-center justify-between text-slate-500 dark:text-slate-400 lg:text-sm py-4 hover:rounded-xl"
        >
          <label class="cursor-pointer" for="OnlyAvailable">

            فقط کالاهای موجود

          </label>
          <label for="OnlyAvailable" class="relative h-5 w-10 cursor-pointer">
            <input id="OnlyAvailable" v-model="filterAvailable" type="checkbox" class="peer sr-only">

            <span
              class="absolute inset-0 rounded-full bg-gray-300 dark:bg-gray-600 transition peer-checked:bg-sky-500 dark:peer-checked:bg-sky-400"
            />

            <span
              class="absolute inset-0 start-0 my-auto mx-1 h-4 w-4 rounded-full bg-white dark:bg-gray-800 shadow-md transition-all  peer-checked:start-4"
            />
          </label>
        </div>

        <div
          class="flex items-center justify-between text-slate-500 dark:text-slate-400 lg:text-sm py-4 hover:rounded-xl"
        >
          <label class="cursor-pointer" for="SpecialSale">

            فقط محصولات ویژه

          </label>
          <label for="SpecialSale" class="relative h-5 w-10 cursor-pointer">
            <input id="SpecialSale" v-model="filterSpecial" type="checkbox" class="peer sr-only">

            <span
              class="absolute inset-0 rounded-full bg-gray-300 dark:bg-gray-600 transition peer-checked:bg-sky-500 dark:peer-checked:bg-sky-400"
            />

            <span
              class="absolute inset-0 start-0 my-auto mx-1 h-4 w-4 rounded-full bg-white dark:bg-gray-800 shadow-md transition-all  peer-checked:start-4"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
