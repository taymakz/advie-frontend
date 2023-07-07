<script setup lang="ts">
const route = useRoute()

const search = useSearch()

const { data: filterResult, refresh, pending } = await useLazyAsyncData('search', () => search.getProducts())

watch(() => route.query, () => {
  setTimeout(() => {
    window.scrollTo(0, 0)
  }, 300)
  refresh()
})

const skeletonCount = computed(() => {
  const numColumns = 5
  const numProducts = filterResult.value?.data.data.length || 0
  const remainColumns = numColumns - (numProducts % numColumns)

  // Calculate number of skeletons to fill 2 rows
  const minSkeletons = numColumns * 2 + remainColumns

  return Math.max(remainColumns, minSkeletons)
})
</script>

<template>
  <div>
    <!-- content section -->
    <div class="container-2xl pt-4 md:pt-2 md:pb-52">
      <!-- Mobile section -->
      <div class="hidden md:flex items-center justify-between gap-x-3  mb-4">
        <!-- sidebar section -->
        <PagesSearchFilterMobile />
        <!-- sort section -->
        <PagesSearchSortMobile />
      </div>

      <div class="grid grid-cols-12 grid-rows-[60px_minmax(500px,_1fr)]  gap-2 ">
        <!-- Desktop section -->

        <!-- sidebar section -->
        <PagesSearchFilterDesktop />

        <!-- sort section -->
        <PagesSearchSortDesktop />

        <!-- products section -->
        <div class="col-span-10 2xl:col-span-9  lg:col-span-8 md:col-span-12">
          <!-- Empty Message -->
          <div v-if="!filterResult?.data.data.length && !pending">
            <div class="flex flex-col gap-y-4 items-center justify-center">
              <div>
                <Icon name="icon-park-outline:ad-product" size="250" class="!text-slate-500 dark:text-slate-400" />
              </div>
              <div class="text-slate-500 dark:text-slate-400 text-3xl">
                محصولی یافت نشد!
              </div>
            </div>
          </div>
          <!-- products section start -->
          <div class="grid grid-cols-5 2xl:grid-cols-4 xl:grid-cols-3  lg:grid-cols-2    gap-1 md:gap-4 sm:gap-2 mb-4">
            <!-- product card start -->
            <template v-if="!pending">
              <base-card-product-search
                v-for="(item, index) in filterResult?.data.data" :key="index"
                :product="item"
              />
            </template>
            <!-- product card end -->
            <template v-if="pending ">
              <base-card-product-search-skeleton
                v-for="_ in skeletonCount"
                :key="_"
              />
            </template>
          </div>
          <!-- products section end -->
        </div>
      </div>
    </div>
  </div>
</template>
