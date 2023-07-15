import type { baseFilterResult } from '~/models/filter/BaseFilterResult'

export interface ProductFavoriteCardDTO {
  id: number
  image: string
  title_ir: string
  url: string
  is_available_in_stock: boolean

}

export interface UserFavoriteFilterResult extends baseFilterResult<ProductFavoriteCardDTO> {

}
