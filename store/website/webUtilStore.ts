import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import type { CategoryDTO } from '~/models/shop/category/CategoryDTO'
import { GetAllCategory } from '~/services/website/category.service'

export const useWebsiteUtilStore = defineStore('utilities', () => {
  const headerOverlay: Ref<boolean> = ref(false)
  const categories: Ref<CategoryDTO[]> = ref([])
  const loading = ref(false)
  const zIndex = ref(0)
  const changeHeaderOverlay = (state: boolean, z?: number) => {
    headerOverlay.value = state
    if (typeof z !== 'undefined')
      zIndex.value = z
  }

  const setCategories = async () => {
    if (categories.value.length === 0) {
      loading.value = true
      const res = await GetAllCategory()
      loading.value = false

      categories.value = res.data
    }
  }

  return {
    changeHeaderOverlay,
    headerOverlay,
    categories,
    setCategories,
    zIndex,
  }
})
