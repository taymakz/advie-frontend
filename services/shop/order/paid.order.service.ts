import type { ApiResponse } from '~/models/api/ApiResponse'
import type { OrderDetailDTO, OrderFilterResult } from '~/models/shop/order/PaidOrderDTO'

export function GetPaidOrderList(page: number, take: number): Promise<ApiResponse<OrderFilterResult>> {
  return FetchApi('/order/list/', {
    method: 'GET',
    query: {
      page,
      take,
    },
  })
}
export function GetPaidOrderDetail(transaction: number): Promise<ApiResponse<OrderDetailDTO>> {
  return FetchApi(`/order/${transaction}`, {
    method: 'GET',

  })
}
