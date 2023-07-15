import type { ApiResponse } from '~/models/api/ApiResponse'
import type { ProductFilterResult } from '~/models/shop/search/ProductSearchResultDTO'

export function GetUserRecent(page: number, take: number): Promise<ApiResponse<ProductFilterResult>> {
  return FetchApi('/product/user/recent/list/', {
    method: 'GET',
    query: {
      page,
      take,
    },
  })
}
