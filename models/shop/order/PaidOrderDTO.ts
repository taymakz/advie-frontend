import type { baseFilterResult } from '~/models/filter/BaseFilterResult'
import type { Variant } from '~/models/shop/product/ProductDetailDTO'
import type { AddressDetailDTO } from '~/models/account/user/AddressDTO'

export interface OrderFilterResult extends baseFilterResult<PaidOrderDTO> {

}

export interface PaidOrderDTO {
  id: number
  status: OrderStatus
  ordered_date: Date
  shipped_date: Date
  delivered_date: Date
  total_price: number
  total_profit: number
  total_price_before_discount: number
  shipping_price: number
  transaction: string
  tracking_code: string
  shipping_method: OrderShippingServiceDTO
  address: AddressDetailDTO
}

export interface OrderDetailDTO {
  id: number
  status: OrderStatus
  ordered_date: Date
  shipped_date: Date
  delivered_date: Date
  total_price: number
  total_profit: number
  total_price_before_discount: number
  shipping_price: number
  transaction_id: string
  tracking_code: string
  shipping_service: OrderShippingServiceDTO
  address: AddressDetailDTO
  items: PaidOrderItemDTO[]

}

export interface OrderShippingServiceDTO {
  image: string
  name: string

}

export enum OrderStatus {
  CANCELED = 'لغو شده',
  PENDING = 'در انتظار تایید',
  PROCESSING = 'درحال پردازش',
  SHIPPED = 'ارسال شده',
  DELIVERED = 'تحویل داده شده',
}

export interface PaidOrderItemDTO {
  id: number
  product_id: number
  product_url: string
  product_title_ir: string
  product_title_en: string
  product_image: string
  variant: Variant
  count: number
  refund_status: RefundStatusDTO
  final_price: number
  final_price_before_discount: number
}

export enum RefundStatusDTO {
  NOT_REQUESTED = 'درخواست نشده',
  PENDING = 'در انتظار تایید',
  ACCEPTED = 'تایید شده',
  REJECTED = 'درخواست رد شد',

}
