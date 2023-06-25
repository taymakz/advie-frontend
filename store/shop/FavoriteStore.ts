import {defineStore} from "pinia";

import {ProductCardDTO} from "~/models/shop/product/ProductCardDTO";
import {useAuthenticateStore} from "~/store/account/AuthenticateStore";
import {
    AddProductToFavorite,
    GetCurrentFavorite,
    RemoveProductFromFavorite
} from "~/services/account/user.favorite.service";


export const useFavoriteStore = defineStore("favorite", () => {
    const toast = useToast()
    const items: Ref<ProductCardDTO[]> = ref([]);
    const getItemsCount = computed(() => items.value.length);

    const loading = ref(false)

    const AddItem = async (item: ProductCardDTO) => {
        loading.value = true

        if (IsLogin()) {

            let result = await AddProductToFavorite(item.id)
            if (!result.success) {

                toast.add({title: result.message, color: 'red'})

                loading.value = false
                return
            }
        }
        let currentItem = items.value.find(f => f.id == item.id)
        if (currentItem) {
            items.value = items.value.filter(f => f.id !== currentItem?.id)

            toast.add({title: 'محصول از علاقه مندی ها حذف شد', color: 'sky'})


        } else {
            items.value.push(item)
            toast.add({title: 'محصول به علاقه مندی ها اضافه شد', color: 'green'})

        }


        SyncLocalFavorite()
        loading.value = false

    }
    const RemoveItem = async (product_id: number) => {

        let currentItem = items.value.find(f => f.id == product_id)
        if (currentItem) {
            loading.value = true
            if (IsLogin()) {
                let result = await RemoveProductFromFavorite(currentItem.id)
                if (!result.success) {
                          toast.add({title: result.message, color: 'red'})
                    loading.value = false
                    return
                }
            }

            items.value = items.value.filter(f => f.id != currentItem?.id)

            toast.add({title: 'محصول از علاقه مندی ها حذف شد', color: 'sky'})

            SyncLocalFavorite()
        }
        loading.value = false
    }
    const Init = async () => {
        if (process.server) return;
        if (IsLogin()) {
            let result = await GetCurrentFavorite()

            items.value = result.data ?? []
        } else {
            let data = localStorage.getItem('favoriteItems')
            if (!data) return
            items.value = JSON.parse(data) as ProductCardDTO[]
        }


    }
    const SyncRemoteFavorite = async () => {

        if (!IsLogin()) return
        let data = localStorage.getItem('favoriteItems')

        if (!data) return
        loading.value = true

        let localFavoriteItems = JSON.parse(data) as ProductCardDTO[]
        for (const e of localFavoriteItems) {
            await AddProductToFavorite(e.id)
        }
        loading.value = false
        localStorage.removeItem('favoriteItems')

    }
    const SyncLocalFavorite = () => {
        if (IsLogin()) return
        localStorage.removeItem('favoriteItems')
        localStorage.setItem('favoriteItems', JSON.stringify(items.value))
    }
    const IsLogin = (): boolean => {
        let authStore = useAuthenticateStore()
        return authStore.isLogin
    }
    const IsExist = (productId: number): boolean => {
        let currentItem = items.value.find(f => f.id === productId)
        return !!currentItem;

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
        IsExist
    };
});
