<template>
  <div class="container py-2">
    <div class="bg-white dark:bg-gray-900  rounded-lg py-2 px-4">
      <div class="flex justify-center mb-6">
        <div class="flex items-center justify-center">
          <h1 class="text-xl font-iranyekanBold text-slate-500 dark:text-slate-400">
            دسته بندی ها
          </h1>

          <div>
            <!--  Todo icon  -->
          </div>

        </div>
      </div>


      <div class="grid grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 items-center place-self-end  gap-y-4">

        <div v-for="category in children.slice(0,6)" :key="category.id" class="">


          <BaseCardCategoryCircle :category="category"/>


        </div>

      </div>


    </div>
  </div>

</template>

<script setup lang="ts">
import {useWebsiteUtilStore} from "~/store/website/webUtilStore";

const items = ['Vue', 'React', 'Angular']

const utilStore = useWebsiteUtilStore()
const children = computed(() => {
  const categories = utilStore.categories || [];
  return categories.flatMap(category => [category, ...category.children]);
})

// const breakpoints = {
//     1300: {
//         slidesPerView: 6,
//
//     },
//
//     1100: {
//         slidesPerView: 5.6,
//
//     },
//     800: {
//         slidesPerView: 4.6,
//
//
//     },
//     600: {
//         slidesPerView: 3.6,
//
//     },
//
//     377: {
//         slidesPerView: 2.6,
//
//     },
//
//     0: {
//         slidesPerView: 2.4,
//     },
//
// };

</script>

<style scoped>
.marquee-container {
  --mask: linear-gradient(to right,
  rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 5%,
  rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 80%,
  rgba(0, 0, 0, 0) 95%, rgba(0, 0, 0, 0) 0
  ) 100% 50% / 100% 100%;

  -webkit-mask: var(--mask);
  mask: var(--mask);
}
</style>