import type { ApiResponse } from '~/models/api/ApiResponse'
import type { ProductSearchResultDTO } from '~/models/shop/search/SearchResultDTO'

export function getSearchResult(q: string): Promise<ApiResponse<ProductSearchResultDTO[]>> {
  return FetchApi('/search/', {
    method: 'GET',
    params: {
      q,
    },
  })
}
