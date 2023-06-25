import type { ProductCardDTO } from '~/models/shop/product/ProductCardDTO'
import type { BannerDTO } from '~/models/banner/Banner'

export interface HomeDataDTO {
  banners: BannerDTO[]
  special_sale_products: ProductCardDTO[]
  latest_products: ProductCardDTO[]
  best_selling_products: ProductCardDTO[]
}
