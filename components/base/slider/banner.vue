<script setup lang="ts">
import type { BannerDTO, BannerPosition } from '~/models/banner/Banner'

const props = defineProps<{
  banners: BannerDTO[]
  position: BannerPosition

}>()
const filteredBanners = props.banners?.filter(f => f.position === props.position) || []
</script>

<template>
  <BaseSwiper
    class="banner__slider"
    effect="slide"
    :loop="true"
    :modules="[SwiperAutoplay, SwiperEffectFade, SwiperNavigation, SwiperPagination]"
    :items-to-show="1"
    :autoplay="{ delay: 3000, pauseOnMouseEnter: true }"
    :navigation="{ enabled: true }"
    :pagination="{ enabled: true, clickable: true }"
    :items="filteredBanners"
  >
    <template #item="{ item }">
      <nuxt-link :to="item.url" target="_blank" external>
        <nuxt-img :src="GetImageUrl(item.image)" :alt="item.image_alt" :title="item.image_alt" />
      </nuxt-link>
    </template>
  </BaseSwiper>
</template>
