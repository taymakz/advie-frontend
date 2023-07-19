<script setup lang="ts">
import type { ProductDetailDTO } from '~/models/shop/product/ProductDetailDTO'

defineProps<{
  product: ProductDetailDTO
}>()
</script>

<template>
  <div>
    <div class="hidden lg:flex items-center flex-wrap gap-2 mb-4 ">
      <nuxt-link
        to="/"
        class="group flex items-center justify-center gap-x-1 py-1 px-2 bg-gray-200 dark:bg-gray-800 rounded-lg text-sm text-slate-600 dark:text-slate-300 group-hover:text-sky-300 dark:group-hover:text-sky-400 transition-colors duration-150"
      >
        <div>
          صفحه اصلی
        </div>
        <div>
          <ClientOnly>
            <Icon
              name="ic:outline-chevron-left" size="18"
            />
          </ClientOnly>
        </div>
      </nuxt-link>

      <nuxt-link
        v-for="(item, index) in product.breadcrumbs" :key="index" :to="item.url"
        class="group flex items-center justify-center gap-x-1 py-1 px-2 bg-gray-200 dark:bg-gray-800 rounded-lg text-sm text-slate-600 dark:text-slate-300 group-hover:text-sky-300 dark:group-hover:text-sky-400 transition-colors duration-150"
      >
        <div>
          {{ item.title }}
        </div>
        <div>
          <ClientOnly>
            <Icon
              name="ic:outline-chevron-left" size="18"
            />
          </ClientOnly>
        </div>
      </nuxt-link>

      <div
        class="group flex items-center justify-center gap-x-1 py-1 px-2 bg-gray-200 dark:bg-gray-800 rounded-lg text-sm text-slate-600 dark:text-slate-300 group-hover:text-sky-300 dark:group-hover:text-sky-400 transition-colors duration-150"
      >
        {{ product.title_ir }}
      </div>
    </div>
    <nav aria-label="Breadcrumb" class="flex lg:hidden mb-4">
      <ol
        class="flex overflow-hidden rounded-lg  text-gray-700  dark:text-gray-200"
      >
        <li class="flex items-center">
          <nuxt-link
            to="/"
            class="flex h-10 items-center gap-2 bg-white  px-4 transition hover:text-gray-900 dark:bg-gray-800 dark:hover:text-white"
          >
            <span class="text-xs font-medium"> صفحه اصلی </span>
          </nuxt-link>
        </li>

        <li
          v-for="(item, index) in product.breadcrumbs" :key="index"
          class="relative flex items-center"
        >
          <span
            class="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 rounded-xl [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180 dark:bg-gray-900"
          />

          <nuxt-link
            :to="item.url"
            class="flex h-10 items-center bg-white pe-4 ps-8 text-xs font-medium transition hover:text-gray-900 dark:bg-gray-800 dark:hover:text-white"
          >
            {{ item.title }}
          </nuxt-link>
        </li>
        <li
          class="relative flex items-center"
        >
          <span
            class="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 rounded-xl [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180 dark:bg-gray-900"
          />

          <div
            class="flex h-10 items-center bg-white pe-4 ps-8 text-xs font-medium transition hover:text-gray-900 dark:bg-gray-800 dark:hover:text-white"
          >
            <div class="text-sm  md:text-xs text-slate-600 dark:text-slate-300">
              {{ product.title_ir }}
            </div>
          </div>
        </li>
      </ol>
    </nav>
  </div>
</template>
