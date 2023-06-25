<template>
  <div>

    <div>
      <!-- Slider Section -->
      <div class="container py-2">


        <div class="rounded-lg overflow-hidden ">

          <base-slider-banner :banners="data.data.banners" :position="BannerPosition.SLIDER"  v-if="data !=null&& !error"/>

        </div>
      </div>
      <!-- Categories Section -->
      <PagesHomeCategories/>

      <!-- Special Products Section -->
      <BaseSliderProduct :products="data.data.special_sale_products" title="محصولات فروش ویژه"
                         link="/search/?special=1"
                         icon="solar:sale-broken" icon-classes="!text-red-600 dark:!text-red-600" v-if="data !=null&& !error"/>
      <!-- Latest Products Section -->
      <BaseSliderProduct :products="data.data.latest_products" title="جدیدترین محصولات" link="/search/?sort=1"
                         icon="carbon:3d-cursor"
                         icon-classes="!text-green-500 dark:!text-green-400" v-if="data !=null&& !error"/>
      <!-- LG Banner Section -->
      <PagesHomeBannersLarge/>
      <!-- Sale Products Section -->
      <BaseSliderProduct :products="data.data.best_selling_products" title="پرفروش ترین محصولات"
                         link="/search/?sort=2"
                         icon="streamline:interface-favorite-award-ribbon-reward-like-social-rating-media"
                         icon-classes="!text-sky-500 dark:!text-sky-400" v-if="data !=null&& !error"/>
      <!-- Recent Products Section -->
      <!--    <BaseSliderProduct/>-->

      <!-- Small Banners Section -->
      <PagesHomeBannersSmall/>
    </div>


  </div>
</template>
<script setup lang="ts">


import {HomeDataDTO} from "~/models/home/HomeDataDTO";
import {BannerPosition} from "~/models/banner/Banner";


const {data, pending, error} = useAsyncData("home_data", () => FetchApi<HomeDataDTO>("/data/page/home/"))

</script>
