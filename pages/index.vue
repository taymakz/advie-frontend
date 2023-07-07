<script setup lang="ts">
import type { HomeDataDTO } from '~/models/home/HomeDataDTO'
import { BannerPosition } from '~/models/banner/Banner'

const { data, error, pending } = useAsyncData('home_data', () => FetchApi<HomeDataDTO>('/data/page/home/'))
</script>

<template>
  <div>
    <div v-if="!error">
      <!-- Slider Section -->
      <div class="container py-2">
        <div class="rounded-lg overflow-hidden ">
          <base-slider-banner
            v-if="data?.data.banners" :banners="data.data.banners"
            :position="BannerPosition.SLIDER"
          />
        </div>
      </div>
      <!-- Categories Section -->
      <PagesHomeCategories />

      <!-- Special Products Section -->
      <BaseSliderProduct
        :products="data?.data.special_sale_products"
        :pending="pending"
        title="محصولات فروش ویژه"
        link="/search/?special=1" icon="solar:sale-broken"
        icon-classes="!text-red-600 dark:!text-red-600"
      />
      <!-- Latest Products Section -->
      <BaseSliderProduct

        :products="data?.data.latest_products" title="جدیدترین محصولات"
        :pending="pending"
        link="/search/?sort=1"
        icon="carbon:3d-cursor" icon-classes="!text-green-500 dark:!text-green-400"
      />
      <!-- LG Banner Section -->
      <div class="container py-2 md:hidden">
        <nuxt-link to="/">
          <nuxt-img src="/images/banners/lg-banner.jpg" alt="large banner" class="rounded-lg" />
        </nuxt-link>
      </div>
      <!-- Sale Products Section -->
      <BaseSliderProduct

        :products="data?.data.best_selling_products"
        :pending="pending"
        title="پرفروش ترین محصولات"
        link="/search/?sort=2"
        icon="streamline:interface-favorite-award-ribbon-reward-like-social-rating-media"
        icon-classes="!text-sky-500 dark:!text-sky-400"
      />
      <!-- Recent Products Section -->
      <!--    <BaseSliderProduct/> -->
    </div>
  </div>
</template>
