import {defineStore} from "pinia";
import {Ref} from "vue";

import {CurrentOrderDTO, CurrentOrderItemDTO} from "~/models/shop/order/CurrentOrderDTO";
import {
    AddItemToCurrentOrder, DecreaseCurrentOrderItemCount, GetCurrentOrder,
    IncreaseCurrentOrderItemCount,
    RemoveCurrentOrderItem
} from "~/services/shop/order/current.order.service";
import {useAuthenticateStore} from "~/store/account/AuthenticateStore";


export const useBasketStore = defineStore("basket", () => {
    const toast = useToast()
    const items: Ref<CurrentOrderItemDTO[]> = ref([]);
    const currentOrder: Ref<CurrentOrderDTO | null> = ref(null)
    const getItemsCount = computed(() => items.value.length);

    const loading = ref(false)

    const AddItem = async (item: CurrentOrderItemDTO) => {
        loading.value = true

        if (IsLogin()) {
            let result = await AddItemToCurrentOrder(item.product_id, item.variant.id)
            item.id = result.data
            if (!result.success) {
                toast.add({title: result.message, color: 'red'})

                loading.value = false
                return
            }
        } else {
            item.id = new Date().getTime()
        }

        let currentItem = items.value.find(f => f.variant.id == item.variant.id)
        if (currentItem) {
            if (item.variant.stock > currentItem.count) {
                currentItem.count += item.count
                currentItem.total_price = currentItem.variant.final_price * currentItem.count

                toast.add({title: 'به تعداد محصول در سبد خرید اضافه شد', color: 'green'})

            } else {
                toast.add({title: `بیشتر از ${item.variant.stock} عدد موجود نمیباشد`, color: 'red'})
            }
        } else {
            if (item.variant.stock > 0) {
                items.value.push(item)
                toast.add({title: 'محصول به سبد خرید اضافه شد', color: 'green'})

            } else toast.add({title: 'محصول ناموجود است', color: 'red'})


        }

        SyncLocalBasket()
        loading.value = false

    }
    const RemoveItem = async (product_id: number, variant_id: number) => {

        let currentItem = items.value.find(f => f.product_id == product_id && f.variant.id == variant_id)
        if (currentItem) {
            loading.value = true
            if (IsLogin()) {
                let result = await RemoveCurrentOrderItem(currentItem.id)
                if (!result.success) {

                    toast.add({title: result.message, color: 'red'})
                    loading.value = false
                    return
                }
            }

            items.value = items.value.filter(f => f.id != currentItem?.id)

            toast.add({title: 'محصول از سبد خرید حذف شد', color: 'sky'})

            SyncLocalBasket()
        }
        loading.value = false
    }
    const IncreaseCount = async (product_id: number, variant_id: number) => {
        let currentItem = items.value.find(f => f.product_id == product_id && f.variant.id == variant_id)
        loading.value = true

        if (currentItem && currentItem.variant.stock > currentItem.count && currentItem.count < 5) {
            if (IsLogin()) {
                let result = await IncreaseCurrentOrderItemCount(currentItem.variant.id, currentItem.id)
                if (!result.success) {
                              toast.add({title: result.message, color: 'red'})

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
        let currentItem = items.value.find(f => f.product_id == product_id && f.variant.id == variant_id)
        if (currentItem) {
            loading.value = true
            if (IsLogin()) {
                let result = await DecreaseCurrentOrderItemCount(currentItem.variant.id, currentItem.id)
                if (!result.success) {
                                       toast.add({title: result.message, color: 'red'})

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
        let currentItem = items.value.find(f => f.variant.id === variantId && f.product_id === productId)
        if (currentItem) return currentItem.count
        return 0
    }
    const Init = async () => {
        if (process.server) return;
        if (IsLogin()) {
            let result = await GetCurrentOrder()
            items.value = result.data?.items ?? []
            currentOrder.value = result.data
        } else {
            let data = localStorage.getItem('basketItems')
            if (!data) return
            items.value = JSON.parse(data) as CurrentOrderItemDTO[]
        }


    }
    const SyncRemoteBasket = async () => {

        if (!IsLogin()) return
        let data = localStorage.getItem('basketItems')

        if (!data) return
        loading.value = true

        let localBasketItems = JSON.parse(data) as CurrentOrderItemDTO[]
        for (const e of localBasketItems) {
            await AddItemToCurrentOrder(e.product_id, e.variant.id)
        }
        loading.value = false
        localStorage.removeItem('basketItems')

    }
    const SyncLocalBasket = () => {
        if (IsLogin()) return
        localStorage.removeItem('basketItems')
        localStorage.setItem('basketItems', JSON.stringify(items.value))
    }
    const getTotalPrice = () => {
        let sum = 0
        items.value.forEach(f => {
            sum += f.total_price
        })


        return sum
    }
    const getTotalPriceBeforeDiscount = () => {
        let sum = 0

        items.value.forEach(f => {
            sum += f.variant.price * f.count
        })
        return sum
    }
    const getTotalPriceAfterDiscount = () => {
        let sum = 0
        items.value.forEach(f => {
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

    const IsLogin = (): boolean => {
        let authStore = useAuthenticateStore()
        return authStore.isLogin
    }
    return {
        items,
        currentOrder,
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
        loading
    };
});
