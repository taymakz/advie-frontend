import type { ApiResponse } from '~/models/api/ApiResponse'
import type { ProductDetailDTO } from '~/models/shop/product/ProductDetailDTO'
import type { ProductFilterParams, ProductFilterResult } from '~/models/shop/search/ProductSearchResultDTO'

export function GetProduct(sku: string): Promise<ApiResponse<ProductDetailDTO | null>> {
  return FetchApi(`/product/${sku}/`)
}

export function SearchProduct(filterParams: ProductFilterParams): Promise<ApiResponse<ProductFilterResult>> {
  RemoveEmptyProps(filterParams)
  return FetchApi('/products/', {
    method: 'GET',
    params: filterParams,
  })
}
