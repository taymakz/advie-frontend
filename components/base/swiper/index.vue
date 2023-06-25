<script setup lang="ts">
import type { AutoplayOptions, FreeModeOptions, NavigationOptions, PaginationOptions, SwiperModule } from 'swiper/types'

withDefaults(defineProps<{
  items?: any[]
  modules?: SwiperModule[]
  breakpoints?: any
  itemsToShow?: number
  slideClass?: string
  baseClass?: string
  loop?: boolean
  effect?: 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip' | 'creative' | 'cards'
  autoplay?: AutoplayOptions
  navigation?: NavigationOptions
  pagination?: PaginationOptions
  freeMode?: FreeModeOptions
  spaceBetween?: number
}>(), {
  baseClass: '',
  effect: 'slide',
  slideClass: '',
  loop: false,
  itemsToShow: 1,
  spaceBetween: 0,
})
</script>

<template>
  <Swiper
    dir="rtl"
    :space-between="spaceBetween"
    :navigation="navigation"
    :pagination="pagination"
    :free-mode="freeMode"
    :wrapper-class="baseClass"
    :loop="loop"
    :autoplay="autoplay"
    :effect="effect"
    :modules="modules"
    :slides-per-view="itemsToShow"
    :breakpoints="breakpoints"
  >
    <SwiperSlide v-for="(item, index) in items" :key="index" :class="slideClass">
      <slot name="item" :item="item" :index="index" />
    </SwiperSlide>
  </Swiper>
</template>

<style>

</style>
