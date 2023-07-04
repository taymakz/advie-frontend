export interface PaymentRequestCheckDTO {
  shipping_id: number
  address_id: number
}

export interface PaymentRequestSubmitDTO {
  coupon_code: string
}

export interface PaymentRequestSubmitResultDTO {
  is_free: boolean
  payment_gateway_link: string
  redirect_to: string
}

export interface PaymentRequestCheckResultDTO {
  redirect_to: string
}
