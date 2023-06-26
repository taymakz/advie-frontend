<script setup lang="ts">
import { useWebsiteUtilStore } from '~/store/website/webUtilStore'
import { useAuthenticateStore } from '~/store/account/AuthenticateStore'

const utilStore = useWebsiteUtilStore()
const authStore = useAuthenticateStore()

const router = useRouter()
const showNavbar = ref(false)
const navbarSection = ref()

function hideNavbar() {
  if (showNavbar.value)
    showNavbar.value = false
}

onClickOutside(navbarSection, hideNavbar)

watch(showNavbar, (newVal) => {
  if (newVal)
    utilStore.changeHeaderOverlay(true, 30)
  else
    utilStore.changeHeaderOverlay(false)
})

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

watch(() => router.currentRoute.value, () => {
  hideNavbar()
})
</script>

<template>
  <div class="hidden md:block  ">
    <!--  Header Top -->
    <div class="z-30 relative container flex items-center justify-between gap-x-4 pt-4 pb-2 bg-white dark:bg-gray-900">
      <div
        class="bg-gray-100 dark:bg-slate-800 p-1 rounded-full text-slate-500 dark:text-slate-400 cursor-pointer select-none"
        @click="showNavbar = true"
      >
        <Icon name="ri:menu-3-line" size="24" />
      </div>
      <div>
        <nuxt-link to="/">
          <BaseLogo class="h-8 " />
        </nuxt-link>
      </div>
      <div class="flex items-center  gap-x-4">
        <SharedHeaderMobileItemsAccount :loading="authStore.loading" />
        <SharedHeaderMobileItemsCart :loading="authStore.loading" />
      </div>
    </div>
    <!--  Header Navbar -->
    <div
      class="z-20  container absolute left-0 right-0 top-full shadow-gray-200 dark:shadow-gray-600 shadow-sm  bg-white  dark:bg-gray-900 transition-all duration-300 py-2"
      :class="{ '-translate-y-full ': isSecondNavHidden }"
    >
      <SharedHeaderMobileItemsSearch />
    </div>

    <USlideover
      v-model="showNavbar" dir="ltr" :ui="{
        width: 'w-screen max-w-xs',
        base: 'relative flex-1 flex flex-col w-full overflow-y-auto h-screen focus:outline-none',
      }"
    >
      <div class="flex flex-col p-4" dir="rtl">
        <div class="flex  items-center justify-between mb-6">
          <nuxt-link to="/">
            <BaseLogo class="h-7" />
          </nuxt-link>
          <div class="cursor-pointer" @click="showNavbar = false">
            <ClientOnly>
              <Icon name="clarity:close-line" size="28" />
            </ClientOnly>
          </div>
        </div>

        <SharedHeaderMobileItemsTheme />

        <div class="border-b border-slate-300  dark:border-gray-800 py-4 mb-4">
          <ul class="flex flex-col gap-y-2 ">
            <li>
              <nuxt-link
                to="/"
                class="flex items-center justify-start gap-x-2  py-2 px-2 rounded-lg hover:bg-gray-100 hover:dark:bg-gray-800 "
              >
                <span>
                  <Icon name="solar:home-smile-linear" size="24" />
                </span>
                <span class="text-slate-500 dark:text-slate-400 text-sm">
                  صفحه اصلی
                </span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                to="/"
                class="flex items-center justify-start gap-x-2  py-2 px-2 rounded-lg hover:bg-gray-100 hover:dark:bg-gray-800 "
              >
                <span><Icon name="solar:shop-2-outline" size="24" /> </span>
                <span class="text-slate-500 dark:text-slate-400 text-sm">

                  درباره ما
                </span>
              </nuxt-link>
            </li>

            <li>
              <nuxt-link
                to="/"
                class="flex items-center justify-start gap-x-2  py-2 px-2 rounded-lg hover:bg-gray-100 hover:dark:bg-gray-800 "
              >
                <span><Icon
                  name="streamline:interface-help-customer-support-1-customer-headset-help-microphone-phone-support"
                  size="24"
                /> </span>
                <span class="text-slate-500 dark:text-slate-400 text-sm">

                  تماس با ما
                </span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                to="/"
                class="flex items-center justify-start gap-x-2  py-2 px-2 rounded-lg hover:bg-gray-100 hover:dark:bg-gray-800 "
              >
                <span>
                  <ClientOnly>
                    <Icon name="fluent:question-circle-20-regular" size="24" />
                  </ClientOnly>
                </span>
                <span class="text-slate-500 dark:text-slate-400 text-sm">

                  سوالات متداول
                </span>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div>
          <ul class="flex flex-col gap-y-2 mb-2 ">
            <li>
              <nuxt-link
                to="/search/?special=1"
                class="flex items-center justify-start gap-x-2  py-2 px-2 rounded-lg hover:bg-gray-100 hover:dark:bg-gray-800 "
              >
                <span><Icon name="mdi:sale-outline" size="24" /> </span>
                <span class="text-slate-500 dark:text-slate-400 text-sm">
                  فروش ویژه
                </span>
              </nuxt-link>
            </li>

            <li>
              <div
                class="flex items-center gap-x-2 justify-start py-2 px-2 text-sm text-slate-500 dark:text-slate-400 select-none font-medium"
              >
                <span><Icon name="icon-park-outline:ad-product" size="24" /> </span>
                <span>
                  دسته بندی کالا ها
                </span>
              </div>
            </li>
          </ul>
        </div>
        <!-- Categories -->
        <div>
          <details
            v-for="item in utilStore.categories" :key="item.id"
            class="group [&_summary::-webkit-details-marker]:hidden py-2"
          >
            <summary class="flex cursor-pointer items-center justify-between rounded-lg  py-2">
              <span class="flex items-center gap-x-4">
                <span v-if="item.children" class="w-0.5 h-5 bg-sky-600" />
                <span v-else class="w-0.5 h-5" />
                <span class="text-slate-500 dark:text-slate-400 text-sm">
                  {{ item.display_title }}
                </span>
              </span>

              <span
                v-if="item.children"
                class="shrink-0 transition duration-300 group-open:-rotate-90"
              >
                <Icon name="ic:outline-chevron-left" size="18" />
              </span>
              <span v-else class="h-6" />
            </summary>

            <ul v-if="item.children" class="mt-2  px-4 divide-y-[0.5px] divide-gray-200 dark:divide-gray-800">
              <li class="pb-4">
                <nuxt-link :to="item.url" class="text-sky-500 dark:text-sky-500  text-xs">
                  همه محصولات {{ truncatedText(item.title_ir, 18) }}
                </nuxt-link>
              </li>
              <li>
                <details
                  v-for="child in item.children" :key="child.id"
                  class="group [&_summary::-webkit-details-marker]:hidden py-2"
                >
                  <summary class="flex cursor-pointer items-center justify-between rounded-lg  py-2">
                    <span class="flex items-center gap-x-4">
                      <span v-if="child.products" class="w-0.5 h-5 bg-sky-600" />
                      <span v-else class="w-0.5 h-5" />
                      <span class="text-slate-500 dark:text-slate-400  text-sm">
                        {{ child.display_title }}
                      </span>
                    </span>

                    <span
                      v-if="child.products"
                      class="shrink-0 transition duration-300 group-open:-rotate-90"
                    >
                      <Icon name="ic:outline-chevron-left" size="18" />
                    </span>
                    <span v-else class="h-6" />
                  </summary>

                  <ul v-if="child.products" class="mt-2  px-4 divide-y-[0.5px] divide-gray-200 dark:divide-gray-800">
                    <li class="pb-4">
                      <nuxt-link :to="child.url" class="text-sky-500 dark:text-sky-500  text-xs">
                        همه محصولات {{ truncatedText(child.title_ir, 12) }}
                      </nuxt-link>
                    </li>
                    <li v-for="product in child.products" :key="product.id">
                      <nuxt-link
                        :to="product.url"

                        class="flex items-center  rounded-lg px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer"
                      >
                        <span>
                          {{ product.title_ir }}
                        </span>
                      </nuxt-link>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </details>
        </div>
      </div>
    </USlideover>
  </div>
</template>

<style scoped>

</style>
