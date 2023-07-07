export interface ProductCardDTO {
  id: number
  image: string
  title_ir: string
  title_en: string
  url: string
  sku: number
  price: number
  special_price: number
  special_price_percent: number
  has_any_special_price: number
  longest_special_price_end_date: number
  longest_special_price_start_date: number
  final_price: number
  is_available_in_stock: boolean
  is_only_one_variant: boolean

}
