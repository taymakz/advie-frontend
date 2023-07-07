<script setup lang="ts">
import type { ProductCardDTO } from '~/models/shop/product/ProductCardDTO'

const props = defineProps<{
  product: ProductCardDTO
}>()

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
</script>

<template>
  <BaseBeutyBorderColor
    wrapper-class="before:rounded-md"
    bg-class="rounded-[5px] bg-white dark:bg-gray-800 "
  >
    <nuxt-link :to="product.url" class="relative flex  justify-center px-4 pt-4 " draggable="false">
      <div class="flex flex-col">
        <div class="flex items-center justify-center mb-4 mx-auto">
          <div class="relative">
            <nuxt-img
              :src="GetImageUrl(product.image)"
              :alt="product.title_ir"
              draggable="false"
              class="rounded-lg"
              :quality="product.is_available_in_stock ? 80 : 10"
              :class="{ 'opacity-25': !product.is_available_in_stock }"
              width="240"
              height="240"
              placeholder
              loading="lazy"
            />
            <div v-if="!product.is_available_in_stock" class="absolute top-2 right-2  ">
              <p class="text-sm bg-red-600 dark:bg-red-500 text-slate-200 dark:text-slate-200 px-2 pb-0.5  flex justify-center items-center rounded-lg">
                نا موجود
              </p>
            </div>
          </div>
        </div>
        <div class="mb-2">
          <p class="text-sm text-slate-800 dark:text-slate-300 h-10">
            {{ truncatedText(product.title_ir, 80) }}
          </p>
        </div>
        <div v-if="product.is_available_in_stock">
          <div class="flex  justify-between  mb-1">
            <div>
              <div
                v-if="product.has_any_special_price && !timerExpired"
                class="bg-red-600 rounded-xl  flex  items-center justify-center py-0.5 px-0.5 w-10 text-sm lg:text-xs font-medium text-white"
              >
                {{ product.special_price_percent }}%
              </div>
            </div>
            <div class="flex flex-col  gap-x-1">
              <div class=" font-bold  text-slate-700 dark:text-slate-200 ">
                <div v-if="product.has_any_special_price && !timerExpired">
                  {{ splitNumber(product.final_price) }}
                </div>
                <div v-else>
                  {{ splitNumber(product.price) }}
                </div>
              </div>
              <div class="text-xs font-thin text-slate-700 dark:text-slate-200 flex justify-end">
                تومان
              </div>
            </div>
          </div>
          <ClientOnly>
            <div class="h-9">
              <div v-if="!timerExpired && product.has_any_special_price">
                <div class="flex items-center justify-between mb-1">
                  <div>
                    <LegoCountDown
                      v-slot="{ days, hours, minutes, seconds }" :date="remainingTimeAsDate" enable-days
                    >
                      <div
                        class=" flex items-center justify-center gap-x-1  text-sm text-red-600 dark:text-red-500"
                      >
                        <div>
                          {{ seconds }}
                          :
                        </div>
                        <div>
                          {{ minutes }}
                          :
                        </div>
                        <div>
                          {{ hours }}
                          :
                        </div>
                        <div>
                          {{ days }}
                        </div>
                      </div>
                    </LegoCountDown>
                  </div>
                  <div>
                    <del v-if="product.has_any_special_price" class="  text-sm text-red-500">
                      {{ splitNumber(product.price) }}
                    </del>
                  </div>
                </div>
                <div class="flex">
                  <div
                    v-if="product.has_any_special_price"
                    class="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 flex items-center "
                    style="direction: ltr"
                  >
                    <div
                      class="bg-red-600 dark:bg-red-500 h-1.5 rounded-full transition-all  duration-1000 "
                      :style="{ width: `${progressPercentage}%` }"
                    />
                  </div>
                </div>
              </div>
            </div>
          </ClientOnly>
        </div>
        <div v-else>
          <div class="h-10 mb-1" />
          <div class=" h-9" />
        </div>
      </div>
    </nuxt-link>
  </BaseBeutyBorderColor>
</template>

<style>

</style>
