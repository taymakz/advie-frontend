import type { ApiResponse } from '~/models/api/ApiResponse'
import type {
  PaymentRequestCheckDTO,
  PaymentRequestCheckResultDTO,
  PaymentRequestSubmitDTO,
  PaymentRequestSubmitResultDTO,
} from '~/models/shop/order/checkout/PaymentRequestDTO'

export function PaymentRequestCheck(command: PaymentRequestCheckDTO): Promise<ApiResponse<PaymentRequestCheckResultDTO>> {
  return FetchApi('/payment/request/check/', {
    method: 'POST',
    body: command,
  })
}

export function PaymentRequestSubmit(command: PaymentRequestSubmitDTO): Promise<ApiResponse<PaymentRequestSubmitResultDTO>> {
  return FetchApi('/payment/request/submit/', {
    method: 'POST',
    body: command,
  })
}
