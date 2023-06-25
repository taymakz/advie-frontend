
import {ApiResponse} from "~/models/api/ApiResponse";
import {CategoryDTO} from "~/models/shop/category/CategoryDTO";


export const GetAllCategory = (): Promise<ApiResponse<CategoryDTO[]>> => {
  return FetchApi("/category/list/");
};
