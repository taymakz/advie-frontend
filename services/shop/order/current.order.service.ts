import {ApiResponse} from "~/models/api/ApiResponse";
import {CurrentOrderDTO} from "~/models/shop/order/CurrentOrderDTO";

export const GetCurrentOrder = (): Promise<ApiResponse<CurrentOrderDTO>> => {
    return FetchApi("/order/current/")
}

export const AddItemToCurrentOrder = (product_id: number, variant_id: number): Promise<ApiResponse<number>> => {
    return FetchApi("/order/current/add/", {
        method: "POST",
        body: {
            product_id,
            variant_id
        }
    })
}

export const IncreaseCurrentOrderItemCount = (variant_id: number, item_id: number): Promise<ApiResponse<any>> => {
    return FetchApi("/order/current/item/count/increase/", {
        method: "PUT",
        body: {
            item_id,
            variant_id
        }
    })
}

export const DecreaseCurrentOrderItemCount = (variant_id: number, item_id: number): Promise<ApiResponse<any>> => {
    return FetchApi("/order/current/item/count/decrease/", {
        method: "PUT",
        body: {
            item_id,
            variant_id
        }
    })
}
export const RemoveCurrentOrderItem = (item_id: number): Promise<ApiResponse<any>> => {
    return FetchApi("/order/current/item/remove/", {
        method: "DELETE",
        body: {
            item_id,
        }
    })
}

export const CurrentOrderPaymentRequest = (command: any): Promise<ApiResponse<any>> => {
    return FetchApi("/payment/request/", {
        method: "POST",
        body: command,
    })
}
