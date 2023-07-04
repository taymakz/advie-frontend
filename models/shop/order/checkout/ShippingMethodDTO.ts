export interface ShippingServiceDTO {
  id: number
  image: string
  name: string
}

export interface ShippingRateDTO {
  id: number
  shipping_service: ShippingServiceDTO
  area: string
  price: number
  all_area: boolean
  pay_at_destination: boolean
  free_shipping_threshold: number
}
