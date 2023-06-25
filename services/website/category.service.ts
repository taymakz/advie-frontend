import type { ApiResponse } from '~/models/api/ApiResponse'
import type { CategoryDTO } from '~/models/shop/category/CategoryDTO'

export function GetAllCategory(): Promise<ApiResponse<CategoryDTO[]>> {
  return FetchApi('/category/list/')
}
