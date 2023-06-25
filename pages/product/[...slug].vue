<script setup lang="ts">
import { GetProduct } from '~/services/shop/product/product.service'

const route = useRoute()
// const loading = ref(false)

const { data: result, refresh, pending } = await useAsyncData('product_detail', () => GetProduct(route.params.slug[0]))
if (result.value?.data == null)
  throw createError({ statusCode: 404, message: 'صفحه مورد نظر یافت نشد' })
</script>

<template>
  <div class="container lg:max-w-[900px]">
    <!-- Breadcrumb Section -->

    <PagesProductBreadcrumb :product="result?.data!" />
    <!-- Detail Section -->
    <div class="bg-white dark:bg-gray-900 rounded-lg ">
      <div class="grid grid-cols-12 gap-x-8 md:gap-x-0 ">
        <!-- image -->
        <div
          class="col-span-4 lg:col-span-12 p-4 pl-4  md:mb-10 flex justify-center border-l lg:border-none border-gray-200 dark:border-gray-800 "
        >
          <PagesProductDetailImage
            :fetch-pending="pending"
            :product="result?.data!"
            @timer-expired="refresh"
          />
        </div>
        <!-- Detail -->
        <div class="col-span-8 lg:col-span-12 p-4 pr-0 lg:px-4">
          <div class="flex flex-col gap-y-5">
            <!-- Title -->
            <PagesProductDetailTitle :product="result?.data!" />

            <!-- Information - Actions -->

            <div class="grid grid-cols-12">
              <div class="col-span-5 lg:col-span-12 lg:mb-6">
                <PagesProductDetailInformation :product="result?.data!" />
              </div>

              <div class="col-span-7 lg:col-span-12">
                <PagesProductDetailAction :product="result?.data!" :fetch-pending="pending" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
