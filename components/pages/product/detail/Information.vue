<template>
  <div>
    <div class="flex flex-col gap-y-2">

      <div class="flex flex-col gap-y-2" v-for="(item,index) in properties" :key="index">
        <div class="text-sm font-iranyekanBold  text-slate-500 dark:text-slate-400 " v-text="item.property.name">


        </div>
        <div class="text-xs  font-medium text-slate-500 dark:text-slate-400 leading-5" v-html="item.value">

        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {Property} from "~/models/shop/product/ProductDetailDTO";

defineProps<{
  properties: Property[],

}>()
</script>

<style scoped>

</style>