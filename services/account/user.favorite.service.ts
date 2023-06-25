import {ProductCardDTO} from "~/models/shop/product/ProductCardDTO";
import {ApiResponse} from "~/models/api/ApiResponse";

export const GetCurrentFavorite = (): Promise<ApiResponse<ProductCardDTO[]>> => {
    return FetchApi("/product/user/favorite/")
}
export const AddProductToFavorite = (product_id: number): Promise<ApiResponse<undefined>> => {
    return FetchApi("/product/user/favorite/", {
        method: "POST",
        body: {
            product_id,
        }
    })
}
export const RemoveProductFromFavorite = (product_id: number): Promise<ApiResponse<undefined>> => {
    return FetchApi("/product/user/favorite/", {
        method: "DELETE",
        body: {
            product_id,
        }
    })
}