<script setup lang="ts">
const minprice = ref(100)
const maxprice = ref(10000)
const min = ref(100)
const max = ref(10000)
const minthumb = ref(0)
const maxthumb = ref(0)

function mintrigger() {
  minprice.value = Math.min(minprice.value, maxprice.value - 500)
  minthumb.value = ((minprice.value - min.value) / (max.value - min.value)) * 100
}

function maxtrigger() {
  maxprice.value = Math.max(maxprice.value, minprice.value + 500)
  maxthumb.value = 100 - (((maxprice.value - min.value) / (max.value - min.value)) * 100)
}

onMounted(() => {
  mintrigger()
  maxtrigger()
})
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <div class="relative max-w-xl w-full">
      <div>
        <input
          v-model="minprice"
          type="range"
          step="100" :min="min"
          :max="max"
          class="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer"
          @input="mintrigger"
        >

        <input
          v-model="maxprice"
          type="range"
          step="100" :min="min"
          :max="max"
          class="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer"
          @input="maxtrigger"
        >

        <div class="relative z-10 h-2">
          <div class="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200" />

          <div
            class="absolute z-20 top-0 bottom-0 rounded-md bg-green-300"
            :style="`right:${maxthumb}%; left:${minthumb}%`"
          />

          <div
            class="absolute z-30 w-6 h-6 top-0 left-0 bg-green-300 rounded-full -mt-2 -ml-1"
            :style="`left: ${minthumb}%`"
          />

          <div
            class="absolute z-30 w-6 h-6 top-0 right-0 bg-green-300 rounded-full -mt-2 -mr-3"
            :style="`right: ${maxthumb}%`"
          />
        </div>
      </div>

      <div class="flex justify-between items-center py-5">
        <div>
          <input
            v-model="minprice" type="text" maxLength="5" class="px-3 py-2 border border-gray-200 rounded w-24 text-center"
            @input="mintrigger"
          >
        </div>
        <div>
          <input
            v-model="maxprice" type="text" maxLength="5" class="px-3 py-2 border border-gray-200 rounded w-24 text-center"
            @input="maxtrigger"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style>
input[type=range]::-webkit-slider-thumb {
  pointer-events: all;
  width: 24px;
  height: 24px;
  -webkit-appearance: none;
  /* @apply w-6 h-6 appearance-none pointer-events-auto; */
}
</style>
