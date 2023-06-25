
import {ApiResponse} from "~/models/api/ApiResponse";
import {
  ProductFilterParams,
  ProductFilterResult,
  ProductSearchSortBy
} from "~/models/shop/search/ProductSearchResultDTO";
import {SearchProduct} from "~/services/shop/product/product.service";

export const useSearch = () => {
  const route = useRoute();
  const router = useRouter();

  const getFilterParams = (): ProductFilterParams => {
    const params = route.path.split("/");

    return {
      categorySlug: params[3],
      subCategorySlug: params[4],
      page: Number(route.query.page?.toString() ?? "1"),
      search: route.query.q?.toString(),
      take: Number(route.query.take?.toString() ?? "12"),
      special: getBoolean(route.query.special?.toString()),
      available: getBoolean(
          route.query.available?.toString()
      ),

      sort: (route.query.sort as unknown as ProductSearchSortBy) ?? null,

    } as ProductFilterParams;
  };
  const changePageId = async (page: number) => {
    const currentPath = route.path;
    const queryParams = route.query;
    await router.push({
      path: currentPath,
      query: { ...queryParams, page },
    });
  };

  const getProducts = (): Promise<ApiResponse<ProductFilterResult>> => {
    const params = getFilterParams();
    return SearchProduct(params);
  };

  return { getFilterParams, getProducts, changePageId };
};

function getBoolean(value:any): boolean {
  switch (value) {
    case true:
    case "true":
    case 1:
    case "1":
      return true;
    default:
      return false;
  }
}
