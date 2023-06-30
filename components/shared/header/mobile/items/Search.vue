<script setup lang="ts">
import { useWebsiteUtilStore } from '~/store/website/webUtilStore'

defineEmits(['overlay'])
const utilStore = useWebsiteUtilStore()
const searchValue = ref('')
const searchDropdown = ref(false)
const searchDropdownSection = ref()

function hideSearchDropdown() {
  if (searchDropdown.value)
    searchDropdown.value = false
}

onClickOutside(searchDropdownSection, hideSearchDropdown)

watch(() => searchDropdown.value, () => {
  if (searchDropdown.value)
    utilStore.changeHeaderOverlay(true, 10)

  else
    utilStore.changeHeaderOverlay(false)
})
const breakpoints = {
  700: {
    slidesPerView: 2.7,
  },
  650: {
    slidesPerView: 2.4,
  },
  600: {
    slidesPerView: 2.2,
  },
  550: {
    slidesPerView: 2,
  },
  500: {
    slidesPerView: 1.8,
  },
  450: {
    slidesPerView: 1.6,
  },
  0: {
    slidesPerView: 1.35,
  },

}
</script>

<template>
  <ClientOnly>
    <div ref="searchDropdownSection" class="relative" @click="searchDropdown = true">
      <div
        class="transition-all duration-300 bg-gray-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl flex items-center justify-between gap-x-3 p-1 px-4"
        :class="{ 'rounded-b-none': searchDropdown }"
      >
        <input
          v-model="searchValue"

          class="placeholder:text-xs text-sm   focus:outline-none bg-transparent w-full p-2 border-none focus:ring-0"
          type="text" placeholder="جستجو "
        >
        <div>
          <Icon name="iconoir:search" size="22" class="text-sky-500 dark:text-sky-400" />
        </div>
      </div>
      <!-- Search Dropdown -->
      <div
        class="absolute top-full right-0 border-t border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 max-h-[500px] w-full rounded-b-lg
                    hidden transition-all duration-500 animate-slide-down  overflow-hidden"
        :class="{ '!block': searchDropdown }"
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
  </ClientOnly>
</template>
