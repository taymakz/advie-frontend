import {ApiResponse} from "~/models/api/ApiResponse";
import {ProductDetailDTO} from "~/models/shop/product/ProductDetailDTO";
import {ProductFilterParams, ProductFilterResult} from "~/models/shop/search/ProductSearchResultDTO";

export const GetProduct = (
  sku: string
): Promise<ApiResponse<ProductDetailDTO|null>> => {
  return FetchApi(`/product/${sku}/`);
};



export const SearchProduct = (
  filterParams: ProductFilterParams
): Promise<ApiResponse<ProductFilterResult>> => {
  RemoveEmptyProps(filterParams);
  return FetchApi(`/products/`, {
    method: "GET",
    params: filterParams,
  });
};