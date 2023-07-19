<script setup lang="ts">
import { GetUserRecent } from '~/services/account/user.recent.service'

definePageMeta({
  layout: 'user-panel',
})

const pageNumber = ref(1)
const takeNumber = ref(6)
const {
  data: result,
  refresh,
  pending,
} = await useAsyncData('panel_recent', () => GetUserRecent(pageNumber.value, takeNumber.value))
watch(() => pageNumber.value, () => {
  refresh()
})
</script>

<template>
  <div>
    <div class="bg-white dark:bg-gray-800  rounded-lg p-4">
      <!-- Section Title -->
      <div class="flex mb-5">
        <h1 class="relative text-lg text-slate-700 dark:text-slate-200 pb-2 select-none ">
          بازدیدهای اخیر
          <span class="absolute right-0 bottom-0 w-full bg-sky-500 rounded-full h-[3px]" />
        </h1>
      </div>
      <!-- Section Content -->
      <div>
        <!-- orders List -->

        <template v-if="pending">
          <div class="grid grid-cols-2 sm:grid-cols-1 gap-4">
            <div
              v-for="_ in 6" :key="_"
              class="relative rounded-lg  bg-gray-100 dark:bg-gray-900  p-4 flex flex-col gap-y-2 "
            >
              <div class="flex items-center gap-x-4 ">
                <div class="rounded-full">
                  <USkeleton class="w-20 h-20 rounded-full" />
                </div>

                <div
                  class="flex items-center text-sm text-slate-800 dark:text-slate-300 h-auto text-ellipsis overflow-hidden"
                >
                  <USkeleton class="w-96 h-5 " />
                </div>
              </div>
              <div class="flex justify-end">
                <USkeleton class="w-20 h-10 sm:w-32" />
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <div>
            <template v-if="result!.data?.data.length > 0">
              <div class="grid grid-cols-2 sm:grid-cols-1 gap-4">
                <div
                  v-for="item in result!.data?.data" :key="item.id"
                >
                  <nuxt-link
                    :to="item.url"
                    class="relative rounded-lg bg-gray-100 dark:bg-gray-900 p-4 flex flex-col gap-y-2"
                  >
                    <div
                      v-if="!item.is_available_in_stock"
                      class="absolute top-0 left-0 bg-red-600 dark:bg-red-500 rounded-tl-lg rounded-br-lg  py-1 px-2 text-sm text-white dark:text-white"
                    >
                      ناموجود
                    </div>
                    <div class="flex items-center gap-x-4 ">
                      <div class="min-w-fit">
                        <nuxt-img
                          :src="GetImageUrl(item.image)"
                          width="80"
                          height="80"
                          loading="lazy"
                          placeholder
                          class="rounded-full "
                          :alt="item.title_ir"
                        />
                      </div>

                      <div
                        class="flex items-center text-sm text-slate-800 dark:text-slate-300 h-auto text-ellipsis overflow-hidden"
                      >
                        {{ item.title_ir }}
                      </div>
                    </div>
                  </nuxt-link>
                </div>
              </div>
            </template>
            <template v-if="result!.data?.data.length <= 0 && !pending">
              <div class="flex flex-col gap-y-4 items-center justify-center">
                <div>
                  <Icon name="mdi:heart-off-outline" size="100" class="!text-slate-500 dark:text-slate-400" />
                </div>
                <div class="text-slate-500 dark:text-slate-400 text-xl">
                  لیست علاقه مندی شما خالی میباشد
                </div>
              </div>
            </template>
          </div>
        </template>

        <!-- Pagination -->
        <div
          v-if="result!.data.page_count > 1 && !pending" class="mt-8 flex justify-center"
        >
          <UPagination
            v-model="pageNumber" :page-count="takeNumber" size="lg"
            :total="result?.data?.entity_count ?? 0"
            :ui="{ rounded: 'first-of-type:rounded-s-md last-of-type:rounded-e-md' }"
          >
            <template #prev="{ onClick }">
              <UTooltip text="صفحه قبلی">
                <UButton
                  icon="i-heroicons-arrow-small-left-20-solid" color="primary" :ui="{ rounded: 'rounded-full' }"
                  class="rtl:[&_span:first-child]:rotate-180 me-2" @click="onClick"
                />
              </UTooltip>
            </template>

            <template #next="{ onClick }">
              <UTooltip text="صفحه بعدی">
                <UButton
                  icon="i-heroicons-arrow-small-right-20-solid" color="primary" :ui="{ rounded: 'rounded-full' }"
                  class="rtl:[&_span:last-child]:rotate-180 ms-2" @click="onClick"
                />
              </UTooltip>
            </template>
          </UPagination>
        </div>
      </div>
    </div>
  </div>
</template>
