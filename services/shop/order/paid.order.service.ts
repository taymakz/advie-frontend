import type { ApiResponse } from '~/models/api/ApiResponse'
import type { OrderFilterResult, PaidOrderDTO } from '~/models/shop/order/PaidOrderDTO'

export function GetPaidOrderList(page: number, take: number): Promise<ApiResponse<OrderFilterResult>> {
  return FetchApi('/order/list/', {
    method: 'GET',
    query: {
      page,
      take,
    },
  })
}

export function GetPaidOrderDetail(slug: string): Promise<ApiResponse<PaidOrderDTO>> {
  return FetchApi(`/order/detail/${slug}`)
}
