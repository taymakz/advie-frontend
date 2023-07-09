<script setup lang="ts">
import Newsletter from '~/components/shared/footer/items/Newsletter.vue'

function backToTop() {
  window.scrollTo(0, 0)
}
</script>

<template>
  <footer class="bg-white dark:bg-gray-900 pb-10 relative border-t border-gray-200 dark:border-gray-800 ">
    <!-- Footer Logo -->
    <div class="absolute inset-x-0 flex items-center justify-center -top-3   ">
      <div class="relative flex justify-center h-10 w-12">
        <div class="absolute w-full h-full inset-0 -top-[2px] blur-[4px] bg-stone-50 dark:bg-slate-900 rounded-full" />
        <svg
          viewBox="0 0 135 90" fill="none" xmlns="http://www.w3.org/2000/svg"
          class="relative w-7 h-7 text-gray-200"
        >
          <title>Logo</title>
          <path
            d="M74.2284 87.8731H123.414C124.977 87.8733 126.511 87.4745 127.864 86.7167C129.217 85.959 130.341 84.869 131.121 83.5565C131.902 82.244 132.313 80.7552 132.312 79.2398C132.312 77.7245 131.899 76.2361 131.118 74.9242L98.0856 19.4276C97.3048 18.1154 96.1817 17.0257 94.829 16.2681C93.4764 15.5105 91.942 15.1116 90.38 15.1116C88.8181 15.1116 87.2836 15.5105 85.931 16.2681C84.5784 17.0257 83.4552 18.1154 82.6745 19.4276L74.2284 33.6272L57.7148 5.86031C56.9334 4.54821 55.8097 3.45868 54.4567 2.70119C53.1037 1.9437 51.569 1.54492 50.0068 1.54492C48.4446 1.54492 46.9099 1.9437 45.5569 2.70119C44.2039 3.45868 43.0803 4.54821 42.2989 5.86031L1.1947 74.9242C0.41273 76.2361 0.000680577 77.7245 8.42355e-07 79.2398C-0.000678893 80.7552 0.410035 82.244 1.19083 83.5565C1.97163 84.869 3.09498 85.959 4.44789 86.7167C5.80081 87.4745 7.33558 87.8733 8.89785 87.8731H39.7727C52.0057 87.8731 61.0271 82.661 67.2346 72.4925L82.3054 47.1759L90.3776 33.6272L114.604 74.3244H82.3054L74.2284 87.8731ZM39.2694 74.3105L17.7227 74.3058L50.0212 20.046L66.1369 47.1759L55.3468 65.309C51.2244 71.9067 46.5411 74.3105 39.2694 74.3105Z"
            fill="#00DC82"
          />
        </svg>
      </div>
    </div>

    <div class="container">
      <!-- Contact - Go to Top -->
      <div class="flex flex-row md:flex-col md:gap-y-4 items-center justify-between mt-10">
        <div class="flex flex-row md:flex-col items-center gap-y-4 gap-x-4 text-slate-500 dark:text-slate-400">
          <p class="fa-num text-sm">
            تلفن پشتیبانی ۶۱۹۳۰۰۰۰ - ۰۲۱
          </p>
          <span class="md:hidden h-5 w-[1px] border border-gray-300 dark:border-gray-700" />
          <p class="fa-num text-sm">
            ۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم
          </p>
        </div>
        <div class="flex md:order-first">
          <UButton size="lg" color="white" label="برگشت به بالا" icon="i-mdi-chevron-up" trailing @click="backToTop" />
        </div>
      </div>

      <!-- Subscribe - Social Links  -->
      <div
        class="flex flex-row md:flex-col md:gap-y-4 gap-x-4 items-center justify-between bg-stone-50 dark:bg-slate-800  mt-10 rounded-xl px-10 py-4  mb-10"
      >
        <div>
          <p class="text-sm text-slate-500 dark:text-slate-400">
            از جدیدترین تخفیف ها با خبر شوید
          </p>
        </div>
        <Newsletter />
        <div class="flex items-center justify-center gap-x-4">
          <div class="text-slate-500 dark:text-slate-400 hover:text-rose-600 hover:dark:text-rose-500">
            <nuxt-link to="/" target="_blank" external aria-label="Follow us on instagram">
              <ClientOnly>
                <div class="sr-only">
                  instagram link
                </div>
                <Icon name="mdi:instagram" class="w-7 h-7" />
              </ClientOnly>
            </nuxt-link>
          </div>
          <div class="text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:dark:text-blue-500">
            <nuxt-link to="/" target="_blank" external aria-label="Follow us on twitter">
              <ClientOnly>
                <div class="sr-only">
                  twitter link
                </div>
                <Icon name="mdi:twitter" class="w-7 h-7" />
              </ClientOnly>
            </nuxt-link>
          </div>
          <div class="text-slate-500 dark:text-slate-400 hover:text-red-600 hover:dark:text-red-500">
            <nuxt-link to="/" target="_blank" external aria-label="Follow us on aparat">
              <ClientOnly>
                <div class="sr-only">
                  aparat link
                </div>
                <Icon name="simple-icons:aparat" class="w-7 h-7" />
              </ClientOnly>
            </nuxt-link>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-12 gap-y-10">
        <div class="col-span-6 md:col-span-12 ">
          <div class="grid grid-cols-12 md:justify-items-center">
            <div class="col-span-6 flex flex-col gap-y-5">
              <p class="text-slate-600 dark:text-slate-300 text-lg select-none">
                فروشگاه
              </p>
              <ul class="space-y-4 text-slate-500 dark:text-slate-400">
                <li>
                  <nuxt-link to="/" class=" py-2 hover:text-sky-600 hover:dark:text-sky-600">
                    شرایط مرجوعی
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/" class=" py-2 hover:text-sky-600 hover:dark:text-sky-600">
                    راهنمای خرید
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/" class=" py-2 hover:text-sky-600 hover:dark:text-sky-600 ">
                    قوانین و مقررات
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/" class=" py-2 hover:text-sky-600 hover:dark:text-sky-600 ">
                    چرا ما
                  </nuxt-link>
                </li>
              </ul>
            </div>
            <div class="col-span-6 flex flex-col gap-y-5">
              <p class="text-slate-600 dark:text-slate-300 text-lg select-none">
                دسترسی سریع
              </p>
              <ul class="space-y-4 text-slate-500 dark:text-slate-400 ">
                <li>
                  <nuxt-link to="/" class=" py-2  hover:text-sky-600 hover:dark:text-sky-600">
                    پیگیری سفارشات
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/" class=" py-2 hover:text-sky-600 hover:dark:text-sky-600">
                    تماس با ما
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/" class=" py-2 hover:text-sky-600 hover:dark:text-sky-600">
                    سوالات متداول
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/" class=" py-2 hover:text-sky-600 hover:dark:text-sky-600">
                    درباره ما
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-span-4 md:col-span-12 flex items-center justify-end md:justify-center gap-x-2">
          <nuxt-link to="/" class="w-[140px]  border border-gray-200 dark:border-gray-800 rounded-lg p-2">
            <nuxt-img src="/images/namad.png" alt="namad" width="122" height="122" />
          </nuxt-link>
          <nuxt-link to="/" class="w-[140px]  border border-gray-200 dark:border-gray-800 rounded-lg p-2">
            <nuxt-img src="/images/namad.png" alt="namad" width="122" height="122" />
          </nuxt-link>
        </div>
      </div>

      <!-- Copyright -->
      <SharedFooterItemsCopyright />
    </div>
  </footer>
</template>

<style scoped>

</style>
