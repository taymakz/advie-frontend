import type { ApiResponse } from '~/models/api/ApiResponse'
import type { DiscountDTO } from '~/models/shop/order/checkout/DiscountDTO'

export function UseCoupon(code: string): Promise<ApiResponse<DiscountDTO>> {
  return FetchApi('/coupon/use/', {
    method: 'POST',
    body: {
      code,
    },
  })
}
