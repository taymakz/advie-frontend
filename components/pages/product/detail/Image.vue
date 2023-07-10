<script setup lang="ts">
import type { ProductDetailDTO } from '~/models/shop/product/ProductDetailDTO'

const props = defineProps<{
  product: ProductDetailDTO
  fetchPending: boolean
}>()

const emits = defineEmits(['timerExpired'])
const startDate = new Date(props.product.longest_special_price_start_date)
const endDate = new Date(props.product.longest_special_price_end_date)
const remainingTimeAsDate = new Date(props.product.longest_special_price_end_date)
const progressPercentage = ref(0)
const timerExpired = ref(false)

onMounted(() => {
  updateProgress()
  setInterval(updateProgress, 1000)
})

function updateProgress() {
  const currentTime = new Date()
  const totalDuration = endDate.getTime() - startDate.getTime()
  const elapsedDuration = currentTime.getTime() - startDate.getTime()
  if (elapsedDuration >= totalDuration) {
    progressPercentage.value = 100
    timerExpired.value = true
  }
  else {
    progressPercentage.value = Math.round((elapsedDuration / totalDuration) * 100)
    timerExpired.value = false
  }
}

watch(timerExpired, (newVal) => {
  if (newVal)
    emits('timerExpired')
})
</script>

<template>
  <div class="flex items-center flex-col gap-y-4">
    <div class="max-w-[400px]  ">
      <LegoPreview class="transition-transform ease-in-out duration-500 outline-none " :max-width="500">
        <LegoPreviewDialog
          class="fixed z-50  left-0 top-0 w-screen h-screen bg-gray-100 dark:bg-gray-900 bg-opacity-50 backdrop-blur-md"
        />
        <nuxt-img
          :src="GetImageUrl(product.image)" :alt="product.title_ir" :title="product.title_ir" class="rounded-xl  "
          quality="80"
          width="400"
          height="400"
          placeholder
          loading="lazy"
        />
      </LegoPreview>
    </div>
    <ClientOnly>
      <div v-if="!timerExpired && !fetchPending" class="flex flex-col justify-center items-center gap-y-2 ">
        <LegoCountDown v-slot="{ days, hours, minutes, seconds }" :date="remainingTimeAsDate" enable-days>
          <div class=" flex items-center justify-center gap-x-2 max-w-[280px]">
            <div
              class="w-16 h-16 p-2 bg-white border border-gray-100 dark:border-gray-800 dark:bg-gray-900  rounded-xl flex flex-col items-center justify-center"
            >
              <h5 class="text-xl font-semibold text-red-600 dark:text-red-500 ">
                {{ seconds }}
              </h5>
              <p class="text-sm mt-1 text-red-600 dark:text-red-500">
                ثانیه
              </p>
            </div>
            <div
              class="w-16 h-16 p-2 bg-white border border-gray-100 dark:border-gray-800 dark:bg-gray-900  rounded-xl flex flex-col items-center justify-center"
            >
              <h5 class="text-xl font-semibold text-red-600 dark:text-red-500 ">
                {{ minutes }}
              </h5>
              <p class="text-sm mt-1 text-red-600 dark:text-red-500">
                دقیقه
              </p>
            </div>
            <div
              class="w-16 h-16 p-2 bg-white border border-gray-100 dark:border-gray-800 dark:bg-gray-900  rounded-xl flex flex-col items-center justify-center"
            >
              <h5 class="text-xl font-semibold text-red-600 dark:text-red-500 ">
                {{ hours }}
              </h5>
              <p class="text-sm mt-1 text-red-600 dark:text-red-500">
                ساعت
              </p>
            </div>

            <div
              class="w-16 h-16 p-2 bg-white border border-gray-100 dark:border-gray-800 dark:bg-gray-900  rounded-xl flex flex-col items-center justify-center"
            >
              <h5 class="text-xl font-semibold text-red-600 dark:text-red-500 ">
                {{ days }}
              </h5>
              <p class="text-sm mt-1 text-red-600 dark:text-red-500">
                روز
              </p>
            </div>
          </div>
        </LegoCountDown>
        <div
          class="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 flex items-center max-w-[280px]"
          style="direction: ltr"
        >
          <div
            class="bg-red-600 dark:bg-red-500 h-1.5 rounded-full transition-all  duration-1000 "
            :style="{ width: `${progressPercentage}%` }"
          />
        </div>
      </div>
      <div v-if="fetchPending" class="flex flex-col justify-center items-center gap-y-2 ">
        <div class=" flex items-center justify-center gap-x-2 max-w-[280px]">
          <USkeleton class="h-16 w-16" />
          <USkeleton class="h-16 w-16" />
          <USkeleton class="h-16 w-16" />
          <USkeleton class="h-16 w-16" />
        </div>
        <div class="w-full">
          <USkeleton class="h-1.5 w-full" />
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped>

</style>
