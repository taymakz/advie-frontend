<script setup lang="ts">
import { useWebsiteUtilStore } from '~/store/website/webUtilStore'

const utilStore = useWebsiteUtilStore()

const showMegaMenu = ref(false)

const activeMenu = ref(0)

const isSecondNavHidden = ref(false)
const prevScrollPos = ref(0)
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

function handleScroll() {
  const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop
  // Compare current scroll position with previous scroll position
  isSecondNavHidden.value = currentScrollPos > prevScrollPos.value
  prevScrollPos.value = currentScrollPos
}

const route = useRoute()
watch(() => route.query, () => {
  setTimeout(() => {
    window.scrollTo(0, 0)
  }, 300)

  if (showMegaMenu) {
    showMegaMenu.value = false
    utilStore.changeHeaderOverlay(false)
  }
})
</script>

<template>
  <div class=" md:hidden">
    <!--  Header Top -->
    <div class="z-30 relative  bg-white dark:bg-gray-900 ">
      <div class="container-2xl flex items-center justify-between gap-x-4 py-2.5 ">
        <nuxt-link to="/">
          <BaseLogo class="h-8" />
        </nuxt-link>
        <SharedHeaderDesktopItemsSearch />

        <div class="flex items-center justify-between gap-x-4">
          <SharedHeaderDesktopItemsAccount />
          <SharedHeaderDesktopItemsCart />
          <SharedHeaderDesktopItemsTheme />
        </div>
      </div>
    </div>
    <!--  Header Navbar -->
    <div
      class="z-20 absolute left-0 right-0 top-full shadow-gray-200 dark:shadow-gray-600 shadow-sm  bg-white dark:bg-gray-900 transition-transform duration-300 "
      :class="{ '-translate-y-full ': isSecondNavHidden && !showMegaMenu }"
    >
      <div class="relative container-2xl flex items-center justify-start gap-x-2 ">
        <div
          class="border-b-2  border-transparent hover:border-sky-500 dark:hover:border-sky-400 transition-all duration-300"
          @mouseenter="showMegaMenu = true;utilStore.changeHeaderOverlay(true, 10)"
          @mouseleave="showMegaMenu = false;utilStore.changeHeaderOverlay(false)"
        >
          <div class="flex items-center justify-start gap-x-2 py-1  cursor-pointer ">
            <div class="text-slate-500 dark:text-slate-400">
              <Icon name="solar:hamburger-menu-linear" size="22" />
            </div>
            <span class="text-sm font-medium text-slate-500 dark:text-slate-400">
              دسته بندی محصولات
            </span>
            <span class="border-l border-slate-400 dark:border-slate-600 h-5 " />
          </div>

          <div
            v-if="showMegaMenu"
            class="absolute top-[34px]  bg-stone-100 dark:bg-slate-900  w-full rounded-b-xl  dark:shadow-slate-950 dark:shadow-2xl"
          >
            <div class="grid grid-cols-12 rounded-b-xl overflow-hidden h-[400px] ">
              <div
                class=" col-span-2 xl:col-span-3  lg:col-span-4 overflow-y-auto main-scroll bg-stone-100  dark:bg-slate-800  "
              >
                <div class="flex flex-col gap-y-2">
                  <div v-for="(item, index) in utilStore.categories" :key="index">
                    <nuxt-link
                      :to="item.url"
                      :class="[{ 'bg-stone-200 dark:bg-slate-700 dark:text-slate-300': activeMenu === index }, { 'dark:text-slate-400': activeMenu !== index }]"
                      class="flex py-3 pr-4 text-sm text-slate-800  dark:hover:text-slate-300 hover:bg-stone-200 dark:hover:bg-slate-700   "
                      @mouseenter="activeMenu = index"
                    >
                      <span>
                        {{ item.display_title }}
                      </span>
                    </nuxt-link>
                  </div>
                </div>
              </div>
              <div
                class=" col-span-10 xl:col-span-9  lg:col-span-8 overflow-y-auto main-scroll bg-stone-50 dark:bg-slate-900 p-5"
              >
                <div v-for="(item, index) in utilStore.categories" :key="index">
                  <div v-if="activeMenu === index">
                    <div class="flex items-center justify-start mb-4">
                      <h3>
                        <nuxt-link
                          :to="item.url"
                          class="flex items-center justify-center gap-x-1 text-xs py-1 text-slate-500 dark:text-slate-400 dark:hover:text-sky-500 hover:text-sky-600 transition-colors duration-300"
                        >
                          <div>
                            همه محصولات {{ item.title_ir }}
                          </div>
                          <div>
                            <Icon name="ic:outline-chevron-left" size="14" />
                          </div>
                        </nuxt-link>
                      </h3>
                    </div>
                    <div class="grid grid-cols-5 xl:grid-cols-4 lg:grid-cols-2 gap-y-6">
                      <div v-for="children in item.children" :key="children.id" class="flex flex-col gap-y-4 ">
                        <nuxt-link
                          :to="children.url"
                          class="flex items-center gap-x-3 text-sm font-bold py-1  text-slate-500 dark:text-slate-400 dark:hover:text-sky-500 hover:text-sky-600 transition-colors duration-150"
                        >
                          <div class="h-6 border-r-2 border-sky-600 dark:border-sky-500" />
                          <div>
                            {{ children.display_title }}
                          </div>

                          <div>
                            <Icon name="ic:outline-chevron-left" size="18" />
                          </div>
                        </nuxt-link>
                        <ul class="flex flex-col gap-y-2 text-xs text-slate-500 dark:text-slate-400  ">
                          <li v-for="product in children.products" :key="product.id">
                            <nuxt-link
                              :to="product.url"
                              class="flex items-center py-1 hover:text-sky-600 dark:hover:text-sky-500 transition-colors duration-150"
                            >
                              {{ product.title_ir }}
                            </nuxt-link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nuxt-link
          to="/search/?special=1"
          class="text-slate-500 dark:text-slate-400 text-sm py-1.5  px-2 border-b-2 border-transparent hover:border-sky-500 dark:hover:border-sky-400 transition-all duration-300"
        >
          فروش ویژه
        </nuxt-link>

        <nuxt-link
          to="/"
          class="text-slate-500 dark:text-slate-400 text-sm py-1.5  px-2 border-b-2 border-transparent hover:border-sky-500 dark:hover:border-sky-400 transition-all duration-300"
        >
          راهنمای خرید
        </nuxt-link>
        <div
          class="relative group cursor-pointer py-1 px-2 border-b-2 border-transparent  hover:border-sky-500 dark:hover:border-sky-400 transition-all duration-300"
        >
          <div class="flex items-center gap-x-2 ">
            <div class="text-sm text-slate-500 dark:text-slate-400">
              سایر
            </div>
            <span class="text-sky-600">...</span>
          </div>
          <div
            class="absolute top-[34px] right-0 w-40 overflow-hidden rounded-b-xl hidden group-hover:block bg-white dark:bg-gray-900 border-r border-b border-l  border-zinc-200 dark:border-none"
          >
            <ul class="flex flex-col ">
              <li>
                <nuxt-link
                  to="/"
                  class="flex text-sm py-4 pr-4 text-slate-500 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800 "
                >
                  تماس با ما
                </nuxt-link>
              </li>

              <li>
                <nuxt-link
                  to="/"
                  class="flex text-sm py-4  pr-4 text-slate-500 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800   "
                >
                  سوالات متداول
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  to="/"
                  class="flex text-sm py-4 pr-4 text-slate-500 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800   "
                >
                  درباره ما
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
