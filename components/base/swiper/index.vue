<template>
  <Swiper
      dir="rtl"
      :space-between="spaceBetween"
      :navigation="navigation"
      :pagination="pagination"
      :freeMode="freeMode"
      :wrapperClass="baseClass"
      :loop="loop"
      :autoplay="autoplay"
      :effect="effect"
      :modules="modules"
      :slides-per-view="itemsToShow"
      :breakpoints="breakpoints"
  >
    <SwiperSlide :class="slideClass" v-for="(item, index) in items" :key="index">
      <slot name="item" :item="item" :index="index"/>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">

import {AutoplayOptions, NavigationOptions, PaginationOptions, SwiperModule,FreeModeOptions} from "swiper/types";

withDefaults(defineProps<{
  items?: any[],
  modules?: SwiperModule[]
  breakpoints?: any,
  itemsToShow?: number,
  slideClass?: string,
  baseClass?: string,
  loop?: boolean,
  effect?: 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip' | 'creative' | 'cards',
  autoplay?: AutoplayOptions,
  navigation?: NavigationOptions,
  pagination?: PaginationOptions,
  freeMode?: FreeModeOptions,
  spaceBetween?: number
}>(), {
  baseClass: "",
  effect: "slide",
  slideClass: "",
  loop: false,
  itemsToShow: 1,
  spaceBetween: 0
});
</script>

<style>

</style>