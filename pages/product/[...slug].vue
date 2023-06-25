<template>
  <div class="container lg:max-w-[900px]" >

    <!-- Breadcrumb Section -->

    <PagesProductBreadcrumb :breadcrumbs="result?.data!.breadcrumbs"/>
    <!-- Detail Section -->
    <div class="bg-white dark:bg-gray-900 rounded-lg ">
      <div class="grid grid-cols-12 gap-x-8 md:gap-x-0 ">
        <!-- image -->
        <div class="col-span-4 lg:col-span-12 p-4 pl-4  md:mb-10 flex justify-center border-l lg:border-none border-gray-200 dark:border-gray-800 ">


          <PagesProductDetailImage @timerExpired="refresh" :fetchPending="pending" :image="result?.data!.image" :longest_special_price_end_date="result?.data!.longest_special_price_end_date"
          :longest_special_price_start_date="result?.data!.longest_special_price_start_date"
          />
        </div>
        <!-- Detail -->
        <div class="col-span-8 lg:col-span-12 p-4 pr-0 lg:px-4">
          <div class="flex flex-col gap-y-5">
            <!-- Title -->
            <PagesProductDetailTitle :title_ir="result?.data!.title_ir" :title_en="result?.data!.title_en"/>

            <!-- Information - Actions -->

            <div class="grid grid-cols-12">

              <div class="col-span-5 lg:col-span-12 lg:mb-6">

                <PagesProductDetailInformation :properties="result?.data!.properties"/>

              </div>

              <div class="col-span-7 lg:col-span-12">

                <PagesProductDetailAction :product="result?.data!" :fetchPending="pending"/>

              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {GetProduct} from "~/services/shop/product/product.service";

const route = useRoute();
const loading= ref(false)

const { data: result,refresh,pending } = await useAsyncData("product_detail", () => GetProduct(route.params.slug[0]));
if (result.value?.data == null) {
    throw createError({ statusCode: 404, message: 'صفحه مورد نظر یافت نشد' })
}

</script>

<style scoped>

</style>