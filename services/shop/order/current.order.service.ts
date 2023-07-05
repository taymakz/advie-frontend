import type { ApiResponse } from '~/models/api/ApiResponse'
import type { CurrentOrderDTO } from '~/models/shop/order/CurrentOrderDTO'

export function GetCurrentOrder(): Promise<ApiResponse<CurrentOrderDTO>> {
  return FetchApi('/order/current/')
}

export function AddItemToCurrentOrder(product_id: number, variant_id: number): Promise<ApiResponse<number>> {
  return FetchApi('/order/current/add/', {
    method: 'POST',
    body: {
      product_id,
      variant_id,
    },
  })
}

export function IncreaseCurrentOrderItemCount(variant_id: number, item_id: number): Promise<ApiResponse<any>> {
  return FetchApi('/order/current/item/count/increase/', {
    method: 'PUT',
    body: {
      item_id,
      variant_id,
    },
  })
}

export function DecreaseCurrentOrderItemCount(variant_id: number, item_id: number): Promise<ApiResponse<any>> {
  return FetchApi('/order/current/item/count/decrease/', {
    method: 'PUT',
    body: {
      item_id,
      variant_id,
    },
  })
}

export function RemoveCurrentOrderItem(item_id: number): Promise<ApiResponse<any>> {
  return FetchApi('/order/current/item/remove/', {
    method: 'DELETE',
    body: {
      item_id,
    },
  })
}
