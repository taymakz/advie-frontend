
import {ProductCardDTO} from "~/models/shop/product/ProductCardDTO";
// @ts-ignore
import {Banner} from "~/models/banner/Banner";


export interface HomeDataDTO {
  banners: Banner[];
  special_sale_products: ProductCardDTO[];
  latest_products: ProductCardDTO[];
  best_selling_products: ProductCardDTO[];
}
