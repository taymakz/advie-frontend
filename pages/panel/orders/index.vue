<script setup lang="ts">
definePageMeta({
  layout: 'user-panel',
})
const breakpoints = {
  1250: {
    slidesPerView: 4,
    spaceBetween: 10,
  },
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800  rounded-lg p-4">
    <!-- Section Title -->
    <div class="flex mb-5">
      <h1 class="relative text-lg text-slate-700 dark:text-slate-200 pb-2 select-none ">
        سفارش ها
        <span class="absolute right-0 bottom-0 w-full bg-sky-500 rounded-full h-[3px]" />
      </h1>
    </div>
    <!-- Section Content -->
    <div>
      <!-- Filter  Tab -->
      <PagesPanelOrdersDesktop />
      <!-- orders List -->
      <div class="space-y-4">
        <!-- Order -->
        <div class="rounded-lg border border-gray-200 dark:border-gray-700 p-4 cursor-pointer">
          <div class="flex flex-col">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-x-2">
                <div>
                  <Icon
                    name="material-symbols:check-circle-rounded" size="24"
                    class="text-green-500 dark:text-green-400"
                  />
                </div>
                <div class=" text-slate-600 dark:text-slate-300">
                  پرداخت شده
                </div>
              </div>
              <div>
                <Icon name="ic:outline-chevron-left" size="24" class="text-slate-600 dark:text-slate-300" />
              </div>
            </div>
            <div class="flex md:flex-col  justify-between mb-4 gap-8">
              <div class="flex  md:flex-col  gap-4 ">
                <div class="flex items-center md:justify-between gap-x-2 ">
                  <div class="text-sm text-slate-500 dark:text-slate-400">
                    شماره
                  </div>
                  <div class="text-sm text-slate-600 dark:text-slate-300">
                    123456789
                  </div>
                </div>
                <div class="flex items-center md:justify-between gap-x-2 ">
                  <div class="text-sm text-slate-500 dark:text-slate-400">
                    مجموع
                  </div>
                  <div class="text-sm text-slate-600 dark:text-slate-300">
                    150,000,000 تومان
                  </div>
                </div>
                <div class="flex items-center md:justify-between gap-x-2">
                  <div class="text-sm text-slate-500 dark:text-slate-400">
                    تاریخ
                  </div>
                  <div class="text-sm text-slate-600 dark:text-slate-300">
                    1403 / 05 / 05
                  </div>
                </div>
              </div>
              <div class="flex-1 max-w-xs md:flex md:max-w-full flex-col gap-y-1 ">
                <div class="text-sm md:text-center text-slate-500 dark:text-slate-400">
                  در انتظار تایید
                </div>
                <div>
                  <div class="mt-3   h-1.5 relative w-full md:w-full rounded-full overflow-hidden">
                    <div class=" w-full h-full bg-gray-200 dark:bg-gray-700 absolute " />
                    <div class=" h-full bg-yellow-400 rounded-full absolute" style="width:20%" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <BaseSwiper
                effect="cards"
                :breakpoints="breakpoints"
                :items="[1, 2, 3, 4]"
              >
                <template #item="{ item }">
                  <div class="rounded-lg border border-gray-200 dark:border-gray-700 p-2 ">
                    <div class="flex gap-x-1">
                      <img src="/images/namad.png" class="w-12 h-12">

                      <div
                        class="flex items-center text-sm text-slate-800 dark:text-slate-300 h-10 text-ellipsis overflow-hidden"
                      >
                        {{ item }}
                      </div>
                    </div>
                  </div>
                </template>
              </BaseSwiper>
            </div>
          </div>
        </div>
        <div class="rounded-lg border border-gray-200 dark:border-gray-700 p-4 cursor-pointer">
          <div class="flex flex-col">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-x-2">
                <div>
                  <Icon
                    name="material-symbols:check-circle-rounded" size="24"
                    class="text-green-500 dark:text-green-400"
                  />
                </div>
                <div class=" text-slate-600 dark:text-slate-300">
                  پرداخت شده
                </div>
              </div>
              <div>
                <Icon name="ic:outline-chevron-left" size="24" class="text-slate-600 dark:text-slate-300" />
              </div>
            </div>
            <div class="flex md:flex-col  justify-between mb-4 gap-8">
              <div class="flex  md:flex-col  gap-4 ">
                <div class="flex items-center md:justify-between gap-x-2 ">
                  <div class="text-sm text-slate-500 dark:text-slate-400">
                    شماره
                  </div>
                  <div class="text-sm text-slate-600 dark:text-slate-300">
                    123456789
                  </div>
                </div>
                <div class="flex items-center md:justify-between gap-x-2 ">
                  <div class="text-sm text-slate-500 dark:text-slate-400">
                    مجموع
                  </div>
                  <div class="text-sm text-slate-600 dark:text-slate-300">
                    150,000,000 تومان
                  </div>
                </div>
                <div class="flex items-center md:justify-between gap-x-2">
                  <div class="text-sm text-slate-500 dark:text-slate-400">
                    تاریخ
                  </div>
                  <div class="text-sm text-slate-600 dark:text-slate-300">
                    1403 / 05 / 05
                  </div>
                </div>
              </div>
              <div class="flex-1 max-w-xs md:flex md:max-w-full flex-col gap-y-1 ">
                <div class="text-sm md:text-center text-slate-500 dark:text-slate-400">
                  در انتظار تایید
                </div>
                <div>
                  <div class="mt-3   h-1.5 relative w-full md:w-full rounded-full overflow-hidden">
                    <div class=" w-full h-full bg-gray-200 dark:bg-gray-700 absolute " />
                    <div class=" h-full bg-yellow-400 rounded-full absolute" style="width:20%" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <BaseSwiper
                effect="cards"
                :breakpoints="breakpoints"
                :items="[1, 2, 3, 4]"
              >
                <template #item="{ item }">
                  <div class="rounded-lg border border-gray-200 dark:border-gray-700 p-2 ">
                    <div class="flex gap-x-1">
                      <img src="/images/namad.png" class="w-12 h-12">

                      <div
                        class="flex items-center text-sm text-slate-800 dark:text-slate-300 h-10 text-ellipsis overflow-hidden"
                      >
                        {{ item }}
                      </div>
                    </div>
                  </div>
                </template>
              </BaseSwiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
