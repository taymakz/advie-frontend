import { defineStore } from 'pinia'
import type { Ref } from 'vue'

import type {
  CurrentOpenOrderDTO,
  CurrentOrderItemDTO,
  CurrentPendingOrderDTO,
} from '~/models/shop/order/CurrentOrderDTO'

import {
  AddItemToCurrentOrder,
  DecreaseCurrentOrderItemCount,
  GetCurrentOrder,
  IncreaseCurrentOrderItemCount,
  RemoveCurrentOrderItem,
  ValidateLocalBasket,
} from '~/services/shop/order/current.order.service'
import { useAuthenticateStore } from '~/store/account/AuthenticateStore'

export const useBasketStore = defineStore('basket', () => {
  const toast = useToast()
  const items: Ref<CurrentOrderItemDTO[]> = ref([])
  const currentOpenOrder: Ref<CurrentOpenOrderDTO | null> = ref(null)
  const currentPendingOrder: Ref<CurrentPendingOrderDTO[]> = ref([])
  const getItemsCount = computed(() => items.value.length)

  const loading = ref(false)
  const initLoading = ref(false)
  const Init = async () => {
    if (process.server)
      return
    const authStore = useAuthenticateStore()
    if (authStore.isLogin) {
      initLoading.value = true
      const result = await GetCurrentOrder()
      items.value = result.data?.open.items ?? []
      currentOpenOrder.value = result.data.open
      currentPendingOrder.value = result.data.pending
      initLoading.value = false
    }
    else {
      const data = localStorage.getItem('basketItems')
      if (!data) {
        items.value = []
        return
      }

      initLoading.value = true
      items.value = JSON.parse(data) as CurrentOrderItemDTO[]
      const variants_id = items.value
        .filter(item => item.variant.stock > 0)
        .map(item => item.variant.id)
      const result = await ValidateLocalBasket(variants_id)
      if (result.data.length > 0) {
        // Filter out items that are not in the result
        items.value = items.value.filter(item => result.data.includes(item.variant.id))
      }
      else {
        // If the result is empty, remove basketItems from localStorage
        localStorage.removeItem('basketItems')
        items.value = []
      }
      initLoading.value = false
    }
  }
  const SyncRemoteBasket = async () => {
    const authStore = useAuthenticateStore()

    if (!authStore.isLogin)
      return
    const data = localStorage.getItem('basketItems')

    if (!data)
      return
    initLoading.value = true
    const localBasketItems = JSON.parse(data) as CurrentOrderItemDTO[]
    for (const e of localBasketItems)
      await AddItemToCurrentOrder(e.product_id, e.variant.id, e.count)
    await Init()
    initLoading.value = false
    localStorage.removeItem('basketItems')
  }
  const SyncLocalBasket = () => {
    const authStore = useAuthenticateStore()
    if (authStore.isLogin)
      return
    localStorage.removeItem('basketItems')
    localStorage.setItem('basketItems', JSON.stringify(items.value))
  }
  const AddItem = async (item: CurrentOrderItemDTO) => {
    loading.value = true
    const authStore = useAuthenticateStore()
    if (authStore.isLogin) {
      const result = await AddItemToCurrentOrder(item.product_id, item.variant.id)
      item.id = result.data
      if (!result.success) {
        toast.add({ title: result.message, color: 'red' })

        loading.value = false
        return
      }
    }
    else {
      item.id = new Date().getTime()
    }

    const currentItem = items.value.find(f => f.variant.id === item.variant.id)
    if (currentItem) {
      if (item.variant.stock > currentItem.count) {
        currentItem.count += item.count
        currentItem.total_price = currentItem.variant.final_price * currentItem.count

        toast.add({ title: 'به تعداد محصول در سبد خرید اضافه شد', color: 'green' })
      }
      else {
        toast.add({ title: `بیشتر از ${item.variant.stock} عدد موجود نمیباشد`, color: 'red' })
      }
    }
    else {
      if (item.variant.stock > 0) {
        items.value.push(item)
        toast.add({ title: 'محصول به سبد خرید اضافه شد', color: 'green' })
      }
      else {
        toast.add({ title: 'محصول ناموجود است', color: 'red' })
      }
    }

    SyncLocalBasket()
    loading.value = false
  }
  const RemoveItem = async (product_id: number, variant_id: number) => {
    const currentItem = items.value.find(f => f.product_id === product_id && f.variant.id === variant_id)
    if (currentItem) {
      loading.value = true
      const authStore = useAuthenticateStore()
      if (authStore.isLogin) {
        const result = await RemoveCurrentOrderItem(currentItem.id)
        if (!result.success) {
          toast.add({ title: result.message, color: 'red' })
          loading.value = false
          return
        }
      }

      items.value = items.value.filter(f => f.id !== currentItem?.id)

      toast.add({ title: 'محصول از سبد خرید حذف شد', color: 'sky' })

      SyncLocalBasket()
    }
    loading.value = false
  }
  const IncreaseCount = async (product_id: number, variant_id: number) => {
    const currentItem = items.value.find(f => f.product_id === product_id && f.variant.id === variant_id)
    loading.value = true

    if (currentItem && currentItem.variant.stock > currentItem.count && currentItem.count < 5) {
      const authStore = useAuthenticateStore()
      if (authStore.isLogin) {
        const result = await IncreaseCurrentOrderItemCount(currentItem.variant.id, currentItem.id)
        if (!result.success) {
          toast.add({ title: result.message, color: 'red' })

          loading.value = false
          return
        }
      }

      currentItem.count += 1
      currentItem.total_price = currentItem.variant.final_price * currentItem.count
    }
    loading.value = false
  }
  const DecreaseCount = async (product_id: number, variant_id: number) => {
    const currentItem = items.value.find(f => f.product_id === product_id && f.variant.id === variant_id)
    if (currentItem) {
      loading.value = true
      const authStore = useAuthenticateStore()
      if (authStore.isLogin) {
        const result = await DecreaseCurrentOrderItemCount(currentItem.variant.id, currentItem.id)
        if (!result.success) {
          toast.add({ title: result.message, color: 'red' })

          loading.value = false
          return
        }
      }

      currentItem.count -= 1
      currentItem.total_price = currentItem.variant.final_price * currentItem.count
    }
    loading.value = false
  }
  const InBasketCount = (productId: number, variantId: number): number => {
    const currentItem = items.value.find(f => f.variant.id === variantId && f.product_id === productId)
    if (currentItem)
      return currentItem.count
    return 0
  }

  const getTotalPrice = () => {
    let sum = 0
    items.value.forEach((f) => {
      sum += f.total_price
    })

    return sum
  }
  const getTotalPriceBeforeDiscount = () => {
    let sum = 0

    items.value.forEach((f) => {
      sum += f.variant.price * f.count
    })
    return sum
  }
  const getTotalPriceAfterDiscount = () => {
    let sum = 0
    items.value.forEach((f) => {
      sum += (f.variant.special_price || 0) * f.count
    })
    return sum
  }
  const getDiscountPercentage = () => {
    const totalPriceBeforeDiscount = getTotalPriceBeforeDiscount()
    const totalTotalPrice = getTotalPrice()
    const discountPercentage = ((totalPriceBeforeDiscount - totalTotalPrice) / totalPriceBeforeDiscount) * 100
    return discountPercentage.toFixed(0)
  }
  return {
    items,

    currentPendingOrder,

    currentOpenOrder,
    AddItem,
    RemoveItem,
    IncreaseCount,
    DecreaseCount,
    Init,
    SyncLocalBasket,
    getTotalPrice,
    getItemsCount,
    InBasketCount,
    getTotalPriceBeforeDiscount,
    getTotalPriceAfterDiscount,
    getDiscountPercentage,
    SyncRemoteBasket,
    loading,
    initLoading,
  }
})
