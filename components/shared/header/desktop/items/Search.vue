<script setup lang="ts">
import { useWebsiteUtilStore } from '~/store/website/webUtilStore'

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})
const utilStore = useWebsiteUtilStore()
const route = useRoute()
const router = useRouter()

const searchValue = ref('')

const searchInput = ref()

const searchDropdown = ref(false)
const searchDropdownSection = ref()

function hideSearchDropdown() {
  if (searchDropdown.value)
    searchDropdown.value = false
}

onClickOutside(searchDropdownSection, hideSearchDropdown)
watch(() => searchDropdown.value, () => {
  if (searchDropdown.value) {
    const utilStore = useWebsiteUtilStore()

    utilStore.changeHeaderOverlay(true, 10)
  }
  else {
    utilStore.changeHeaderOverlay(false)
  }
})
const breakpoints = {
  1050: {
    slidesPerView: 2.7,
  },
  1000: {
    slidesPerView: 2.5,
  },
  950: {
    slidesPerView: 2.3,
  },
  900: {
    slidesPerView: 2.1,
  },
  825: {
    slidesPerView: 1.8,
  },
  767: {
    slidesPerView: 1.55,
  },

}

async function submitSearch() {
  await router.push({
    path: '/search/',
    query: { q: searchValue.value },
  })
  if (searchInput.value)
    searchInput.value.blur()

  hideSearchDropdown()
}

watch(() => route.query, () => {
  if (searchInput.value)
    searchInput.value.blur()

  hideSearchDropdown()
})
watch(() => utilStore.headerOverlay, (newVal) => {
  if (!newVal) {
    if (searchDropdown.value)
      searchDropdown.value = false
  }
})
</script>

<template>
  <ClientOnly>
    <div class="flex-1 max-w-2xl ">
      <USkeleton v-if="loading" class="rounded-lg h-11" />

      <div v-else ref="searchDropdownSection" class="relative" @click="searchDropdown = true">
        <form
          class="bg-gray-100 dark:bg-gray-800 transition-all duration-300 text-slate-500 dark:text-slate-400 rounded-xl flex items-center justify-between gap-x-3 p-1 px-4"
          :class="{ 'rounded-b-none': searchDropdown }"
          @submit.prevent="submitSearch"
        >
          <input
            ref="searchInput"
            v-model="searchValue"
            class="placeholder:text-xs text-sm focus:outline-none bg-transparent w-full p-2 border-none focus:ring-0"
            type="text"
            placeholder="جستجو "
          >
          <div>
            <Icon name="iconoir:search" size="22" />
          </div>
        </form>
        <!-- Search Dropdown -->
        <div
          class="absolute top-full right-0 border-t border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 max-h-[500px] w-full rounded-b-lg
                    opacity-0 hidden transition-opacity duration-300 overflow-hidden"
          :class="{ '!opacity-100 !block': searchDropdown }"
        >
          <div>
            <!-- Search Result -->
            <div class="flex flex-col p-2 gap-y-2">
              <!-- Products -->
              <div class="flex flex-col gap-y-2">
                <div class="flex items-center justify-start gap-x-2">
                  <div>
                    <Icon
                      name="icon-park-outline:ad-product" size="30"
                      class="text-slate-500 dark:text-slate-400"
                    />
                  </div>

                  <div class="text-slate-500 dark:text-slate-400 text-lg font-iranyekanBold ">
                    محصولات
                  </div>
                </div>
                <div>
                  <Swiper
                    dir="rtl"
                    :breakpoints="breakpoints"
                    :navigation="false"
                    :free-mode="true"
                    :modules="[SwiperNavigation, SwiperFreeMode]"
                    class=""
                  >
                    <SwiperSlide v-for="slide in 15" :key="slide">
                      <!-- Product Card -->

                      <div class="w-60 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                        <nuxt-link to="/">
                          <div
                            class="flex items-center gap-x-4 py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-150"
                          >
                            <!-- Image -->
                            <div>
                              <div class="w-14 h-14">
                                <nuxt-img
                                  src="/images/banners/lg-banner.jpg" alt="product"
                                  class="w-full h-auto rounded-lg"
                                />
                              </div>
                            </div>
                            <div class="flex flex-col justify-evenly gap-y-2">
                              <div class="text-slate-500 dark:text-slate-400 text-sm">
                                میز کامپیوتر مدل LM200
                              </div>
                            </div>
                          </div>
                        </nuxt-link>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
              <!-- Categories -->
              <div class="flex flex-col gap-y-2">
                <div class="flex items-center justify-start gap-x-2">
                  <div>
                    <Icon
                      name="iconamoon:category-light" size="30"
                      class="text-slate-500 dark:text-slate-400"
                    />
                  </div>

                  <div class="text-slate-500 dark:text-slate-400 text-lg font-iranyekanBold ">
                    دسته بندی ها
                  </div>
                </div>
                <div>
                  <Swiper
                    dir="rtl"
                    :breakpoints="breakpoints"
                    :navigation="false"
                    :free-mode="true"
                    :modules="[SwiperNavigation, SwiperFreeMode]"
                    class=""
                  >
                    <SwiperSlide v-for="slide in 15" :key="slide">
                      <!-- Product Card -->

                      <div class="w-60 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                        <nuxt-link to="/">
                          <div
                            class="flex items-center gap-x-4 py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-150"
                          >
                            <!-- Image -->
                            <div>
                              <div class="w-14 h-14">
                                <nuxt-img
                                  src="/images/banners/lg-banner.jpg" alt="product"
                                  class="w-full h-auto rounded-lg"
                                />
                              </div>
                            </div>
                            <div class="flex flex-col justify-evenly gap-y-2">
                              <div class="text-slate-500 dark:text-slate-400 text-sm">
                                میز کامپیوتر مدل LM200
                              </div>
                            </div>
                          </div>
                        </nuxt-link>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped>

</style>
