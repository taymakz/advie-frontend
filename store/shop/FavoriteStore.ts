import { defineStore } from 'pinia'

import type { ProductCardDTO } from '~/models/shop/product/ProductCardDTO'
import { useAuthenticateStore } from '~/store/account/AuthenticateStore'
import {
  AddProductToFavorite,
  GetCurrentFavorite,
  RemoveProductFromFavorite,
} from '~/services/account/user.favorite.service'

export const useFavoriteStore = defineStore('favorite', () => {
  const toast = useToast()
  const items: Ref<ProductCardDTO[]> = ref([])
  const getItemsCount = computed(() => items.value.length)

  const loading = ref(false)
  const { isLogin } = useAuthenticateStore()
  const Init = async () => {
    if (process.server)
      return
    if (isLogin) {
      const result = await GetCurrentFavorite()

      items.value = result.data ?? []
    }
    else {
      const data = localStorage.getItem('favoriteItems')
      if (!data)
        return
      items.value = JSON.parse(data) as ProductCardDTO[]
    }
  }
  const SyncRemoteFavorite = async () => {
    if (!isLogin)
      return
    const data = localStorage.getItem('favoriteItems')

    if (!data)
      return
    loading.value = true

    const localFavoriteItems = JSON.parse(data) as ProductCardDTO[]
    for (const e of localFavoriteItems)
      await AddProductToFavorite(e.id)

    loading.value = false
    localStorage.removeItem('favoriteItems')
  }
  const SyncLocalFavorite = () => {
    if (isLogin)
      return
    localStorage.removeItem('favoriteItems')
    localStorage.setItem('favoriteItems', JSON.stringify(items.value))
  }
  const AddItem = async (item: ProductCardDTO) => {
    loading.value = true

    if (isLogin) {
      const result = await AddProductToFavorite(item.id)
      if (!result.success) {
        toast.add({ title: result.message, color: 'red' })

        loading.value = false
        return
      }
    }
    const currentItem = items.value.find(f => f.id === item.id)
    if (currentItem) {
      items.value = items.value.filter(f => f.id !== currentItem?.id)

      toast.add({ title: 'محصول از علاقه مندی ها حذف شد', color: 'sky' })
    }
    else {
      items.value.push(item)
      toast.add({ title: 'محصول به علاقه مندی ها اضافه شد', color: 'green' })
    }

    SyncLocalFavorite()
    loading.value = false
  }
  const RemoveItem = async (product_id: number) => {
    const currentItem = items.value.find(f => f.id === product_id)
    if (currentItem) {
      loading.value = true
      if (isLogin) {
        const result = await RemoveProductFromFavorite(currentItem.id)
        if (!result.success) {
          toast.add({ title: result.message, color: 'red' })
          loading.value = false
          return
        }
      }

      items.value = items.value.filter(f => f.id !== currentItem?.id)

      toast.add({ title: 'محصول از علاقه مندی ها حذف شد', color: 'sky' })

      SyncLocalFavorite()
    }
    loading.value = false
  }

  const IsExist = (productId: number): boolean => {
    const currentItem = items.value.find(f => f.id === productId)
    return !!currentItem
  }

  return {
    items,
    getItemsCount,
    loading,
    AddItem,
    RemoveItem,
    Init,
    SyncLocalFavorite,
    SyncRemoteFavorite,
    IsExist,
  }
})
