import type { Variant } from '~/models/shop/product/ProductDetailDTO'
import type { ShippingRateDTO } from '~/models/shop/order/checkout/ShippingMethodDTO'

export interface CurrentOrderDTO {
  open: CurrentOpenOrderDTO
  pending: CurrentPendingOrderDTO[]

}

export interface CurrentOrderItemDTO {
  id: number
  order_id: number
  product_id: number
  product_url: string
  product_title_ir: string
  product_title_en: string
  product_image: string
  variant: Variant
  count: number
  total_price: number
}

export interface CurrentOpenOrderDTO {
  id: number
  items: CurrentOrderItemDTO[]
  shipping: ShippingRateDTO | null
}

export interface CurrentPendingOrderDTO {
  id: number
  slug: string
  price: number
  repayment_date_expire: Date
  items: CurrentOrderItemDTO[]

}
