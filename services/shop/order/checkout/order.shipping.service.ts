import type { ApiResponse } from '~/models/api/ApiResponse'
import type { ShippingRateDTO } from '~/models/shop/order/checkout/ShippingMethodDTO'

export function GetShippingServices(): Promise<ApiResponse<ShippingRateDTO[]>> {
  return FetchApi('/shipping/list/')
}
