<script setup lang="ts">
import type { ProductCardDTO } from '~/models/shop/product/ProductCardDTO'

defineProps<{
  products?: ProductCardDTO[] | null | undefined
  title?: string
  titleClasses?: string
  icon?: string
  iconClasses?: string
  link?: string
  pending?: boolean
}>()
const loading = ref(true)
onMounted(() => {
  setInterval(() => {
    loading.value = false
  }, 1000)
})
const breakpoints = {

  1250: {
    slidesPerView: 6,

  },
  1150: {
    slidesPerView: 5.5,

  },
  1100: {
    slidesPerView: 5.2,

  },

  1050: {
    slidesPerView: 5,

  },
  1000: {
    slidesPerView: 4.8,

  },
  950: {
    slidesPerView: 4.5,

  },
  900: {
    slidesPerView: 4.2,

  },
  850: {
    slidesPerView: 4,

  },
  800: {
    slidesPerView: 3.8,

  },
  750: {
    slidesPerView: 3.5,

  },
  700: {
    slidesPerView: 3.2,

  },
  650: {
    slidesPerView: 3,

  },
  600: {
    slidesPerView: 2.7,

  },
  550: {
    slidesPerView: 2.5,

  },
  500: {
    slidesPerView: 2.2,

  },
  450: {
    slidesPerView: 2,
  },
  415: {
    slidesPerView: 1.8,
  },
  0: {
    slidesPerView: 1.5,
  },

}
</script>

<template>
  <div>
    <!-- Skeleton -->

    <div v-if="!pending && !loading && products " class="container py-2">
      <div class="bg-white dark:bg-gray-900  rounded-lg py-2 px-4">
        <div v-if="title || link" class="flex justify-between mb-6">
          <div class="flex items-center justify-center gap-x-2">
            <h2
              class="text-xl sm:text-sm  font-iranyekanBold text-slate-500 dark:text-slate-400"
              :class="[titleClasses]"
            >
              {{ title }}
            </h2>

            <div v-if="icon">
              <Icon :name="icon" size="26" :class="[iconClasses]" />
            </div>
          </div>
          <div v-if="link" class="flex items-center justify-center">
            <UButton
              :to="link" size="md" color="white" label="مشاهده همه" icon="i-mdi-chevron-left" trailing
            />
          </div>
        </div>
        <div>
          <BaseSwiper
            class="product__slider"
            effect="cards"
            :free-mode="{ enabled: true }"
            :modules="[SwiperNavigation, SwiperFreeMode]"
            :navigation="{ enabled: true }"
            :breakpoints="breakpoints"
            :items="products"
          >
            <template #item="{ item }">
              <BaseCardProductMain v-show="!loading" :product="item" />
            </template>
          </BaseSwiper>
        </div>
      </div>
    </div>
    <div v-else class="container py-2">
      <div class="bg-white dark:bg-gray-900  rounded-lg py-2 px-4">
        <div class="flex justify-between mb-6">
          <USkeleton class="w-48 h-9" />
          <USkeleton class="w-32 h-9" />
        </div>
        <BaseSwiper
          class="product__slider"
          effect="cards"
          :free-mode="{ enabled: true }"
          :modules="[SwiperNavigation, SwiperFreeMode]"
          :navigation="{ enabled: true }"
          :breakpoints="breakpoints"
          :items="[1, 2, 3, 4, 5, 6]"
        >
          <template #item>
            <BaseCardProductMainSkeleton />
          </template>
        </BaseSwiper>
      </div>
    </div>
  </div>
</template>
