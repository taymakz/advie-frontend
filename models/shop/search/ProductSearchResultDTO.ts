import {ProductCardDTO} from "~/models/shop/product/ProductCardDTO";
import {baseFilterResult} from "~/models/filter/BaseFilterResult";
import {baseFilterParams} from "~/models/filter/BaseFilterParams";


export interface ProductFilterResult extends baseFilterResult<ProductCardDTO> {

}

export interface ProductFilterParams extends baseFilterParams {
  categorySlug: string | undefined;
  subCategorySlug: string | undefined;
  search: string | undefined;
  available: boolean;
  special: boolean;
  sort: ProductSearchSortBy | null;
}

export enum ProductSearchSortBy {
  LATEST = 1,
  BEST_SALE,
  EXPENSIVE ,
  CHEAPEST ,
}
