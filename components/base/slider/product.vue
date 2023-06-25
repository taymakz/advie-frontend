<template>

  <div v-if="products" class="container py-2">
    <div class="bg-white dark:bg-gray-900  rounded-lg py-2 px-4">
      <div v-if="title || link" class="flex justify-between mb-6">
        <div class="flex items-center justify-center gap-x-2">
          <h2 :class="['text-xl sm:text-sm  font-iranyekanBold text-slate-500 dark:text-slate-400',titleClasses]">
            {{ title }}
          </h2>

          <div v-if="icon">
            <Icon :name="icon" size="26" :class="[iconClasses]"/>
          </div>

        </div>
        <div class="flex items-center justify-center" v-if="link">

            <nuxt-link :to="link"
                class="flex flex-row items-center justify-between gap-x-2 md:gap-x-1 p-2 text-sm sm:text-xs text-slate-200 dark:text-slate-200 rounded-lg bg-sky-600 hover:bg-sky-700 dark:bg-sky-900 dark:hover:bg-sky-600 px-4 transition-colors duration-150">

                                  <span>
                                    مشاهده همه
                                  </span>

              <span>
                                <Icon name="ic:outline-chevron-left" class="!text-slate-200 dark:!text-slate-200" size="18"/>

                            </span>
            </nuxt-link>
        </div>
      </div>
      <div>

        <BaseSwiper
            class="product__slider"
            effect="cards"
            :freeMode="{enabled:true}"
            :modules="[SwiperNavigation,SwiperFreeMode]"
            :navigation="{enabled:true}"
            :breakpoints="breakpoints"
            :items="products"
        >
          <template #item="{ item }">
            <BaseCardProductMainSkeleton v-show="loading"/>
            <BaseCardProductMain :product="item" v-show="!loading"/>
          </template>
        </BaseSwiper>
      </div>

    </div>
  </div>


</template>

<script setup lang="ts">
import {ProductCardDTO} from "~/models/shop/product/ProductCardDTO";




const loading = ref(true)
onMounted(() => {
  setInterval(() => {
    loading.value=false
  },1000)
})
defineProps<{
  products: ProductCardDTO[],
  title?: string,
  titleClasses?: string,
  icon?: string,
  iconClasses?: string,
  link?: string
}>()

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

};

</script>
