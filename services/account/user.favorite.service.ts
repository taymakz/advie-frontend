import type { ProductCardDTO } from '~/models/shop/product/ProductCardDTO'
import type { ApiResponse } from '~/models/api/ApiResponse'

export function GetCurrentFavorite(): Promise<ApiResponse<ProductCardDTO[]>> {
  return FetchApi('/product/user/favorite/')
}
export function AddProductToFavorite(product_id: number): Promise<ApiResponse<undefined>> {
  return FetchApi('/product/user/favorite/', {
    method: 'POST',
    body: {
      product_id,
    },
  })
}
export function RemoveProductFromFavorite(product_id: number): Promise<ApiResponse<undefined>> {
  return FetchApi('/product/user/favorite/', {
    method: 'DELETE',
    body: {
      product_id,
    },
  })
}
