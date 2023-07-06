import type { ApiResponse } from '~/models/api/ApiResponse'
import type {
  PaymentRequestCheckDTO,
  PaymentRequestCheckResultDTO,
  PaymentRequestSubmitDTO,
  PaymentRequestSubmitResultDTO,
} from '~/models/shop/order/checkout/PaymentRequestDTO'
import type { CheckoutResultDTO } from '~/models/shop/order/checkout/CheckoutDTO'

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

export function GetCheckoutResult(transaction_id: string, transaction_slug: string): Promise<ApiResponse<CheckoutResultDTO | null>> {
  return FetchApi(`/checkout/result/${transaction_id}/${transaction_slug}/`)
}
