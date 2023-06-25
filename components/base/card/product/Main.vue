<script setup lang="ts">
import type { ProductCardDTO } from '~/models/shop/product/ProductCardDTO'
import { truncatedText } from '~/utils/TextUtils'

const props = defineProps<{
  product: ProductCardDTO
}>()

const { isMobileOrTablet } = useDevice()

const card = ref<HTMLDivElement>()
const { elementX, elementY } = useMouseInElement(card)

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
  <div>
    <div
      ref="card"

      :style="isMobileOrTablet ? { '--x': `${elementX}px`, '--y': `${elementY}px` } : {}"
      class="w-48   rounded-xl

       border-gradient group relative transition  border-transparent border before:absolute before:-inset-px before:h-[calc(100%+2px)] before:w-[calc(100%+2px)] before:rounded-xl
"
    >
      <div class="absolute inset-0 rounded-[11px] bg-gray-100 dark:bg-gray-800 transition-colors duration-300" />

      <nuxt-link :to="product.url" class="relative flex items-center justify-center px-4 py-3 ">
        <div class="flex flex-col">
          <div class="flex items-center justify-center mb-4">
            <nuxt-img :src="GetImageUrl(product.image)" :alt="product.title_ir" class="w-40 h-40 rounded-lg" />
          </div>
          <div class="mb-2">
            <p class="text-sm text-slate-800 dark:text-slate-300 h-10">
              {{ truncatedText(product.title_ir, 60) }}
            </p>
          </div>
          <div class="flex  justify-between font-iranyekanFanum mb-1">
            <div>
              <div
                v-if="product.has_any_special_price && !timerExpired"
                class="bg-red-600 rounded-xl flex items-center justify-center py-0.5 px-0.5 w-10 text-sm lg:text-xs font-medium text-white"
              >
                {{ product.special_price_percent }}%
              </div>
            </div>
            <div class="flex flex-col  gap-x-1">
              <div class="font-iranyekanFanum font-bold  text-slate-700 dark:text-slate-200 ">
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
                        class=" flex items-center justify-center gap-x-1 font-iranyekanFanum text-sm text-red-600 dark:text-red-500"
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
                    <del v-if="product.has_any_special_price" class="font-iranyekanFanum  text-sm text-red-500">
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
      </nuxt-link>
    </div>
  </div>
</template>

<style>

</style>
