export interface PanelDataDTO {
  favorite_count: number
  orders_count: OrderStatus
}

interface OrderStatus {
  current: number
  delivered: number
  canceled: number
  refunded: number
}
