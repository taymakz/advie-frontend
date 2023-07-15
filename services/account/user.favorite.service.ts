import type { ApiResponse } from '~/models/api/ApiResponse'
import type { UserFavoriteFilterResult } from '~/models/shop/product/ProductFavoriteCardDTO'

export function GetUserFavorite(page: number, take: number): Promise<ApiResponse<UserFavoriteFilterResult>> {
  return FetchApi('/product/user/favorite/list/', {
    method: 'GET',
    query: {
      page,
      take,
    },
  })
}

export function AddProductToFavorite(product_id: number): Promise<ApiResponse<{ 'color': string }>> {
  return FetchApi('/product/user/favorite/', {
    method: 'POST',
    body: {
      product_id,
    },
  })
}

export function RemoveProductFromFavorite(id: number): Promise<ApiResponse<undefined>> {
  return FetchApi('/product/user/favorite/', {
    method: 'DELETE',
    body: {
      id,
    },
  })
}
