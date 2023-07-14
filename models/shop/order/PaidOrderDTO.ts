import type { baseFilterResult } from '~/models/filter/BaseFilterResult'
import type { Variant } from '~/models/shop/product/ProductDetailDTO'
import type { AddressDetailDTO } from '~/models/account/user/AddressDTO'

export interface OrderFilterResult extends baseFilterResult<PaidOrderDTO> {

}

export interface PaidOrderDTO {
  id: number
  slug: string
  transaction_id: string
  tracking_code: string
  delivery_status: OrderDeliveryStatus
  payment_status: OrderPaymentStatus

  date_ordered: Date
  date_shipped: Date
  date_delivered: Date

  total_payment_price: number
  total_price: number
  total_profit: number
  total_price_before_discount: number
  coupon_effect_price: number

  shipping_service: OrderShippingServiceDTO
  address: AddressDetailDTO
  items: PaidOrderItemDTO[]
}

export interface OrderShippingServiceDTO {
  image: string
  name: string
  price: number
  pay_at_destination: boolean

}

export enum OrderDeliveryStatus {
  CANCELED = 'CANCELED',
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
}

export enum OrderPaymentStatus {
  OPEN_ORDER = 'OPEN_ORDER',
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  PAID = 'PAID',
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
