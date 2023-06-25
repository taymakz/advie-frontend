export interface SearchResultDTO {
  products: ProductSearchResultDTO[]
  categories: CategorySearchResultDTO[]
}

export interface ProductSearchResultDTO {
  id: number
  url: string
  title_ir: string
  image: string
}
export interface CategorySearchResultDTO {
  id: number
  title_ir: string
  url: string

}
