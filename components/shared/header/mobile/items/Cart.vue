<template>
  <ClientOnly>
    <div>

      <div v-if="loading">

       <USkeleton v-if="loading" class="rounded-full h-8 w-8" />

      </div>
      <div v-else>


        <nuxt-link
            to="/checkout/cart/"
            class="relative flex items-center justify-center bg-gray-100 dark:bg-gray-800  hover:bg-sky-500 dark:hover:bg-sky-500 group   w-8 h-8 rounded-full cursor-pointer">
          <div
              class=" bg-sky-600 inline-flex absolute -top-1.5 -right-1.5 w-[18px]  h-[18px] p-1  rounded-full  items-center justify-center cursor-pointer select-none text-xs text-gray-200 font-iranyekanFanum ">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-25 "></span>
            {{ basketStore.getItemsCount }}
          </div>
          <Icon name="ph:shopping-cart-simple" size="20"
                class="group-hover:text-white "/>
        </nuxt-link>
      </div>


    </div>
  </ClientOnly>

</template>

<script setup lang="ts">


import {useBasketStore} from "~/store/shop/BasketStore";


const basketStore = useBasketStore()

defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>

</style>