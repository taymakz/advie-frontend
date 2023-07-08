<script setup lang="ts">
import type { BannerDTO, BannerPosition } from '~/models/banner/Banner'

const props = defineProps<{
  banners: BannerDTO[]
  position: BannerPosition
  count: number
  width: number
  height: number

}>()
const filteredBanners = props.banners?.filter(f => f.position === props.position) || []
</script>

<template>
  <div>
    <div v-for="(banner, index) in filteredBanners.splice(0, count)" :key="index">
      <nuxt-link :to="banner.url">
        <nuxt-img
          :src="GetImageUrl(banner.image)" :alt="banner.image_alt" :title="banner.title" :width="width"
          :height="height"
          class="rounded-lg"
        />
      </nuxt-link>
    </div>
  </div>
</template>

<style scoped>

</style>
