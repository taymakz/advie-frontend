<script setup lang="ts">
import type { Ref } from 'vue'
import { getSearchResult } from '~/services/shop/search/search.result.service'
import type { ProductSearchResultDTO } from '~/models/shop/search/SearchResultDTO'

const searchModal = ref(false)

const router = useRouter()
const searchValue = ref('')

const loading = ref(false)

const products: Ref<ProductSearchResultDTO[]> = ref([])

async function submitSearch() {
  await router.push({
    path: '/search/',
    query: { q: searchValue.value },
  })
}

// define the minimum length for searchValue
const minLength = 3

// define the delay time after user stops typing
const delay = 500 // in milliseconds

// use computed property to check if searchValue has minimum length
const hasMinLength = computed(() => searchValue.value.length >= minLength)

let timerId: ReturnType<typeof setTimeout> | null = null

// define a function to perform the search
async function search() {
  loading.value = true
  const response = await getSearchResult(searchValue.value)
  loading.value = false

  if (response.success)
    products.value = response.data
}

// use watch effect to perform the search when searchValue has minimum length and user stops typing
watch(
  searchValue,
  () => {
    // clear the timer if there's any
    if (timerId)
      clearTimeout(timerId)

    // set a new timer to perform the search after delay time
    timerId = setTimeout(() => {
      if (hasMinLength.value)
        search()
    }, delay)
  },
  { flush: 'sync' },
)
</script>

<template>
  <div>
    <ClientOnly>
      <div
        class="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 hover:dark:bg-gray-700  flex items-center justify-between rounded-xl py-2 px-4 cursor-pointer"
        @click="searchModal = true"
      >
        <div class="text-sm text-slate-600 dark:text-slate-400">
          جستجو کنید ...
        </div>
        <div>
          <Icon name="iconoir:search" size="22" class="text-sky-500 dark:text-sky-400" />
        </div>
      </div>
      <UModal v-model="searchModal" :ui="{ width: 'max-w-4xl' }">
        <div>
          <div class="flex items-center justify-between px-2 border-b border-gray-100 dark:border-gray-800">
            <div class="pr-2">
              <Icon
                :name="loading ? 'svg-spinners:ring-resize' : 'iconoir:search'" size="22"
                class="text-sky-500 dark:text-sky-400 cursor-pointer"
                @click="submitSearch"
              />
            </div>
            <div class="flex-1 w-full">
              <form @submit.prevent="submitSearch">
                <input
                  v-model="searchValue"
                  type="text"
                  placeholder="جستجو کنید ..."
                  class="bg-transparent w-full text-slate-600 dark:text-slate-300 py-4 placeholder:text-sm  placeholder:text-slate-500 placeholder:dark:text-slate-400 border-none outline-none focus:ring-0"
                  @keypress.enter="submitSearch"
                >
              </form>
            </div>
            <div>
              <div
                class="p-1 flex items-center justify-center rounded-lg hover:bg-gray-200 hover:dark:bg-gray-700 text-slate-500 dark:text-slate-400 hover:text-slate-600 hover:dark:text-slate-300  cursor-pointer"

                @click="searchModal = false"
              >
                <Icon
                  name="ic:round-close" size="22"
                />
              </div>
            </div>
          </div>
          <div
            class="h-[75vh] overflow-y-auto main-scroll p-4 space-y-4"
          >
            <div
              v-if="searchValue.length >= 3 && !loading && (!products || products.length === 0 || Object.keys(products).length === 0) "
              class="text-slate-600 dark:text-slate-400 text-lg text-center"
            >
              محصولی یافت نشد
            </div>
            <!-- Products Result -->
            <div class="space-y-2">
              <div class="flex flex-col gap-y-1">
                <nuxt-link
                  v-for="item in products" :key="item.id"
                  :to="item.url"
                  class="group border border-gray-100 dark:border-gray-800 rounded-lg py-2 px-2  hover:bg-gray-100 hover:dark:bg-gray-700"
                >
                  <div class="flex items-center gap-x-4">
                    <div class="min-w-fit">
                      <nuxt-img
                        :src="GetImageUrl(item.image)"
                        quality="40"
                        class="w-24 h-24 xl:w-20 xl:h-20 md:w-16 md:h-16 rounded-lg"
                        loading="lazy"
                        placeholder
                      />
                    </div>
                    <div
                      class="text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-600 group-hover:dark:text-slate-300 h-10 text-ellipsis overflow-hidden"
                    >
                      {{ item.title_ir }}
                    </div>
                  </div>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </UModal>
    </ClientOnly>
  </div>
</template>
